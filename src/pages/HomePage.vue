<script setup>
import HeroSection from "../components/HeroSection.vue";
import HowItWorks from "../components/HowItWorks.vue";
import RiskFree from "../components/RiskFree.vue";
import { defineAsyncComponent } from "vue";
import PricingSection from "../components/PricingSection.vue";
import CareSection from "../components/CareSection.vue";
import ReferralSection from "../components/ReferralSection.vue";
import AboutSection from "../components/AboutSection.vue";
import FAQSection from "../components/FAQSection.vue";
import ProposalCTA from "../components/ProposalCTA.vue";
// __CASE_STUDY__ mirrors show.caseStudy (see vite.config.js); when false the
// case study is dropped from the build entirely.
const CaseStudy = __CASE_STUDY__
  ? defineAsyncComponent(() => import("../components/CaseStudy.vue"))
  : null;
</script>

<template>
  <HeroSection />
  <HowItWorks />
  <RiskFree />
  <CaseStudy v-if="CaseStudy" />
  <PricingSection />
  <CareSection />
  <ReferralSection />
  <AboutSection />
  <FAQSection />
  <ProposalCTA />
</template>
