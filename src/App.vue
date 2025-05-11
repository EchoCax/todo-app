<script>
// 这里将他们引入进来
import {deleteTodo,getTodo,getTodos} from "@/api/todo.js";
import {computed} from "vue";

export default {
  name: "App",
  components: {},
  data() {
    return {
      TodoId:1, // 当前想查询的todo
      Todo:{},
      TodoIsNull:false,
      removeTodoId:0,
      todoList:[]
  }
},

  methods: {
    getTodo(){
      getTodo(this.TodoId).then(res=>{
        if(res.code === 200){
          this.TodoId = res.data
          this.TodoIdIsNull = false
        }
        else{
          this.TodoIsNull = true
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    removeTodo(){
      const id = this.removeTodoId;
      if (id === 0){
        alert("输入删除的id")
      }

      deleteTodo(id).then(res=>{
        console.log(res)
        if(res.code === 200){
          location.reload();
          alert("删除成功")
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //
    getTodoList(){
      getTodos().then(res=>{
        if(res.code === 200){
          this.todoList = res.data
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //
    created(){
      // 创建组件的时候去调用getTodo方法，获取todo数据
      this.getTodoList();
    },
    computed:{
      getTodoLists(){
        getTodos().then(res=>{
          if(res.code === 200){
            this.todoList = res.data
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
}
</script>

<template>
<div class="main">

</div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
html{
  background: linear-gradient(to left, blue,red );
}
.main{
  background:white;
}
</style>