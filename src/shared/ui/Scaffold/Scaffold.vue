<script setup lang="ts">
import type { ScaffoldProps, ScaffoldSlots } from './Scaffold.ts'

defineProps<ScaffoldProps>()
const slots = defineSlots<ScaffoldSlots>()
</script>

<template>
  <div class="scaffold">
    <div v-if="slots.header" class="scaffold__header">
      <slot name="header" />
    </div>
    <div v-if="slots.body" class="scaffold__body">
      <slot name="body" />
    </div>
    <div v-if="slots.footer" class="scaffold__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .scaffold {
    --scaffold--bg-color: var(--bg-color, #000);
    --scaffold--header-size: 80px;

    background-color: var(--scaffold--bg-color);
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    color: var(--text-color);
    padding-top: var(--scaffold--header-size);

    &__header {
      height: var(--scaffold--header-size);
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9;
    }
  }
</style>
