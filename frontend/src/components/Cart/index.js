import { Component } from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import { Link } from 'react-router-dom'
import './index.css'
class Cart extends Component {
    render() {
        return (
            <CartContext.Consumer>
                {
                    value => {
                        const { cartList } = value
                        console.log("Cart page received cartList :", cartList)

                        if (cartList.length === 0) {
                            return (
                                <div className="cart-container">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDNCeGZy722kL_mtPdg67nMvnF5niHh1e6kegq4cktznuFRmBqvXhf8rU&s=10"
                                        alt="empty cart" className="cart-img" />
                                    <p>No Items in your cart</p>
                                    <Link to="/products">
                                        <button className="shop-now-btn">Shop now</button>
                                    </Link>
                                </div>
                            )

                        }
                        return (
                            <>
                                <Header />
                                <div>
                                    <h1>My Cart</h1>
                                    {cartList.map(eachItem => (
                                        <CartItem key={eachItem.id} cartItemDetails={eachItem} />
                                    ))}
                                </div>

                            </>
                        )
                    }
                }
            </CartContext.Consumer>
        )
    }
}

export default Cart
