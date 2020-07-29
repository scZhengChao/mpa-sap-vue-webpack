<template>
<div>
    <div class="box">{{title}}</div>
</div>
</template>

<script>
export default {
    data(){return{
        title:'hello world'
    }}
}
</script>
<style lang='scss' scoped>
    .box{
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: 30px;
    }
</style>