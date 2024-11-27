<script setup lang="ts">
import type {
  SearchBoxQueryVariables,
} from '@/shared/generated/gql-generated/graphql.ts'
import { graphql, useFragment } from '@/shared/generated/gql-generated'
import * as UI from '@/shared/ui'
import { useLazyQuery } from '@vue/apollo-composable'
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import {
  mapResults,
  OmniChanelSearch_FeatureQueryFrag,
} from '../model'
import { FoundedItem } from './_FoundItem'

const focused = ref(false)
function openSearchBox() {
  focused.value = true
}
function closeSearchBox() {
  focused.value = false
}

const containerRef = ref<HTMLDivElement | null>(null)
onClickOutside(containerRef, closeSearchBox)

const SearchBoxDocument = graphql(`
    query SearchBox($page: Int!, $name: String!) {
        ...OmniChanelSearch_FeatureQueryFrag
    }
`)

const searchVariables = reactive<SearchBoxQueryVariables>({
  name: '',
  page: 1,
})

function nextPage() {
  searchVariables.page += 1
}
function prevPage() {
  searchVariables.page -= 1
}
function firstPage() {
  searchVariables.page = 1
}

const { result, load, loading, fetchMore } = useLazyQuery(SearchBoxDocument)
const searchResults = computed(() => {
  const sections = useFragment(OmniChanelSearch_FeatureQueryFrag, result.value)
  // TODO:Critical: Resolve fragment type
  return mapResults(sections)
})

function search() {
  load(SearchBoxDocument, { ...searchVariables, page: 1 })
}

const debouncedSearch = useDebounceFn(search, 500)
</script>

<template>
  <div
    ref="containerRef"
    class="search-box"
  >
    <UI.Input
      v-model="searchVariables.name"
      class="search-box__input"
      placeholder="Search chapter, episode by name"
      @focus="openSearchBox"
      @input="debouncedSearch"
    />
    <div
      v-if="focused"
      class="search-box__results-container"
    >
      <FoundedItem
        v-for="(item, index) of searchResults"
        :key="index"
        :title="item?.title"
        :subtitle="item?.subtitle"
        :uptitle="item?.uptitle"
        :image="item?.image"
        class="search-box__item"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-box {
  --search-box__bg-color: rgba(255, 255, 255, .1);

  position: relative;

  &__input {
    position: relative;
    z-index: 9;
  }

  &__results-container {
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    width: calc(100% + 1rem);
    padding: 4rem 3rem 3rem 3rem;
    background-color: rgb(33 33 33);
    border-radius: 30px;
    max-height: 70vh;
    overflow-y: auto;
  }

  &__item {
    margin-bottom: .5rem
  }
}
</style>
