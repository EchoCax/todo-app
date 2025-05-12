import request  from "@/utils/request.js";

// 获取到单个todo
export function getTodo(id){
    return request({
        method:"GET",
        url:'/get/todo',
        params:{
            id
        }
    })
}
// 获取批量的todo
export function getTodos(){
    return request({
        method:"GET",
        url:'/get/todos',
    })
}
// 删除列表
export function deleteTodo(id){
    return request({
        method: "delete",
        url: '/delete/todo',
        params:{
            id
        }
    })
}
// 增加todo
export function addTodo(content){
    const data = {
        content: content
    }
    return request({
        method:"POST",
        url:'/add/todo',
        data:{
            content
        }
    })
}
// 修改todo
export function updateTodo(id){
    return request({
        method:"PUT",
        url:'/update/todo',
        data:{
            id,content
        }
    });
}