import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      planet, 
      residents, 
      size, 
      shape, 
      purpose, 
      lifestyle, 
      systems, 
      notes 
    } = await req.json();

    console.log("Received habitat design request:", { planet, residents, size, shape });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert space habitat designer and engineer. Based on the user's requirements, provide detailed, realistic recommendations for their space habitat.

Consider:
- Environmental factors of the chosen planet/location
- Life support requirements based on number of residents
- Optimal layout for the chosen purpose
- Space efficiency and safety protocols
- Critical systems placement and redundancy
- Psychological well-being of residents

Provide your response in JSON format with the following structure:
{
  "volumeRequired": "calculated volume in cubic meters",
  "recommendedModules": ["list of module types needed"],
  "layout": {
    "description": "detailed layout description",
    "zones": ["list of recommended zones/areas"]
  },
  "criticalSystems": ["list of critical systems with brief descriptions"],
  "missingSystems": ["any critical systems not mentioned by user"],
  "specialConsiderations": ["planet-specific or situation-specific notes"],
  "costEstimate": "rough cost estimate",
  "constructionTime": "estimated construction timeline"
}`;

    const userPrompt = `Design a space habitat with these specifications:
- Location: ${planet}
- Number of Residents: ${residents}
- Size Preference: ${size}
- Shape: ${shape}
- Primary Purpose: ${purpose}
- Lifestyle: ${lifestyle}
- Requested Systems: ${systems.join(", ")}
${notes ? `- Additional Notes: ${notes}` : ""}

Please provide comprehensive design recommendations.`;

    console.log("Calling Lovable AI...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received AI response");

    const aiContent = data.choices[0].message.content;
    
    // Try to parse JSON from the response
    let designData;
    try {
      // Extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = aiContent.match(/```json\n([\s\S]*?)\n```/) || 
                       aiContent.match(/```\n([\s\S]*?)\n```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiContent;
      designData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // If parsing fails, return the raw content
      designData = {
        rawResponse: aiContent,
        volumeRequired: "Unable to calculate",
        recommendedModules: [],
        layout: { description: aiContent, zones: [] },
        criticalSystems: [],
        missingSystems: [],
        specialConsiderations: [],
        costEstimate: "N/A",
        constructionTime: "N/A"
      };
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        design: designData,
        inputParameters: { planet, residents, size, shape, purpose, lifestyle }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in habitat-designer function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
