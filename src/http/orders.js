import instance from "./http";

function ordersIndex() {
    return  new Promise((resolve,reject) => {
        instance.get('/admin/orders').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function ordersCom(oid) {
    return  new Promise((resolve,reject) => {
        instance.get('/admin/orders/'+oid+'/edit').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function ordersDel(oid) {
    return  new Promise((resolve,reject) => {
        instance.delete('/admin/orders/'+oid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export {ordersIndex,ordersCom,ordersDel}