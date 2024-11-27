<script setup lang="ts">
import type { CardProps } from './Card.ts'
import { toRefs } from 'vue'

const props = defineProps<CardProps>()
const {
  image,
  title,
  subtitle,
} = toRefs(props)
</script>

<template>
  <div class="card">
    <div
      v-if="image"
      class="card__cover"
    >
      <img
        :src="image"
        alt="Card Image"
        height="100%"
        class="card__cover-image"
      >
    </div>

    <div class="card__content">
      <h1 v-if="title" class="card__title">
        {{ title }}
      </h1>
      <div v-if="subtitle">
        {{ subtitle }}
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    --card--border-color: rgba(255, 255, 255, .2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--card--border-color);

    &__cover {
      width: 100%;
      height: 8rem;
      display: flex;
      position: relative;
      padding-top: .5rem;
      padding-left: 1rem;
      align-items: center;
    }
    &__cover-bg {
      position: absolute;
      top: -10px;
      left: -10px;
      width: calc(100% + 5px);
      height: calc(100% + 5px);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      filter: blur(20px);
      opacity: .1;
    }
    &__cover-image {
      position: relative;
      border-radius: 4px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding: 1rem
    }

    &__title {
      font-size: 1rem;
      padding: 0;
      margin: 0 0 .5rem;
    }
  }
</style>
