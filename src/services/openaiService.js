/**
 * OpenAI API Service
 * Handles interactions with OpenAI's image generation and structured output APIs
 */

import { OPENAI_API_KEY } from '@env';

/**
 * Generate a meme image using OpenAI's gpt-image-1 model
 * 
 * @param {string} prompt - The text prompt describing the meme to generate
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<string>} - Base64 encoded image data
 */
export const generateMemeImage = async (prompt, options = {}) => {
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1", // Using the specified model
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt }
          ]
        }],
        tools: [{ type: "image_generation" }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate image');
    }

    const data = await response.json();
    
    // Extract the image data from the response
    const imageData = data.output
      .filter((output) => output.type === "image_generation_call")
      .map((output) => output.result);

    if (imageData.length === 0) {
      throw new Error('No image was generated');
    }

    return imageData[0]; // Return the base64 encoded image
  } catch (error) {
    console.error('Error generating meme image:', error);
    throw error;
  }
};

/**
 * Get meme suggestions using OpenAI's structured output
 * 
 * @param {string} theme - Theme or topic for meme suggestions
 * @returns {Promise<Array>} - Array of meme suggestions
 */
export const getMemeIdeas = async (theme) => {
  try {
    const schema = {
      type: "object",
      properties: {
        memes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              suggestedPrompt: { type: "string" },
              targetAudience: { type: "string" }
            },
            required: ["title", "description", "suggestedPrompt"]
          }
        }
      },
      required: ["memes"]
    };

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-2024-08-06", // Using a model compatible with structured output
        input: [{
          role: "system",
          content: "You are a creative meme generator assistant. Generate meme ideas based on the provided theme."
        }, {
          role: "user",
          content: `I need meme ideas about: ${theme}. Provide creative, humorous suggestions.`
        }],
        text: {
          format: {
            type: "json_schema",
            name: "meme_ideas",
            schema: schema,
            strict: true
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get meme suggestions');
    }

    const data = await response.json();
    return data.memes;
  } catch (error) {
    console.error('Error getting meme suggestions:', error);
    throw error;
  }
};
