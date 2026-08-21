
import { Component } from 'react'
import { TailSpin } from 'react-loader-spinner'
import Cookie from 'js-cookie'
import { FaRupeeSign } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import './index.css'

class AllProducts extends Component {
    state = {
        productsList: [],
        isLoading: true,
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        this.setState({ isLoading: true })

        const jwtToken = Cookie.get('jwt_token')
        const apiUrl = 'http://localhost:5001/api/products'
        const options = {
            headers: {
                Authorization: `Bearer${jwtToken}`
            },
            method: 'GET',
        }

        const response = await fetch(apiUrl, options)
        console.log(response)
        const fetchedData = await response.json()
        console.log("server response Data:", fetchedData)
        if (response.ok) {

            //const dataObject = fetchedData;
            if (fetchedData) {
                //if (dataObject && dataObject.items) {
                const updatedData = fetchedData.items.map(product => ({  //dataObject.items.map
                    id: product._id || product.id,
                    productId: product.productId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    brand: product.brand,
                    //rating: product.rating,
                    stock: product.stock,
                    image: product.image,
                    discount: product.discountInPercentage || 0,

                    rating: product.rating ? product.rating.avgRating : 0,
                    reviewsCount: product.rating ? product.rating.noOfUsersRated : 0
                }))

                this.setState({
                    productsList: updatedData,
                    isLoading: false, // This will now execute and turn off the loader
                })
            } else {
                // Fallback if data structure is unexpectedly empty
                this.setState({ isLoading: false })
                //console.error("allItems property not found in response object");
            }
        } else {
            // Always clear the loader if the network request fails
            this.setState({ isLoading: false })
        }
    }

    renderProductsList = () => {
        const { productsList } = this.state
        if (!productsList) {                       //|| productsList.length === 0
            return <p>no products available now</p>
        }
        return (
            <ul className="product-list">
                {productsList.map((product) => (
                    <li key={product.id}>
                        <div className ="product-card">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                {product.category && (<p className="product-category"> Category : {product.category} </p>)}
                                {product.brand && (<h5 className="product-brand"> BranD ;{product.brand} </h5>)}
                                <p className="product-price"> Price :<FaRupeeSign />{product.price} </p>
                                <p className="product-rating"> Rating : {product.rating}  <FaStar /> ({product.reviewsCount} reviews) </p>
                                {product.discount > 0 && (<p className="discount"> Discount: {product.discount} % OFF </p>)}
                                <button className="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
        )
    }
    renderLoader = () => (
        <div className="products-loader-container">
            <TailSpin color="red" text="center" height="50" width="50" />
        </div>
    )

    render() {
        const { isLoading } = this.state
        return isLoading ? this.renderLoader() : this.renderProductsList()
    }

}

export default AllProducts

/*
<div className="product-price-rating">
                            <span className="product-price"> Price :<FaRupeeSign />{product.price} </span> <br/>
                            <span className="product-rating"> Rating : {product.rating}  <FaStar /></span>
                        </div>

                        */
