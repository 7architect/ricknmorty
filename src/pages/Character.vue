<script setup lang="ts">
import * as OmniChanelSearchUI from '@/features/omniChanelSearch/ui'
import * as UI from '@/shared/ui'

defineProps<{
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
