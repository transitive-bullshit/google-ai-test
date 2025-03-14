<p align="center">
  <a href="https://github.com/googleapis/js-genai">
    <img alt="Google TS GenAI SDK" src="/media/image-gen-0.png" width="308">
  </a>
</p>

# Google Gen AI Test <!-- omit from toc -->

> Testing [Google's TS GenAI SDK](https://github.com/googleapis/js-genai).

<p>
  <a href="https://github.com/transitive-bullshit/google-ai-test/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/google-ai-test/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://github.com/transitive-bullshit/google-ai-test/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

# Intro

Testing https://github.com/googleapis/js-genai for feedback: https://github.com/googleapis/js-genai/issues/293

## Prerequisites

- Node.js >= 18 or equivalent env
- Set up env vars in `.env` (`GEMINI_API_KEY`)
- `npm i -g pnpm`
- `npm i -g tsx`

## Running tests

```sh
pnpm install
tsx src/text-gen-0.ts
```

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)
