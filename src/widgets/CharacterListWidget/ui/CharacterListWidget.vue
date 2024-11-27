<script setup lang="ts">
import * as Entity_CharacterUI from '@/entities/Character/ui'
import { useFragment } from '@/shared/generated/gql-generated'
import { computed } from 'vue'
import { type CharacterListProps, CharacterListWidget_Fragment } from './CharacterListWidget.ts'

const props = defineProps<CharacterListProps>()
const characters = computed(() => useFragment(CharacterListWidget_Fragment, props.characters))
</script>

<template>
  <div class="character-list">
    <Entity_CharacterUI.CharacterCard
      v-for="(character, index) in characters.results"
      :key="index"
      :character
    />
  </div>
</template>

<style scoped lang="scss">
  .character-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;

    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1440px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>
