import 'dotenv/config'

import { type ContentListUnion, GoogleGenAI, Type } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const tools = [
    {
      functionDeclarations: [
        {
          name: 'get_weather',
          parameters: {
            type: Type.OBJECT,
            properties: {
              location: { type: Type.STRING }
            },
            required: ['location']
          }
        }
      ]
    }
  ]

  const contents: ContentListUnion = ['what is the weather in bangkok?']

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents,
    config: {
      tools
    }
  })

  console.log(JSON.stringify(res, null, 2))

  contents.push(...res.candidates!.flatMap((c) => c.content!.parts!))
  contents.push({
    functionResponse: {
      id: res.candidates![0]!.content!.parts![0]!.functionCall!.id!,
      name: 'get_weather',
      response: {
        output: {
          weather: 'sunny',
          temperatureF: 85
        }
      }
    }
  })

  const res2 = await genai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents,
    config: {
      tools
    }
  })

  console.log(JSON.stringify(res2, null, 2))
}

await main()
