<template>
  <div class="app">
    <header>
      <h1>Vibe Bingo</h1>
    </header>
    <main>
      <!-- Bingo board and controls will go here -->
      <p>Bingo app coming soon!</p>
    </main>
  </div>
</template>

<script setup lang="ts">
// Component logic will be added here
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  main {
    flex-direction: row;
  }
}
</style> 