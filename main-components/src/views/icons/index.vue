<template>
  <div class="icons-container">
    <aside>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
        >Add and use
      </a>
    </aside>
    <div>
      <aside>
        接下来我们就要自己来制作 svg-sprite 了。这里要使用到 svg-sprite-loader
        这个神器了， 它是一个 webpack loader ，可以将多个 svg 打包成 svg-sprite
        。
        <p>
          <a href="https://juejin.cn/post/6844903517564436493" target="_blank">
            https://juejin.cn/post/6844903517564436493
          </a>
        </p>
      </aside>
      <aside>
        <h3>SVG精简压缩工具svgo简介和初体验</h3>
        <a
          href="https://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/"
          target="_blank"
          >张鑫旭空间</a
        >
      </aside>
      <aside>
        <a href="http://www.dreamwu.com/post-1475.html" target="_blank"
          >http://www.dreamwu.com/post-1475.html</a
        >
      </aside>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div
            v-for="item of svgIcons"
            :key="item"
            @click="handleClipboard(generateIconCode(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
import svgIcons from "./svg-icons";
import elementIcons from "./element-icons";

export default {
  name: "Icons",
  data() {
    return {
      svgIcons,
      elementIcons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
