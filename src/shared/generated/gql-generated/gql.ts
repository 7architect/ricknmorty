/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    fragment CharacterCardPreviewFragment on Character {\n        id\n        image\n        name\n        status\n    }\n": types.CharacterCardPreviewFragmentFragmentDoc,
    "\n    fragment OmniChanelSearch_FeatureCharacterFragment on Character {\n        id\n        image\n        name\n        status\n    }\n": types.OmniChanelSearch_FeatureCharacterFragmentFragmentDoc,
    "\n    fragment OmniChanelSearch_FeatureLocationFragment on Location {\n        id\n        name\n        residents {\n            ...OmniChanelSearch_FeatureCharacterFragment\n        }\n    }\n": types.OmniChanelSearch_FeatureLocationFragmentFragmentDoc,
    "\n    fragment OmniChanelSearch_FeatureQueryFrag on Query {\n        byName: characters(filter: {\n            name: $name,\n        }, page: $page) {\n            info {\n                pages\n            }\n            results {\n                ...OmniChanelSearch_FeatureCharacterFragment\n            }\n        }\n        \n        byLocation: locations(filter: {\n            name: $name, \n        }) {\n            info {\n                pages\n            }\n            results {\n                ...OmniChanelSearch_FeatureLocationFragment\n            }\n        }\n    }\n": types.OmniChanelSearch_FeatureQueryFragFragmentDoc,
    "\n    query SearchBox($page: Int!, $name: String!) {\n        ...OmniChanelSearch_FeatureQueryFrag\n    }\n": types.SearchBoxDocument,
    "\n    query GetMainView($page: Int!) {\n        characters(page: $page) {\n          info {\n            pages\n          }\n            ...CharacterListWidget_Fragment\n        }\n    }\n": types.GetMainViewDocument,
    "\n    fragment CharacterListWidget_Fragment on Characters {\n        results {\n            ...CharacterCardPreviewFragment\n        }\n    }\n": types.CharacterListWidget_FragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CharacterCardPreviewFragment on Character {\n        id\n        image\n        name\n        status\n    }\n"): (typeof documents)["\n    fragment CharacterCardPreviewFragment on Character {\n        id\n        image\n        name\n        status\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment OmniChanelSearch_FeatureCharacterFragment on Character {\n        id\n        image\n        name\n        status\n    }\n"): (typeof documents)["\n    fragment OmniChanelSearch_FeatureCharacterFragment on Character {\n        id\n        image\n        name\n        status\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment OmniChanelSearch_FeatureLocationFragment on Location {\n        id\n        name\n        residents {\n            ...OmniChanelSearch_FeatureCharacterFragment\n        }\n    }\n"): (typeof documents)["\n    fragment OmniChanelSearch_FeatureLocationFragment on Location {\n        id\n        name\n        residents {\n            ...OmniChanelSearch_FeatureCharacterFragment\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment OmniChanelSearch_FeatureQueryFrag on Query {\n        byName: characters(filter: {\n            name: $name,\n        }, page: $page) {\n            info {\n                pages\n            }\n            results {\n                ...OmniChanelSearch_FeatureCharacterFragment\n            }\n        }\n        \n        byLocation: locations(filter: {\n            name: $name, \n        }) {\n            info {\n                pages\n            }\n            results {\n                ...OmniChanelSearch_FeatureLocationFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment OmniChanelSearch_FeatureQueryFrag on Query {\n        byName: characters(filter: {\n            name: $name,\n        }, page: $page) {\n            info {\n                pages\n            }\n            results {\n                ...OmniChanelSearch_FeatureCharacterFragment\n            }\n        }\n        \n        byLocation: locations(filter: {\n            name: $name, \n        }) {\n            info {\n                pages\n            }\n            results {\n                ...OmniChanelSearch_FeatureLocationFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SearchBox($page: Int!, $name: String!) {\n        ...OmniChanelSearch_FeatureQueryFrag\n    }\n"): (typeof documents)["\n    query SearchBox($page: Int!, $name: String!) {\n        ...OmniChanelSearch_FeatureQueryFrag\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetMainView($page: Int!) {\n        characters(page: $page) {\n          info {\n            pages\n          }\n            ...CharacterListWidget_Fragment\n        }\n    }\n"): (typeof documents)["\n    query GetMainView($page: Int!) {\n        characters(page: $page) {\n          info {\n            pages\n          }\n            ...CharacterListWidget_Fragment\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CharacterListWidget_Fragment on Characters {\n        results {\n            ...CharacterCardPreviewFragment\n        }\n    }\n"): (typeof documents)["\n    fragment CharacterListWidget_Fragment on Characters {\n        results {\n            ...CharacterCardPreviewFragment\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;