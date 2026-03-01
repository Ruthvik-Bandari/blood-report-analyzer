// Knowledge base: biomarker → recommendations
// Sources: USDA FoodData Central, WHO guidelines, Mayo Clinic
// DISCLAIMER: Educational use only. Not medical advice.

export interface RecommendationEntry {
  biomarker: string;
  lowExplanation: string;
  highExplanation: string;
  lowFoods: string[];
  highFoods: string[];
  lowLifestyle: string[];
  highLifestyle: string[];
  lowSpecialist: string | null;
  highSpecialist: string | null;
}

export const KNOWLEDGE_BASE: Record<string, RecommendationEntry> = {
  Hemoglobin: {
    biomarker: "Hemoglobin",
    lowExplanation:
      "Your hemoglobin is a bit lower than the typical range. This is quite common and can happen for a number of everyday reasons — not getting enough iron or vitamin B12 in your diet, heavy menstrual periods, a recent illness, or sometimes a chronic condition working in the background. It simply means your blood is carrying a little less oxygen than ideal, which might explain feelings of tiredness or low energy. The good news is that this is often very manageable with some dietary adjustments and guidance from your doctor.",
    highExplanation:
      "Your hemoglobin is slightly above the usual range. This can happen for some fairly straightforward reasons — mild dehydration, living at a higher altitude, smoking, or sometimes lung or heart conditions that cause your body to produce extra red blood cells. It's worth a conversation with your doctor to understand what's behind it, and in many cases, staying well-hydrated and addressing the root cause is all that's needed.",
    lowFoods: [
      "Red meat and liver — among the richest sources of easily absorbed (heme) iron",
      "Spinach, kale, and dark leafy greens — great plant-based iron sources",
      "Lentils, chickpeas, and kidney beans — excellent for iron and folate",
      "Fortified breakfast cereals — a convenient daily iron boost",
      "Pumpkin seeds and sesame seeds — iron-packed snack options",
      "Dark chocolate (70%+ cocoa) — a surprisingly good iron source",
      "Pair any plant-based iron source with vitamin C foods (oranges, bell peppers, tomatoes) — this can boost absorption by up to 3x",
    ],
    highFoods: [
      "Increase water intake throughout the day — dehydration is a common cause",
      "Temporarily reduce red meat and iron-rich foods",
      "Avoid iron-fortified foods and supplements unless prescribed",
      "Include more fruits, vegetables, and whole grains in your meals",
    ],
    lowLifestyle: [
      "Have a conversation with your doctor to pinpoint the cause — it could be as simple as a dietary gap",
      "Try not to drink tea or coffee with meals — the tannins can reduce iron absorption by up to 60%",
      "If your doctor recommends iron supplements, take them with orange juice for better absorption",
      "Cook in cast-iron pans — small amounts of iron leach into food and genuinely help",
      "Aim for 7-9 hours of quality sleep — your body produces blood cells during rest",
    ],
    highLifestyle: [
      "Stay well-hydrated — aim for 8-10 glasses of water daily",
      "If you smoke, this is a good reason to work toward quitting — smoking raises hemoglobin artificially",
      "Regular moderate exercise helps your body regulate blood cell levels",
      "Your doctor may suggest periodic blood tests to monitor the trend",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can run detailed iron studies and identify the root cause",
    highSpecialist: "Hematologist (blood specialist) — they can evaluate whether further investigation is needed",
  },

  WBC: {
    biomarker: "WBC",
    lowExplanation:
      "Your white blood cell count is a little below the typical range. White blood cells are your body's defense team, so a lower count can sometimes mean your immune system is working a bit less efficiently. This can happen due to a recent viral infection (your body used up WBCs fighting it off), certain medications, vitamin deficiencies (like B12 or folate), or occasionally autoimmune conditions. It's quite treatable once your doctor identifies what's behind it.",
    highExplanation:
      "Your white blood cell count is somewhat above the usual range. This is actually one of the most common findings on blood tests and is often your body's natural response to fighting off an infection, dealing with inflammation, physical or emotional stress, or even vigorous exercise before the test. In most cases, it resolves on its own once the underlying trigger passes. Your doctor can help determine if any follow-up is needed.",
    lowFoods: [
      "Garlic — contains allicin, a natural compound that supports immune cell activity",
      "Citrus fruits (oranges, lemons, grapefruit) — vitamin C stimulates WBC production",
      "Yogurt, kefir, and fermented foods — probiotics support overall immune health",
      "Green tea — rich in antioxidants that support immune function",
      "Almonds and sunflower seeds — vitamin E helps maintain immune cell health",
      "Turmeric — curcumin has immune-modulating properties",
      "Mushrooms (shiitake, maitake) — contain beta-glucans that stimulate immune response",
    ],
    highFoods: [
      "Anti-inflammatory foods: salmon, sardines, and other omega-3 rich fish",
      "Berries (blueberries, strawberries, cherries) — packed with anti-inflammatory antioxidants",
      "Leafy greens (spinach, kale) — help reduce systemic inflammation",
      "Extra virgin olive oil — contains oleocanthal, a natural anti-inflammatory",
      "Try to limit processed and fried foods — they can promote inflammation",
    ],
    lowLifestyle: [
      "Prioritize quality sleep (7-9 hours) — your immune system regenerates during deep sleep",
      "Practice good hand hygiene to reduce infection risk while your count recovers",
      "Manage stress through activities you enjoy — meditation, yoga, walking, or hobbies",
      "Moderate exercise supports immune function (avoid overtraining, which can suppress it further)",
      "If you take any medications, ask your doctor whether they might be contributing",
    ],
    highLifestyle: [
      "If you're recovering from an illness, give your body time to rest — the count often normalizes on its own",
      "Manage stress levels — chronic stress keeps WBC elevated through cortisol",
      "Regular moderate exercise helps regulate immune response over time",
      "If the count stays elevated on repeat testing, your doctor may recommend further evaluation",
      "Stay hydrated and maintain a balanced diet to support your body's recovery",
    ],
    lowSpecialist: "Hematologist (blood specialist) or Immunologist — they can investigate the underlying cause and recommend targeted treatment",
    highSpecialist: "Internal Medicine doctor or Hematologist — they can determine if the elevation needs further workup or if it's a temporary response",
  },

  "Fasting Glucose": {
    biomarker: "Fasting Glucose",
    lowExplanation:
      "Your fasting blood sugar is a bit lower than the typical range. This can happen if you went a long time without eating before the test, exercised intensely, or sometimes as a side effect of certain medications. Some people are naturally on the lower end. If you occasionally feel shaky, dizzy, or lightheaded between meals, it's worth mentioning to your doctor — simple dietary adjustments usually help a lot.",
    highExplanation:
      "Your fasting glucose is above the typical range, which is something many people experience — you're not alone in this. A reading between 100-125 mg/dL falls in the prediabetes range, and 126+ may suggest diabetes. The most common reason is insulin resistance, which develops gradually due to factors like diet, activity level, weight, genetics, or stress. The encouraging news is that prediabetes is often reversible with lifestyle changes, and even small improvements in diet and exercise can make a meaningful difference.",
    lowFoods: [
      "Complex carbohydrates (whole grain bread, oats, brown rice) — provide steady, sustained energy",
      "Pair carbs with protein at every meal (eggs, nuts, chicken) — slows glucose release",
      "Keep healthy snacks handy (trail mix, cheese and crackers, fruit with peanut butter)",
      "Bananas, dates, or a small glass of juice — quick natural glucose boost when feeling low",
    ],
    highFoods: [
      "High-fiber vegetables (broccoli, Brussels sprouts, cauliflower, green beans) — fiber slows sugar absorption",
      "Cinnamon — some studies suggest it may help improve insulin sensitivity; easy to add to oatmeal or coffee",
      "Whole grains instead of refined (brown rice over white, whole wheat over white bread)",
      "Nuts and seeds (almonds, walnuts, chia seeds) — healthy fats help stabilize blood sugar",
      "Legumes (lentils, chickpeas, black beans) — excellent low-glycemic protein and fiber combo",
      "Bitter gourd / bitter melon — traditional remedy with some research support",
      "Swap sugary drinks for water, herbal tea, or sparkling water with lemon",
    ],
    lowLifestyle: [
      "Try not to skip meals, especially breakfast — regular eating keeps blood sugar steady",
      "Keep a small snack (granola bar, fruit, glucose tablets) with you for peace of mind",
      "If episodes happen often, your doctor may suggest monitoring blood sugar at home",
      "Moderate exercise is fine and healthy — just eat a small snack beforehand if needed",
    ],
    highLifestyle: [
      "A 30-minute walk after meals can significantly reduce blood sugar spikes — start small and build up",
      "Aim for 150 minutes of moderate activity per week (brisk walking, cycling, swimming all count)",
      "Even modest weight loss (5-7% of body weight) can dramatically improve glucose levels",
      "Reduce refined sugar and processed food — focus on whole, unprocessed foods",
      "Manage stress — cortisol directly raises blood sugar, so relaxation techniques genuinely help",
      "Quality sleep matters — poor sleep impairs insulin sensitivity the very next day",
      "Ask your doctor about a continuous glucose monitor (CGM) if you want to see patterns",
    ],
    lowSpecialist: "Endocrinologist — they specialize in blood sugar regulation and can rule out underlying causes",
    highSpecialist: "Endocrinologist (hormone and diabetes specialist) — they can create a personalized management plan and monitor your progress",
  },

  HbA1c: {
    biomarker: "HbA1c",
    lowExplanation:
      "Your HbA1c is lower than the typical range. This test reflects your average blood sugar over the past 2-3 months, so a low result could mean you've been experiencing episodes of low blood sugar, or it can sometimes be related to certain blood conditions. It's worth a quick chat with your doctor to make sure everything is in balance.",
    highExplanation:
      "Your HbA1c is above the typical range, which means your average blood sugar over the past 2-3 months has been running a bit high. An HbA1c between 5.7-6.4% falls in the prediabetes zone, while 6.5% or above may indicate diabetes. Please don't feel alarmed — this is one of the most common findings in adults, and many people successfully bring their numbers down with gradual lifestyle adjustments. Small, consistent changes to your diet and activity level can have a real impact over time.",
    lowFoods: [
      "Balanced meals that include complex carbohydrates — don't over-restrict carbs",
      "Maintain regular meal timing to keep blood sugar steady throughout the day",
      "Include a mix of protein, healthy fats, and carbs at each meal",
    ],
    highFoods: [
      "Low glycemic index foods (quinoa, sweet potatoes, legumes, steel-cut oats) — release sugar slowly",
      "Non-starchy vegetables (leafy greens, bell peppers, tomatoes, zucchini) — fill half your plate",
      "Lean proteins (chicken, fish, tofu, eggs) — help stabilize blood sugar",
      "Healthy fats (avocado, olive oil, nuts) — slow carbohydrate absorption",
      "Berries over tropical fruits — lower sugar content with great nutritional value",
      "Gradually reduce refined carbohydrates and sugary treats — you don't have to quit overnight",
    ],
    lowLifestyle: [
      "Keep a regular meal schedule — consistent timing helps prevent blood sugar dips",
      "If you're on diabetes medication, discuss dosage with your doctor",
      "Learn to recognize low blood sugar symptoms (shakiness, sweating, confusion)",
    ],
    highLifestyle: [
      "Aim for 150 minutes of moderate exercise per week — even daily walks count",
      "Weight management makes a big difference — losing 5-7% of body weight can significantly improve HbA1c",
      "Find stress management techniques that work for you — stress hormones raise blood sugar",
      "Prioritize 7-9 hours of quality sleep — sleep deprivation affects insulin sensitivity",
      "Consider tracking your meals for a few weeks to identify patterns — apps like MyFitnessPal can help",
      "Retest in 3 months to track your progress — small improvements add up",
    ],
    lowSpecialist: "Endocrinologist — they can evaluate whether medication adjustments or further testing is needed",
    highSpecialist: "Endocrinologist (diabetes and metabolism specialist) — they can help you build a personalized plan and track your improvement over time",
  },

  "Total Cholesterol": {
    biomarker: "Total Cholesterol",
    lowExplanation:
      "Your total cholesterol is below the typical range. While we often hear about the risks of high cholesterol, your body does need some cholesterol for building cells and making hormones. A low reading can sometimes be linked to an overactive thyroid, liver conditions, malnutrition, or certain medications. Your doctor can help figure out whether there's an underlying reason worth addressing.",
    highExplanation:
      "Your total cholesterol is above the recommended level. This is very common — nearly 1 in 3 adults has elevated cholesterol. It can be influenced by dietary habits (saturated fats, processed foods), genetics (some families naturally produce more cholesterol), a sedentary lifestyle, or certain medical conditions. The reassuring part is that cholesterol responds well to lifestyle changes, and many people see meaningful improvement within a few months of adjusting their diet and exercise habits.",
    lowFoods: [
      "Healthy fats: avocados, nuts (walnuts, almonds), and olive oil",
      "Eggs — a great source of dietary cholesterol when you need more",
      "Full-fat dairy in moderation (cheese, whole milk yogurt)",
      "Coconut and coconut oil — medium-chain fats your body can use",
    ],
    highFoods: [
      "Oats and barley — the soluble fiber (beta-glucan) actively lowers cholesterol absorption",
      "A handful of nuts daily (almonds, walnuts, pistachios) — proven to reduce LDL",
      "Fatty fish 2-3 times per week (salmon, mackerel, sardines) — omega-3s improve your cholesterol profile",
      "Extra virgin olive oil — a heart-healthy fat swap for butter",
      "Beans and legumes — fiber-rich and great for cholesterol management",
      "Gradually reduce saturated fats (fatty cuts of meat, full-fat dairy, fried foods)",
      "Eliminate trans fats entirely — check labels for 'partially hydrogenated oils'",
    ],
    lowLifestyle: [
      "Make sure you're eating enough overall — restrictive diets can lower cholesterol too much",
      "Your doctor may want to check thyroid and liver function to rule out underlying causes",
    ],
    highLifestyle: [
      "Aim for 30-60 minutes of aerobic exercise most days — walking, cycling, or swimming all work great",
      "If you smoke, quitting is one of the most impactful things you can do — it raises HDL significantly",
      "Maintaining a healthy weight helps — even a modest 5-10 lb loss can improve numbers",
      "Limit alcohol to moderate levels — excessive drinking raises cholesterol",
      "Retest in 3-6 months after lifestyle changes to track your progress",
    ],
    lowSpecialist: "Internal Medicine doctor — they can investigate whether an underlying condition is involved",
    highSpecialist: "Cardiologist (heart specialist) — they can assess your overall cardiovascular risk and guide treatment",
  },

  "LDL Cholesterol": {
    biomarker: "LDL Cholesterol",
    lowExplanation:
      "Your LDL cholesterol is on the lower side. LDL is often called 'bad' cholesterol because high levels can be harmful, so a low reading is generally considered a positive finding. Unless it's extremely low, there's usually nothing to worry about here.",
    highExplanation:
      "Your LDL cholesterol is above the recommended level. LDL is the type of cholesterol that can gradually build up in artery walls over time, which is why doctors pay close attention to it. The causes are often a combination of dietary patterns, genetics, and lifestyle factors. The good news is that LDL is one of the most responsive markers to lifestyle changes — many people see significant improvement with dietary adjustments and regular exercise.",
    lowFoods: [
      "No specific dietary changes needed — low LDL is generally favorable",
    ],
    highFoods: [
      "Soluble fiber foods (oatmeal, beans, lentils, apples, pears) — fiber binds cholesterol in the gut",
      "Plant sterols and stanols (found in fortified spreads, orange juice) — block cholesterol absorption",
      "Walnuts and almonds — eating a handful daily can lower LDL by 5-10%",
      "Fatty fish rich in omega-3 (salmon, sardines, mackerel) — improve overall lipid profile",
      "Avocados — replacing saturated fats with avocado has been shown to lower LDL",
      "Reduce saturated fat to less than 7% of daily calories — swap butter for olive oil, choose lean meats",
    ],
    lowLifestyle: [
      "No specific changes needed — continue your current healthy habits",
    ],
    highLifestyle: [
      "Aerobic exercise 30 minutes, 5 days per week — one of the best natural LDL lowerers",
      "Even modest weight loss (5-10 lbs) can meaningfully reduce LDL",
      "If you smoke, quitting improves your entire lipid profile",
      "If lifestyle changes aren't enough after 3-6 months, your doctor may discuss medication options like statins — these are safe, well-studied, and very effective",
      "The Mediterranean diet pattern has strong evidence for improving cholesterol",
    ],
    lowSpecialist: null,
    highSpecialist: "Cardiologist (heart specialist) — they can assess your full cardiovascular risk profile and recommend the best approach",
  },

  "HDL Cholesterol": {
    biomarker: "HDL Cholesterol",
    lowExplanation:
      "Your HDL cholesterol is below the ideal range. HDL is your 'good' cholesterol — it works like a cleanup crew, picking up excess cholesterol from your arteries and carrying it back to the liver for disposal. When HDL is low, that cleanup process is less efficient, which can increase cardiovascular risk over time. The encouraging news is that HDL responds really well to exercise and dietary changes.",
    highExplanation:
      "Your HDL cholesterol is above the typical range, and this is generally great news! High HDL is considered protective for your heart. In most cases, no action is needed. Very high levels (above 100 mg/dL) are uncommon and your doctor may want to investigate, but for most people, a high HDL is something to feel good about.",
    lowFoods: [
      "Extra virgin olive oil — one of the best foods for raising HDL",
      "Fatty fish (salmon, sardines, mackerel) — omega-3s boost HDL function",
      "Flaxseeds and chia seeds — plant-based omega-3 sources",
      "Nuts, especially almonds and Brazil nuts — healthy fats that support HDL",
      "Purple and red foods (grapes, berries, beets, eggplant) — polyphenols help HDL function better",
      "Avocados — rich in monounsaturated fats that raise HDL",
    ],
    highFoods: [
      "No dietary changes needed — your high HDL is protective",
    ],
    lowLifestyle: [
      "Aerobic exercise is the single most effective way to raise HDL — aim for 150+ minutes per week",
      "If you smoke, quitting can raise HDL by up to 10% within a year",
      "Losing excess weight helps — every 6 lbs lost can raise HDL by about 1 mg/dL",
      "Replace refined carbohydrates with healthy fats (nuts, olive oil, avocado)",
      "Moderate alcohol consumption (one drink per day) may raise HDL — but discuss with your doctor first",
    ],
    highLifestyle: [
      "Keep doing what you're doing — your lifestyle is clearly supporting your heart health",
    ],
    lowSpecialist: "Cardiologist (heart specialist) — they can evaluate your full lipid profile and overall heart disease risk",
    highSpecialist: null,
  },

  Triglycerides: {
    biomarker: "Triglycerides",
    lowExplanation:
      "Your triglycerides are below the usual range. Very low levels can occasionally point to an overactive thyroid, malnutrition, or a malabsorption issue. If you're eating well and feeling fine, it's likely nothing to worry about, but it's worth mentioning to your doctor.",
    highExplanation:
      "Your triglycerides are above the recommended level. Triglycerides are a type of fat in your blood, and elevated levels are quite common — often linked to dietary patterns (especially sugar and refined carbs), carrying extra weight, not enough physical activity, or sometimes genetics. The good news is that triglycerides are one of the most responsive blood markers to lifestyle changes. Many people see a significant drop within weeks of adjusting their diet and adding more movement to their routine.",
    lowFoods: [
      "Make sure you're eating enough calories overall — very low-calorie diets can cause this",
      "Include healthy fats in your diet (nuts, olive oil, avocado)",
    ],
    highFoods: [
      "Fatty fish 2-3 times per week (salmon, tuna, sardines) — omega-3s can lower triglycerides by 15-30%",
      "Reduce sugar and refined carbohydrates — sugar is the #1 dietary driver of high triglycerides",
      "Avoid or strictly limit alcohol — even moderate drinking raises triglycerides noticeably",
      "High-fiber foods (oats, beans, lentils, vegetables) — slow down fat absorption",
      "Swap saturated fats for unsaturated (olive oil instead of butter, nuts instead of chips)",
      "Walnuts and flaxseeds — plant-based omega-3 sources that complement fish intake",
    ],
    lowLifestyle: [
      "Ensure you're getting adequate nutrition — consider a dietary assessment if levels stay low",
      "Your doctor may want to check thyroid function",
    ],
    highLifestyle: [
      "Weight loss makes a big impact — losing 5-10% of body weight can drop triglycerides by 20%",
      "Regular exercise — even a single session can lower triglycerides for 24-72 hours afterward",
      "Cut out sugary beverages (soda, juice, sweetened coffee) — this alone can make a dramatic difference",
      "Limit alcohol — it has an outsized effect on triglycerides compared to other markers",
      "Retest in 2-3 months after changes — you'll likely see encouraging improvement",
    ],
    lowSpecialist: "Internal Medicine doctor — they can check for underlying causes if needed",
    highSpecialist: "Cardiologist (heart specialist) — especially important if levels are above 500 mg/dL (risk of pancreatitis) or if combined with other lipid abnormalities",
  },

  TSH: {
    biomarker: "TSH",
    lowExplanation:
      "Your TSH level is below the typical range. TSH is the signal your brain sends to tell your thyroid to work — when TSH is low, it usually means your thyroid is overproducing hormones (hyperthyroidism). This can happen due to Graves' disease (an autoimmune condition), thyroid nodules, inflammation of the thyroid, or sometimes taking too much thyroid medication. Common symptoms include feeling restless, unexplained weight loss, a rapid heartbeat, or feeling warmer than usual. Thyroid conditions are very manageable with proper treatment.",
    highExplanation:
      "Your TSH is above the typical range, which usually means your thyroid gland isn't producing quite enough hormones (hypothyroidism). This is one of the most common hormonal conditions — especially in women — and is very treatable. Common causes include Hashimoto's thyroiditis (an autoimmune condition), iodine deficiency, or certain medications. You might be experiencing fatigue, feeling colder than usual, unexplained weight changes, or low mood. With the right treatment, most people feel significantly better within a few weeks.",
    lowFoods: [
      "Cooked cruciferous vegetables (broccoli, cauliflower, Brussels sprouts) — goitrogens may mildly support thyroid regulation",
      "Calcium-rich foods (dairy, fortified plant milks) — important for bone health with overactive thyroid",
      "Selenium-rich foods (Brazil nuts, fish) — selenium supports thyroid hormone balance",
      "Limit caffeine — it can worsen symptoms like rapid heartbeat and anxiety",
      "Limit excess iodine (large amounts of seaweed, kelp supplements)",
    ],
    highFoods: [
      "Iodine-rich foods (fish, dairy, eggs, iodized salt) — iodine is the raw material for thyroid hormones",
      "Selenium-rich foods (just 2-3 Brazil nuts daily provides your full selenium needs) — helps convert T4 to active T3",
      "Zinc-rich foods (pumpkin seeds, oysters, beef, chickpeas) — supports thyroid hormone production",
      "Avoid consuming large amounts of raw cruciferous vegetables — cooking reduces their goitrogenic effect",
      "Avoid soy products in excess if you're on thyroid medication — soy can interfere with absorption",
    ],
    lowLifestyle: [
      "Stress management is especially important — stress can worsen hyperthyroid symptoms",
      "Avoid strenuous exercise until your condition is treated — your heart may be working harder than usual",
      "Regular thyroid monitoring with blood tests every few months",
      "Protect your bones — hyperthyroidism can affect bone density, so weight-bearing exercise helps",
    ],
    highLifestyle: [
      "Regular exercise helps combat the fatigue and weight changes associated with hypothyroidism",
      "Prioritize good sleep — thyroid issues can disrupt sleep quality",
      "If your doctor prescribes thyroid medication, take it first thing in the morning on an empty stomach, 30-60 minutes before food or coffee",
      "Be patient with treatment — it typically takes 4-8 weeks to feel the full effect of medication",
      "Regular follow-up blood tests help your doctor fine-tune your medication dose",
    ],
    lowSpecialist: "Endocrinologist (hormone specialist) — they specialize in thyroid conditions and can determine the exact cause and best treatment approach",
    highSpecialist: "Endocrinologist (hormone specialist) — they can run detailed thyroid panels, check for autoimmune causes, and optimize your treatment",
  },

  "Vitamin D": {
    biomarker: "Vitamin D",
    lowExplanation:
      "Your vitamin D level is below the recommended range, and you're in very good company — vitamin D deficiency affects an estimated 1 billion people worldwide. It's especially common if you spend most of your time indoors, live in a region with limited sunshine, have darker skin, or are older. Vitamin D plays important roles in bone strength, immune function, mood regulation, and energy levels. The great news is that it's one of the easiest deficiencies to correct with a combination of sunlight, food, and if needed, supplementation.",
    highExplanation:
      "Your vitamin D is above the typical range. This is almost always due to taking high-dose supplements rather than from food or sunlight (your body regulates vitamin D from sun exposure naturally). Very high levels can cause your calcium to rise too much, which can affect your kidneys and bones. The most important step is to stop any vitamin D supplements and let your doctor know.",
    lowFoods: [
      "Fatty fish (salmon, sardines, mackerel, trout) — one serving provides most of your daily vitamin D needs",
      "Egg yolks — an easy everyday source (the vitamin D is in the yolk, not the white)",
      "Fortified milk, orange juice, and plant milks — check labels for vitamin D",
      "Fortified cereals — a convenient breakfast boost",
      "Cod liver oil — one of the most concentrated natural sources",
      "Mushrooms exposed to sunlight or UV light — the only significant plant-based source",
    ],
    highFoods: [
      "Stop vitamin D supplements right away and inform your doctor",
      "Drink plenty of water to help your kidneys process excess vitamin D",
      "Temporarily reduce calcium-rich foods until levels normalize",
    ],
    lowLifestyle: [
      "Aim for 15-20 minutes of direct sunlight daily with arms and face exposed — morning sun is gentlest",
      "Your doctor may recommend vitamin D3 supplements (typically 1000-4000 IU/day depending on your level)",
      "People with darker skin may need more sun exposure to produce the same amount of vitamin D",
      "Retest after 3 months of supplementation to check your progress",
      "Vitamin D is fat-soluble — take supplements with a meal containing some fat for better absorption",
    ],
    highLifestyle: [
      "Stop all vitamin D supplements immediately and contact your doctor",
      "If you experience nausea, excessive thirst, or confusion, seek prompt medical attention",
      "This is almost always from over-supplementation — your body won't produce toxic levels from sunlight",
    ],
    lowSpecialist: "Your primary care doctor can usually manage this, or an Endocrinologist for severe deficiency — they can determine the right supplement dose and monitor your progress",
    highSpecialist: "Endocrinologist (hormone specialist) — they can check your calcium levels and guide you on safely bringing vitamin D back to normal",
  },

  "Vitamin B12": {
    biomarker: "Vitamin B12",
    lowExplanation:
      "Your vitamin B12 is below the recommended range. B12 is essential for healthy nerve function, red blood cell production, and DNA synthesis. Deficiency is especially common in vegetarians and vegans (since B12 comes primarily from animal products), older adults (who absorb it less efficiently), and people with certain digestive conditions. You might notice fatigue, tingling or numbness in hands and feet, difficulty concentrating, or mood changes. The good news is that once identified, B12 deficiency is very treatable with supplements or dietary changes.",
    highExplanation:
      "Your vitamin B12 is above the typical range. Excess B12 is generally excreted by your body and is usually not harmful. However, persistently very high levels without supplementation can occasionally point to liver conditions or blood disorders. Your doctor can help determine whether any follow-up is needed.",
    lowFoods: [
      "Shellfish, especially clams and mussels — among the richest B12 sources in nature",
      "Beef liver — extremely high in B12 (just one serving exceeds daily needs)",
      "Fish (trout, salmon, tuna, sardines) — reliable and delicious B12 sources",
      "Eggs and dairy products (milk, cheese, yogurt) — good sources for vegetarians",
      "Fortified nutritional yeast — the go-to B12 source for vegans (sprinkle on meals)",
      "Fortified plant milks and cereals — check labels to make sure B12 is included",
    ],
    highFoods: [
      "If you're taking B12 supplements, consider stopping them and retesting",
      "Typically no dietary changes needed — the cause is usually not food-related",
    ],
    lowLifestyle: [
      "If you follow a vegetarian or vegan diet, B12 supplementation is essential — diet alone won't provide enough",
      "Sublingual (under-the-tongue) B12 supplements are well-absorbed and convenient",
      "For severe deficiency, your doctor may recommend B12 injections for faster recovery",
      "Avoid excessive alcohol — it depletes B12 stores over time",
      "Older adults (65+) should discuss B12 monitoring with their doctor — absorption decreases with age",
      "Retest after 3 months to make sure levels are improving",
    ],
    highLifestyle: [
      "Stop any B12 supplements you're currently taking",
      "If you're not supplementing and levels are very high, your doctor may check liver function",
      "Usually no cause for concern — follow up with your doctor if persistently elevated",
    ],
    lowSpecialist: "Hematologist (blood specialist) — especially if you have neurological symptoms (tingling, numbness, balance issues) or if anemia is detected",
    highSpecialist: "Internal Medicine doctor — they can evaluate whether further investigation is warranted",
  },

  Creatinine: {
    biomarker: "Creatinine",
    lowExplanation:
      "Your creatinine is below the typical range. Creatinine is a waste product from normal muscle activity, so lower levels can simply reflect lower muscle mass — which is more common in women, older adults, and those with a smaller build. It can also be related to a very low-protein diet or certain liver conditions. In most cases, this isn't a concern, but your doctor can evaluate whether any follow-up is appropriate.",
    highExplanation:
      "Your creatinine is above the typical range. Since creatinine is filtered by your kidneys, elevated levels can suggest your kidneys are working a bit harder than usual. Common and often temporary causes include dehydration, a high-protein meal before the test, intense exercise, or certain medications (like NSAIDs). Sometimes it points to an underlying kidney condition that's worth monitoring. Please don't panic — a single elevated reading doesn't mean kidney disease. Your doctor will likely want to retest and possibly check additional kidney markers to get a clearer picture.",
    lowFoods: [
      "Ensure adequate protein intake — lean meats, eggs, dairy, beans, and tofu",
      "Balanced, nutritious meals to support overall muscle health",
    ],
    highFoods: [
      "Increase water intake — dehydration is one of the most common causes of elevated creatinine",
      "Temporarily reduce very high-protein meals (large portions of red meat, protein shakes)",
      "Include more fiber-rich foods (fruits, vegetables, whole grains) — fiber supports kidney health",
      "Avoid creatine supplements — they directly raise creatinine levels",
    ],
    lowLifestyle: [
      "Resistance training and strength exercises can help build muscle mass over time",
      "Ensure adequate overall caloric and nutritional intake",
    ],
    highLifestyle: [
      "Stay well-hydrated — aim for 8-10 glasses of water daily, more if active",
      "Avoid NSAIDs (ibuprofen, naproxen) — these can strain the kidneys",
      "If you do heavy weightlifting or take creatine supplements, let your doctor know — these raise creatinine",
      "Monitor blood pressure — high blood pressure is a leading cause of kidney stress",
      "Reduce excessive sodium intake to ease kidney workload",
      "Your doctor may order a follow-up test and check eGFR (a more detailed kidney function measure)",
    ],
    lowSpecialist: "Internal Medicine doctor — they can assess whether further evaluation is needed",
    highSpecialist: "Nephrologist (kidney specialist) — they can perform a thorough kidney function assessment and determine if there's an underlying issue",
  },

  ALT: {
    biomarker: "ALT",
    lowExplanation:
      "Your ALT is below the typical range, which is generally a good sign — it usually indicates healthy liver function. Very low levels can occasionally be associated with vitamin B6 deficiency, but this is uncommon. No specific action is usually needed.",
    highExplanation:
      "Your ALT is above the typical range, which indicates some degree of liver cell stress. Before you worry, know that this is one of the most common blood test findings and has many manageable causes. Non-alcoholic fatty liver disease (NAFLD) is the most frequent culprit, often related to carrying extra weight around the midsection. Other possible causes include alcohol consumption, certain medications (even common ones like acetaminophen/Tylenol), recent intense exercise, viral hepatitis, or herbal supplements. In most cases, ALT levels respond very well to lifestyle changes.",
    lowFoods: [
      "No specific dietary changes needed — low ALT is generally favorable",
    ],
    highFoods: [
      "Coffee (black, unsweetened) — multiple studies confirm it has liver-protective properties",
      "Leafy greens and cruciferous vegetables (broccoli, kale, Brussels sprouts) — support liver detox pathways",
      "Berries, grapes, and other antioxidant-rich fruits — protect liver cells from damage",
      "Garlic — contains compounds that support liver health",
      "Green tea — catechins have liver-protective effects",
      "Avoid or significantly reduce alcohol — the liver processes every drop",
      "Reduce fried foods, processed foods, and excess sugar — these contribute to liver fat buildup",
    ],
    lowLifestyle: [
      "No specific changes needed — continue your current healthy habits",
    ],
    highLifestyle: [
      "If you drink alcohol, reducing or eliminating it is the single most impactful step for your liver",
      "Weight management — losing even 5-10% of body weight can dramatically reduce liver fat and lower ALT",
      "Regular exercise — both cardio and strength training help reduce liver fat",
      "Review all your medications and supplements with your doctor — some may be contributing",
      "Avoid taking more than the recommended dose of acetaminophen (Tylenol)",
      "If not previously screened, ask your doctor about hepatitis B and C testing",
      "Retest in 4-8 weeks — ALT often improves quickly with lifestyle changes",
    ],
    lowSpecialist: null,
    highSpecialist: "Gastroenterologist or Hepatologist (liver specialist) — they can perform detailed liver evaluation including imaging if needed",
  },

  AST: {
    biomarker: "AST",
    lowExplanation:
      "Your AST is below the typical range, which is generally normal and not a concern. Low AST usually indicates healthy liver and muscle tissue.",
    highExplanation:
      "Your AST is somewhat above the typical range. AST is found in both the liver and muscles, so an elevated reading can come from either source. Common causes include fatty liver disease, alcohol consumption, certain medications, or even intense exercise in the days before your blood test. Your doctor will often look at AST together with ALT to get a clearer picture of where the elevation is coming from. A mild elevation is quite common and often improves with lifestyle adjustments.",
    lowFoods: [
      "No specific dietary changes needed",
    ],
    highFoods: [
      "Coffee — protective for liver health and may help lower liver enzymes",
      "Omega-3 rich foods (salmon, sardines, walnuts, flaxseeds) — reduce liver inflammation",
      "Berries, grapes, and colorful fruits — antioxidants support liver cell recovery",
      "Limit alcohol and processed foods to reduce liver workload",
    ],
    lowLifestyle: [
      "No specific changes needed",
    ],
    highLifestyle: [
      "Reduce or eliminate alcohol consumption",
      "If you did intense exercise before the test, let your doctor know — it can temporarily raise AST",
      "Review medications with your doctor — statins, NSAIDs, and some antibiotics can elevate AST",
      "Regular moderate exercise supports liver health (avoid overtraining close to blood tests)",
      "Weight management if needed — liver fat is the most common cause of mildly elevated liver enzymes",
    ],
    lowSpecialist: null,
    highSpecialist: "Gastroenterologist or Hepatologist (liver specialist) — especially if both AST and ALT are elevated or if the elevation persists",
  },

  Iron: {
    biomarker: "Iron",
    lowExplanation:
      "Your iron level is below the typical range. Iron deficiency is the most common nutritional deficiency in the world, so you're far from alone. It's especially common in women of reproductive age, vegetarians/vegans, endurance athletes, and people with digestive conditions. Your body uses iron to make hemoglobin (which carries oxygen in your blood), so low iron can leave you feeling tired, weak, short of breath, or having difficulty concentrating. The good news is that iron deficiency is very treatable once identified.",
    highExplanation:
      "Your iron level is above the typical range. This can sometimes happen after eating an iron-rich meal before the test, from taking iron supplements, or in some cases, from a genetic condition called hemochromatosis (which causes the body to absorb too much iron). Over time, excess iron can accumulate in organs, so it's worth investigating with your doctor. A simple follow-up test (ferritin, transferrin saturation) can give a clearer picture.",
    lowFoods: [
      "Red meat and organ meats (liver) — contain heme iron, which is absorbed 2-3x better than plant iron",
      "Spinach, kale, and Swiss chard — good plant-based iron sources",
      "Lentils, chickpeas, and kidney beans — iron plus protein in one food",
      "Fortified cereals — check labels for iron content",
      "Tofu and tempeh — reliable iron sources for plant-based diets",
      "Dark chocolate (70%+ cocoa) — a surprisingly good iron source and a treat",
      "Always pair plant iron with vitamin C foods (squeeze lemon on lentils, eat strawberries with spinach salad) — this can triple absorption",
    ],
    highFoods: [
      "Avoid iron supplements and iron-fortified foods unless your doctor says otherwise",
      "Reduce red meat intake temporarily",
      "Drink tea or coffee with meals — tannins naturally reduce iron absorption",
      "Include calcium-rich foods (dairy) with iron-rich meals — calcium competes with iron for absorption",
    ],
    lowLifestyle: [
      "Talk to your doctor about iron supplementation — dosage matters, and too much can cause stomach issues",
      "Avoid calcium supplements and dairy right around the time you take iron supplements — calcium blocks iron absorption",
      "Cook in cast-iron pans — it genuinely increases iron content of food",
      "Avoid drinking tea or coffee within an hour of iron-rich meals",
      "If you're vegetarian or vegan, pay extra attention to pairing iron foods with vitamin C",
    ],
    highLifestyle: [
      "Stop iron supplements if you're taking any, and inform your doctor",
      "Avoid vitamin C supplements with meals — vitamin C boosts iron absorption",
      "Avoid alcohol — it increases iron absorption and can compound liver damage",
      "Your doctor may suggest genetic testing for hemochromatosis (a simple blood test)",
      "Regular blood donation can actually help lower iron levels (with doctor's approval)",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can run comprehensive iron studies (ferritin, TIBC, transferrin saturation) to determine the exact cause and best treatment",
    highSpecialist: "Hematologist (blood specialist) or Gastroenterologist — they can investigate whether hemochromatosis or another condition is the cause",
  },

  Ferritin: {
    biomarker: "Ferritin",
    lowExplanation:
      "Your ferritin is below the typical range. Ferritin is your body's iron storage protein — think of it as your iron savings account. Low ferritin means your iron reserves are depleted, even if your current iron level looks okay. This is often an early warning sign of iron deficiency before anemia develops. Common causes include not enough iron in your diet, heavy menstrual periods, frequent blood donation, or digestive conditions that affect absorption. The good news is that building your iron stores back up is very achievable with the right approach.",
    highExplanation:
      "Your ferritin is above the typical range. Elevated ferritin can mean your body is storing too much iron, but it can also rise during inflammation, infection, or liver conditions — so the cause isn't always about iron itself. Your doctor can help sort out what's behind it with a few additional tests.",
    lowFoods: [
      "All the iron-rich foods (red meat, lentils, spinach, fortified cereals) — building ferritin means building iron stores",
      "Vitamin C-rich foods paired with iron sources — dramatically improves absorption",
      "Cooking in cast-iron pans — adds small but meaningful amounts of iron to food",
      "Avoid tea, coffee, and calcium supplements right around iron-rich meals",
    ],
    highFoods: [
      "Reduce iron-rich foods temporarily (red meat, organ meats, fortified cereals)",
      "Tea with meals may help reduce iron absorption",
      "Stay well-hydrated",
    ],
    lowLifestyle: [
      "Discuss iron supplementation with your doctor — low ferritin usually warrants a supplement",
      "Be patient — rebuilding iron stores typically takes 3-6 months of consistent supplementation",
      "Retest ferritin after 3 months to track progress",
      "If you have heavy periods, discuss this with your gynecologist — it's a very common cause",
    ],
    highLifestyle: [
      "Your doctor may order additional tests (CRP, transferrin saturation) to determine the cause",
      "If inflammation is the cause, treating the underlying condition will normalize ferritin",
      "Avoid alcohol — it can worsen iron overload and liver stress",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can determine the exact cause and create a supplementation plan",
    highSpecialist: "Hematologist or Internal Medicine doctor — they can distinguish between iron overload and inflammation-related elevation",
  },

  Potassium: {
    biomarker: "Potassium",
    lowExplanation:
      "Your potassium is below the typical range. Potassium is an essential mineral that helps your muscles contract, your nerves function, and your heart beat regularly. Low levels can happen from not eating enough potassium-rich foods, losing potassium through sweating, vomiting, or diarrhea, or as a side effect of certain medications (especially diuretics or water pills). You might notice muscle cramps, weakness, or fatigue. It's usually very correctable with dietary changes or supplements.",
    highExplanation:
      "Your potassium is above the typical range. While potassium is essential for heart and muscle function, levels that are too high can affect your heart rhythm. Common causes include kidney function changes, certain medications (ACE inhibitors, potassium-sparing diuretics, NSAIDs), potassium supplements, or sometimes even a sample handling issue during blood draw (cells can release potassium if the sample is squeezed or delayed). Your doctor will likely want to recheck this. If your level is only slightly elevated, it may resolve with simple adjustments.",
    lowFoods: [
      "Bananas — the classic potassium food, each one provides ~420 mg",
      "Sweet potatoes — one of the richest sources at ~540 mg per potato",
      "Spinach and Swiss chard — potassium-packed leafy greens",
      "Avocados — contain even more potassium than bananas",
      "Coconut water — nature's electrolyte drink",
      "White beans and lentils — excellent plant-based potassium sources",
      "Oranges and orange juice — refreshing potassium boost",
    ],
    highFoods: [
      "Temporarily reduce high-potassium foods (bananas, potatoes, tomatoes, oranges, avocados)",
      "Choose lower-potassium fruits (apples, berries, grapes, pears)",
      "White rice and regular pasta instead of whole grains (lower potassium)",
      "Avoid salt substitutes — many contain potassium chloride instead of sodium chloride",
      "Leaching technique: soak potatoes and root vegetables in water for 2+ hours before cooking to remove potassium",
    ],
    lowLifestyle: [
      "Stay hydrated, especially during hot weather or exercise",
      "If you take diuretics (water pills), discuss potassium monitoring with your doctor",
      "Watch for symptoms: muscle cramps, weakness, or heart palpitations — report these to your doctor",
    ],
    highLifestyle: [
      "If significantly elevated (above 6.0 mEq/L), contact your doctor promptly — this needs medical attention",
      "Review your medications with your doctor — several common drugs can raise potassium",
      "Stop potassium supplements if you're taking any, unless your doctor says otherwise",
      "Your doctor may want to check kidney function, since kidneys regulate potassium excretion",
      "A repeat blood test can confirm whether the elevation is real or was a sample issue",
    ],
    lowSpecialist: "Nephrologist (kidney specialist) or Internal Medicine doctor — they can identify the cause and ensure your heart rhythm is not affected",
    highSpecialist: "Nephrologist (kidney specialist) — especially important for persistent elevation or if combined with kidney function changes",
  },

  Sodium: {
    biomarker: "Sodium",
    lowExplanation:
      "Your sodium is below the typical range. Sodium helps regulate fluid balance in your body and supports nerve and muscle function. Low levels (hyponatremia) can happen from drinking too much water, certain medications (especially diuretics and some antidepressants), vomiting/diarrhea, or hormonal conditions. Mild cases may have no symptoms, while more significant drops can cause headache, nausea, confusion, or fatigue. Your doctor can identify the cause and it's usually straightforward to correct.",
    highExplanation:
      "Your sodium is above the typical range. This most commonly means mild dehydration — not drinking quite enough water, especially if you've been active, in hot weather, or unwell. It can also happen with certain medications or, less commonly, hormonal conditions. Increasing your fluid intake is usually the first step, and your doctor can determine if anything else needs attention.",
    lowFoods: [
      "Don't over-restrict salt if your level is low — moderate salt intake is appropriate",
      "Broth, soups, and electrolyte beverages can help gently restore sodium",
      "If caused by excess water intake, simply reducing fluid intake may be enough",
    ],
    highFoods: [
      "Increase water intake — this is the most important step",
      "Reduce processed and restaurant foods — they contain the majority of dietary sodium",
      "Fresh fruits and vegetables — naturally low in sodium and high in water content",
      "Potassium-rich foods (bananas, sweet potatoes) — potassium helps counterbalance sodium",
    ],
    lowLifestyle: [
      "If you drink large amounts of water, try moderating — overhydration can dilute sodium",
      "Review your medications with your doctor — certain diuretics and antidepressants (SSRIs) can lower sodium",
      "If symptoms are significant (confusion, severe nausea), seek medical attention promptly",
    ],
    highLifestyle: [
      "Drink more water throughout the day — aim for at least 8-10 glasses",
      "Read nutrition labels — aim for less than 2,300 mg of sodium per day",
      "Cook at home more often — this gives you control over salt content",
      "If you've been ill with fever, vomiting, or diarrhea, focus on rehydration with water and electrolytes",
    ],
    lowSpecialist: "Nephrologist (kidney specialist) or Internal Medicine doctor — they can determine the underlying cause and monitor correction",
    highSpecialist: "Nephrologist (kidney specialist) or Internal Medicine doctor — they can assess hydration status and rule out other causes",
  },

  Calcium: {
    biomarker: "Calcium",
    lowExplanation:
      "Your calcium is below the typical range. Calcium is essential for strong bones, proper muscle function, and nerve signaling. Low levels can be related to not getting enough calcium or vitamin D in your diet, parathyroid gland issues, kidney conditions, or certain medications. You might notice muscle cramps, tingling in your fingers, or fatigue. In most cases, this is very manageable once your doctor identifies the reason.",
    highExplanation:
      "Your calcium is above the typical range. This can be caused by an overactive parathyroid gland (the most common cause), excessive calcium or vitamin D supplementation, dehydration, or occasionally other conditions. You might notice increased thirst, frequent urination, constipation, or general fatigue — or you might not have any symptoms at all. Your doctor can run a simple additional test (PTH level) to determine the cause.",
    lowFoods: [
      "Dairy products (milk, yogurt, cheese) — the most bioavailable calcium sources",
      "Sardines with bones — surprisingly calcium-rich",
      "Fortified plant milks (almond, soy, oat) — check labels for calcium content",
      "Broccoli, kale, and bok choy — well-absorbed plant calcium sources (better than spinach for calcium)",
      "Tofu made with calcium sulfate — excellent plant-based option",
      "Almonds — a calcium-rich snack",
    ],
    highFoods: [
      "Reduce or stop calcium supplements and discuss with your doctor",
      "Drink plenty of water — helps your kidneys process excess calcium",
      "Temporarily reduce dairy intake if consuming large amounts",
      "Avoid excess vitamin D supplements — vitamin D increases calcium absorption",
    ],
    lowLifestyle: [
      "Make sure you're getting enough vitamin D — it's essential for calcium absorption",
      "Weight-bearing exercise (walking, jogging, dancing) helps build and maintain bone strength",
      "Split calcium intake throughout the day — your body absorbs smaller amounts better",
      "Avoid excessive caffeine — it slightly increases calcium excretion",
      "Your doctor may recommend calcium supplements (500-600 mg per dose, taken with food)",
    ],
    highLifestyle: [
      "Stop calcium and vitamin D supplements until you've spoken with your doctor",
      "Stay well-hydrated — this helps prevent kidney stone formation",
      "Your doctor will likely check your PTH (parathyroid hormone) level — this is the key test for identifying the cause",
      "Watch for and report symptoms: excessive thirst, frequent urination, constipation, or bone pain",
    ],
    lowSpecialist: "Endocrinologist (hormone specialist) — they can evaluate parathyroid function and vitamin D status to find the root cause",
    highSpecialist: "Endocrinologist (hormone specialist) — they can determine if the parathyroid glands are involved and guide treatment",
  },

  Platelets: {
    biomarker: "Platelets",
    lowExplanation:
      "Your platelet count is below the typical range. Platelets are the tiny cells that help your blood clot when you have a cut or injury. A lower count can happen for a variety of reasons — viral infections (even a recent cold), certain medications, autoimmune conditions where your body's immune system accidentally targets platelets, liver conditions, or sometimes bone marrow issues. Mild decreases are common and often temporary. Your doctor will want to understand the cause, and many cases resolve on their own or are easily managed.",
    highExplanation:
      "Your platelet count is above the typical range. This is called thrombocytosis, and in the majority of cases, it's 'reactive' — meaning it's a temporary response to something else going on, like a recent infection, inflammation, iron deficiency, or recovery from surgery. Less commonly, it can be related to a bone marrow condition. Your doctor can usually determine the cause with a few follow-up questions and possibly additional tests. Reactive thrombocytosis typically resolves once the underlying trigger is treated.",
    lowFoods: [
      "Folate-rich foods (spinach, asparagus, fortified cereals, lentils) — folate supports platelet production",
      "Vitamin B12 rich foods (meat, fish, eggs, dairy) — B12 is essential for blood cell formation",
      "Iron-rich foods (lean red meat, beans, fortified cereals) — iron supports overall blood cell health",
      "Vitamin C rich foods (citrus fruits, strawberries, bell peppers) — supports immune function and iron absorption",
      "Papaya and papaya leaf — some studies suggest they may help support platelet recovery",
      "Vitamin K rich foods (leafy greens, broccoli) — supports healthy blood clotting",
    ],
    highFoods: [
      "Omega-3 rich fish (salmon, sardines, mackerel) — have natural anti-inflammatory properties",
      "Garlic — contains compounds with mild natural blood-thinning effects",
      "Turmeric — curcumin has anti-inflammatory and mild anti-platelet properties",
      "Berries and colorful fruits — antioxidants help reduce inflammation",
      "Stay well-hydrated — helps maintain healthy blood flow",
    ],
    lowLifestyle: [
      "Avoid aspirin and NSAIDs (ibuprofen, naproxen) unless prescribed — they affect platelet function",
      "Be a bit more cautious with activities that risk injury or bruising while your count is low",
      "Avoid alcohol — it can suppress platelet production in the bone marrow",
      "Use a soft toothbrush and be gentle when blowing your nose — minor precautions that help",
      "If you notice unusual bruising, small red dots on your skin (petechiae), or prolonged bleeding from cuts, contact your doctor",
    ],
    highLifestyle: [
      "Stay well-hydrated — good blood flow reduces clotting risk",
      "Regular moderate exercise supports healthy circulation",
      "Your doctor will investigate whether it's reactive (temporary) or needs further evaluation",
      "If you smoke, this is another good reason to work toward quitting — smoking increases clotting risk",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can run detailed tests to determine why platelets are low and recommend the best treatment approach",
    highSpecialist: "Hematologist (blood specialist) — they can distinguish between reactive (temporary) and primary causes and guide appropriate monitoring",
  },

  // ─── Additional biomarkers with softer tone ───────────────────

  RBC: {
    biomarker: "RBC",
    lowExplanation:
      "Your red blood cell count is a bit lower than the typical range. Red blood cells carry oxygen throughout your body, so a lower count can contribute to feeling tired or short of breath. Common causes include iron deficiency, vitamin B12 or folate deficiency, chronic conditions, or blood loss. This often goes hand-in-hand with low hemoglobin and is usually very manageable once the underlying cause is identified.",
    highExplanation:
      "Your red blood cell count is above the typical range. This can happen due to dehydration, living at high altitude, chronic lung conditions, or smoking. Your body sometimes makes extra red blood cells to compensate when it's not getting enough oxygen. Your doctor can help determine the cause.",
    lowFoods: [
      "Iron-rich foods (red meat, lentils, spinach, fortified cereals)",
      "Vitamin B12 sources (meat, fish, eggs, dairy, or fortified foods for vegans)",
      "Folate-rich foods (leafy greens, beans, citrus fruits, fortified grains)",
      "Pair plant-based iron with vitamin C for better absorption",
    ],
    highFoods: [
      "Stay well-hydrated — dehydration concentrates red blood cells",
      "Balanced diet with plenty of fruits and vegetables",
    ],
    lowLifestyle: [
      "Have your doctor check iron, B12, and folate levels to pinpoint the cause",
      "Adequate rest supports blood cell production",
      "Moderate exercise as tolerated — listen to your body",
    ],
    highLifestyle: [
      "Drink plenty of water throughout the day",
      "If you smoke, consider quitting — smoking is a common cause",
      "Follow up with your doctor for additional evaluation",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can identify the specific cause and recommend targeted treatment",
    highSpecialist: "Hematologist (blood specialist) — they can evaluate whether further investigation is needed",
  },

  Hematocrit: {
    biomarker: "Hematocrit",
    lowExplanation:
      "Your hematocrit (the percentage of your blood made up of red blood cells) is below the typical range. This usually goes along with low hemoglobin and can indicate anemia. The most common causes are iron deficiency, vitamin deficiencies (B12, folate), chronic conditions, or blood loss. It means your blood is carrying less oxygen than ideal, which might explain fatigue or low energy.",
    highExplanation:
      "Your hematocrit is above the typical range. This is often related to dehydration (your blood is more concentrated), but can also be caused by smoking, lung disease, or living at high altitude. Staying hydrated and addressing the underlying cause usually helps.",
    lowFoods: [
      "Iron-rich foods with vitamin C for absorption",
      "B12 and folate-rich foods (meat, eggs, leafy greens, beans)",
      "Adequate overall nutrition with balanced meals",
    ],
    highFoods: [
      "Increase fluid intake — water, herbal teas, water-rich fruits",
      "Balanced diet with plenty of fruits and vegetables",
    ],
    lowLifestyle: [
      "Work with your doctor to identify and treat the underlying cause",
      "Rest when needed — your body is working with less oxygen",
      "Gradual increase in activity as levels improve",
    ],
    highLifestyle: [
      "Stay well-hydrated — this is the most important step",
      "If you smoke, quitting will help normalize your levels",
      "Regular follow-up blood tests to monitor the trend",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can run a complete anemia workup",
    highSpecialist: "Hematologist or Internal Medicine doctor — they can determine the cause and recommend appropriate monitoring",
  },

  MCV: {
    biomarker: "MCV",
    lowExplanation:
      "Your MCV (mean corpuscular volume) is below the typical range, meaning your red blood cells are smaller than usual. This is most commonly caused by iron deficiency, but can also be related to thalassemia (a genetic trait common in many populations) or chronic conditions. Smaller red blood cells carry less oxygen, which may contribute to fatigue. Your doctor can determine the cause with a few additional tests.",
    highExplanation:
      "Your MCV is above the typical range, meaning your red blood cells are larger than usual. This is most commonly caused by vitamin B12 or folate deficiency, and can also be related to alcohol consumption, certain medications, thyroid conditions, or liver disease. Your doctor can identify the cause with some simple follow-up tests.",
    lowFoods: [
      "Iron-rich foods (red meat, lentils, spinach, fortified cereals)",
      "Vitamin C with iron sources to boost absorption",
      "Well-balanced meals with adequate nutrition",
    ],
    highFoods: [
      "B12-rich foods (meat, fish, eggs, dairy, fortified foods)",
      "Folate-rich foods (leafy greens, beans, fortified grains)",
      "Reduce alcohol consumption if applicable",
    ],
    lowLifestyle: [
      "Ask your doctor to check your iron levels (ferritin, iron, TIBC)",
      "If iron deficiency is confirmed, supplementation usually helps within weeks",
    ],
    highLifestyle: [
      "Ask your doctor to check B12 and folate levels",
      "If you drink alcohol, reducing intake may help normalize MCV",
      "B12 or folate supplementation if deficiency is confirmed",
    ],
    lowSpecialist: "Hematologist (blood specialist) — they can distinguish between iron deficiency and thalassemia trait",
    highSpecialist: "Hematologist (blood specialist) — they can identify the specific cause of large red blood cells",
  },

  ESR: {
    biomarker: "ESR",
    lowExplanation:
      "Your ESR (erythrocyte sedimentation rate) is below the typical range. A low ESR is generally not concerning and usually indicates low levels of inflammation in your body, which is a good thing.",
    highExplanation:
      "Your ESR is above the typical range. ESR is a general marker of inflammation in your body — it tells you that something is causing inflammation, but doesn't specify what. Common causes include infections (even a recent cold), autoimmune conditions, tissue injury, or chronic conditions. Even aging naturally raises ESR slightly. It's a helpful screening tool, and your doctor may order more specific tests to pinpoint the cause.",
    lowFoods: [
      "No specific dietary changes needed — low ESR is favorable",
    ],
    highFoods: [
      "Anti-inflammatory foods: fatty fish (salmon, sardines), berries, leafy greens, turmeric, olive oil",
      "Limit processed foods, refined sugars, and fried foods — they promote inflammation",
      "Green tea — contains anti-inflammatory catechins",
    ],
    lowLifestyle: [
      "No specific changes needed — continue your healthy habits",
    ],
    highLifestyle: [
      "If you've been recently ill, give your body time to recover — ESR can stay elevated for weeks after an infection",
      "Regular exercise helps reduce chronic inflammation over time",
      "Stress management — chronic stress contributes to inflammation",
      "Your doctor may order additional tests (CRP, specific autoimmune markers) to understand the cause",
    ],
    lowSpecialist: null,
    highSpecialist: "Internal Medicine doctor or Rheumatologist — they can investigate the source of inflammation and recommend appropriate follow-up",
  },

  BUN: {
    biomarker: "BUN",
    lowExplanation:
      "Your BUN (blood urea nitrogen) is below the typical range. BUN reflects how well your kidneys are filtering waste. A low level can sometimes indicate a very low-protein diet, overhydration, or liver conditions, but it's often not clinically significant. Your doctor can assess whether any follow-up is needed.",
    highExplanation:
      "Your BUN is a bit above the typical range. BUN is a waste product that your kidneys filter out, so a mild elevation can simply mean you were slightly dehydrated before the test, ate a high-protein meal, or did intense exercise. It can also indicate that your kidneys are working harder than usual. A single mildly elevated reading is common and doesn't necessarily indicate kidney disease — your doctor will likely consider this alongside your creatinine and other markers to get the full picture.",
    lowFoods: [
      "Ensure adequate protein intake — lean meats, eggs, dairy, beans",
      "Balanced nutrition with sufficient calories",
    ],
    highFoods: [
      "Increase water intake — dehydration is the most common cause of mildly elevated BUN",
      "Moderate protein intake — avoid very high-protein meals or excessive protein supplements",
      "Include more fruits and vegetables — they're generally kidney-friendly",
    ],
    lowLifestyle: [
      "Make sure you're eating enough protein and overall calories",
      "Your doctor may check liver function if levels are persistently low",
    ],
    highLifestyle: [
      "Stay well-hydrated — drink water consistently throughout the day",
      "If you take NSAIDs regularly, discuss this with your doctor — they can affect kidney function",
      "Your doctor may want to recheck this along with creatinine and eGFR for a complete kidney picture",
    ],
    lowSpecialist: "Internal Medicine doctor — they can evaluate if further testing is needed",
    highSpecialist: "Nephrologist (kidney specialist) — especially if creatinine is also elevated, they can assess overall kidney health",
  },

  "Free T4": {
    biomarker: "Free T4",
    lowExplanation:
      "Your Free T4 is below the typical range. T4 (thyroxine) is one of the main hormones your thyroid produces. A low level, especially when combined with high TSH, suggests your thyroid isn't producing enough hormones (hypothyroidism). This is a very common and treatable condition. You might be experiencing fatigue, feeling cold, dry skin, or weight changes. With proper medication, most people feel significantly better within weeks.",
    highExplanation:
      "Your Free T4 is above the typical range, which suggests your thyroid may be overproducing hormones (hyperthyroidism). This can cause symptoms like a racing heartbeat, unexplained weight loss, anxiety, or heat sensitivity. Common causes include Graves' disease, thyroid nodules, or thyroiditis. Thyroid conditions are very manageable with proper treatment.",
    lowFoods: [
      "Iodine-rich foods (fish, dairy, eggs, iodized salt) — iodine is the building block for thyroid hormones",
      "Selenium-rich foods (Brazil nuts, fish, sunflower seeds) — supports thyroid hormone conversion",
      "Zinc-rich foods (pumpkin seeds, chickpeas, beef) — supports thyroid function",
    ],
    highFoods: [
      "Calcium-rich foods (dairy, fortified milks) — important for bone health with overactive thyroid",
      "Limit caffeine — can worsen heart palpitations and anxiety",
      "Anti-inflammatory foods to support overall health",
    ],
    lowLifestyle: [
      "Your doctor will likely prescribe thyroid hormone replacement medication — this is very effective",
      "Take medication on an empty stomach in the morning, 30-60 minutes before food",
      "Regular follow-up blood tests to fine-tune your medication dose",
      "Exercise helps combat fatigue — start gentle and build up",
    ],
    highLifestyle: [
      "Work with your endocrinologist on treatment — several effective options exist",
      "Protect your bones — overactive thyroid can affect bone density",
      "Manage stress and get adequate rest while being treated",
      "Avoid strenuous exercise until your levels are controlled — your heart is working harder",
    ],
    lowSpecialist: "Endocrinologist (hormone specialist) — they specialize in thyroid conditions and can optimize your treatment",
    highSpecialist: "Endocrinologist (hormone specialist) — they can determine the cause and choose the most appropriate treatment",
  },

  "Total Bilirubin": {
    biomarker: "Total Bilirubin",
    lowExplanation:
      "Your total bilirubin is below the typical range. Low bilirubin is generally not a concern and doesn't require any specific action.",
    highExplanation:
      "Your total bilirubin is a bit above the typical range. Bilirubin is a yellow pigment produced when your body breaks down red blood cells, and your liver processes it for removal. A mild elevation is very common and is often due to Gilbert's syndrome — a harmless genetic condition affecting about 5-10% of the population. Other possible causes include liver conditions, bile duct issues, or increased red blood cell breakdown. Your doctor can determine the cause with a simple follow-up.",
    lowFoods: [
      "No specific dietary changes needed",
    ],
    highFoods: [
      "Stay well-hydrated — helps your liver function efficiently",
      "High-fiber foods (fruits, vegetables, whole grains) — support liver and digestive health",
      "Limit alcohol — reduces liver workload",
    ],
    lowLifestyle: [
      "No specific changes needed",
    ],
    highLifestyle: [
      "If mildly elevated, it may simply be Gilbert's syndrome — harmless and needs no treatment",
      "Reduce or avoid alcohol to support liver health",
      "Get adequate rest — your liver does important work during sleep",
      "If you notice yellowing of eyes or skin (jaundice), contact your doctor",
    ],
    lowSpecialist: null,
    highSpecialist: "Gastroenterologist or Hepatologist (liver specialist) — they can determine the cause if the elevation is significant or persistent",
  },

  VLDL: {
    biomarker: "VLDL",
    lowExplanation:
      "Your VLDL is below the typical range. Low VLDL is generally considered favorable and is not a concern.",
    highExplanation:
      "Your VLDL is above the typical range. VLDL carries triglycerides in your blood, so elevated VLDL usually mirrors high triglycerides. The same dietary and lifestyle strategies that lower triglycerides will also improve your VLDL level.",
    lowFoods: [
      "No specific dietary changes needed — low VLDL is favorable",
    ],
    highFoods: [
      "Omega-3 rich fish (salmon, sardines, mackerel)",
      "Reduce refined sugars and carbohydrates — the biggest dietary driver",
      "High-fiber foods (beans, oats, vegetables)",
      "Limit alcohol consumption",
    ],
    lowLifestyle: [
      "No specific changes needed",
    ],
    highLifestyle: [
      "Regular exercise — very effective at lowering VLDL and triglycerides",
      "Weight management if applicable",
      "Reduce sugary beverages and processed foods",
    ],
    lowSpecialist: null,
    highSpecialist: "Cardiologist (heart specialist) — especially if combined with other lipid abnormalities",
  },
};

// ─── Lookup helper ─────────────────────────────────────────

export function getRecommendation(biomarkerName: string): RecommendationEntry | null {
  return KNOWLEDGE_BASE[biomarkerName] ?? null;
}
