import { graphql } from '@/shared/generated/gql-generated'

export const OmniChanelSearch_FeatureCharacterFragment = graphql(`
    fragment OmniChanelSearch_FeatureCharacterFragment on Character {
        id
        image
        name
        status
    }
`)

export const OmniChanelSearch_FeatureLocationFragment = graphql(`
    fragment OmniChanelSearch_FeatureLocationFragment on Location {
        id
        name
        residents {
            ...OmniChanelSearch_FeatureCharacterFragment
        }
    }
`)

export const OmniChanelSearch_FeatureQueryFrag = graphql(`
    fragment OmniChanelSearch_FeatureQueryFrag on Query {
        byName: characters(filter: {
            name: $name,
        }, page: $page) {
            info {
                pages
            }
            results {
                ...OmniChanelSearch_FeatureCharacterFragment
            }
        }
        
        byLocation: locations(filter: {
            name: $name, 
        }) {
            info {
                pages
            }
            results {
                ...OmniChanelSearch_FeatureLocationFragment
            }
        }
    }
`)
