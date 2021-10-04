<template>
    <li class="d-flex align-items-center list-group-item">
        <button 
        v-if="!Editing"
        :class="{Completed}"
        @click="$emit('on-toggle')"
         class="btn border-0 text-center flex-grow-1">{{TodoName}}</button>
        <form v-else @submit.prevent="endEditing()" class="flex-grow-1">
            <input @blur="startEditing()" v-model="newTodoName" type="text" class="form-control" />
        </form>
        <button @click="startEditing()" class="btn btn-outline-primary">Edit</button>
        <button @click="$emit('on-delete')" class="btn btn-outline-danger">Delete</button>
    </li>
</template>

<script>
    export default{
        props:{
            TodoName:String,
            Completed:Boolean
        },
        data(){
            return {
                Editing: false,
                newTodoName:""
            }
        },
        methods:{
            startEditing(){
                if(!this.Editing){
                    this.newTodoName = this.TodoName
                    this.Editing = true
                }
                else{
                    this.endEditing()
                }
            },
            endEditing(){
                this.Editing=false
                this.$emit('on-edit',this.newTodoName)
            }
        }
    }
</script>

<style scoped>
    .Completed {
        text-decoration: line-through;
    }
</style>