<template>
  <div class="components-container">
    <a href="../../../xuexiwendang/vuejs-cheatsheet.pdf">vuejs-cheatsheet</a>
    <aside>
      Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html">Documentation</a>
    </aside>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <!--    <div class="editor-content" v-html="content" />-->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  },
  watch: {
    content(val1, val2){
      console.log(val1, 111111);
      console.log(val2, 2222222);
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

