<script setup lang="ts">
import type { TopBarProps, TopBarSlots } from './TopBar'

defineProps<TopBarProps>()
defineSlots<TopBarSlots>()
</script>

<template>
  <header class="top-bar">
    <div class="top-bar__leading">
      <slot name="leading" />
    </div>
    <div class="top-bar__title">
      <slot name="title" />
    </div>
    <div class="top-bar__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-bar {
  --top-bar--padding: 16px;
  --top-bar--size: 80px;
  --top-bar--bg-color: rgba(0, 0, 0, .8);

  display: grid;
  grid-template-columns: var(--top-bar--size) auto minmax(var(--top-bar--size), min-content);
  background-color: var(--top-bar--bg-color);
  position: relative;
  backdrop-filter: blur(15px);

  &__leading {
    padding: var(--top-bar--padding);
    height: var(--top-bar--size);
    width: var(--top-bar--size);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__title {
    width: 100%;
    padding: var(--top-bar--padding);
    height: var(--top-bar--size);
    align-content: center;
  }
  &__actions {
    padding: var(--top-bar--padding);
    height: var(--top-bar--size);
    min-width: var(--top-bar--size);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
