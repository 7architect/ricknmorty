<script setup lang="ts" async>
import type {
  GetMainViewQuery,
  GetMainViewQueryVariables,
} from '@/shared/generated/gql-generated/graphql.ts'
import * as Feature_OmniChanelSearch from '@/features/omniChanelSearch/ui'
import { graphql } from '@/shared/generated/gql-generated'
// import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll'
import * as UI from '@/shared/ui'
import * as Widget_CharacterList from '@/widgets/CharacterListWidget/ui'
import { useLazyQuery } from '@vue/apollo-composable'
import { useInfiniteScroll } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { toNumber } from 'lodash-es'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const GetMainView = graphql(`
    query GetMainView($page: Int!) {
        characters(page: $page) {
          info {
            pages
          }
            ...CharacterListWidget_Fragment
        }
    }
`)

const START_PAGE = 1

// Cached pages
const pages = ref<Map<number, GetMainViewQuery>>(new Map())
const pagesSorted = computed(
  () => [...pages.value.entries()].sort(([a], [b]) => a - b),
)
const routePageNumber = useRouteQuery('page', START_PAGE, { transform: value => value <= 0 ? 1 : toNumber(value) })
const queryVariables = computed<GetMainViewQueryVariables>(() => ({
  page: routePageNumber.value,
}))

const { onResult, load, fetchMore, result } = useLazyQuery(GetMainView, queryVariables, { fetchPolicy: 'network-only' })
const { off: stopResultWatcher } = onResult(({ data }) => {
  pages.value.set(queryVariables.value.page, data)
})
await load()

const loadingNext = ref(false)
const loadingPrev = ref(false)
async function nextPage() {
  if (loadingNext.value)
    return
  routePageNumber.value += 1
  loadingNext.value = true
  await fetchMore({
    variables: {
      page: routePageNumber.value,
    },
  })
  loadingNext.value = false
}
async function prevPage() {
  if (loadingPrev.value)
    return
  routePageNumber.value -= 1
  loadingPrev.value = true
  await fetchMore({
    variables: {
      page: routePageNumber.value,
    },
  })
  loadingPrev.value = false
}

function isStartPage(pageNumber: number) {
  return pageNumber === START_PAGE
}

const charactersContainer = ref<HTMLElement | null>(null)

const { reset: unbindInfiniteScroll } = useInfiniteScroll(
  charactersContainer,
  async () => {
    // load more
    await nextPage()
  },
  {
    distance: 50,
    canLoadMore: () => routePageNumber.value < (result.value?.characters?.info?.pages || 1),
  },
)

onMounted(async () => {
  await load()
})

// Stop all watchers or listeners
onUnmounted(() => {
  stopResultWatcher()
  unbindInfiniteScroll()
})
</script>

<template>
  <UI.Scaffold>
    <template #header>
      <UI.TopBar>
        <template #title>
          <Feature_OmniChanelSearch.SearchBox />
        </template>
      </UI.TopBar>
    </template>

    <template #body>
      <UI.SafeArea>
        <div>
          <div
            v-for="([number, page], index) of pagesSorted"
            :key="number"
            class="page__section"
          >
            <UI.PageDelimiter :number class="page__delimiter">
              <template
                v-if="!isStartPage(number) && index === 0"
                #button
              >
                <div v-if="loadingPrev" class="page__load-indicator">
                  <UI.ActivityIndicator />
                </div>
                <UI.TextButton v-else @click="prevPage">
                  Go back
                </UI.TextButton>
              </template>
            </UI.PageDelimiter>

            <Widget_CharacterList.CharacterList
              v-if="page?.characters"
              :characters="page?.characters"
            />

            <div v-if="loadingNext" class="page__load-indicator">
              <UI.ActivityIndicator />
            </div>
          </div>

          <div ref="charactersContainer" />
        </div>
      </UI.SafeArea>
    </template>
  </UI.Scaffold>
</template>

<style scoped lang="scss">
.page {
  &__load-indicator {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  &__section {
    margin-bottom: 2rem;
  }
  &__delimiter {
    margin-bottom: 2rem;
  }
}
</style>
