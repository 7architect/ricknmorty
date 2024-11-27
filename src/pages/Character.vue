<script setup lang="ts">
import { OmniChanelSearchUI } from '@/features/omniChanelSearch'
import * as UI from '@/shared/ui'

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <UI.Scaffold>
    <template #header>
      <UI.TopBar>
        <template #title>
          <OmniChanelSearchUI.SearchBox />
        </template>
      </UI.TopBar>
    </template>
  </UI.Scaffold>
</template>

<style scoped>

</style>
