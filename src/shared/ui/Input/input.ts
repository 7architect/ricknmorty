export interface InputProps {
  placeholder?: string
  modelValue?: string
  type?: 'string' | 'search'
}

export interface InputEmits {
  (e: 'update:modelValue', payload: string): void
}
