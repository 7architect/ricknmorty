<script setup lang="ts">
import type { FoundItemEmits, FoundItemProps } from './FoundItem.ts'
import { toRefs } from 'vue'

const props = defineProps<FoundItemProps>()
const emit = defineEmits<FoundItemEmits>()
const { image, title, subtitle, uptitle } = toRefs(props)
</script>

<template>
  <div
    class="item"
    :class="{
      'item--with-uptitle': uptitle,
    }"
    @click="emit('click')"
  >
    <h4
      class="item__uptitle"
      @click.self="emit('clickUptitle', uptitle || '')"
    >
      {{ uptitle }}
    </h4>

    <div class="item__container">
      <div
        v-if="image"
        class="item__image"
        :style="{ backgroundImage: `url(${image})` }"
      />
      <div class="item__right">
        <h3 class="item__title">
          {{ title }}
        </h3>
        <span class="item__subtitle">{{ subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .item {
    &--with-uptitle {
      background: rgba(255, 255, 255, .05);
      padding: 0.1rem 1rem;
      margin-bottom: 1rem;
      border-radius: 16px;
      margin: 0 -1rem;
      border: 1px solid rgba(255, 255, 255, .05);
    }

    &__uptitle {
      font-size: .6rem;
      font-weight: 400;
      text-decoration: underline;
      margin: 0 0 .5rem;
    }

    &__container {
      display: flex;
      padding: .5rem 0;
      align-items: flex-start;
    }

    &__image {
      --_size: 50px;
      width: var(--_size);
      height: var(--_size);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      margin-right: 1rem;
      border-radius: 8px;
    }

    &__title {
      margin: 0 0 .3rem;
      font-size: .9rem;
      font-weight: 400;
    }

    &__subtitle {
      font-size: .8rem;
      opacity: .5
    }
  }
</style>
