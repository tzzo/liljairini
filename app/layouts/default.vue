<template>
  <div class="layout">
    <AppNav />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding-top: var(--nav-height);
}
</style>
