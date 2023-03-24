<template>
  <!--pdf预览-->
  <div class="pdf-view-box">
    <el-button @click="handler">打开pdf</el-button>
    <vueshowpdf
        v-show="isshowpdf"
        v-model="isshowpdf"
        class="pdf-box"
        :pdfurl="pdfUrls"
        :maxscale="4"
        :minscale="0.6"
        :scale="1.2"
        @closepdf="closepdf"
        @pdferr="pdferr"
    />
    <div
        v-show="isshowpdf"
        role="button"
        class="viewer-button viewer-close"
        data-viewer-action="mix"
        @click.stop.prevent="closepdf"
    />
  </div>
</template>

<script>
import vueshowpdf from 'vueshowpdf'

export default {
  name: "index",
  components: {vueshowpdf},
  data() {
    return {
      isshowpdf: false,
      pdfUrls: 'https://docs.qq.com/pdf/DYUZYTXFBdURPT1pV',
    }
  },
  methods: {
    // close pdf
    closepdf() {
      this.isshowpdf = false
    },
    pdferr(errurl) {
      console.log(errurl)
    },
    handler() {
      this.isshowpdf = true
    }
  }
}
</script>

<style>
.pdf-box .center .contor {
  position: absolute !important;
  bottom: 0 !important;
  transform: translate(50%, -50%);
}

.pdf-box .center {
  padding-top: 0 !important;
  margin-top: 10px;
  margin-bottom: 10px;
}

.viewer-button {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  height: 80px;
  overflow: hidden;
  position: absolute;
  right: -40px;
  top: -40px;
  -webkit-transition: background-color 0.15s;
  transition: background-color 0.15s;
  width: 80px;
  z-index: 100000;
}

.viewer-button::before {
  bottom: 15px;
  left: 15px;
  position: absolute;
}

.viewer-close::before {
  background-position: -260px 0;
  content: 'Close';
}
</style>
