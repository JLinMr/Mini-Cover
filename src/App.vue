<template>
    <HeaderComponent />
      <CoverGenerator />
    <FooterComponent />
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