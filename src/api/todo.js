import request from "@/utils/request.js";

// 获取单个 todo
export function getTodo(id) {
    return request({
        method: "GET",
        url: '/get/todo',
        params: { id }
    });
}

// 获取所有 todos
export function getTodos() {
    return request({
        method: "GET",
        url: '/get/todos'
    });
}

// 删除 todo
export function deleteTodo(id) {
    return request({
        method: "DELETE",
        url: '/delete/todo',
        params: { id }
    });
}

// 添加 todo
export function addTodo(todo) {
    // todo 是一个对象：{ id, text, completed }
    return request({
        method: "POST",
        url: '/add/todo',
        data: {
            todo
        }
    });
}

// 修改 todo
export function updateTodo(todo) {
    // todo 是一个对象：{ id, text, completed }
    return request({
        method: "PUT",
        url: '/update/todo',
        data: {
            id:todo.id,
            text:todo.text,
            complete:todo.completed
        }
    });
}
