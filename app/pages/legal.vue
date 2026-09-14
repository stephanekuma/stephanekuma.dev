<script setup lang="ts">
import { siteMeta } from '~/data/site'

useSeoMeta({
  title: 'mentions légales — stephane.dev'
})
</script>

<template>
  <section class="max-w-2xl mx-auto px-6 py-16">
    <p class="text-[var(--term-green)] text-sm mb-3 prompt">cat mentions-legales.md</p>
    <h1 class="text-3xl font-bold mb-10">Mentions légales & confidentialité</h1>

    <div class="space-y-8 text-sm text-[var(--term-dim)] leading-relaxed">
      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">Éditeur du site</h2>
        <p>{{ siteMeta.name }} — {{ siteMeta.location }}.<br />Contact : {{ siteMeta.email }}</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">Hébergement</h2>
        <p>À compléter avec les informations de ton hébergeur une fois le site déployé (nom, adresse, contact).</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">Données collectées</h2>
        <p>
          Le formulaire de contact de ce site recueille votre nom, votre email et le contenu de votre message,
          dans le seul but de répondre à votre demande. Ces données ne sont ni revendues ni transmises à des tiers.
        </p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">Cookies</h2>
        <p>Ce site n'utilise pas de cookies de suivi. À mettre à jour si un outil d'analyse d'audience est ajouté par la suite.</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">Vos droits</h2>
        <p>Vous pouvez demander l'accès, la correction ou la suppression de vos données en écrivant à {{ siteMeta.email }}.</p>
      </div>

      <p class="text-xs text-[var(--term-dim)] pt-4 border-t border-[var(--term-border)]">
        Ce texte est un modèle de départ — à faire relire par un professionnel du droit avant mise en ligne
        officielle, notamment si le site collecte des données de résidents européens (RGPD) ou traite des
        paiements.
      </p>
    </div>
  </section>
</template>
