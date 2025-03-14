import 'dotenv/config'

import { GoogleGenAI, Type } from '@google/genai'

async function main() {
  const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const res = await genai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents:
      'Bob Vance is 30 years old, lives in Scranton PA, and works at Dunder Mifflin.',
    config: {
      systemInstruction: `you are a data analyst. extract the following data about a user from the given text:

\`\`\`ts
interface User {
  name: string
  location?: string
  age?: number
}
\`\`\`
`,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: 'Name of the person',
            nullable: false
          },
          location: {
            type: Type.STRING,
            description: 'Location of the person',
            nullable: true
          },
          age: {
            type: Type.NUMBER,
            description: 'Age of the person',
            nullable: true
          }
        },
        required: ['name']
      }
    }
  })

  console.log(JSON.stringify(res, null, 2))

  const parsedOutput = JSON.parse(res.candidates![0]!.content!.parts![0]!.text!)
  console.log(JSON.stringify(parsedOutput, null, 2))
}

await main()
