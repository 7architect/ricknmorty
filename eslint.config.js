import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    overrides: {
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
})
