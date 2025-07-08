<template>
  <div class="bingo-board">
    <div class="board-grid">
      <div
        v-for="(item, index) in boardItems"
        :key="index"
        class="board-square"
        :class="{
          'marked': isMarked(index),
          'free-space': index === 12
        }"
        @click="handleSquareClick(index)"
      >
        <div class="square-content">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: string[]
  order: number[]
  marked: number[]
}

interface Emits {
  (e: 'toggle-marked', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Create 5x5 board items (24 items + 1 free space)
const boardItems = computed(() => {
  const items: string[] = []
  
  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      // Free space at center
      items.push('FREE SPACE')
    } else {
      // Map order index to data item
      const orderIndex = i > 12 ? i - 1 : i
      const dataIndex = props.order[orderIndex]
      items.push(props.data[dataIndex] || '')
    }
  }
  
  return items
})

// Check if a square is marked
const isMarked = (index: number): boolean => {
  return index === 12 || props.marked.includes(index)
}

// Handle square click
const handleSquareClick = (index: number) => {
  emit('toggle-marked', index)
}
</script>

<style scoped>
.bingo-board {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0.5rem;
  max-width: 500px;
  width: 100%;
  aspect-ratio: 1;
}

.board-square {
  background: white;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 80px;
  padding: 0.5rem;
}

.board-square:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-square.marked {
  background: #4CAF50;
  color: white;
  border-color: #45a049;
}

.board-square.free-space {
  background: #FF9800;
  color: white;
  border-color: #F57C00;
  font-weight: bold;
}

.square-content {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.2;
  word-wrap: break-word;
  overflow: hidden;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .board-grid {
    gap: 0.25rem;
  }
  
  .board-square {
    min-height: 60px;
    padding: 0.25rem;
  }
  
  .square-content {
    font-size: 0.8rem;
  }
}
</style> 