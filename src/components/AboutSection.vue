<template>
  <section class="about" id="about" ref="sectionRef">
    <div class="about-image">
      <img
        src="https://scontent.ftpe7-2.fna.fbcdn.net/v/t39.30808-6/593480004_800143159669048_698533501725540757_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=bqcpdBL5iMIQ7kNvwEAaypm&_nc_oc=AdpRA36oxoNw_V81_kvX742KtnGhPg-eV_y0XTSCdmykRq8_GCxDaIIfbOUu8GwZPI4fyU_RFam48u0ub-hP2vK2&_nc_zt=23&_nc_ht=scontent.ftpe7-2.fna&_nc_gid=g9E65ZHH9FOuEZW9SKMOaA&_nc_ss=7a3a8&oh=00_Af05NIDW5xQ0fjrFBkH8eZDUpGLder_9fEDTC9kV4DsvpA&oe=69D2BE71"
        alt="布冰雪花 餐廳內部環境"
        loading="lazy"
      />
      <!-- floating badge -->
      <div class="about-badge reveal">
        <span class="badge-num">25+</span>
        <span class="badge-label">年的冰品傳承</span>
      </div>
    </div>

    <div class="about-body">
      <p class="section-label reveal" style="--delay:0s">關於我們</p>
      <h2 class="section-title reveal" style="--delay:0.1s">
        一段關於<br /><em>冰品與傳承</em><br />的故事
      </h2>
      <div class="divider reveal" style="--delay:0.2s"></div>
      <p class="section-body reveal" style="--delay:0.25s">
        布冰雪花位於嘉義縣布袋鎮海運街，是一間深受在地居民與遊客喜愛的特色冰品店。店內主打綿密細緻的雪花冰，透過不同製冰方式，呈現多樣化的冰品口感與風味。
        店內部分雪花冰口味採用純雪機現場製作，口感輕柔、入口即化；而另一部分口味則選用品質穩定、口感細緻的國立冰磚雪花冰磚製作，搭配精心挑選的配料與醬料，讓每一碗冰品都能展現豐富層次與獨特風味。
        布冰雪花堅持以用心與品質為核心，希望在炎熱的南台灣氣候中，為大家帶來一份清涼又幸福的甜蜜滋味。無論是與朋友聚會、家庭出遊，或是在布袋小鎮旅途中稍作休息，一碗綿密香甜的雪花冰，總能讓人感受到滿滿的消暑與滿足。
        未來，布冰雪花也將持續推出更多創新口味，結合在地特色與創意，讓更多人認識來自布袋的在地冰品魅力。
      </p>
      <p class="section-body reveal" style="--delay:0.35s" style2="margin-top:14px">
        每一道冰品都是一次朝聖——對食材的尊重、對技藝的執著、對每位賓客的用心。
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
  { num: '15+', label: '招牌冰品' },
  { num: '60+', label: '果汁飲料' },
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
