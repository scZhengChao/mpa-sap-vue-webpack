import Vue from 'vue'
import App from './app.vue';
import router from './router.js';

Vue.config.productionTip = false;

new Vue({
    router,
    components:{App},
    render: h => h(App)
}).$mount('#app')