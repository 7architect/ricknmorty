<script setup lang="ts">
import { useFragment } from '@/shared/generated/gql-generated'
import * as UI from '@/shared/ui'
import { computed } from 'vue'
import { CharacterCardPreviewFragment, type CharacterCardProps } from './CharacterCard.ts'

const props = defineProps<CharacterCardProps>()

const character = computed(() => useFragment(CharacterCardPreviewFragment, props.character))
</script>

<template>
  <UI.Card
    :title="character?.name"
    :image="character?.image"
  />
</template>

<style scoped>

</style>
