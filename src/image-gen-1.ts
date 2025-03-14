import 'dotenv/config'

import fs from 'node:fs/promises'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: 'cyberpunk anime cat',
    config: {
      aspectRatio: '16:9'
    }
  })

  console.log(JSON.stringify(res, null, 2))

  const image = res.generatedImages![0]?.image!.imageBytes!
  await fs.writeFile('media/image-gen-1.png', Buffer.from(image, 'base64'))
}

await main()
