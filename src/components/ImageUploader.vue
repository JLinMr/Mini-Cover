<template>
  <button v-if="uploadApiUrl" 
          @click="uploadImage"
          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
    获取外链
  </button>
  
  <!-- 上传弹窗 -->
  <div class="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[600px] bg-white rounded-lg shadow-lg transition-all duration-300"
       :class="[showPopup ? 'opacity-100 visible translate-y-3' : 'opacity-0 invisible translate-y-0']">
    <div class="flex flex-col items-center justify-center p-4 text-center">
      <p v-if="isSuccess">{{ successMessage }}</p>
      <p v-else class="text-red-500">{{ errorMessage }}</p>
      <a v-if="isSuccess" 
         :href="uploadedImageUrl" 
         target="_blank"
         class="text-green-600 hover:text-gray-800 transition-colors">
        {{ uploadedImageUrl }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  props: {
    canvasId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      uploadApiUrl: import.meta.env.VITE_APP_UPLOAD_API_URL,
      showPopup: false,
      uploadedImageUrl: '',
      isSuccess: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    uploadImage() {
      const canvas = document.getElementById(this.canvasId);
      canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'Canvas-Ruom.webp');
        
        fetch(this.uploadApiUrl, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.result === 'success') {
            this.showUploadResult(data.url, true);
          } else {
            this.showUploadResult('图片上传失败: ' + data.message, false);
          }
        })
        .catch(error => {
          console.error('上传图片时出错:', error);
          this.showUploadResult('图片上传失败: ' + error.message, false);
        });
      }, 'image/webp');
    },
    showUploadResult(message, isSuccess) {
      this.isSuccess = isSuccess;
      if (isSuccess) {
        this.successMessage = '图片上传成功！链接已复制到剪切板。';
        this.errorMessage = '';
        this.uploadedImageUrl = message;
      } else {
        this.successMessage = '';
        this.errorMessage = message;
        this.uploadedImageUrl = '';
      }
      this.showPopup = true;
      navigator.clipboard.writeText(message).then(() => {
        setTimeout(() => {
          this.showPopup = false;
        }, 3000);
      });
    }
  }
}
</script> 