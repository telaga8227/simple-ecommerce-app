import { useState } from 'react'
import { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
//import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AddProduct from './Admin/addProduct'
import EditProduct from './Admin/editProduct'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './context/CartContext'
//import AllProducts from './components/AllProducts'
import './App.css';

class App extends Component {

  state = {
    cartList: [],
    searchInput: '',
    activeSearch: ''
  }

  /*addCartItem = product => {
    this.setState(prevState => ({ 
      cartList: [...prevState.cartList, product] 
    }))
  }*/

  addCartItem = product => {
  const {cartList} = this.state

  // 1. Check if the product is already present in the cart list array
  const isProductAlreadyPresent = cartList.find(
    eachItem => eachItem.id === product.id
  )

  if (isProductAlreadyPresent !== undefined) {
    // 2. If it's already there, map through and update only its quantity value
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          const updatedQuantity = eachItem.quantity + product.quantity
          return { ...eachItem, quantity: updatedQuantity }
        }
        return eachItem
      }),
    }))
  } else {
    // 3. If it's a completely new item, append it as a new row to the array
    this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }))
  }
}

  deleteCartItem = (id) => {
    this.setState(prevState => ({ 
      cartList: [...prevState.cartList.filter(eachItem => eachItem.id !== id)] 
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity+1
          return { ...eachItem, quantity: updatedQuantity }
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productCart = cartList.find(eachItem => eachItem.id === id)
    if (productCart.quantity > 1) {
      this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id && eachItem.quantity > 1) {
          return { ...eachItem, quantity: eachItem.quantity - 1 }
        }
        return eachItem
      }),
    }))
    }else {
      this.deleteCartItem(id)
    }
    
  }

  changeSearchInput = value => {
    this.setState({ searchInput: value })
  }

  enterSearchInput = () => {
    const { searchInput } = this.state
    this.setState({ activeSearch: searchInput })
    
  }

  render() {
    const { cartList, searchInput, activeSearch } = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,

            searchInput,
            activeSearch,
            changeSearchInput: this.changeSearchInput,
            enterSearchInput: this.enterSearchInput,

          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={RegisterForm} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Products" component={Products} />
            <Route exact path="/Cart" component={Cart} />
            <Route exact path="/admin/products" component={AddProduct} />
            <Route exact path="/admin/edit-products/:id" component={EditProduct} />
            <Route
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <Route path="/not-found" component={NotFound} />

            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>

    )
  }
}

export default App;


