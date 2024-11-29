export interface FoundItemProps {
  image: string | null
  title: string | null
  subtitle: string | null
  uptitle?: string | null
}

export interface FoundItemEmits {
  (event: 'clickUptitle', payload: string): void
  (event: 'click'): void
}
