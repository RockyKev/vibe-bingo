<template>
  <div class="app">
    <header>
      <h1>Vibe Bingo</h1>
    </header>
    <main>
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
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

/* Desktop layout */
@media (min-width: 768px) {
  main {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 3rem;
  }
}

/* Mobile layout */
@media (max-width: 767px) {
  .app {
    padding: 0.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  main {
    gap: 1.5rem;
  }
}
</style> 