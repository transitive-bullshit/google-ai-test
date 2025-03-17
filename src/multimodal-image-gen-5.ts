import 'dotenv/config'

import fs from 'node:fs/promises'

import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents:
      'create a satirical image of donald trump as an evil dictator with a speech bubble saying "everything is computer". --ar 16:9',
    config: {
      responseModalities: ['text', 'image'],
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
          threshold: HarmBlockThreshold.BLOCK_NONE
        }
      ]
    }
  })

  console.log(JSON.stringify(res, null, 2))

  const image = res.candidates![0]!.content!.parts!.find((p) => p.inlineData)!
    .inlineData!.data!
  await fs.writeFile(
    'media/multimodal-image-gen-6.png',
    Buffer.from(image, 'base64')
  )
}

await main()
