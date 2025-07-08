<template>
  <div class="bingo-board">
    <div class="board-container">
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
  width: 100%;
}

.board-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0.75rem;
  max-width: 500px;
  width: 100%;
  aspect-ratio: 1;
}

.board-square {
  background: white;
  border: 3px solid #e1e8ed;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 90px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.board-square:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.board-square:active {
  transform: translateY(0) scale(0.98);
}

.board-square.marked {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border-color: #45a049;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.board-square.free-space {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
  border-color: #F57C00;
  font-weight: bold;
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3);
}

.board-square.free-space:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4);
}

.square-content {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.3;
  word-wrap: break-word;
  overflow: hidden;
  z-index: 1;
  position: relative;
  /* Improved word wrapping */
  word-break: break-word;
  hyphens: auto;
  white-space: pre-line;
  padding: 0.25rem;
  max-width: 100%;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .board-container {
    padding: 1rem;
    border-radius: 12px;
  }
  
  .board-grid {
    gap: 0.5rem;
  }
  
  .board-square {
    min-height: 70px;
    border-width: 2px;
  }
  
  .square-content {
    font-size: 0.65rem;
  }
}

/* Tablet responsive */
@media (min-width: 769px) and (max-width: 1024px) {
  .board-grid {
    max-width: 450px;
  }
  
  .board-square {
    min-height: 80px;
  }
}

/* Large desktop */
@media (min-width: 1025px) {
  .board-grid {
    max-width: 550px;
  }
  
  .board-square {
    min-height: 100px;
  }
  
  .square-content {
    font-size: 0.9rem;
  }
}
</style> 