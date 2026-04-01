<template>
  <section class="hero" id="home">
    <div class="hero-bg"></div>

    <!-- Decorative vertical text -->
    <span class="hero-vertical">Est. 2024 · Taiwan</span>

    <div class="hero-content">
      <p class="hero-eyebrow">甜點冰品 · 精緻體驗</p>
      <h1 class="hero-title">
        Fine<br />
        <em>Dining</em><br />
        Redefined.
      </h1>
      <div class="hero-divider"></div>
      <p class="hero-sub">
        融合傳統雪花冰風味與新式純雪機製成，<br />
        在 布冰雪花 享受難以忘懷的用餐旅程。
      </p>
      <div class="hero-actions">
        <a href="#menu" class="btn btn-primary" @click.prevent="scrollTo('#menu')">探索菜單</a>
        <a href="#reserve" class="btn btn-ghost-light" @click.prevent="scrollTo('#reserve')">預約座位</a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" aria-hidden="true">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
function scrollTo(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      135deg,
      rgba(28,26,23,0.55) 0%,
      rgba(28,26,23,0.2) 50%,
      rgba(28,26,23,0.75) 100%
    ),
    url('https://i.ibb.co/sD0FQYy/96cb9514-7e31-42c2-8676-72432a3cbb0e.png')
    center / cover no-repeat;
  transform: scale(1.06);
  animation: heroZoom 14s var(--ease) forwards;
  will-change: transform;
}
@keyframes heroZoom {
  from { transform: scale(1.1); }
  to   { transform: scale(1.0); }
}

/* Vertical label */
.hero-vertical {
  position: absolute;
  right: clamp(20px, 3vw, 48px);
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  transform-origin: center;
  font-size: 0.6rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.35);
  white-space: nowrap;
  z-index: 2;
}

/* Content */
.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 clamp(24px, 8vw, 128px) clamp(64px, 10vh, 120px);
  max-width: 820px;
  animation: fadeUp 1.2s 0.2s var(--ease) both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-eyebrow {
  font-size: 1.5rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 22px;
  animation: fadeUp 1.1s 0.4s var(--ease) both;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 9vw, 7.5rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--cream);
  margin-bottom: 28px;
  animation: fadeUp 1.1s 0.5s var(--ease) both;
}
.hero-title em {
  font-style: italic;
  color: var(--gold);
}

.hero-divider {
  width: 48px;
  height: 1px;
  background: rgba(245,240,232,0.3);
  margin-bottom: 24px;
  animation: fadeUp 1.1s 0.6s var(--ease) both;
}

.hero-sub {
  font-size: 0.88rem;
  letter-spacing: 0.06em;
  line-height: 1.9;
  color: rgba(245,240,232,0.65);
  margin-bottom: 44px;
  max-width: 400px;
  animation: fadeUp 1.1s 0.7s var(--ease) both;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeUp 1.1s 0.85s var(--ease) both;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: clamp(32px, 5vh, 56px);
  right: clamp(20px, 3vw, 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 2;
  animation: fadeUp 1.2s 1.2s var(--ease) both;
}
.scroll-indicator span {
  font-size: 0.58rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.35);
  writing-mode: vertical-lr;
}
.scroll-line {
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, rgba(245,240,232,0.4), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { transform: scaleY(1); opacity: 0.6; }
  50%       { transform: scaleY(0.6); opacity: 0.2; }
}

@media (max-width: 600px) {
  .hero-vertical, .scroll-indicator { display: none; }
}
</style>
