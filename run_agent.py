"""
Blood Report Analyzer — Subconscious Agent
============================================
Uses the official Subconscious SDK (subconscious-sdk) with TIM-GPT engine
and custom function tools pointing to our Hono server.

Subconscious executes tool HTTP calls server-side — tools must be
publicly accessible (hence ngrok).

Docs: https://docs.subconscious.dev/core-concepts/tools

Usage:
    export SUBCONSCIOUS_API_KEY="your-key"
    python run_agent.py --url https://your-ngrok-url.ngrok-free.dev
    python run_agent.py --url https://your-ngrok-url.ngrok-free.dev --engine tim-gpt-heavy
    python run_agent.py --url https://your-ngrok-url.ngrok-free.dev --report report.txt
    python run_agent.py --url https://your-ngrok-url.ngrok-free.dev --fallback

Requirements:
    pip install subconscious-sdk requests
"""

import os
import sys
import json
import argparse
import requests

# ─── Configuration ─────────────────────────────────────────────────
SUBCONSCIOUS_API_KEY = os.environ.get("SUBCONSCIOUS_API_KEY", "")

SAMPLE_REPORT = """
PATHOLOGY LABORATORY REPORT
Patient: John Doe | Age: 45 | Sex: Male | Date: 2026-02-20

COMPLETE BLOOD COUNT (CBC)
Hemoglobin              10.2        g/dL          13.0 - 17.5
RBC Count               3.8         million/µL    4.5 - 6.0
WBC Count               8500        cells/µL      4000 - 11000
Platelet Count          210         ×10³/µL       150 - 400
Hematocrit              31.5        %             38.0 - 54.0
MCV                     82          fL            80 - 100
ESR                     35          mm/hr         0 - 20

METABOLIC PANEL
Fasting Glucose         128         mg/dL         70 - 100
HbA1c                   6.8         %             4.0 - 5.6
Creatinine              1.4         mg/dL         0.6 - 1.2
BUN                     22          mg/dL         7 - 20

LIPID PANEL
Total Cholesterol       245         mg/dL
LDL Cholesterol         162         mg/dL
HDL Cholesterol         38          mg/dL         40 - 60
Triglycerides           225         mg/dL

LIVER FUNCTION
ALT (SGPT)              68          U/L           7 - 56
AST (SGOT)              45          U/L           10 - 40
Total Bilirubin         0.8         mg/dL         0.1 - 1.2

THYROID FUNCTION
TSH                     6.8         µIU/mL        0.4 - 4.0
Free T4                 0.7         ng/dL         0.8 - 1.8

VITAMINS & MINERALS
Vitamin D               18          ng/mL         30 - 100
Vitamin B12             380         pg/mL         200 - 900
Iron                    45          µg/dL         60 - 170
Ferritin                12          ng/mL         20 - 250
Sodium                  141         mEq/L         136 - 145
Potassium               4.8         mEq/L         3.5 - 5.0
Calcium                 9.2         mg/dL         8.5 - 10.5
"""


def build_tools(server_url: str) -> list[dict]:
    """
    Build custom function tools for Subconscious.

    From docs.subconscious.dev/core-concepts/tools:
    Custom function tools have type "function" with url, method,
    timeout, parameters, and optional headers/defaults.
    Subconscious calls these endpoints server-side during agent execution.
    """
    return [
        {
            "type": "function",
            "name": "extract_biomarkers",
            "description": (
                "Extract all biomarkers (name, value, unit, reference range) "
                "from blood test report text. Returns a structured list of "
                "every biomarker found in the report."
            ),
            "url": f"{server_url}/tools/extract-biomarkers",
            "method": "POST",
            "timeout": 30,
            "parameters": {
                "type": "object",
                "properties": {
                    "report_text": {
                        "type": "string",
                        "description": "The raw text content of a blood test report",
                    }
                },
                "required": ["report_text"],
                "additionalProperties": False,
            },
        },
        {
            "type": "function",
            "name": "classify_biomarkers",
            "description": (
                "Classify extracted biomarkers as NORMAL, LOW, HIGH, "
                "CRITICAL_LOW, or CRITICAL_HIGH based on WHO and Mayo Clinic "
                "reference ranges. Takes the biomarkers array from "
                "extract_biomarkers output."
            ),
            "url": f"{server_url}/tools/classify-biomarkers",
            "method": "POST",
            "timeout": 30,
            "parameters": {
                "type": "object",
                "properties": {
                    "biomarkers": {
                        "type": "array",
                        "description": "Array of extracted biomarker objects from extract_biomarkers",
                        "items": {"type": "object"},
                    }
                },
                "required": ["biomarkers"],
                "additionalProperties": False,
            },
        },
        {
            "type": "function",
            "name": "generate_recommendations",
            "description": (
                "Generate dietary recommendations, lifestyle advice, and "
                "specialist referrals for abnormal biomarker values. Takes "
                "the abnormal classified biomarkers from classify_biomarkers."
            ),
            "url": f"{server_url}/tools/generate-recommendations",
            "method": "POST",
            "timeout": 30,
            "parameters": {
                "type": "object",
                "properties": {
                    "abnormal_biomarkers": {
                        "type": "array",
                        "description": "Array of abnormal classified biomarker objects",
                        "items": {"type": "object"},
                    }
                },
                "required": ["abnormal_biomarkers"],
                "additionalProperties": False,
            },
        },
    ]


def check_server(server_url: str) -> bool:
    """Verify the Hono server is reachable."""
    try:
        resp = requests.get(f"{server_url}/health", timeout=5)
        return resp.status_code == 200
    except requests.ConnectionError:
        return False


def run_subconscious_agent(
    report_text: str,
    server_url: str,
    engine: str = "tim-gpt",
) -> dict:
    """
    Run the Subconscious agent using the official SDK.

    Uses client.run() with await_completion=True and 3 custom function
    tools pointing to our Hono server via ngrok.

    Ref: https://docs.subconscious.dev/quickstart
    Ref: https://docs.subconscious.dev/core-concepts/tools
    """
    from subconscious import Subconscious

    client = Subconscious(api_key=SUBCONSCIOUS_API_KEY)

    tools = build_tools(server_url)

    instructions = (
        "You are a friendly health analysis assistant. Analyze the following "
        "blood test report by following these steps:\n\n"
        "1. Use extract_biomarkers to parse all biomarkers from the report.\n"
        "2. Use classify_biomarkers with the extracted biomarkers array to "
        "classify each value against medical reference ranges.\n"
        "3. Use generate_recommendations with the abnormal biomarkers to get "
        "personalized dietary, lifestyle, and specialist referral advice.\n"
        "4. Present findings in a clear, friendly, and reassuring tone. "
        "Focus on actionable steps the patient can take.\n"
        "5. Always include a disclaimer that this is for educational purposes "
        "only and not a substitute for professional medical advice.\n\n"
        f"BLOOD REPORT:\n{report_text}"
    )

    print(f"\n🧠 Subconscious Agent (engine: {engine})")
    print(f"   🔧 3 custom function tools → {server_url}")
    print(f"   ⏳ Running agent...\n")

    try:
        run = client.run(
            engine=engine,
            input={
                "instructions": instructions,
                "tools": tools,
            },
            options={"await_completion": True},
        )

        print(f"   ✅ Run completed — status: {run.status}")

        if hasattr(run, "usage") and run.usage:
            usage = run.usage
            input_t = getattr(usage, "input_tokens", None) or getattr(usage, "inputTokens", None)
            output_t = getattr(usage, "output_tokens", None) or getattr(usage, "outputTokens", None)
            duration = getattr(usage, "duration_ms", None) or getattr(usage, "durationMs", None)
            if input_t and output_t:
                print(f"   📊 Tokens — input: {input_t}, output: {output_t}")
            if duration:
                print(f"   ⏱️  Duration: {duration}ms")

        if run.status == "succeeded" and run.result:
            answer = run.result.answer
            reasoning = getattr(run.result, "reasoning", None)

            # answer might be a string or dict
            if isinstance(answer, str):
                return {"agent_response": answer, "reasoning": reasoning}
            elif isinstance(answer, dict):
                return {**answer, "reasoning": reasoning}
            else:
                return {"agent_response": str(answer), "reasoning": reasoning}
        elif run.status == "failed":
            error = getattr(run, "error", None)
            error_msg = str(error) if error else "Unknown error"
            print(f"   ❌ Run failed: {error_msg}")
            return {"error": error_msg}
        else:
            return {"error": f"Unexpected status: {run.status}"}

    except Exception as e:
        print(f"   ❌ Error: {e}")
        return {"error": str(e)}


def run_direct_fallback(report_text: str, server_url: str) -> dict:
    """
    Fallback: call /tools/full-analysis directly.
    Ensures the demo always works even without Subconscious.
    """
    print("\n🔄 Running direct pipeline (fallback mode)...")
    resp = requests.post(
        f"{server_url}/tools/full-analysis",
        json={"report_text": report_text},
        timeout=60,
    )
    resp.raise_for_status()
    result = resp.json()

    extraction = result.get("extraction", {})
    classification = result.get("classification", {})
    recommendations = result.get("recommendations", {})
    summary = classification.get("summary", {})

    print(f"   📋 Extracted {len(extraction.get('biomarkers', []))} biomarkers")
    print(f"   🏷️  Normal: {summary.get('normal', 0)} | "
          f"Low: {summary.get('low', 0)} | "
          f"High: {summary.get('high', 0)} | "
          f"Critical: {summary.get('critical', 0)}")
    print(f"   💊 {len(recommendations.get('recommendations', []))} recommendations")

    return result


def print_results(result: dict):
    """Pretty-print the analysis results."""

    # Agent natural language response
    if "agent_response" in result:
        print(f"\n{'═' * 60}")
        print(f"  📊 Subconscious Agent Analysis")
        print(f"{'═' * 60}\n")
        print(result["agent_response"])

        # Print reasoning trace if available
        reasoning = result.get("reasoning")
        if reasoning:
            print(f"\n{'─' * 60}")
            print(f"  🧠 Agent Reasoning Trace")
            print(f"{'─' * 60}")
            for i, step in enumerate(reasoning[:10], 1):
                title = step.get("title", "Step")
                thought = step.get("thought", "")
                tooluse = step.get("tooluse", {})
                tool_name = tooluse.get("tool_name", "") if tooluse else ""
                if title:
                    print(f"  {i}. {title}")
                if tool_name:
                    print(f"     🔧 Called: {tool_name}")
                if thought:
                    print(f"     💭 {thought[:150]}...")
        return

    # Structured data from direct fallback
    recs = result.get("recommendations", {})
    rec_list = recs.get("recommendations", [])

    if rec_list:
        print(f"\n{'═' * 60}")
        print(f"  📊 Health Recommendations ({len(rec_list)} items)")
        print(f"{'═' * 60}")
        for rec in rec_list:
            urgency_icon = (
                "🔴" if rec.get("urgency") == "urgent"
                else "🟡" if rec.get("urgency") == "soon"
                else "🟢"
            )
            print(f"\n{urgency_icon} {rec['biomarker']} ({rec['status']})")
            explanation = rec.get("explanation", "")
            if len(explanation) > 300:
                print(f"   {explanation[:300]}...")
            else:
                print(f"   {explanation}")
            if rec.get("foods"):
                print(f"   🍽️  {rec['foods'][0]}")
            if rec.get("specialist"):
                specialist = rec["specialist"]
                if len(specialist) > 100:
                    specialist = specialist[:100] + "..."
                print(f"   👨‍⚕️ {specialist}")

    disclaimer = recs.get("disclaimer", "")
    if disclaimer:
        print(f"\n{disclaimer}")


def main():
    parser = argparse.ArgumentParser(
        description="Blood Report Analyzer — Subconscious Agent",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # With Subconscious SDK
  export SUBCONSCIOUS_API_KEY="your-key"
  python run_agent.py --url https://xxx.ngrok-free.app

  # Custom report file
  python run_agent.py --url https://xxx.ngrok-free.app --report report.txt

  # Most powerful engine
  python run_agent.py --url https://xxx.ngrok-free.app --engine tim-gpt-heavy

  # Direct mode (no Subconscious, just HTTP)
  python run_agent.py --url https://xxx.ngrok-free.app --fallback
        """,
    )
    parser.add_argument("--report", type=str, help="Path to a .txt blood report file")
    parser.add_argument("--url", type=str, required=True, help="Hono server public URL (ngrok)")
    parser.add_argument(
        "--engine", type=str, default="tim-gpt",
        choices=["tim", "tim-edge", "timini", "tim-gpt", "tim-gpt-heavy"],
        help="Subconscious engine (default: tim-gpt)",
    )
    parser.add_argument("--output", type=str, help="Save JSON result to file")
    parser.add_argument("--fallback", action="store_true", help="Skip Subconscious, use direct HTTP")
    args = parser.parse_args()

    # Load report
    if args.report:
        with open(args.report, "r") as f:
            report_text = f.read()
        print(f"📄 Loaded report from: {args.report}")
    else:
        report_text = SAMPLE_REPORT
        print("📄 Using built-in sample report")

    # Check server
    print(f"\n🔗 Checking Hono server: {args.url}")
    if not check_server(args.url):
        print("❌ Server not reachable! Make sure:")
        print("   1. npm run dev is running")
        print("   2. ngrok http 3000 is running")
        print(f"   3. URL is correct: {args.url}")
        sys.exit(1)
    print("✅ Server is running")

    print(f"\n{'═' * 60}")
    print(f"  🩸 Blood Report Analyzer — Subconscious Agent")
    print(f"{'═' * 60}")

    # Run
    if args.fallback:
        result = run_direct_fallback(report_text, args.url)
    elif not SUBCONSCIOUS_API_KEY:
        print("\n⚠️  SUBCONSCIOUS_API_KEY not set.")
        print("   Set it: export SUBCONSCIOUS_API_KEY='your-key'")
        print("   Get one: https://subconscious.dev/platform/api-keys")
        print("\n   Falling back to direct HTTP...\n")
        result = run_direct_fallback(report_text, args.url)
    else:
        result = run_subconscious_agent(report_text, args.url, args.engine)
        if "error" in result:
            print("\n⚠️  Agent failed. Falling back to direct HTTP...\n")
            result = run_direct_fallback(report_text, args.url)

    print_results(result)

    if args.output:
        with open(args.output, "w") as f:
            json.dump(result, f, indent=2, default=str)
        print(f"\n📁 Saved to: {args.output}")

    print(f"\n✅ Done!")


if __name__ == "__main__":
    main()
