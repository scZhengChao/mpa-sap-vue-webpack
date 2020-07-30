<template>
<div>
    app1
    {{config.url}}
    骑着我心爱的小摩托
    <div class="box">
        zhehsi test 
        <p>244hhhh4</p>
    </div>
        <com1></com1>
</div>
</template>

<script>
    import com1 from "./component1.vue";
export default {
    components:{
        com1
    },
    data(){return{
        config:this.$myGlobal
    }},
    created(){
      
    }
}
</script>
<style lang='scss' scoped>
    .box{
        width: 100px;
        height: 200px;
        background-color: brown;
        overflow: hidden;
        text-align: center;

        p {
            color:red;
        }
    }
</style>