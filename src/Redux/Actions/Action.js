export const ADD = (item) =>{
    return{
        type: "ADD_CART",
        payload: item,
    }
}

export const DLT = (id) =>{
    return{
        type: "RMV_CART",
        payload: id,
    }
}

export const REMOVE = (item) =>{
    // console.log('hit actions');
    return{
        type: "RMV_ONE",
        payload: item,
    }
}