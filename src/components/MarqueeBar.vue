<template>
  <div class="marquee-bar" ref="bar">
    <div
      class="marquee-track"
      :style="{ animationDuration: duration + 's' }"
    >
      <span
        v-for="(item, i) in repeated"
        :key="i"
        class="marquee-item"
      >
        {{ item }}
        <svg class="marquee-dot" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="2" fill="currentColor" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bar = ref(null)
const repeated = ref([])
const duration = ref(28)

const items = [
  'Sweet Treats',
  '精緻雪花冰',
  '純雪機風味',
  '全年無休',
  '包場服務',
  '旅遊首選',
  '當季食材',
  '季節限定冰品',
]

onMounted(() => {
  // 🔥 核心：自動重複到「超過容器寬度 2~3倍」
  const containerWidth = bar.value.offsetWidth

  let temp = []
  while (temp.length < items.length * 6) {
    temp = temp.concat(items)
  }

  repeated.value = temp

  // 可選：依內容長度調整速度（更自然）
  duration.value = Math.max(20, temp.length * 2)
})
</script>

<style scoped>
.marquee-bar {
  background: var(--gold);
  overflow: hidden;
  padding: 11px 0;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 0 28px;
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--charcoal);
  white-space: nowrap;
  font-weight: 500;
}

.marquee-dot {
  width: 6px;
  height: 6px;
  color: rgba(28, 26, 23, 0.4);
  flex-shrink: 0;
}

/* 🔥 加分：滑鼠暫停 */
.marquee-track:hover {
  animation-play-state: paused;
}
</style>