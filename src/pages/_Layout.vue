<script setup lang="ts">
import * as UI from '@/shared/ui'
</script>

<template>
  <Suspense>
    <router-view />
    <template #fallback>
      <div class="loading-overlay">
        <UI.ActivityIndicator />
      </div>
    </template>
  </Suspense>
</template>

<style scoped lang="scss">
.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
}
</style>
