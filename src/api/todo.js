import request  from "@vitejs/plugin-vue";

// 获取到单个todo
export function getTodo(id){
    return request({
        method:"GET",
        url:'/get/todo',
        params:{
            id:id
        }
    })
}
// 获取批量的todo
export function getTodos(id){
    return request({
        method:"GET",
        url:'/get/todos',
        params:{
            id:id
        }
    })
}
// 删除列表
export function deleteTodo(id){
    const data = {
        id
    }
    return request({
        method: "delete",
        url: '/delete/todo',
        data: data
    })
}