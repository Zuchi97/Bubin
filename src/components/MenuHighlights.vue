<template>
  <section class="menu-section" id="menu" ref="sectionRef">
    <!-- Header -->
    <div class="menu-header">
      <p class="section-label reveal">精選冰品</p>
      <h2 class="section-title reveal" style="--delay:0.1s">店長推薦</h2>
      <p class="section-body reveal" style="--delay:0.2s">
        以當季食材為靈感，每季更新的店長精選，帶給您最新鮮的驚喜。
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

const tabs = ['全部', '招牌冰品', '風味雪花', '精緻熟食', '調酒']
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
    course: '招牌冰品', name: '紅豆牛奶冰', price: 'NT$80',
    tags: '紅豆煉乳 · 純雪機 · 無添加',
    desc: '純雪機清冰為基底，淋上自製紅豆與煉乳。',
    img: '/images/milkice.jpg',
    cat: '招牌冰品'
  },
  {
    course: '招牌冰品', name: '檸檬愛玉冰', price: 'NT$200',
    tags: '手工愛玉 · 純雪機 · 檸檬原汁',
    desc: '100%純手工愛玉，配上檸檬原汁。',
    img: '/images/lemonice.jpg',
    cat: '招牌冰品'
  },
  {
    course: '精緻熟食', name: '炸物拼盤', price: 'NT$120',
    tags: '冷凍炸物 · 低油烘烤 · 氣炸鍋',
    desc: '紅龍牌炸物，搭配現磨胡椒。',
    img: '/images/rdsnglt.jpg',
    cat: '精緻熟食'
  },
  {
    course: '雪花冰', name: '草莓牛奶雪花', price: 'NT$200',
    tags: '鮮奶製成 · 國立冰磚 · 無添加',
    desc: '新鮮當季草莓，搭配純鮮奶製成牛奶冰磚與煉乳。',
    img: '/images/Smilk.png',
    cat: '風味雪花'
  },
  {
    course: 'Cocktail', name: 'Negroni Sbagliato', price: 'NT$360',
    tags: '金巴利 · 甜苦艾酒 · 普羅賽克',
    desc: '以普羅賽克取代琴酒的意外發現，成就了義大利最受歡迎的開胃調酒。',
    img: 'https://images.unsplash.com/photo-1514362453360-8f94243c9996?w=700&q=80',
    cat: '調酒'
  },
  {
    course: '雪花冰', name: '巧克力雪花', price: 'NT$90',
    tags: '黑師傅 · 國立冰磚 · 無添加',
    desc: '使用國立冰磚名下巧克力冰磚磨研製成。',
    img: '/images/Chaco.png',
    cat: '風味雪花'
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
