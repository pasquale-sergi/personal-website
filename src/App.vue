<script setup>
import AppHeader from "./components/AppHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import HowItWorks from "./components/HowItWorks.vue";
import PricingSection from "./components/PricingSection.vue";
import CaseStudy from "./components/CaseStudy.vue";
import ProposalCTA from "./components/ProposalCTA.vue";
import FAQSection from "./components/FAQSection.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <a href="#main" class="skip-link">Zum Inhalt springen</a>
  <AppHeader />
  <main id="main">
    <HeroSection /><HowItWorks /><PricingSection /><CaseStudy /><ProposalCTA /><FAQSection />
  </main>
  <AppFooter />
</template>
