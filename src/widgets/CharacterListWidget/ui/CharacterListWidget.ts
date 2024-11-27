import type { FragmentType } from '@/shared/generated/gql-generated'
import { graphql } from '@/shared/generated/gql-generated'

export const CharacterListWidget_Fragment = graphql(`
    fragment CharacterListWidget_Fragment on Characters {
        results {
            ...CharacterCardPreviewFragment
        }
    }
`)

export interface CharacterListProps {
  characters: FragmentType<typeof CharacterListWidget_Fragment>
}
