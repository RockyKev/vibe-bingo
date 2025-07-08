<template>
  <div class="control-panel">
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
      
      <div class="line-count">
        {{ lineCount }}/24 lines
      </div>
    </div>

    <div class="button-section">
      <button
        @click="loadExample"
        :disabled="isGenerated"
        class="btn btn-secondary"
      >
        Example
      </button>
      
      <button
        @click="generateBoard"
        :disabled="!canGenerate"
        class="btn btn-primary"
      >
        Generate
      </button>
      
      <button
        @click="shuffleBoard"
        :disabled="!isGenerated"
        class="btn btn-secondary"
      >
        Shuffle
      </button>
      
      <button
        @click="clearContent"
        class="btn btn-danger"
      >
        Clear Content
      </button>
    </div>

    <div class="instructions">
      <p>
        <strong>How to use:</strong>
      </p>
      <ol>
        <li>Enter 24 items for your bingo board (one per line)</li>
        <li>Click "Generate" to create your board</li>
        <li>Click squares to mark them as completed</li>
        <li>Click "Shuffle" to randomize the board layout</li>
        <li>Share the URL to let others use your board</li>
      </ol>
      <p class="share-note">
        <strong>To share this board, copy the URL from the address bar.</strong>
      </p>
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
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  width: 100%;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.content-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4;
  resize: vertical;
  min-height: 200px;
  transition: border-color 0.2s ease;
}

.content-textarea:focus {
  outline: none;
  border-color: #3498db;
}

.content-textarea:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.line-count {
  text-align: right;
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
}

.button-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #7f8c8d;
  transform: translateY(-1px);
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c0392b;
  transform: translateY(-1px);
}

.instructions {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.instructions p {
  margin-bottom: 0.5rem;
}

.instructions ol {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.25rem;
}

.share-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e8f5e8;
  border-radius: 4px;
  color: #2d5a2d;
  font-size: 0.9rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .control-panel {
    gap: 1rem;
  }
  
  .button-section {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .btn {
    flex: 1;
    min-width: 120px;
  }
}
</style> 