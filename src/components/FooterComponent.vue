<template>
  <footer>
    <span>富强</span>
    <span>民主</span>
    <span>文明</span>
    <span>和谐</span>
    <span>自由</span>
    <span>平等</span>
    <span>公正</span>
    <span>法治</span>
    <span>爱国</span>
    <span>敬业</span>
    <span>诚信</span>
    <span>友善</span>
    <div class="icp">
      <span>© 2024</span><a href="https://bsgun.cn" target="_blank">梦爱吃鱼</a>
      <a v-if="icpNumber" href="https://beian.miit.gov.cn/" target="_blank">{{ icpNumber }}</a>
      <button class="logo-btn" @click="toggleTips">小提示</button>
    </div>
  </footer>
  <!-- 小提示弹窗 -->
  <div class="tips-popup" :class="{ 'show': showTipsPopup }">
    <div class="popup-content">
      <span>为避免性能问题，建议不要连续做图</span>
      <span>建议经常<a href="/">刷新页面</a>优化性能</span>
      <span class="highlight"><strong>重要提示：请确保您的浏览器和设备性能良好</strong></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTipsPopup: false,
      icpNumber: process.env.VUE_APP_ICP_NUMBER
    };
  },
  methods: {
    toggleTips() {
      this.showTipsPopup = !this.showTipsPopup;

      if (this.showTipsPopup) {
        setTimeout(() => {
          this.showTipsPopup = false;
        }, 3000);
      }
    }
  }
};
</script>