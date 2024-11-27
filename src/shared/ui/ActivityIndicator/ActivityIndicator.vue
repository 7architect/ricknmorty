<template>
  <div class="activity-indicator">
    <div class="activity-indicator__spinner" />
  </div>
</template>

<style scoped lang="scss">
.activity-indicator {
  &__spinner {
    border: 4px solid transparent; /* Цвет фона спиннера */
    border-top: 4px solid #ff758c; /* Основной цвет */
    border-radius: 50%;
    width: 2em;
    height: 2em;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
