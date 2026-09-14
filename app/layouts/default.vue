<template>
  <div class="text-[var(--term-text)] min-h-screen flex flex-col">
    <a href="#main-content" class="skip-to-content">aller au contenu principal</a>
    <TheHeader />
    <main class="flex-1" id="main-content" role="main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
