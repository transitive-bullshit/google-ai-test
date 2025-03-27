import 'dotenv/config'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    // model: 'gemini-2.5-pro-exp-03-25', // doesn't seem to work in the api yet
    contents: [
      'Analyze this podcast episode and describe step-by-step a summary of the different conversation topics. Then give me a summary of the most salient and unique takeaways from this podcast. Do not include timestamps or names of speakers. Use markdown for the output formatting.',
      {
        fileData: {
          fileUri:
            'https://www.youtube.com/watch?v=jIBo69EsAzw&t=9863s&ab_channel=TimFerriss'
        }
      }
    ],
    config: {
      responseModalities: ['text']
    }
  })

  console.log(JSON.stringify(res, null, 2))
  console.log()
  console.log(res.candidates![0]!.content!.parts![0]!.text)
}

await main()
