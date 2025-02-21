<template>
    <button v-if="uploadApiUrl" class="btn" @click="uploadImage">获取外链</button>
    
    <!-- 上传弹窗 -->
    <div class="custom-popup" :class="{ 'show': showPopup }">
      <div class="popup-content">
        <p v-if="isSuccess">{{ successMessage }}</p>
        <p v-else>{{ errorMessage }}</p>
        <a v-if="isSuccess" :href="uploadedImageUrl" target="_blank">{{ uploadedImageUrl }}</a>
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