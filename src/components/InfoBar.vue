<template>
  <div class="info-bar" id="contact" ref="sectionRef">
    <div
      v-for="(item, i) in infoItems"
      :key="item.label"
      class="info-item reveal"
      :style="`--delay:${0.1 * i}s`"
    >
      <div class="info-icon" v-html="item.icon"></div>
      <p class="info-label">{{ item.label }}</p>
      <div class="info-value" v-html="item.value"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const infoItems = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>`,
    label: '營業時間',
    value: `週一 — 週日 &nbsp;10:30–21:30<br/>
            <span style="color:var(--rust)">公休日會另外公告</span>`
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
    label: '地址',
    value: `嘉義縣 布袋鎮 海運街 106 號<br/>
            <a href="https://maps.google.com" target="_blank" rel="noopener"
               style="color:var(--gold);font-size:0.72rem;letter-spacing:0.12em;text-decoration:none">
               查看地圖 →
            </a>`
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>`,
    label: '聯絡我們',
    value: `<a href="tel:0965318306" style="color:inherit;text-decoration:none">0965-318-306</a><br/>
            <a href="mailto:catlikecathy3@gmail.com"
               style="color:var(--gold);font-size:0.82rem;text-decoration:none">
               catlikecathy3@gmail.com
            </a>`
  },
]
</script>

<style scoped>
.info-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--cream);
}

.info-item {
  padding: clamp(44px, 7vw, 80px) clamp(28px, 5vw, 64px);
  border-right: 1px solid rgba(107,101,65,0.14);
  text-align: center;
}
.info-item:last-child { border-right: none; }

.info-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}
.info-icon :deep(svg) {
  width: 28px;
  height: 28px;
  color: var(--gold);
  stroke: var(--gold);
}

.info-label {
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: 12px;
}

.info-value {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--charcoal);
  line-height: 1.75;
}

.reveal { transition-delay: var(--delay, 0s); }

@media (max-width: 760px) {
  .info-bar { grid-template-columns: 1fr; }
  .info-item { border-right: none; border-bottom: 1px solid rgba(107,101,65,0.14); }
  .info-item:last-child { border-bottom: none; }
}
</style>
