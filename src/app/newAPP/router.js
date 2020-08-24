import index from './pages/index.vue';
import Vue from 'vue';

import Router from 'vue-router';

Vue.use(Router);

export default {
    mode:'history',
    routes:[
        {
            path:'/',
            component:index,
            meta:{
                index:0,
                title:'index'
            }
        }
    ]

}