<template>
  <div style="padding: 20px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="wangeditor" name="1">
        <div v-show="editor" id="textarea" v-html="editorContent"></div>
        <div v-show="editor" style="border: 1px solid #ccc; border-top: none; line-height: 18px">
          <div style="background-color: #fafbfd" v-if="tipType !== 4">
            <el-icon
                type="info-circle"
                style="color: #3c4fe0; margin-left: 10px"
                :style="{ color: [1, 2, 3].includes(tipType) ? '#FFB020' : '#3c4fe0' }"
                theme="filled"
            />
            {{ tipTextList[tipType] }}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="vue-quill-editor" name="2">
        <quill-editor v-model="desc" ref="myQuillEditor" :options="editorOption" :getContents="getContents"></quill-editor>
      </el-tab-pane>
      
      <div v-html="desc"></div>
    </el-tabs>
  
  </div>
</template>
<script>
import E from 'wangeditor';

const tipTextList = {
  0: '"指标描述、是否可累加、计算公式"字段是固定字段，请勿删除及修改。',
  1: '"指标描述："字段是固定字段，请勿删除及修改。',
  2: '"是否可累加："字段是固定字段，请勿删除及修改。',
  3: '"计算公式："字段是固定字段，请勿删除及修改。',
  4: [
    '请输入指标描述和口径，如有多个口径，请换行填写，如：数据日期当天申购主站单基金产品的订单数(组合产品会按照分单进行统计)',
    '请输入累加属性，在可累加/不可累加/半可累加中选择一个输入，如果是半可累加，需增加场景描述。',
    '请输入计算公式，如果没有，输入无',
  ],
};

const editorContent = `<div class="i-editor-index-box">
        <div class="i-editor-index-desc">
          <span class="i-editor-index-desc1">指标描述：</span>
          <div class="i-editor-desc" contenteditable="true">
            <div class="i-editor-desc-placeholder">
              <div>请输入指标描述和口径，如有多个口径，请换行填写，如：数据日期当天申购主站单基金产品的订单数(组合产品会按照分单进行统计）</div>
              <div>1、排除了现金分红、保险购买、保险赔付、零钱通产品的交易类型订单。</div>
              <div>2、交易时间在当天的交易。</div>
            </div>
          </div>
        </div>
       <div class="i-editor-lei-jia">
          <span class="i-editor-index-desc2">是否可累加：</span>
         <div class="i-editor-rich i-editor-lei-jia-node" contenteditable="true" placeholder="请输入累加属性，在可累加/不可累加/半可累加中选择一个输入，如果是半可累加，需增加场景描述。"></div>
        </div>
        <div class="i-editor-ji-suan">
          <span class="i-editor-index-desc3">计算公式：</span>
          <div class="i-editor-rich i-editor-ji-suan-node"  contenteditable="true"  placeholder="请输入计算公式，如果没有，输入无"></div>
        </div>
      </div>`;
export default {
  name: 'textEditor',
  data() {
    return {
      activeName: '1',
      tipType: undefined,
      editor: null,
      tipTextList,
      editorContent,
      desc: '',
      editorOption: {
        debug: 'info',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{header: 1}, {header: 2}],
            [{align: []}],
            [{list: 'ordered'}, {list: 'bullet'}],
            [{indent: '-1'}, {indent: '+1'}],
            [{size: ['small', false, 'large', 'huge']}],
            [{color: []}, {background: []}],
            [{script: 'sub'}, {script: 'super'}],
            ['clean'],
            ['blockquote'],
            // ['link', 'code-block', 'image'],
            ['link', 'code-block'],
          ],
        },
        placeholder: '',
        readOnly: true,
        theme: 'snow',
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.tipType = this.type === 'edit' ? 4 : 0;
      setTimeout(() => {
        this.initE();
        const editorDesc = document.querySelector('.i-editor-desc');
        const leiJia = document.querySelector('.i-editor-lei-jia-node');
        const jiSuan = document.querySelector('.i-editor-ji-suan-node');
        if (editorDesc) {
          editorDesc.onclick = this.clickTextDesc;
        }
        if (leiJia) {
          leiJia.onclick = this.clickTextLeiJia;
        }
        if (jiSuan) {
          jiSuan.onclick = this.clickTextJiSuan;
        }
      }, 500);
    });
  },

  props: {
    onChange: {
      type: Function,
    },

    type: {
      type: String,
      default: () => 'add',
    }, // 编辑跟新增提示显示不一样
    htmlVal: String,
  },

  methods: {
    clickTextDesc() {
      const editorDesc = document.querySelector('.i-editor-desc');
      const placeholder = document.querySelector('.i-editor-desc-placeholder');
      if (editorDesc && placeholder) {
        editorDesc.innerHTML = '';
      }
    },
    clickTextLeiJia() {
      document.querySelector('.i-editor-lei-jia-node').setAttribute('placeholder', '');
    },
    clickTextJiSuan() {
      document.querySelector('.i-editor-ji-suan-node').setAttribute('placeholder', '');
    },
    AutoCompleTitle(name, text) {
      const html = document.querySelector(name);
      html.innerHTML = text;
    },
    descriptionChange(val) {
      if (
          // eslint-disable-next-line operator-linebreak
          !val ||
          // eslint-disable-next-line operator-linebreak
          (!String(val).includes('指标描述：') &&
              // eslint-disable-next-line operator-linebreak
              !String(val).includes('是否可累加：') &&
              !String(val).includes('计算公式：'))
      ) {
        document.querySelector('.w-e-text').innerHTML = editorContent;
        const editorDesc = document.querySelector('.i-editor-desc');
        editorDesc.onclick = this.clickTextDesc;
        const letJia = document.querySelector('.i-editor-lei-jia-node');
        letJia.onclick = this.clickTextLeiJia;
        const jiSuan = document.querySelector('.i-editor-ji-suan-node');
        jiSuan.onclick = this.clickTextJiSuan;
        this.$emit('descriptionChange', '');
        return;
      }
      if (!document.querySelector('.i-editor-desc')) {
        document.querySelector(
            '.i-editor-index-desc',
        ).innerHTML = ` <span class="i-editor-index-desc1">指标描述：</span>
        <div class="i-editor-desc" contenteditable="true">
            <div class="i-editor-desc-placeholder">
              <div>请输入指标描述和口径，如有多个口径，请换行填写，如：数据日期当天申购主站单基金产品的订单数(组合产品会按照分单进行统计）</div>
              <div>1、排除了现金分红、保险购买、保险赔付、零钱通产品的交易类型订单。</div>
              <div>2、交易时间在当天的交易。</div>
            </div>
          </div>
        `;
        const editorDesc = document.querySelector('.i-editor-desc');
        editorDesc.onclick = this.clickTextDesc;
      }
      if (!document.querySelector('.i-editor-lei-jia-node') && document.querySelector('.i-editor-lei-jia')) {
        const node = document.createElement('div');
        node.setAttribute('class', 'i-editor-rich i-editor-lei-jia-node');
        node.setAttribute('contenteditable', 'true');
        node.setAttribute(
            'placeholder',
            '请输入累加属性，在可累加/不可累加/半可累加中选择一个输入，如果是半可累加，需增加场景描述。',
        );
        document.querySelector('.i-editor-lei-jia').appendChild(node);
        node.onclick = this.clickTextLeiJia;
      }
      if (!document.querySelector('.i-editor-ji-suan-node') && document.querySelector('.i-editor-ji-suan')) {
        const node = document.createElement('div');
        node.setAttribute('class', 'i-editor-rich i-editor-ji-suan-node');
        node.setAttribute('contenteditable', 'true');
        node.setAttribute('placeholder', '请输入计算公式，如果没有，输入无');
        document.querySelector('.i-editor-ji-suan').appendChild(node);
        node.onclick = this.clickTextJiSuan;
      }

      const desc1 = document.querySelector('.i-editor-index-desc1');
      const desc2 = document.querySelector('.i-editor-index-desc2');
      const desc3 = document.querySelector('.i-editor-index-desc3');
      if (desc1 && desc1.textContent !== '指标描述：') {
        this.tipType = 1;
        this.AutoCompleTitle('.i-editor-index-desc1', '指标描述：');
      }
      if (desc2 && desc2.textContent !== '是否可累加：') {
        this.tipType = 2;
        this.AutoCompleTitle('.i-editor-index-desc2', '是否可累加：');
      }
      if (desc3 && desc3.textContent !== '计算公式：') {
        this.tipType = 3;
        this.AutoCompleTitle('.i-editor-index-desc3', '计算公式：');
      }

      this.$emit('descriptionChange', val);
    },
    initE() {
      this.editor = new E('#textarea');
      this.editor.config.placeholder = '请输入文本';
      this.editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        // 'indent',
        // 'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        // 'table',
        'splitLine',
        'undo',
        'redo',
      ];
      this.editor.config.showFullScreen = false;
      this.editor.config.onchange = (newHtml) => {
        this.descriptionChange(newHtml);
      };
      this.editor.create();
      // this.editor = editor;
    },

    getContents(v) {
      console.log(v, 55555);
    }
  },
};
</script>
<style>
.i-editor-index-desc1,
.i-editor-index-desc2,
.i-editor-index-desc3 {
  display: block;
  color: #15192c;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  font-weight: bold;
}

.i-editor-index-desc,
.i-editor-lei-jia,
.i-editor-ji-suan {
  display: block;
  margin-bottom: 10px;
}

.i-editor-desc,
.i-editor-rich {
  display: block;
  padding: 0;
  overflow-y: auto;
  border: none;
  line-height: 24px;
  min-height: 24px;
  color: #474d66;
  outline: none;
}

.i-editor-desc .i-editor-desc-placeholder {
  color: #c1c4d6;
}

.i-editor-desc p {
  margin: 0 !important;
  font-size: 14px !important;
}

/*焦点时内容为空*/
.i-editor-rich:focus:before {
  content: none !important;
}

/*为空时显示 element attribute content*/
.i-editor-rich:empty:before {
  content: attr(placeholder); /* element attribute*/
  color: #c1c4d6;
  line-height: 18px;
}

/*焦点时内容为空*/
.i-editor-rich:focus:before {
  content: none;
  color: #bfadad;
}

textarea::-webkit-input-placeholder {
  color: #1890ff !important;
}

textarea:-ms-input-placeholder {
  color: #1890ff !important;
}

textarea:-moz-placeholder {
  color: #1890ff !important;
}

textarea::-moz-placeholder {
  color: #1890ff !important;
}

.w-e-toolbar {
  z-index: inherit !important;
}

.w-e-text-container {
  z-index: inherit !important;
}
</style>
<style lang="scss" scoped>
/deep/ .ql-picker-label {
  display: flex;
}

/deep/ .ql-editor {
  min-height: 250px;
}
</style>
