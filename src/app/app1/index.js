import Vue from 'vue';
import App from './app.vue';
import config  from './config'

Vue.prototype.$myGlobal = config
new Vue({
    components:{App},
    render: h => h(App)
}).$mount('#app')