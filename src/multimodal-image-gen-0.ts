import 'dotenv/config'

import fs from 'node:fs/promises'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: 'Create an image of an anime cat',
    config: {
      responseModalities: ['text', 'image']
    }
  })

  console.log(JSON.stringify(res, null, 2))

  const image = res.candidates![0]!.content!.parts!.find((p) => p.inlineData)!
    .inlineData!.data!
  await fs.writeFile(
    'media/multimodal-image-gen-0.png',
    Buffer.from(image, 'base64')
  )
}

await main()
