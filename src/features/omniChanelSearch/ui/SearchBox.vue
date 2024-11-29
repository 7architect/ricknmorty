<script setup lang="ts">
import type {
  SearchBoxQueryVariables,
} from '@/shared/generated/gql-generated/graphql.ts'
import { graphql, useFragment } from '@/shared/generated/gql-generated'
import * as UI from '@/shared/ui'
import { useLazyQuery } from '@vue/apollo-composable'
import { onClickOutside, syncRef, useDebounceFn, useElementBounding } from '@vueuse/core'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
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

const { result, load, loading } = useLazyQuery(SearchBoxDocument)
const searchResults = computed(() => {
  const sections = useFragment(OmniChanelSearch_FeatureQueryFrag, result.value)
  // TODO:Critical: Resolve fragment type
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  return mapResults(sections)
})

function search(searchString: string | null) {
  if (!searchString)
    return
  return load(SearchBoxDocument, {
    name: searchString,
    page: 1,
  })
}

const debouncedSearch = useDebounceFn(search, 500)

function onInputSearch(event: InputEvent) {
  if (!event.target)
    return
  debouncedSearch((event.target as HTMLInputElement).value)
}
function onClickUptitle(payload: string) {
  searchVariables.name = payload
  debouncedSearch(payload)
}
function onClickBackButton() {
  focused.value = false
  searchVariables.name = ''
}

function getRandomMessage() {
  const messages = [
    'Is it alive 🧬 or round? Maybe flat? Or perhaps it never existed 🌌 in our version of the universe 🤷‍♂️???',
    'Morty, Morty faster, can you be faster?',
    'Using search again?',
  ]
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}

// Хорошую анимацию не успел написать
const { width: _w } = useElementBounding(containerRef, { windowResize: true, immediate: true, windowScroll: true })
const width = ref<number | undefined>(undefined)
onMounted(async () => {
  await nextTick()
  width.value = _w.value
  syncRef(width, _w, {
    direction: 'rtl',
    transform: {
      rtl: right => right,
    },
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="search-box"
    :class="{
      'search-box--active-state': focused,
    }"
  >
    <div
      ref="containerInnerRef"
      class="search-box__inner"
      :class="{
        'search-box__inner--active-state': focused,
      }"
      :style="{
        width: `${width}px`,
      }"
    >
      <button
        class="search-box__back-button"
        :class="{
          'search-box__back-button--active-state': focused,
        }"
        @click="onClickBackButton"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="white" d="M15.41 7.41L10.83 12l4.58 4.59a1 1 0 1 1-1.42 1.42l-5-5a1 1 0 0 1 0-1.42l5-5a1 1 0 0 1 1.42 1.42z" />
        </svg>
      </button>
      <UI.Input
        v-model="searchVariables.name"
        class="search-box__input"
        placeholder="Search chapter, episode by name"
        @focus="openSearchBox"
        @input="onInputSearch"
      />
      <transition name="search-box--reveal">
        <div
          v-if="focused"
          class="search-box__results-container"
          :class="{
            'search-box__results-container--active-state': focused,
          }"
        >
          <div v-if="loading" class="search-box__load-indicator">
            <UI.ActivityIndicator />
          </div>
          <p
            v-else-if="!searchResults.length && searchVariables.name"
            class="search-box__results-placeholder"
          >
            NOTHING, absolutely nothing. This unit 🌠 never existed, but 🤔 I’m not sure…
          </p>
          <transition-group
            v-else-if="searchResults.length > 0"
            name="search-box--fade-slide-up"
            appear
          >
            <FoundedItem
              v-for="(item, index) of searchResults"
              :key="`${index}+${item?.id}`"
              :title="item?.title"
              :subtitle="item?.subtitle"
              :uptitle="item?.uptitle"
              :image="item?.image"
              :style="{ '--delay': `${index * 0.1}s` }"
              class="search-box__item"
              @click-uptitle="onClickUptitle"
            />
          </transition-group>
          <p
            v-else
            class="search-box__results-placeholder"
          >
            {{ getRandomMessage() }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-box {
  --search-box__bg-color: rgba(255, 255, 255, .1);
  position: relative;

  &__inner {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    max-width: 100%;
    transition: all .3s ease-in-out;
    &--active-state {
      @media screen and (max-width: 425px) {
        position: fixed;
        left: .5rem;
        top: 1rem;
        max-width: calc(100vw - 1rem);
        width: 100vw !important;
        height: 100%;
      }
    }
  }

  &__input {
    position: relative;
    z-index: 9;
    width: 100%;
  }

  &__results-container {
    position: absolute;
    top: -2rem;
    left: -0.5rem;
    width: calc(100% + 1rem);
    padding: 5rem 3rem 3rem 3rem;
    background-color: rgb(33 33 33);
    border-radius: 30px;
    max-height: 70vh;
    overflow-y: auto;

    &--active-state {
      @media screen and (max-width: 425px) {
        border-radius: 0;
        height: 100vh;
        max-height: 100vh;
        padding-top: 6rem;
        padding-left: 4rem;
        padding-right: 2rem;
      }
    }
  }

  &__item {
    margin-bottom: .5rem
  }

  &__load-indicator {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
  }

  &__results-placeholder {
    color: rgba(255, 255, 255, .8);
    font-weight: 300;
  }

  &__back-button {
    display: none;
    background-color: transparent;
    border: none;
    position: relative;
    z-index: 9;
    &--active-state {
      @media screen and (max-width: 425px) {
        display: block;
      }
    }
  }

  // Transitions
  &--reveal-enter-active,
  &--reveal-leave-active {
    transform-origin: top;
    transition: opacity 0.6s, transform 0.2s ease-out;
  }
  &--reveal-enter-from {
    opacity: 0;
    transform: scaleY(0) translateY(-100px);
  }
  &--reveal-enter-to {
    opacity: 1;
    transform: scaleY(1);
  }
  &--reveal-leave-to {
    opacity: 0;
    transform: scaleY(0.5);
  }

  &--fade-slide-up-enter-active {
    transition: opacity 0.5s, transform 0.5s;
    transition-delay: var(--delay);
  }

  &--fade-slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }

  &--fade-slide-up-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
