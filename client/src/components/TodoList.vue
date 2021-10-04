<template>
    <div class="container">
        
        <div class="row">
            <div class="col-12">
                <h4>Todo List</h4>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <NewTodo @on-add="createTodo($event)"/>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-lg-6">
                <ul class="list-group">
                    <Todo v-for="(todo,index) in Todos"
                    :TodoName="todo.TodoName"
                    :key="index"
                    :Completed="todo.Completed"
                    @on-delete="deleteTodo(todo)"
                    @on-toggle="toggleTodo(todo)"
                    @on-edit="updateTodo(todo,$event)"
                    />
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
import Todo from './Todo.vue'
import NewTodo from './NewTodo.vue'
import axios from 'axios'
window.axios = require('axios')

// var todolist = null


export default {
    components:{
        Todo,
        NewTodo
    },
    data(){
        return {
        Todos: [
          { TodoName: "Sample todo", Completed: false ,id:0}
        ]
      }
    },
    async mounted(){
        const res = await axios.get('http://localhost:3001/read')
        var vals = res.data.data.map((ele)=>{
            var status = (ele.status==='completed')
            return {TodoName:ele.task,id:ele.id,Completed:status}
        })
        this.Todos = this.Todos.concat(vals)
        console.log(vals)
    },

    methods:{
        async createTodo(todo){
            this.Todos.push({
                TodoName:todo,
                Completed:false,
                id:this.Todos.length+1
            })

            console.log(todo)
            const res = await axios.post(
                'http://localhost:3001/insert',
                {task:todo})

            console.log(res.status)

        },
        async updateTodo(todo,todoName){
            todo.TodoName = todoName
            console.log(todo.id)
            const res = await axios.post(
                'http://localhost:3001/update',
                {task:todoName,id:todo.id})

            console.log(res.status)
        },
        async deleteTodo(todo){
            this.Todos = this.Todos.filter(todos=>todos.TodoName!==todo.TodoName)
            const res = await axios.post(
                'http://localhost:3001/delete',
                {id:todo.id})
            console.log(res.status)
        },
        async toggleTodo(todo){
            todo.Completed = !todo.Completed
            const res = await axios.post(
                'http://localhost:3001/completed',
                {id:todo.id,status:todo.Completed})
            console.log(res.status)
        }
    }
}
</script>

<style>

</style>