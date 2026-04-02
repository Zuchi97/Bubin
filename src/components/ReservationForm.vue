<template>
  <section class="reservation" id="reserve" ref="sectionRef">
    <!-- Left: text -->
    <div class="res-text">
      <p class="section-label reveal">線上訂位</p>
      <h2 class="section-title reveal" style="--delay:0.1s">
        保留您的<br /><em>專屬座位</em>
      </h2>
      <div class="divider reveal" style="--delay:0.2s"></div>
      <p class="section-body reveal" style="--delay:0.25s">
        透過線上表單輕鬆預約，或直接致電我們的服務團隊。
        包場或特殊場合請提前三天以上預約。
      </p>
      <div class="res-contact reveal" style="--delay:0.35s">
        <a href="tel:+886212345678" class="contact-line">
          <span class="contact-icon">☎</span>
          <span>+886 2 1234 5678</span>
        </a>
        <a href="mailto:info@varese.com.tw" class="contact-line">
          <span class="contact-icon">✉</span>
          <span>info@varese.com.tw</span>
        </a>
      </div>
    </div>

    <!-- Right: form -->
    <form class="res-form reveal" style="--delay:0.15s" @submit.prevent="handleSubmit" novalidate>
      <div class="form-row">
        <div class="form-group" :class="{ error: errors.name }">
          <label for="name">姓名</label>
          <input id="name" v-model="form.name" type="text" placeholder="您的姓名" />
          <span class="err-msg" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="form-group" :class="{ error: errors.phone }">
          <label for="phone">電話</label>
          <input id="phone" v-model="form.phone" type="tel" placeholder="0912-345-678" />
          <span class="err-msg" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" :class="{ error: errors.date }">
          <label for="date">日期</label>
          <input id="date" v-model="form.date" type="date" :min="today" />
          <span class="err-msg" v-if="errors.date">{{ errors.date }}</span>
        </div>
        <div class="form-group">
          <label for="time">時間</label>
          <select id="time" v-model="form.time">
            <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="guests">人數</label>
        <select id="guests" v-model="form.guests">
          <option v-for="g in guestOptions" :key="g.value" :value="g.value">{{ g.label }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="notes">特殊需求（選填）</label>
        <input id="notes" v-model="form.notes" type="text" placeholder="過敏、慶生、包廂需求…" />
      </div>

      <Transition name="fade">
        <div class="success-msg" v-if="submitted">
          ✓ &nbsp;訂位成功！我們將盡快與您確認。
        </div>
      </Transition>

      <button type="submit" class="btn-submit" :disabled="submitted">
        {{ submitted ? '訂位已送出' : '確認訂位' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const today = computed(() => new Date().toISOString().split('T')[0])
const submitted = ref(false)

const form = reactive({
  name: '', phone: '', date: '', time: '18:30', guests: '2', notes: ''
})
const errors = reactive({ name: '', phone: '', date: '' })

const timeSlots = ['12:00','12:30','13:00','13:30','18:00','18:30','19:00','19:30','20:00','20:30']
const guestOptions = [
  { value:'1', label:'1 位' },
  { value:'2', label:'2 位' },
  { value:'3', label:'3 位' },
  { value:'4', label:'4 位' },
  { value:'5-6', label:'5–6 位' },
  { value:'7+', label:'7 位以上（請來電）' },
]

function validate() {
  let ok = true
  errors.name = form.name.trim() ? '' : '請輸入姓名'
  errors.phone = /^[\d\-+\s]{7,}$/.test(form.phone) ? '' : '請輸入有效電話'
  errors.date = form.date ? '' : '請選擇日期'
  if (errors.name || errors.phone || errors.date) ok = false
  return ok
}

function handleSubmit() {
  if (!validate()) return
  // ↓ 實際專案中替換為 API 呼叫
  console.log('Reservation:', { ...form })
  submitted.value = true
}
</script>

<style scoped>
.reservation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 100px);
  align-items: center;
  padding: var(--section-pad-v) var(--section-pad-h);
  background: var(--charcoal);
}

/* Text side */
.res-text .section-label { /* gold already set globally */ }
.res-text .section-title { color: var(--cream); }
.res-text .section-title em { color: var(--gold); }
.res-text .section-body { color: rgba(245,240,232,0.45); }
.res-text .divider { background: var(--gold); }

.res-contact {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.contact-line {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.82rem;
  color: rgba(245,240,232,0.35);
  transition: color 0.3s;
  letter-spacing: 0.06em;
}
.contact-line:hover { color: var(--gold); }
.contact-icon { font-size: 0.9rem; }

/* Form */
.res-form { display: flex; flex-direction: column; gap: 0; }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group { margin-bottom: 22px; }

label {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.35);
  margin-bottom: 10px;
}

input, select {
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(245,240,232,0.12);
  color: var(--cream);
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 300;
  outline: none;
  transition: border-color 0.3s;
}
input::placeholder { color: rgba(245,240,232,0.22); }
select option { background: var(--charcoal); color: var(--cream); }
input:focus, select:focus { border-color: var(--gold); }
input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }

.form-group.error input { border-color: var(--rust); }
.err-msg { display: block; font-size: 0.65rem; color: var(--rust); margin-top: 6px; }

.success-msg {
  font-size: 0.8rem;
  color: var(--gold);
  padding: 14px 0;
  letter-spacing: 0.06em;
}

.btn-submit {
  width: 100%;
  padding: 17px;
  margin-top: 8px;
  background: var(--gold);
  color: var(--charcoal);
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.btn-submit:hover:not(:disabled) { background: var(--rust); color: var(--cream); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

/* Transitions */
.reveal { transition-delay: var(--delay, 0s); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .reservation { grid-template-columns: 1fr; gap: 48px; }
  .form-row { grid-template-columns: 1fr; gap: 0; }
}
</style>
