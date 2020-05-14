import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios';
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
Vue.prototype.$axios = axios;
//完整引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
//按需引入
//import { Button, Select,Menu ,Container} from 'element-ui';
import App from './App.vue'

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.component(Menu.name, Menu);
// Vue.component(Container.name, Container);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
