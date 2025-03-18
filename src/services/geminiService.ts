
/**
 * Service for interacting with the Google Gemini API
 */

interface GeminiRequestOptions {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
  topK?: number;
  topP?: number;
}

interface GeminiResponse {
  text: string;
  success: boolean;
  error?: string;
}

// Pre-configured API key
const GEMINI_API_KEY = "AIzaSyAp3zEskf6J18xNvs6qCD3Xq59ISt5tRIQ";

export const generateGeminiResponse = async ({
  prompt,
  temperature = 0.7,
  maxTokens = 1024,
  topK = 40,
  topP = 0.95,
}: GeminiRequestOptions): Promise<GeminiResponse> => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature,
          topK,
          topP,
          maxOutputTokens: maxTokens,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini API');
    }

    const data = await response.json();
    
    // Extract and return the generated text
    return {
      text: data.candidates[0].content.parts[0].text,
      success: true
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
