import 'dotenv/config'

import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  const cache = await genai.caches.create({
    model: 'gemini-2.0-flash',
    config: {
      // temperature: 1.2,
      contents: 'write a short poem about a cat who loves google',
      displayName: 'test cache',
      ttl: '86400s'
    }
  })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'write a short poem about a cat who loves google',
    config: {
      cachedContent: cache.name
    }
  })

  console.log(JSON.stringify(res, null, 2))
}

await main()
