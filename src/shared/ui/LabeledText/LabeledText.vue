<script setup lang="ts">
import type { LabeledTextProps } from './LabeledText.ts'
import { toRefs } from 'vue'

const props = defineProps<LabeledTextProps>()
const {
  text,
  label,
} = toRefs(props)
</script>

<template>
  <div class="labeled-text">
    <span class="labeled-text__label">
      {{ label }}
    </span>
    <span class="labeled-text__text">
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  .labeled-text {
    --labeled-text--label-color: rgba(255, 255, 255, .2);
    &__label {
      color: var(--labeled-text--label-color);
      line-height: 1.5;
    }
  }
</style>
