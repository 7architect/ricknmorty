import type { FragmentType } from '@/shared/generated/gql-generated'
import { useFragment } from '@/shared/generated/gql-generated'
import {
  OmniChanelSearch_FeatureCharacterFragment,
  OmniChanelSearch_FeatureLocationFragment,
  OmniChanelSearch_FeatureQueryFrag,
} from './omniChanelSearch.fragment.ts'

export type SearchResults = Array<{
  id: string | null
  title: string | null
  subtitle: string | null
  image: string | null
  uptitle?: string | null
}>

function aggregateFromLocations(results: Array<FragmentType<typeof OmniChanelSearch_FeatureLocationFragment> | null>): SearchResults {
  const validResults = results.filter(item => item !== null && item !== undefined)

  const frag = useFragment(OmniChanelSearch_FeatureLocationFragment, validResults)

  return frag.reduce<SearchResults>((acc, item) => {
    item.residents?.forEach((resident) => {
      const residentFrag = useFragment(OmniChanelSearch_FeatureCharacterFragment, resident)

      if (!residentFrag)
        return acc

      acc.push({
        id: residentFrag.id,
        title: residentFrag.name,
        subtitle: residentFrag.status,
        image: residentFrag.image,
        uptitle: item.name,
      })
    })
    return acc
  }, [])
}
function mapFromCharacters(results: Array<FragmentType<typeof OmniChanelSearch_FeatureCharacterFragment> | null>): SearchResults {
  const validResults = results.filter(item => item !== null && item !== undefined)
  return useFragment(OmniChanelSearch_FeatureCharacterFragment, validResults).map((item) => {
    return {
      id: item.id,
      title: item.name,
      subtitle: item.status,
      image: item.image,
    }
  })
}

export function mapResults(results: FragmentType<typeof OmniChanelSearch_FeatureQueryFrag>): SearchResults {
  const frag = useFragment(OmniChanelSearch_FeatureQueryFrag, results)
  mapFromCharacters(frag?.byName?.results || [])
  return [
    ...aggregateFromLocations(frag?.byLocation?.results || []),
    ...mapFromCharacters(frag?.byName?.results || []),
  ]
}
