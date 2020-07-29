import Vue from 'vue'
import App from './app.vue';
import Router from './router.js';

Vue.config.productionTip = false;

new Vue({
    Router,
    components:{App},
    render: h => h(App)
}).$mount('#app')