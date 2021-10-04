<template>
    <form @submit.prevent="addTodo()" class="col-12 col-lg-6">
        <input v-model="NewTodo" placeholder="enter todo" type="text" class="form-control">
    </form>
</template>

<script>
export default {
    data(){
        return {
            NewTodo:""
        }
    },
    methods:{
        addTodo(){
            if(this.NewTodo.length>1){
                this.$emit("on-add",this.NewTodo)
                console.log(this.NewTodo)
            }
            this.NewTodo = ""
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>