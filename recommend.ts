import type {
  Recommendation,
  RecommendationRequest,
  RecommendationResponse,
} from "../types.js";
import { getRecommendation } from "../data/knowledge-base.js";

const DISCLAIMER =
  "⚕️ IMPORTANT NOTE: This analysis is intended as an educational health literacy tool to help you better understand your blood test results. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Lab results can vary based on many factors, and a single test may not tell the full story. Please share these results with your healthcare provider, who can interpret them in the context of your complete health picture and medical history.";

const GENERAL_ADVICE = [
  "Stay well-hydrated — aim for 8 glasses of water daily",
  "Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins",
  "Aim for at least 150 minutes of moderate physical activity per week — even daily walks make a difference",
  "Prioritize quality sleep (7-9 hours per night) — your body does important repair work during sleep",
  "Schedule a follow-up with your healthcare provider to discuss these results in detail",
  "Consider retesting abnormal values in 3-6 months to track trends — a single reading doesn't define your health",
  "Try not to stress about individual numbers — your doctor looks at the overall pattern, not just one value",
];

export function generateRecommendations(
  request: RecommendationRequest
): RecommendationResponse {
  const recommendations: Recommendation[] = [];

  for (const biomarker of request.abnormal_biomarkers) {
    const entry = getRecommendation(biomarker.name);

    if (!entry) {
      // Softer generic recommendation for biomarkers not in our knowledge base
      const isLow = biomarker.status === "LOW" || biomarker.status === "CRITICAL_LOW";
      const isCritical = biomarker.status.includes("CRITICAL");
      const direction = isLow ? "below" : "above";

      recommendations.push({
        biomarker: biomarker.name,
        status: biomarker.status,
        explanation: `Your ${biomarker.name} is at ${biomarker.value} ${biomarker.unit}, which is slightly ${direction} the typical range. ${biomarker.deviation ? biomarker.deviation + ". " : ""}This can happen for a variety of everyday reasons, and a single reading doesn't necessarily indicate a problem. Your doctor can help put this in context with your overall health picture and determine if any follow-up is needed.`,
        foods: [
          "A balanced diet rich in whole foods, fruits, vegetables, and lean proteins supports overall health",
          "Staying well-hydrated helps your body maintain healthy levels across many markers",
        ],
        lifestyle: [
          "Discuss this result with your doctor at your next visit — they can advise whether any specific action is needed",
          "Try not to worry — many mild variations resolve on their own or with simple adjustments",
          "Consider retesting in a few months to see if the trend continues",
        ],
        specialist: isCritical
          ? "Please contact your healthcare provider soon to discuss this result"
          : "Your primary care doctor can help evaluate this at your next appointment",
        urgency: isCritical ? "urgent" : "routine",
      });
      continue;
    }

    const isLow = biomarker.status === "LOW" || biomarker.status === "CRITICAL_LOW";
    const isCritical = biomarker.status.includes("CRITICAL");

    recommendations.push({
      biomarker: biomarker.name,
      status: biomarker.status,
      explanation: isLow ? entry.lowExplanation : entry.highExplanation,
      foods: isLow ? entry.lowFoods : entry.highFoods,
      lifestyle: isLow ? entry.lowLifestyle : entry.highLifestyle,
      specialist: isLow ? entry.lowSpecialist : entry.highSpecialist,
      urgency: isCritical ? "urgent" : "soon",
    });
  }

  // Sort: critical first, then by urgency
  recommendations.sort((a, b) => {
    const urgencyOrder = { urgent: 0, soon: 1, routine: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  return {
    recommendations,
    general_advice: GENERAL_ADVICE,
    disclaimer: DISCLAIMER,
  };
}
