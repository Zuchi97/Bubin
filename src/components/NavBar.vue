<template>
  <nav :class="['navbar', { scrolled: isScrolled, 'menu-open': menuOpen }]" role="navigation">
    <!-- Logo -->
    <RouterLink to="/" class="nav-logo">布冰雪花</RouterLink>

    <!-- Desktop links -->
    <ul class="nav-links">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" @click.prevent="scrollTo(link.href)">{{ link.label }}</a>
      </li>
    </ul>

    <!-- Reserve CTA -->
    <a href="#reserve" class="nav-reserve btn" @click.prevent="scrollTo('#reserve')">
      立即訂位
    </a>

    <!-- Mobile hamburger -->
    <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
      <span></span><span></span><span></span>
    </button>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div class="mobile-drawer" v-if="menuOpen">
        <ul>
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" @click.prevent="mobileNav(link.href)">{{ link.label }}</a>
          </li>
          <li>
            <a href="#reserve" class="drawer-reserve" @click.prevent="mobileNav('#reserve')">立即訂位</a>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isScrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '#about',   label: '關於我們' },
  { href: '#menu',    label: '菜單'     },
  { href: '#gallery', label: '藝廊'     },
  { href: '#reserve', label: '訂位'     },
  { href: '#contact', label: '聯絡'     },
]

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

function scrollTo(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

function mobileNav(hash) {
  menuOpen.value = false
  setTimeout(() => scrollTo(hash), 300)
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(20px, 4vw, 56px);
  height: var(--nav-h);
  transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
}

.navbar.scrolled {
  background: rgba(253, 250, 244, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

/* Logo */
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cream);
  transition: color 0.4s;
}
.navbar.scrolled .nav-logo { color: var(--charcoal); }

/* Desktop links */
.nav-links {
  display: flex;
  gap: 36px;
}
.nav-links a {
  font-size: 1.0rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.8);
  transition: color 0.3s;
}
.navbar.scrolled .nav-links a { color: var(--muted); }
.nav-links a:hover { color: var(--gold) !important; }

/* Reserve CTA */
.nav-reserve {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  padding: 10px 22px;
  color: var(--cream);
  border: 1px solid rgba(245,240,232,0.4);
  background: transparent;
  transition: all 0.3s;
}
.navbar.scrolled .nav-reserve {
  color: var(--gold);
  border-color: var(--gold);
}
.nav-reserve:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--charcoal) !important;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--cream);
  transition: background 0.4s, transform 0.3s;
}
.navbar.scrolled .hamburger span { background: var(--charcoal); }
.navbar.menu-open .hamburger span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.navbar.menu-open .hamburger span:nth-child(2) { opacity: 0; }
.navbar.menu-open .hamburger span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile drawer */
.mobile-drawer {
  position: fixed;
  inset: var(--nav-h) 0 0 0;
  background: var(--charcoal);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mobile-drawer ul { text-align: center; }
.mobile-drawer li { margin: 20px 0; }
.mobile-drawer a {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--cream);
  letter-spacing: 0.05em;
  transition: color 0.3s;
}
.mobile-drawer a:hover { color: var(--gold); }
.drawer-reserve {
  display: inline-block;
  margin-top: 12px;
  padding: 12px 32px !important;
  border: 1px solid var(--gold) !important;
  color: var(--gold) !important;
  font-family: var(--font-body) !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase;
}

/* Drawer transition */
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.35s, transform 0.35s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-12px); }

@media (max-width: 860px) {
  .nav-links, .nav-reserve { display: none; }
  .hamburger { display: flex; }
}
</style>
