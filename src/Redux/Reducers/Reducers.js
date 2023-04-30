const initialState = {
    Carts: []
};

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const itemIndex = state.Carts.findIndex((item) => item.Id === action.payload.Id);

            if (itemIndex >= 0) {
                const updatedCart = state.Carts.map((item, index) => {
                    if (index === itemIndex) {
                        return { ...item, Quantity: item.Quantity + 1 };
                    }
                    return item;
                });
                return {
                    ...state,
                    Carts: updatedCart
                };
            } else {
                const temp = { ...action.payload, Quantity: 1 };
                return {
                    ...state,
                    Carts: [...state.Carts, temp]
                };
            }

        case "RMV_CART":
            const data = state.Carts.filter((element) => element.Id !== action.payload)
            return {
                ...state,
                Carts: data
            }

        // case "RMV_ONE":

        //      console.log('hit reducer');

        //     const rmvItem = state.Carts.map(
        //         (item) => {
        //             return parseInt(item.Id)
        //         }
        //     )
        // console.log(typeof rmvItem);
        
        // console.log(typeof action.payload.Id);

        case "RMV_ONE":
            const updatedCart = state.Carts.map((item) => {
                if (item.Id === action.payload.Id) {
                    return { ...item, Quantity: item.Quantity - 1 };
                }
                return item;
            });
            return {
                ...state,
                Carts: updatedCart
            };

        default:
            return state;
    }
};