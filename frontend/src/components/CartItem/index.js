import CartContext from '../../context/CartContext'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import './index.css'

const CartItem = props => (
    <CartContext.Consumer>
        {value => {
            const { deleteCartItem, incrementCartItemQuantity, decrementCartItemQuantity } = value
            const { cartItemDetails } = props
            const { id, name, price, imageUrl, quantity } = cartItemDetails

            const onRemoveCartItem = () => {
                deleteCartItem(id)
            }
            const onIncrementQuantity = () => {
                incrementCartItemQuantity(id)
            }
            const onDecrementQuantity = () => {
                decrementCartItemQuantity(id)
            }
            const totalPrice =price * quantity
            return (
                <li className="cart-item">
                    <img src={imageUrl} alt={name} className="cart-product-image" />
                    <div className="cart-item-details-container">
                        <p className="cart-product-price">{name}</p>
                        <div className="cart-quantity-container">
                            <button type="button" className="quantity-controller-button" onClick = {onDecrementQuantity}>
                                <BsDashSquare color="#52606D" size={12} />
                            </button>
                            <p className="cart-quantity">{quantity}</p>
                            <button type="button" className="quantity-controller-button" onClick = {onIncrementQuantity}>
                                <BsPlusSquare color="#52606D" size={12} />
                            </button>
                        </div>
                        <div>
                            <p>Rs {totalPrice}/-</p>
                            <button type="button" onClick={onRemoveCartItem}>
                                Remove
                            </button>
                        </div>
                    </div>
                    <button
                        className="delete-button"
                        type="button"
                        onClick={onRemoveCartItem}
                    >
                        <AiFillCloseCircle color="#616E7C" size={20} />
                    </button>
                </li>
            )

        }}
    </CartContext.Consumer>

)

export default CartItem

