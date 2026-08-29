import React from 'react'

const CartContext = React.createContext({
    cartlist: [],
    addCartItem: () => { },
    deleteCartItem: () => { },
    incrementCartItemQuantity: () => { },
    decrementCartItemQuantity: () => { },

    searchInput: '',
    activeSearch: '',
    changeSearchInput: () => { },
    enterSearchInput: () => { }

})

export default CartContext