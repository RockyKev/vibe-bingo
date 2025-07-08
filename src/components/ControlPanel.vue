<template>
  <div class="control-panel">
    <div class="panel-container">
      <div class="input-section">
        <label for="bingo-content" class="input-label">
          Enter 24 bingo items (one per line):
        </label>
        <textarea
          id="bingo-content"
          v-model="textareaContent"
          :disabled="isGenerated"
          placeholder="Enter your 24 bingo items here..."
          rows="12"
          class="content-textarea"
        ></textarea>
        
        <div class="line-count" :class="{ 'valid': lineCount === 24 }">
          {{ lineCount }}/24 lines
        </div>
      </div>

      <div class="button-section">
        <button
          @click="loadExample"
          :disabled="isGenerated"
          class="btn btn-secondary"
        >
          <span class="btn-icon">📝</span>
          Example
        </button>
        
        <button
          @click="generateBoard"
          :disabled="!canGenerate"
          class="btn btn-primary"
        >
          <span class="btn-icon">🎯</span>
          Generate
        </button>
        
        <button
          @click="shuffleBoard"
          :disabled="!isGenerated"
          class="btn btn-secondary"
        >
          <span class="btn-icon">🔀</span>
          Shuffle
        </button>
        
        <button
          @click="clearContent"
          class="btn btn-danger"
        >
          <span class="btn-icon">🗑️</span>
          Clear
        </button>
      </div>

      <div class="instructions">
        <div class="instructions-header">
          <span class="instructions-icon">💡</span>
          <h3>How to use:</h3>
        </div>
        <ol>
          <li>Enter 24 items for your bingo board (one per line)</li>
          <li>Click "Generate" to create your board</li>
          <li>Click squares to mark them as completed</li>
          <li>Click "Shuffle" to randomize the board layout</li>
          <li>Share the URL to let others use your board</li>
        </ol>
        <div class="share-note">
          <span class="share-icon">🔗</span>
          <strong>To share this board, copy the URL from the address bar.</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  isGenerated: boolean
}

interface Emits {
  (e: 'load-example'): void
  (e: 'generate', content: string[]): void
  (e: 'shuffle'): void
  (e: 'clear'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const textareaContent = ref('')

// Example content for the bingo board
const exampleContent = [
  'Someone says "literally"',
  'Phone battery dies',
  'Someone mentions the weather',
  'Coffee spill',
  'Someone yawns',
  'Phone notification sound',
  'Someone checks their phone',
  'Awkward silence',
  'Someone sneezes',
  'Door opens/closes',
  'Someone laughs',
  'Keyboard typing',
  'Someone coughs',
  'Chair squeaks',
  'Someone stretches',
  'Paper rustling',
  'Someone sighs',
  'Footsteps',
  'Someone clears throat',
  'Clock ticking',
  'Someone fidgets',
  'Pencil writing',
  'Someone blinks rapidly',
  'Deep breath'
]

// Computed properties
const lineCount = computed(() => {
  return textareaContent.value.split('\n').filter(line => line.trim()).length
})

const canGenerate = computed(() => {
  return lineCount.value === 24 && !props.isGenerated
})

// Methods
const loadExample = () => {
  textareaContent.value = exampleContent.join('\n')
  emit('load-example')
}

const generateBoard = () => {
  const lines = textareaContent.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
  
  if (lines.length === 24) {
    emit('generate', lines)
  }
}

const shuffleBoard = () => {
  emit('shuffle')
}

const clearContent = () => {
  textareaContent.value = ''
  emit('clear')
}
</script>

<style scoped>
.control-panel {
  display: flex;
  justify-content: center;
  width: 100%;
}

.panel-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-label {
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content-textarea {
  width: 100%;
  padding: 1rem;
  border: 3px solid #e1e8ed;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 220px;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  transform: translateY(-1px);
}

.content-textarea:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
  border-color: #dee2e6;
}

.line-count {
  text-align: right;
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.line-count.valid {
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.button-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.btn {
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn:not(:disabled):active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2980b9, #1f5f8b);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
  box-shadow: 0 4px 15px rgba(149, 165, 166, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, #7f8c8d, #6c7b7d);
  box-shadow: 0 8px 25px rgba(149, 165, 166, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.btn-danger:hover:not(:disabled) {
  background: linear-gradient(135deg, #c0392b, #a93226);
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
}

.instructions {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #3498db;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.instructions-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.instructions-icon {
  font-size: 1.2rem;
}

.instructions h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.instructions ol {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  color: #495057;
}

.instructions li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.share-note {
  margin-top: 1.25rem;
  padding: 1rem;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-radius: 8px;
  color: #155724;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #c3e6cb;
}

.share-icon {
  font-size: 1.1rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .panel-container {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .button-section {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .btn {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
  
  .content-textarea {
    min-height: 180px;
    font-size: 0.9rem;
  }
  
  .instructions {
    padding: 1.25rem;
  }
}

/* Tablet responsive */
@media (min-width: 769px) and (max-width: 1024px) {
  .panel-container {
    max-width: 400px;
  }
}
</style> 