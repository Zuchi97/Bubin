<template>
  <section class="menu-section" id="menu" ref="sectionRef">
    <!-- Header -->
    <div class="menu-header">
      <p class="section-label reveal">精選菜色</p>
      <h2 class="section-title reveal" style="--delay:0.1s">主廚推薦</h2>
      <p class="section-body reveal" style="--delay:0.2s">
        以當季食材為靈感，每週更新的主廚精選，帶給您最新鮮的驚喜。
      </p>
    </div>

    <!-- Category tabs -->
    <div class="menu-tabs reveal" style="--delay:0.3s">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >{{ tab }}</button>
    </div>

    <!-- Cards -->
    <div class="menu-grid">
      <div
        v-for="(item, i) in filteredItems"
        :key="`${activeTab}-${item.name}`"
        class="menu-card reveal"
        :style="`--delay:${0.08 * i}s`"
      >
        <div class="card-image">
          <img :src="item.img" :alt="item.name" loading="lazy" />
          <div class="card-overlay">
            <p class="card-desc">{{ item.desc }}</p>
          </div>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="card-course">{{ item.course }}</span>
            <span class="card-price">{{ item.price }}</span>
          </div>
          <h3 class="card-name">{{ item.name }}</h3>
          <p class="card-tags">{{ item.tags }}</p>
        </div>
      </div>
    </div>

    <div class="menu-footer reveal">
      <a href="#" class="btn btn-ghost-dark">查看完整菜單</a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const tabs = ['全部', '前菜', '主菜', '甜點', '調酒']
const activeTab = ref('全部')

// 切換 Tab 後，新渲染的卡片是全新 DOM 元素，
// IntersectionObserver 不會再監聽它們，需重新觀察。
// 用 nextTick 確保 DOM 更新後再查詢新元素。
watch(activeTab, async () => {
  await nextTick()
  const cards = sectionRef.value?.querySelectorAll('.menu-card.reveal:not(.visible)')
  if (!cards) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  cards.forEach((el) => observer.observe(el))
})

const items = [
  {
    course: 'Antipasto', name: '生火腿拼盤', price: 'NT$520',
    tags: '黑毛豬 · 帕爾馬 · 無花果蜂蜜',
    desc: '嚴選義大利頂級生火腿，搭配當季無花果與陳年巴薩米克醋。',
    img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=700&q=80',
    cat: '前菜'
  },
  {
    course: 'Primo', name: '手工黑松露寬麵', price: 'NT$780',
    tags: '黑松露 · 帕瑪森 · 奶油',
    desc: '每日手工揉製的寬麵配上當季黑松露，奢華而簡約。',
    img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80',
    cat: '主菜'
  },
  {
    course: 'Secondo', name: '紅酒燉牛頰', price: 'NT$1,080',
    tags: '慢燉8小時 · 松露馬鈴薯泥 · 炸酸豆',
    desc: '以 Barolo 紅酒慢燉八小時，肉質入口即化，搭配松露馬鈴薯泥。',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80',
    cat: '主菜'
  },
  {
    course: 'Dolce', name: '原味提拉米蘇', price: 'NT$320',
    tags: '馬斯卡彭 · 濃縮咖啡 · 薩芙瓦酒',
    desc: '忠於傳統食譜，以馬斯卡彭起司與濃縮咖啡製成，不妥協的義式甜點。',
    img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700&q=80',
    cat: '甜點'
  },
  {
    course: 'Cocktail', name: 'Negroni Sbagliato', price: 'NT$360',
    tags: '金巴利 · 甜苦艾酒 · 普羅賽克',
    desc: '以普羅賽克取代琴酒的意外發現，成就了義大利最受歡迎的開胃調酒。',
    img: 'https://images.unsplash.com/photo-1514362453360-8f94243c9996?w=700&q=80',
    cat: '調酒'
  },
  {
    course: 'Antipasto', name: '炸朝鮮薊', price: 'NT$380',
    tags: '羅馬式 · 檸檬鹽 · 煙燻美乃滋',
    desc: '羅馬傳統做法，外酥內嫩，佐以自製煙燻美乃滋。',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80',
    cat: '前菜'
  },
]

const filteredItems = computed(() =>
  activeTab.value === '全部' ? items : items.filter(i => i.cat === activeTab.value)
)
</script>

<style scoped>
.menu-section {
  padding: var(--section-pad-v) var(--section-pad-h);
  background: var(--warm-white);
}

.menu-header {
  max-width: 540px;
  margin-bottom: 40px;
}
.menu-header .section-body { margin-top: 8px; }

/* Tabs */
.menu-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.tab {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 9px 22px;
  border: 1px solid rgba(107,101,65,0.2);
  color: var(--muted);
  background: transparent;
  cursor: pointer;
  transition: all 0.25s;
}
.tab.active,
.tab:hover {
  background: var(--charcoal);
  border-color: var(--charcoal);
  color: var(--cream);
}

/* Grid */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

/* Card */
.menu-card {
  background: var(--cream);
  overflow: hidden;
  cursor: pointer;
}
.card-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}
.card-image img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease);
}
.menu-card:hover .card-image img { transform: scale(1.07); }

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28,26,23,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.4s;
}
.menu-card:hover .card-overlay { opacity: 1; }
.card-desc {
  font-size: 0.82rem;
  line-height: 1.75;
  color: var(--cream);
  text-align: center;
}

.card-body { padding: 20px 22px 24px; }
.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.card-course {
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
}
.card-price {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--charcoal);
}
.card-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--charcoal);
  margin-bottom: 6px;
}
.card-tags {
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.menu-footer {
  margin-top: 56px;
  text-align: center;
}

/* Reveal delays */
.reveal { transition-delay: var(--delay, 0s); }

@media (max-width: 960px) {
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .menu-grid { grid-template-columns: 1fr; }
}
</style>
