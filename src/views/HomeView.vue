<template>
  <div class="home">
    <NavBar />
    <HeroSection />
    <MarqueeBar />
    <AboutSection />
    <MenuHighlights />
    <ReservationForm />
    <!-- <GalleryGrid /> --> <!-- 先隱藏，等有內容再放上 -->
    <InfoBar />
    <SiteFooter />

    <!-- Back to top -->
    <Transition name="fade">
      <button v-if="showTop" class="back-top" @click="scrollTop" aria-label="回到頂端">↑</button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import MarqueeBar from '@/components/MarqueeBar.vue'
import AboutSection from '@/components/AboutSection.vue'
import MenuHighlights from '@/components/MenuHighlights.vue'
import ReservationForm from '@/components/ReservationForm.vue'
import GalleryGrid from '@/components/GalleryGrid.vue'
import InfoBar from '@/components/InfoBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 600
}
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.home { position: relative; }

/* Back to top */
.back-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 150;
  width: 44px;
  height: 44px;
  background: var(--charcoal);
  color: var(--gold);
  border: 1px solid rgba(184,151,90,0.3);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, color 0.3s, transform 0.3s;
}
.back-top:hover {
  background: var(--gold);
  color: var(--charcoal);
  transform: translateY(-3px);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.35s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
