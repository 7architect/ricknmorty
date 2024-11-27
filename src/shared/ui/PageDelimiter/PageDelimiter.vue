<script setup lang="ts">
import type { PageDelimiterProps, PageDelimiterSlots } from './PageDelimiter.ts'

const props = defineProps<PageDelimiterProps>()
const slots = defineSlots<PageDelimiterSlots>()
</script>

<template>
  <div class="page-delimiter">
    <div class="page-delimiter__body">
      <div class="page-delimiter__page-number">
        <div class="page-delimiter__text">
          Page {{ props.number }}
        </div>
      </div>

      <div
        v-if="slots.button"
        class="page-delimiter__slot-button"
      >
        <slot name="button" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-delimiter {
    --page-delimiter--line-color: rgba(255, 255, 255, .2);
    --page-delimiter--bg-color: rgba(255, 255, 255, .1);

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .8rem;
    font-weight: 400;

    &__body {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    &__slot-button {
      padding: .5rem 0;
    }

    &__page-number {
      border-radius: 1rem;
      padding: .5rem 1.5rem;
      background-color: var(--page-delimiter--bg-color);
    }

    &__text {
      background: linear-gradient(90deg, #ee7eff, #ff758c, #ff6a72);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
