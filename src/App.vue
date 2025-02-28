<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent class="py-4" />
    <CoverGenerator class="flex-1" />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import CoverGenerator from './components/CoverGenerator.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    CoverGenerator,
    FooterComponent
  }
};
</script>