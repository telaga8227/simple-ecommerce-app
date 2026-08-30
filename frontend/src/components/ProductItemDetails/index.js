import { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ClipLoader } from 'react-spinners'
import Header from '../Header'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { FaStar } from "react-icons/fa"
import CartContext from '../../context/CartContext'
import './index.css'

class ProductItemDetails extends Component {
    state = {
        productData: {},
        quantity: 1,
        isLoading: true,
        showModal: false
    }

    componentDidMount() {
        this.getProductData()
    }

    getFormattedData = data => ({
        id: data._id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        brand: data.brand,
        stock: data.stock,
        imageUrl: data.image,
        discount: data.discountInPercentage || 0,
        rating: data.rating ? data.rating.avgRating : 0,
        reviewsCount: data.rating ? data.rating.noOfUsersRated : 0
    })

    getProductData = async () => {
        try {
            const { match } = this.props
            const { params } = match
            const { id } = params
            const jwtToken = Cookies.get('jwt_token')
            const apiUrl = `http://localhost:5001/api/products/${id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }
            const response = await fetch(apiUrl, options)
            console.log(response)

            if (response.ok === true) {
                const fetchedData = await response.json()
                console.log("backend res :", fetchedData)
                const updatedData = this.getFormattedData(fetchedData.item)

                this.setState({
                    productData: updatedData,
                    isLoading: false
                })
            }
        } catch (error) {
            console.log("Error Fetching product details:", error)
            this.setState({ isLoading: false })
        }
    }

    renderLoadingView = () => (
        <div className="product-details-loader ">
            <ClipLoader color="#ob69ff" size={50} />
        </div>
    )

    onDecrementQuantity = () => {
        const { quantity } = this.state
        if (quantity > 1) {
            this.setState(prevState => ({ quantity: prevState.quantity - 1 }))
        }
    }

    onIncrementQuantity = () => {
        this.setState(prevState => ({ quantity: prevState.quantity + 1 }))
    }

    setShowModalTrue = () => {
        this.setState({ showModal: true })
    }

    setShowModalFalse = () => {
        this.setState({ showModal: false })
    }

    renderProductDetailsView = () => (
        <CartContext.Consumer>
            {
                value => {

                    const { productData, quantity } = this.state
                    const { name, description, price, category, brand, stock, imageUrl, discount, rating, reviewsCount } = productData
                    const { addCartItem } = value

                    const onClickAddToCart = () => {
                        console.log("Button clicked ! Product data :", productData)
                        addCartItem({ ...productData, quantity })
                        //alert('Item added to cart')
                        this.setShowModalTrue();
                    }

                    return (
                        <div className="product-details-success-view">
                            <div className="product-details-container">
                                <div className="product-img-container">
                                    <img src={imageUrl} alt="product" className="product-img" />
                                </div>

                                <div className="product-item-details">
                                    <h1 className="product-name">{name}</h1>
                                    <p className="price-details">Rs {price}/-</p>
                                    <div className="rating-and-reviews-count">

                                        <p className="rating">Rating : {rating} <FaStar className="star-icon" />
                                            <span className="reviews-count"> ( {reviewsCount} Reviews)</span></p>
                                    </div>
                                    <p className="discount">Offer :{discount} Discount </p>

                                    <p className="product-description">{description}</p>
                                    <div className="label-value-container">
                                        <p className="label">Stock:
                                            <span className="value"> {stock}</span></p>
                                    </div>
                                    <div className="label-value-container">
                                        <p className="label">Brand:
                                            <span className="value"> {brand}</span></p>
                                    </div>
                                    <hr className="horizontal-line" />

                                    <div className="quantity-container">
                                        <button
                                            type="button"
                                            className="quantity-controller-button"
                                            onClick={this.onDecrementQuantity}
                                        >
                                            <BsDashSquare className="quantity-controller-icon" />
                                        </button>
                                        <p className="quantity">{quantity}</p>
                                        <button
                                            type="button"
                                            className="quantity-controller-button"
                                            onClick={this.onIncrementQuantity}
                                        >
                                            <BsPlusSquare className="quantity-controller-icon" />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="button add-to-cart-btn"
                                        onClick={onClickAddToCart}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                            
                            {this.state.showModal && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <div className="success-icon">✓</div>
                                        <h2>Success!</h2>
                                        <p>Item added to cart successfully.</p>

                                        <div className="modal-actions">
                                            <button type="button" className="btn btn-secondary" onClick={this.setShowModalFalse}>
                                                Continue Shopping
                                            </button>
                                            <div className="sideBy">
                                                <Link to="/cart" className="btn btn-primary">
                                                    Go to Cart
                                                </Link>
                                                <Link to="/checkout" className="btn btn-success">
                                                    Checkout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <h1 className="similar-products-heading">Similar Products</h1>

                        </div>
                    )

                }
            }
        </CartContext.Consumer >
    )

    render() {
        const { isLoading } = this.state
        return (
            <>
                <Header />
                <div className="product-details-page-container">
                    {isLoading ? this.renderLoadingView() : this.renderProductDetailsView()}
                </div>
            </>

        )
    }
}

export default ProductItemDetails
