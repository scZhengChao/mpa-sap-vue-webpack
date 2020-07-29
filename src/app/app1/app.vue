<template>
<div>
    app1

    骑着我心爱的小摩托
    <div class="box">
        zhehsi test 
    </div>
        <com1></com1>
</div>
</template>

<script>
    import com1 from "./component1.vue";
export default {
    components:{
        com1
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
        
    }
</style>