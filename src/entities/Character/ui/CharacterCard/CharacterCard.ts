import type { FragmentType } from '@/shared/generated/gql-generated'
import { graphql } from '@/shared/generated/gql-generated'

export const CharacterCardPreviewFragment = graphql(`
    fragment CharacterCardPreviewFragment on Character {
        id
        image
        name
        status
    }
`)

export interface CharacterCardProps {
  character: FragmentType<typeof CharacterCardPreviewFragment> | null
}
