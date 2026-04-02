<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <span class="footer-logo">布冰雪花</span>
        <p>Encountering shaved ice in Chiayi.<br />每一餐都是一次雪地旅行。</p>
        <div class="footer-social">
          <a v-for="s in socials" :key="s.name" :href="s.href" :aria-label="s.name" target="_blank" rel="noopener">
            <span v-html="s.icon"></span>
          </a>
        </div>
      </div>

      <!-- Columns -->
      <div class="footer-col" v-for="col in columns" :key="col.title">
        <h4>{{ col.title }}</h4>
        <ul>
          <li v-for="link in col.links" :key="link.label">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-newsletter">
        <h4>訂閱電子報</h4>
        <p>最新菜單、活動與特惠直送信箱。</p>
        <form @submit.prevent="subscribe" class="nl-form">
          <input v-model="email" type="email" placeholder="your@email.com" />
          <button type="submit">→</button>
        </form>
        <Transition name="fade">
          <span class="nl-success" v-if="subscribed">感謝訂閱！</span>
        </Transition>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <span>© {{ year }} Varese Restaurant. All rights reserved.</span>
      <div class="footer-bottom-links">
        <a href="#">隱私權政策</a>
        <a href="#">使用條款</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const year = computed(() => new Date().getFullYear())
const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!email.value) return
  console.log('Subscribe:', email.value)
  subscribed.value = true
  email.value = ''
}

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>`
  },
  {
    name: 'Facebook',
    href: '#',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>`
  },
]

const columns = [
  {
    title: '菜單',
    links: [
      { label: '雪花冰', href: '#menu' },
      { label: '招牌冰品', href: '#menu' },
      { label: '主廚推薦', href: '#menu' },
      { label: '酒單', href: '#menu' },
    ]
  },
  {
    title: '探索',
    links: [
      { label: '關於我們', href: '#about' },
      { label: '私人包廂', href: '#reserve' },
      { label: '企業宴客', href: '#contact' }
    ]
  },
]
</script>

<style scoped>
.site-footer {
  background: var(--charcoal);
  border-top: 1px solid rgba(184,151,90,0.12);
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.6fr;
  gap: clamp(32px, 4vw, 60px);
  padding: clamp(48px, 7vw, 88px) var(--section-pad-h) clamp(32px, 5vw, 60px);
}

/* Brand */
.footer-logo {
  display: block;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cream);
  margin-bottom: 14px;
}

.footer-brand p {
  font-size: 0.82rem;
  line-height: 1.8;
  color: rgba(245,240,232,0.3);
  margin-bottom: 24px;
}

.footer-social {
  display: flex;
  gap: 14px;
}
.footer-social a {
  width: 36px; height: 36px;
  border: 1px solid rgba(245,240,232,0.12);
  display: flex; align-items: center; justify-content: center;
  color: rgba(245,240,232,0.35);
  transition: border-color 0.3s, color 0.3s;
}
.footer-social a:hover {
  border-color: var(--gold);
  color: var(--gold);
}

/* Columns */
.footer-col h4 {
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}
.footer-col ul { display: flex; flex-direction: column; gap: 10px; }
.footer-col a {
  font-size: 0.82rem;
  color: rgba(245,240,232,0.35);
  transition: color 0.3s;
}
.footer-col a:hover { color: var(--cream); }

/* Newsletter */
.footer-newsletter h4 {
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}
.footer-newsletter > p {
  font-size: 0.8rem;
  color: rgba(245,240,232,0.3);
  margin-bottom: 18px;
  line-height: 1.7;
}
.nl-form {
  display: flex;
  border-bottom: 1px solid rgba(245,240,232,0.15);
  transition: border-color 0.3s;
}
.nl-form:focus-within { border-color: var(--gold); }
.nl-form input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--cream);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 300;
  padding: 10px 0;
  outline: none;
}
.nl-form input::placeholder { color: rgba(245,240,232,0.2); }
.nl-form button {
  background: none;
  border: none;
  color: var(--gold);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.3s, transform 0.3s;
}
.nl-form button:hover { color: var(--cream); transform: translateX(3px); }
.nl-success {
  display: block;
  font-size: 0.72rem;
  color: var(--gold);
  margin-top: 10px;
  letter-spacing: 0.1em;
}

/* Bottom bar */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px var(--section-pad-h);
  border-top: 1px solid rgba(255,255,255,0.05);
  font-size: 0.7rem;
  color: rgba(245,240,232,0.18);
  letter-spacing: 0.08em;
}
.footer-bottom-links {
  display: flex;
  gap: 24px;
}
.footer-bottom-links a {
  color: rgba(245,240,232,0.18);
  transition: color 0.3s;
}
.footer-bottom-links a:hover { color: var(--cream); }

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
  .footer-newsletter { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .footer-inner { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
}
</style>
