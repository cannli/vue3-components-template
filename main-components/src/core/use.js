import Vue from 'vue';
import elTable from '@/components/elTable/index.vue';
import noData from '@/components/noData';
import pagination from '@/components/pagination/pagination.vue';
import lodash from 'lodash';

Vue.prototype.lodash = lodash;
Vue.component('elTable', elTable);
Vue.component('noData', noData);
Vue.component('pagination', pagination);
