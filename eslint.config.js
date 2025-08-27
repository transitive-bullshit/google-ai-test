import { config } from '@fisch0920/config/eslint'

export default [
  ...config,
  {
    rules: {
      'no-process-env': 'off'
    }
  }
]
