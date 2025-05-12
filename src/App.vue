<template>
  <div class="todo-main">
    <div class="title">
      <h1>Todo 待办清单</h1>
    </div>

    <div class="todo-text">
      <!-- 增加 -->
      <div class="addTodo">
        <input type="text" v-model="addTodoContent" placeholder="输入新建的待办" />
        <button @click="addNewTodo">添加</button>
      </div>

      <!-- 删除 -->
      <div class="deleteTodo">
        <input type="text" v-model="removeTodoId" placeholder="输入要删除的ID" />
        <button @click="removeTodo">删除</button>
      </div>

      <!-- 查询 -->
      <div class="selectTodo">
        <input type="text" v-model="TodoId" placeholder="输入要查询的ID" />
        <button @click="getTodo">查询</button>
        <div v-if="Todo.id">
          <p>查询到：{{ Todo.id }} - {{ Todo.text }} - {{ Todo.completed ? '完成' : '未完成' }}</p>
        </div>
        <div v-else-if="TodoIsNull">
          <p>没找到</p>
        </div>
      </div>

      <!-- 修改 -->
      <div class="updateTodo">
        <input type="text" v-model="updateTodoId" placeholder="输入要修改的ID" />
        <input type="text" v-model="updateContent" placeholder="输入修改内容" />
        <button @click="updateTodoItem">修改</button>
      </div>

      <!-- 显示所有 todo -->
      <div class="todoList">
        <h2>获取全部待办：</h2>
        <ul>
          <li v-for="todo in todoList" :key="todo.id">
            {{ todo.id }} - {{ todo.text }} - {{ todo.completed ? '完成' : '未完成' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteTodo, getTodo, getTodos, addTodo, updateTodo } from "@/api/todo.js";

export default {
  name: "App",
  data() {
    return {
      TodoId: '',
      Todo: {},
      TodoIsNull: false,
      removeTodoId: '',
      addTodoText: '',
      updateTodoId: '',
      updateContent: '',
      todoList: [],
      addTodoContent:''
    };
  },
  created() {
    this.getTodoList();
  },
  methods: {
    getTodo() {
      if (!this.TodoId) return alert("请输入查询 ID");
      getTodo(this.TodoId).then(res => {
        if (res.code === 200 && res.data) {
          this.Todo = res.data;
          this.TodoIsNull = false;
        } else {
          this.Todo = {};
          this.TodoIsNull = true;
        }
      }).catch(err => {
        console.log('查询失败:', err);
      });
    },

    removeTodo() {
      if (!this.removeTodoId) return alert("输入要删除的 ID");
      deleteTodo(this.removeTodoId).then(res => {
        if (res.code === 200) {
          alert("删除成功");
          this.getTodoList();
        }
      }).catch(err => {
        console.log('删除失败:', err);
      });
    },

    addNewTodo() {
      if (!this.addTodoContent) {
        alert("请输入待办事项");
        return;
      }

      const newTodo = {
        id: Date.now(),              // 随便生成一个唯一 ID
        text: this.addTodoContent,  // 用户输入内容
        completed: false            // 默认未完成
      };

      addTodo(newTodo).then(res => {
        if (res.code === 200) {
          alert('添加成功!');
          this.addTodoContent = '';
          this.getTodoList();
        }
      }).catch(err => {
        console.error('添加失败:', err);
      });
    },

    updateTodoItem() {
      if (!this.updateTodoId || !this.updateContent) return alert("请输入要修改的 ID 和内容");
      const updated = {
        id: Number(this.updateTodoId),
        text: this.updateContent,
        completed: false
      };
      updateTodo(updated).then(res => {
        if (res.code === 200) {
          alert("修改成功");
          this.updateTodoId = '';
          this.updateContent = '';
          this.getTodoList();
        }
      }).catch(err => {
        console.log('修改失败:', err);
      });
    },

    getTodoList() {
      getTodos().then(res => {
        if (res.code === 200) {
          this.todoList = res.data;
        }
      }).catch(err => {
        console.log('获取列表失败:', err);
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  padding: 20px;
}
.todo-main {
  width: 600px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.title {
  background: #21ff79;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.todo-text > div {
  padding: 15px;
  margin-bottom: 10px;
}
.addTodo {
  background: #e0ffe0;
}
.deleteTodo,
.selectTodo,
.updateTodo {
  background: #ffe0e0;
}
.todoList {
  background: #f0f0f0;
}
.todoList ul {
  list-style: none;
  padding-left: 20px;
}
input {
  margin-right: 10px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 6px 12px;
  background: #21a0ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0f78d4;
}
</style>
