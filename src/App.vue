<script>
// 这里将他们引入进来
import {deleteTodo,getTodo,getTodos,addTodo,updateTodo} from "@/api/todo.js";
import {computed} from "vue";

export default {
  name: "App",
  components: {},
  data() {
    return {
      TodoId:1, // 当前想查询的todo
      Todo:{}, // 当前查询的todo
      TodoIsNull:false, // 判断当前获取到的数据是否为空
      removeTodoId:0,// 删除要删除的todo id
      todoList:[], // 所有的todo
      addTodoContent:'',// 添加todo的内容
      updateTodoId:0, // 修改todo
      updateContent:''// 修改后的文本
  }
},
  created(){
    // 创建组件的时候去调用getTodo方法，获取todo数据
    this.getTodoList();
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
        console.log('当前响应错误：')
        console.log(err)
      })
    },

    removeTodo(){
      const id = this.removeTodoId;
      if (id === 0){
        alert("输入删除的id")
      }

      deleteTodo(this.removeTodoId).then(res=>{
        console.log(res)
        if(res.code === 200){
          location.reload();
          alert("删除成功")
        }
      }).catch(err=>{
        console.log('删除失败',err)
      })
    },
    // 添加todo
    addNewTodo(){
      // 先判断一下是否输入了内容
      if(!this.addTodoContent){
        alert("请输入待办事项")
        return;
      }
      addTodo(this.addTodoContent).then(res=>{
        if(res.code === 200){
          alert('添加成功!')
          this.addTodoContent = '' // 传值进去
          this.getTodoList(); // 重新获取一下列表
        }
      }).catch(err=>{
        console.log('添加失败',err)
      })
    },
    // 修改todo
    updateTodo(){
      if(!this.updateTodoId || !this.updateTodoId){
        alert("请输入修改的todoId 和 内容")
        return;
      }
      updateTodo(this.updateTodoId,this.updateContent).then(res=>{
        if(res.code === 200){
          alert('修改成功!')
          this.addTodoContent = ''
          this.updateTodoId = 0;
          this.getTodoList();
        }
      }).catch(err=>{
        console.log('修改失败:',err)
      })
    },
    // 获取todo列表
    getTodoList(){
      getTodos().then(res=>{
        if(res.code === 200){
          this.todoList = res.data
        }
      }).catch(err=>{
        console.log('获取列表失败',err)
      })
    }
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
  },
}
</script>

<template>
  <div class="todo-main">
    <!--标题-->
    <div class="title">
      <h1>todo 待办清单</h1>
    </div>

    <!--文本-->
    <div class="todo-text">
      <!--增加-->
      <div class="addTodo">
        <input type="text" v-model="addTodoContent" placeholder="输入新建的待办:">
        <button @click="addNewTodo">添加</button>
      </div>
      <!--删除-->
      <div class="deleteTodo">
        <input type="text">
      </div>
      <!--查询-->
      <!--改变-->

    </div>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.todo-main{
  background: linear-gradient(to left, #21ff79, #f5f14f);
}
body{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}.title{
  background: white;
 }
</style>