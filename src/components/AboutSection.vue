<template>
  <section class="about" id="about" ref="sectionRef">
    <div class="about-image">
      <img
        src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1000&q=80"
        alt="布冰雪花 餐廳內部環境"
        loading="lazy"
      />
      <!-- floating badge -->
      <div class="about-badge reveal">
        <span class="badge-num">25+</span>
        <span class="badge-label">年的料理傳承</span>
      </div>
    </div>

    <div class="about-body">
      <p class="section-label reveal" style="--delay:0s">關於我們</p>
      <h2 class="section-title reveal" style="--delay:0.1s">
        一段關於<br /><em>美味與傳承</em><br />的故事
      </h2>
      <div class="divider reveal" style="--delay:0.2s"></div>
      <p class="section-body reveal" style="--delay:0.25s">
        布冰雪花 誕生於對甜點冰品的深深熱愛。我們的主廚走遍各地，
        帶回最道地的食材與手藝，以現代方式重新詮釋那些被祖母珍藏的古老食譜。
      </p>
      <p class="section-body reveal" style="--delay:0.35s" style2="margin-top:14px">
        每一道菜都是一次朝聖——對食材的尊重、對技藝的執著、對每位賓客的用心。
      </p>

      <!-- Stats row -->
      <div class="about-stats reveal" style="--delay:0.45s">
        <div class="stat" v-for="s in stats" :key="s.label">
          <span class="stat-num">{{ s.num }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <a href="#menu" class="btn btn-primary reveal" style="--delay:0.55s" @click.prevent="scrollTo('#menu')">
        瀏覽完整菜單
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const stats = [
  { num: '12+', label: '道招牌料理' },
  { num: '800+', label: '支精選酒款' },
  { num: '4.9', label: 'Google 評分' },
]

function scrollTo(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Image side */
.about-image {
  position: relative;
  overflow: hidden;
  min-height: 600px;
}
.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s var(--ease);
}
.about-image:hover img { transform: scale(1.04); }

.about-badge {
  position: absolute;
  bottom: 40px;
  right: -1px;
  background: var(--gold);
  padding: 24px 28px;
  text-align: center;
  min-width: 130px;
}
.badge-num {
  display: block;
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--charcoal);
  line-height: 1;
  margin-bottom: 6px;
}
.badge-label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--charcoal);
}

/* Body side */
.about-body {
  background: var(--cream);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(48px, 8vw, 104px);
  gap: 0;
}
.about-body .section-body + .section-body { margin-top: 14px; }
.about-body .btn { margin-top: 4px; width: fit-content; }

/* Stats */
.about-stats {
  display: flex;
  gap: 40px;
  margin: 32px 0 36px;
  padding: 28px 0;
  border-top: 1px solid rgba(107,101,65,0.18);
  border-bottom: 1px solid rgba(107,101,65,0.18);
}
.stat { text-align: left; }
.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--charcoal);
  line-height: 1;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
}

/* Reveal delays */
.reveal { transition-delay: var(--delay, 0s); }

@media (max-width: 900px) {
  .about { grid-template-columns: 1fr; }
  .about-image { min-height: 380px; }
  .about-body { padding: 48px 28px; }
  .about-stats { gap: 24px; }
}
</style>
