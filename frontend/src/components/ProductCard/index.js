import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa"
import './index.css'

const ProductCard = props => {
    const { productData } = props
    const { id, name, price, rating: avgRating, reviewsCount, brand, imageUrl, } = productData
    return (
        <Link to={`/products/${id}`} className="link-item">
            <div className="product-list-container">
                <li className="product-item">
                    <img src={imageUrl} alt="product" className="product-item-image" />
                    
                        <h1 className="name">{name}</h1>
                        <p className="brand">by {brand}</p>
                        <div className="price-rating">
                            <p className="price">Rs {price}</p>
                            <div className="rating-container">
                                <p className="rating"> Rating : {avgRating}  <FaStar className="star" /> ({reviewsCount} reviews) </p>
                            </div>
                        </div>
                    
                </li>
            </div>
        </Link>

    )
}

export default ProductCard