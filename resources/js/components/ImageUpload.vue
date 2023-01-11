<template>
  <label class="btn font-weight-light btn-outline-secondary rounded-0 w-25">
    Upload photo <input type="file" hidden @change="upload($event.target.files)">
  </label>
</template>

<script>
import axios from 'axios'

export default {
name: "ImageUpload",
  emits: ['file-uploaded'],
  setup(_, context) {
    const upload = async (files) => {
      const file = files.item(0);
      const data = new FormData;
      data.append('image', file);
      const response = await axios.post('upload', data);
      context.emit('file-uploaded', response.data.url);
    }


    let compressedImageBlob;

    let resizingFactor = 0.8;
    let quality = 0.8;

    function compressImage(imgToCompress) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const resizingFactor = .8;

      const originalWidth = imgToCompress.width;
      const originalHeight = imgToCompress.height;

      const canvasWidth = originalWidth * resizingFactor;
      const canvasHeight = originalHeight * resizingFactor;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.drawImage(
          imgToCompress,
          0,
          0,
          originalWidth * resizingFactor,
          originalHeight * resizingFactor
      );
    }
    return {
      upload
    }
  }
}
</script>

<style scoped>

</style>