<script setup lang="ts">
import type { InputEmits, InputProps } from './input.ts'
import { useVModel } from '@vueuse/core'
import { computed, ref, toRefs, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: true,
})
const props = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()
const {
  type,
  placeholder,
} = toRefs(props)

const attrs = useAttrs()
const value = useVModel(props, 'modelValue', emit)

const focused = ref(false)
function onFocus() {
  focused.value = true
}
function onBlur() {
  focused.value = false
}

const isPlaceholderVisible = computed(() => !value.value)
</script>

<template>
  <label class="input">
    <span class="input__icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <div class="input__field-wrap">
      <span v-if="isPlaceholderVisible" class="input__field-placeholder" v-text="placeholder" />
      <input
        v-model="value"
        v-bind="attrs"
        class="input__field"
        :type
        @focus="onFocus"
        @blur="onBlur"
      >

    </div>
  </label>
</template>

<style scoped lang="scss">
  .input {
    --input--stroke-color: rgba(255, 255, 255, .2);
    --input--bg-color: rgba(0, 0, 0, .3);
    --input--text-color: #fff;

    display: flex;
    align-items: center;
    border-radius: 40px;
    border: 1px solid var(--input--stroke-color);
    padding: 0 0.6rem;
    background-color: var(--input--bg-color);
    backdrop-filter: blur(50px);

    &__icon {
      height: 1rem;
      flex: 0 0 1rem;
      margin-right: .8rem;
    }

    &__field {
      position: relative;
      background: none;
      border: none;
      outline: none;
      font-size: 1rem;
      color: var(--input--text-color);
      padding: .6rem 0;
      width: 100%;
    }

    &__field-wrap {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    &__field-placeholder {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      background: linear-gradient(90deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.2) 40%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 1) 60%,
        rgba(255, 255, 255, 0.2) 70%,
        rgba(255, 255, 255, 0.2) 100%);
      background-size: 500%;
      background-attachment: fixed;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 10s ease-in-out infinite;
      animation-fill-mode: both;
      animation-delay: 5s;
    }

  }
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>
