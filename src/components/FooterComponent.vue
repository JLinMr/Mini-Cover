<template>
  <footer class="sm:mt-12 mb-2 text-center text-xs sm:text-sm">
    <div class="flex flex-wrap justify-center gap-x-2 gap-y-1">
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
    </div>
    <div class="mt-2 space-x-2">
      <span>© 2024</span>
      <a href="https://bsgun.cn" 
         target="_blank"
         class="font-bold text-green-600 hover:text-gray-600 transition-colors">梦爱吃鱼</a>
      <a v-if="icpNumber" 
         href="https://beian.miit.gov.cn/" 
         target="_blank"
         class="font-bold text-green-600 hover:text-gray-600 transition-colors">{{ icpNumber }}</a>
      <button class="text-pink-500 font-bold" @click="toggleTips">小提示</button>
    </div>
    
    <!-- 小提示弹窗 -->
    <div class="fixed top-0 left-1/2 w-[90%] max-w-[600px] max-h-[82px] p-[10px] mt-[10px] bg-white text-[#333] rounded-[10px] shadow-[0_4px_8px_#0000001a] z-100 flex flex-col justify-center items-center text-center overflow-hidden transition-all duration-300 ease-in-out"
         :style="{
           opacity: showTipsPopup ? 1 : 0,
           visibility: showTipsPopup ? 'visible' : 'hidden',
           transform: `translate(-50%) translateY(${showTipsPopup ? '0' : '-20px'})`
         }"
    >
      <div class="flex flex-col text-base items-center justify-center">
        <span>为避免性能问题，建议不要连续做图</span>
        <span>建议经常<a href="/" class="text-green-600 hover:text-gray-800 transition-colors">刷新页面</a>优化性能</span>
        <span class="text-red-500 font-bold">重要提示：请确保您的浏览器和设备性能良好</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showTipsPopup: false,
      icpNumber: import.meta.env.VITE_APP_ICP_NUMBER
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