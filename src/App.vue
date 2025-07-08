<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">
          <span class="title-icon">🎯</span>
          Vibe Bingo
        </h1>
        <p class="app-subtitle">Create and share custom bingo boards instantly</p>
      </div>
    </header>
    
    <main class="app-main">
      <div class="main-container">
        <BingoBoard
          v-if="isGenerated"
          :data="bingoData"
          :order="bingoOrder"
          :marked="markedSquares"
          @toggle-marked="toggleMarked"
        />
        <ControlPanel
          :is-generated="isGenerated"
          @load-example="loadExample"
          @generate="generateBoard"
          @shuffle="shuffleBoard"
          @clear="clearContent"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BingoBoard from './components/BingoBoard.vue'
import ControlPanel from './components/ControlPanel.vue'
import { getParams, setParams, shuffleOrder, toggleMarked as toggleMarkedUtil, parseCommaSeparated, toCommaSeparated } from './utils/url'
import { encodeLines, decodeLines } from './utils/base64'

// Reactive state
const bingoData = ref<string[]>([])
const bingoOrder = ref<number[]>([])
const markedSquares = ref<number[]>([])

// Computed properties
const isGenerated = computed(() => {
  return bingoData.value.length === 24 && bingoOrder.value.length === 24
})

// Initialize app from URL parameters
onMounted(() => {
  const params = getParams()
  
  if (params.data) {
    const decodedData = decodeLines(params.data)
    if (decodedData.length === 24) {
      bingoData.value = decodedData
    }
  }
  
  if (params.order) {
    const orderArray = parseCommaSeparated(params.order)
    if (orderArray.length === 24) {
      bingoOrder.value = orderArray
    }
  }
  
  if (params.marked) {
    markedSquares.value = parseCommaSeparated(params.marked)
  }
})

// Event handlers
const loadExample = () => {
  // Example content will be loaded by the ControlPanel component
  // This is just for URL state management
  setParams()
}

const generateBoard = (content: string[]) => {
  bingoData.value = content
  bingoOrder.value = shuffleOrder()
  markedSquares.value = []
  
  // Update URL
  setParams(
    encodeLines(content),
    toCommaSeparated(bingoOrder.value),
    ''
  )
}

const shuffleBoard = () => {
  if (isGenerated.value) {
    bingoOrder.value = shuffleOrder()
    markedSquares.value = []
    
    // Update URL
    setParams(
      encodeLines(bingoData.value),
      toCommaSeparated(bingoOrder.value),
      ''
    )
  }
}

const toggleMarked = (index: number) => {
  markedSquares.value = toggleMarkedUtil(index, markedSquares.value)
  
  // Update URL
  setParams(
    encodeLines(bingoData.value),
    toCommaSeparated(bingoOrder.value),
    toCommaSeparated(markedSquares.value)
  )
}

const clearContent = () => {
  bingoData.value = []
  bingoOrder.value = []
  markedSquares.value = []
  
  // Clear URL parameters
  setParams()
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 0;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.app-title {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.title-icon {
  font-size: 3rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.app-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  margin: 0;
}

.app-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

/* Desktop layout */
@media (min-width: 1024px) {
  .main-container {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 4rem;
  }
}

/* Tablet layout */
@media (min-width: 768px) and (max-width: 1023px) {
  .app-title {
    font-size: 3rem;
  }
  
  .title-icon {
    font-size: 2.5rem;
  }
  
  .app-subtitle {
    font-size: 1.1rem;
  }
  
  .main-container {
    gap: 2.5rem;
  }
}

/* Mobile layout */
@media (max-width: 767px) {
  .app-header {
    padding: 1.5rem 0;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .app-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  
  .main-container {
    gap: 2rem;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  .app-title {
    font-size: 4rem;
  }
  
  .title-icon {
    font-size: 3.5rem;
  }
  
  .app-subtitle {
    font-size: 1.3rem;
  }
  
  .main-container {
    gap: 5rem;
  }
}
</style> 