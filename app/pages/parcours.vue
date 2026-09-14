<script setup lang="ts">
import { careerHistory, coreSkills, education, secondarySkills } from '~/data/site'
import type { TimelineItem } from '~/components/Timeline.vue'

useSeoMeta({
  title: 'parcours — stephane.dev',
  description: 'Parcours professionnel de Kossi Stéphane Kuma, Architecte Solution et développeur Full Stack Web & Mobile.',
  ogTitle: 'parcours — stephane.dev',
  ogDescription: 'Parcours professionnel de Kossi Stéphane Kuma, Architecte Solution et développeur Full Stack Web & Mobile.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'parcours — stephane.dev',
  twitterDescription: 'Parcours professionnel de Kossi Stéphane Kuma, Architecte Solution et développeur Full Stack Web & Mobile.'
})

const items: TimelineItem[] = careerHistory.map((job) => ({
  eyebrow: job.period,
  title: job.title,
  description: job.description,
  dot: job.current ? 'solid' : 'outline'
}))
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">cat parcours.md</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Kossi Stéphane Kuma</h1>
      <p class="text-[var(--term-dim)] max-w-xl leading-relaxed mb-2">
        Architecte Solution à l'Agence Togo Digital depuis février 2026, développeur Full Stack Web & Mobile
        depuis 6+ ans — conception, architecture et déploiement d'applications web et mobiles à l'échelle.
      </p>
      <p class="text-[var(--term-dim)] max-w-xl leading-relaxed mb-8">
        Expertise principale en Laravel, Vue.js et Flutter, avec de l'expérience complémentaire en NestJS,
        Next.js et Django.
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="/cv-stephane-kuma.pdf"
          download
          class="inline-flex items-center gap-2 cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-5 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
        >
          télécharger mon CV (PDF)
        </a>
        <button
          type="button"
          class="inline-flex items-center gap-2 cursor-pointer border border-[var(--term-border)] text-sm px-5 py-3 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 no-print"
          @click="() => window.print()"
        >
          imprimer cette page
        </button>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <p class="text-[var(--term-green)] text-xs mb-8 prompt">git log --graph --stat</p>
        <Timeline :items="items" />
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <p class="text-[var(--term-green)] text-xs mb-6 prompt">cat skills.json</p>

        <p class="text-xs text-[var(--term-dim)] mb-3">domaine d'expertise</p>
        <div class="flex flex-wrap gap-2 mb-10">
          <SkillBadge v-for="skill in coreSkills" :key="skill" highlight>{{ skill }}</SkillBadge>
        </div>

        <p class="text-xs text-[var(--term-dim)] mb-3">annexes</p>
        <div class="flex flex-wrap gap-2">
          <SkillBadge v-for="skill in secondarySkills" :key="skill">{{ skill }}</SkillBadge>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-2 gap-10">
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">cat education.md</p>
          <div class="space-y-4 text-sm">
            <div v-for="item in education" :key="item.title">
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-[var(--term-dim)]">{{ item.place }}</p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">cat hors-ligne.txt</p>
          <p class="text-sm text-[var(--term-dim)]">Guitare et fitness — mes deux façons de décompresser quand je ne suis pas devant un terminal.</p>
        </div>
      </div>
    </section>

    <CtaSection title="On travaille ensemble ?" description="Discutons de votre projet, mission ou idée." />
  </div>
</template>
