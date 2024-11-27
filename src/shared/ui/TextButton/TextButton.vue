<script setup lang="ts">
</script>

<template>
  <button class="text-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
  .text-button {
    --text-button--text-color: rgba(255, 255, 255, .9);

    background: none;
    border: none;
    cursor: pointer;
    transition: opacity ease .3s;
    opacity: 0.8;
    color: var(--text-button--text-color);

    &:hover {
      opacity: 1;
    }
  }
</style>
