import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles.css';

const app = createApp(App);

const fontFamily = `${process.env.VUE_APP_FONT_FAMILY}, sans-serif`;
document.documentElement.style.setProperty('--font-family', fontFamily);

app.mount('#app');