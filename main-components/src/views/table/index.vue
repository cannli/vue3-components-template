<template>
  <div>
    <elTable :table="table" :paginationObj="paginationObj"></elTable>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      table: {
        stripe: true, // 是否为斑马纹
        loading: false, // 数据加载loading
        data: [{createTime: '2020/02/15', requestNo: '1234578', hashNo: 'hk456788', lockCount: 4, status: 3}],
        header: [
          {
            prop: 'createTime',
            label: '创建时间',
          },
          {
            prop: 'requestNo',
            label: '商户查询请求流水号',
            tooltip: true,
            sortable: false,
            formatter: '',
          },
          {
            prop: 'hashNo',
            label: '身份hash',
            tooltip: true,
          },
          {
            prop: 'lockCount',
            label: '锁次数',

            tooltip: true,
          },
          {
            prop: 'options',
            label: '操作',
            width: 150,
            fixed: 'right',
          },
        ],
        options: [
          {
            type: 'text',
            label: '减锁',
            event: this.checkPass,
            isShow: item => item.status !== 0,
          },
        ],
      },
      // 分页
      paginationObj: {
        pageNum: 1,
        total: 1,
        disabled: false,
        event: this.getData,
      },
    }
  },
  methods: {
    checkPass() {
      alert('测试按钮事件');
    },
    getData() {
      alert('分页事件');
    },
  }
};
</script>

<style scoped></style>
