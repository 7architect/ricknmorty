import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://rickandmortyapi.com/graphql',
  documents: [
    'src/**/*.ts',
    'src/**/*.vue',
    'src/shared/generated/gql-generated/**/*',
  ],
  ignoreNoDocuments: true, // for better experience
  generates: {
    './src/shared/generated/gql-generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        avoidOptionals: true,
        preResolveTypes: true,
        dedupeFragments: true,
        experimentalFragmentVariables: true,
        exportFragmentSpreadSubTypes: true,
        extractAllFieldsToTypes: true,
        skipTypename: true,
      },
      plugins: [
        'typescript',
        'typescript-operations',
      ],
    },
  },
}

export default config
