import 'dotenv/config'

import { WeatherClient } from '@agentic/stdlib'
import { GoogleGenAI } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  const weather = new WeatherClient()
  const weatherTools = Array.from(weather.functions).map((f) => f.spec)
  console.log(JSON.stringify(weatherTools, null, 2))

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: 'what is the weather in bangkok?',
    config: {
      tools: [
        {
          functionDeclarations: weatherTools
        }
      ]
    }
  })

  console.log(JSON.stringify(res, null, 2))
}

await main()
