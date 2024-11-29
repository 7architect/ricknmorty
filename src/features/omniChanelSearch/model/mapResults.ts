import type { FragmentType } from '@/shared/generated/gql-generated'
import { useFragment } from '@/shared/generated/gql-generated'
import {
  OmniChanelSearch_FeatureCharacterFragment,
  OmniChanelSearch_FeatureLocationFragment,
  OmniChanelSearch_FeatureQueryFrag,
} from './omniChanelSearch.fragment.ts'

export interface SearchItem {
  id: string | null
  title: string | null
  subtitle: string | null
  image: string | null
  uptitle?: string | null
}

export type SearchResults = Array<SearchItem>

export function mapResults(results: FragmentType<typeof OmniChanelSearch_FeatureQueryFrag>): SearchResults {
  const frag = useFragment(OmniChanelSearch_FeatureQueryFrag, results)
  const byName = useFragment(
    OmniChanelSearch_FeatureCharacterFragment,
    // TODO:Mid: The generated types include excessive nullables, leading to complex type guards.
    // TODO:Mid: Evaluate improving GraphQL codegen configurations to:
    // 1. Generate stricter types with non-null assertions where applicable.
    // 2. Simplify type guards for deeply nested fragments (e.g., `byName?.results`).
    // TODO:Low: Consider writing custom runtime utilities for type-safe fragment handling if codegen adjustments are not sufficient.
    (frag?.byName?.results || []).filter(item => item !== null && item !== undefined),
  )
  const byLocation = useFragment(
    OmniChanelSearch_FeatureLocationFragment,
    // TODO:Mid: fix type generation or this guard
    (frag?.byLocation?.results || []).filter(item => item !== null && item !== undefined),
  )

  const characterCollection = new Map<string, SearchItem>()

  // Priority search items by location that's why aggregates this collection first
  byLocation
    .forEach((item) => {
      item.residents?.forEach((resident) => {
        const residentFrag = useFragment(OmniChanelSearch_FeatureCharacterFragment, resident)

        if (!residentFrag?.id || characterCollection.has(residentFrag.id))
          return

        characterCollection.set(residentFrag.id, {
          id: residentFrag.id,
          title: residentFrag.name,
          subtitle: residentFrag.status,
          image: residentFrag.image,
          uptitle: item.name,
        })
      })
    })

  // TODO:Mid: fix type generation or this guard
  byName
    .forEach((item) => {
    // TODO:Mid: remaster for most elegant guard
      if (!item?.id || characterCollection.has(item.id))
        return

      characterCollection.set(item.id, {
        id: item.id,
        title: item.name,
        subtitle: item.status,
        image: item.image,
      })
    })

  return [
    ...characterCollection.values(),
  ]
}
