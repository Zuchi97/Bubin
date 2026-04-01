<template>
  <section class="gallery-section" id="gallery" ref="sectionRef">
    <div class="gallery-header reveal">
      <p class="section-label">藝廊</p>
      <h2 class="section-title">每一幕，<em>都值得回味</em></h2>
    </div>

    <div class="gallery-grid">
      <div
        v-for="(photo, i) in photos"
        :key="photo.id"
        :class="['gallery-item', `item-${i + 1}`, 'reveal']"
        :style="`--delay:${0.08 * i}s`"
        @click="openLightbox(i)"
      >
        <img :src="photo.src" :alt="photo.alt" loading="lazy" />
        <div class="gallery-overlay">
          <span class="overlay-icon">+</span>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="lb">
      <div class="lightbox" v-if="lightboxIndex !== null" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox">✕</button>
        <button class="lb-prev" @click="prevPhoto" v-if="lightboxIndex > 0">‹</button>
        <div class="lb-content">
          <img :src="photos[lightboxIndex].src" :alt="photos[lightboxIndex].alt" />
        </div>
        <button class="lb-next" @click="nextPhoto" v-if="lightboxIndex < photos.length - 1">›</button>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const lightboxIndex = ref(null)
function openLightbox(i) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }
function prevPhoto() { if (lightboxIndex.value > 0) lightboxIndex.value-- }
function nextPhoto() { if (lightboxIndex.value < photos.length - 1) lightboxIndex.value++ }

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=80', alt: '餐廳氛圍' },
  { id: 2, src: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80', alt: '精緻料理' },
  { id: 3, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', alt: '主廚料理' },
  { id: 4, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', alt: '餐廳內部' },
  { id: 5, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', alt: '食物特寫' },
]
</script>

<style scoped>
.gallery-section {
  padding: var(--section-pad-v) var(--section-pad-h) 0;
  background: var(--warm-white);
}

.gallery-header { margin-bottom: 40px; }
.gallery-header .section-title { margin-bottom: 0; }

/* Grid — asymmetric layout */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 280px 280px;
  gap: 3px;
}
.gallery-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.gallery-item.item-1 { grid-column: 1 / 3; }
.gallery-item.item-4 { grid-column: 4 / 5; grid-row: 1 / 3; }
.gallery-item.item-5 { grid-column: 3 / 4; }

.gallery-item img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.75s var(--ease), filter 0.4s;
  filter: brightness(0.9);
}
.gallery-item:hover img {
  transform: scale(1.07);
  filter: brightness(1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28,26,23,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s;
}
.gallery-item:hover .gallery-overlay { opacity: 1; }

.overlay-icon {
  font-size: 2.5rem;
  font-weight: 200;
  color: var(--cream);
  line-height: 1;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(28,26,23,0.96);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lb-content {
  max-width: 90vw;
  max-height: 90vh;
}
.lb-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}
.lb-close {
  position: absolute;
  top: 24px; right: 28px;
  font-size: 1.2rem;
  color: rgba(245,240,232,0.5);
  cursor: pointer;
  background: none; border: none;
  transition: color 0.2s;
}
.lb-close:hover { color: var(--cream); }
.lb-prev, .lb-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  font-weight: 200;
  color: rgba(245,240,232,0.4);
  background: none; border: none; cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
  padding: 0 16px;
}
.lb-prev { left: 12px; }
.lb-next { right: 12px; }
.lb-prev:hover, .lb-next:hover { color: var(--cream); }

/* Lightbox transition */
.lb-enter-active, .lb-leave-active { transition: opacity 0.35s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

/* Reveal */
.reveal { transition-delay: var(--delay, 0s); }

@media (max-width: 860px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 220px);
  }
  .gallery-item.item-1,
  .gallery-item.item-4,
  .gallery-item.item-5 {
    grid-column: auto;
    grid-row: auto;
  }
}
@media (max-width: 500px) {
  .gallery-grid { grid-template-columns: 1fr; grid-template-rows: repeat(5, 220px); }
}
</style>
