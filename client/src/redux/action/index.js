//for add item to card
export const addCart = (product) => {
    return{
        type : "ADDITEM",
        payload : product
    }
}

//for delete item from card
export const delCart = (product) => {
    return {
        type : "DELITEM",
        payload : product
    }

}