import 'dotenv/config'

import fs from 'node:fs/promises'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents:
      'Create an image using the following prompt: comic book panel, shot of a dark citadel spiraling tower with an unnatural reddish stormy sky in the background, ominous tones, wide angle, Travis Charest, Phil Noto, Gary Millidge, high contrast --ar 16:9',
    config: {
      responseModalities: ['text', 'image']
    }
  })

  console.log(JSON.stringify(res, null, 2))

  const image = res.candidates![0]!.content!.parts!.find((p) => p.inlineData)!
    .inlineData!.data!
  await fs.writeFile(
    'media/multimodal-image-gen-3.png',
    Buffer.from(image, 'base64')
  )
}

await main()
