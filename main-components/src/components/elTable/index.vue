<template>
  <!--
    一般的el-table-column格式
     prop: 'requestNo',
     label: '商户查询请求流水号',;
     tooltip: true,;
     sortable: false,;
     formatter: '',;
    stripe: true, // 是否为斑马纹
-->
  <div>
    <Table
      :data="table.data"
      v-loading="table.loading"
      :stripe="table.stripe"
      :height="table.height"
      size="small"
    >
      <template v-for="item in table.header">
        <el-table-column
          type="selection"
          :width="item.width"
          v-if="item.prop == 'selection'"
          :key="item.label"
        >
        </el-table-column>
        <template v-else-if="item.prop == 'options'">
          <template v-if="table.options.length">
            <el-table-column
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
              :key="item.label"
              :header-align="item.headAlign || 'right'"
              :align="item.align || 'center'"
            >
              <!-- >/**buttonKeyFn(table.buttonKey, btn.label, scope.row.key) */ -->
              <template slot-scope="scope">
                <template v-for="btn in table.options">
                  <el-button
                    :key="btn.id"
                    :type="btn.type"
                    v-if="btn.isShow ? btn.isShow(scope.row) : true"
                    :disabled="btn.disabled ? btn.disabled(scope.row) : false"
                    @click="btn.event(scope.row)"
                    >{{
                      typeof btn.label === 'function' ? btn.label(scope.row) : btn.label
                    }}</el-button
                  >
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
        <!-- 图片处理 -->
        <template v-else>
          <template v-if="item.isImg">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="item.label"
            >
              <template slot-scope="scope">
                <el-popover placement="left" trigger="click">
                  <div>
                    <el-image
                      style="width: 300px; height: auto;"
                      :src="scope.row[item.prop]"
                      fit="contain"
                      slot="reference"
                    ></el-image>
                  </div>
                  <el-image
                    style="width: 100px; height: 100px;"
                    :src="scope.row[item.prop]"
                    fit="contain"
                    slot="reference"
                  ></el-image>
                </el-popover>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            v-else
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :formatter="item.formatter ? item.formatter : null"
            :show-overflow-tooltip="item.tooltip ? item.tooltip : false"
            :sortable="item.sortable ? item.sortable : false"
            :header-align="item.headAlign || 'right'"
            :align="item.align || 'center'"
            :fixed="item.fixed"
          >
            <template slot="header" v-if="item.headerIconDetail">
              <span style=" display: inline-block; margin-right: 5px;">{{ item.label }}</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.headerIconDetail"
                placement="top"
              >
                <i style="color: #1d84ef;" class="el-icon-question"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </template>
      </template>
      <template slot="empty">
        <noData />
      </template>
    </Table>
    <pagination
      v-if="!table.pageType"
      :page-num="paginationObj.pageNum"
      :total="paginationObj.total"
      :disabled="paginationObj.disabled"
      @getDataList="paginationObj.event"
    ></pagination>
  </div>
</template>

<script>
import Vue from 'vue';
import { Table, Loading } from 'element-ui';
Vue.use(Loading);
export default {
  components: { Table },
  props: {
    table: {
      type: Object,
      default: () => ({ stripe: true, loading: false, data: [], header: [], options: [] }),
    },
    paginationObj: {
      type: Object,
      default: () => ({ data: [], pageNum: 1, total: 0, disabled: false, event() {} }),
    },
  },
  data() {
    return {};
  },
  methods: {
    buttonKeyFn(buttonKey, labelArr, flag) {
      console.log(flag);
      if (buttonKey && Array.isArray(labelArr)) {
        if (flag) {
          return labelArr[1];
        }
        return labelArr[0];
      }
      return labelArr;
    },
  },
};
</script>
<style lang="scss" scoped></style>
