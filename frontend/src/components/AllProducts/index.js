import { Component } from 'react'
import { Oval } from 'react-loader-spinner'
import Cookie from 'js-cookie'
import ProductCard from '../ProductCard'
import { FaRupeeSign } from "react-icons/fa"
import CartContext from '../../context/CartContext'
import FiltersGroup from '../FiltersGroup'
import './index.css'

class AllProducts extends Component {
    state = {
        productsList: [],
        searchInput: '',
        isLoading: false,
    }

    componentDidMount() {
        this.getProducts()
    }

     /*onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value })
    }*/

    getProducts = async () => {
        this.setState({ isLoading: true })

        try {
            const { searchInput } = this.state
            const jwtToken = Cookie.get('jwt_token')
            const apiUrl = `http://localhost:5001/api/products?search=${searchInput}`
            const options = {
                headers: {
                    Authorization: `Bearer${jwtToken}`
                },
                method: 'GET',
            }

            const response = await fetch(apiUrl, options)
            console.log(response)
            if (response.ok) {
                const fetchedData = await response.json()
                console.log("server response Data:", fetchedData)
                const updatedData = fetchedData.items.map(product => ({
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    id: product._id,
                    imageUrl: product.image,
                    rating: product.rating ? product.rating.avgRating : 0,
                    reviewsCount: product.rating ? product.rating.noOfUsersRated : 0,
                    stock: product.stock
                }))
                this.setState({
                    productsList: updatedData,
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })
            }
        } catch (error) {
            console.log("Fetch error:", error)
            this.setState({
                isLoading: false
            })
        }
    }

    enterSearchInput = () => {
        this.getProducts()
    }

    changeSearchInput = searchInput => {
        this.setState({ searchInput }, () => {
            if(searchInput === ''){
                this.getProducts()
            }
        })
    }

    renderProductsList = (activeSearch) => {
        const { productsList } = this.state

        if (!productsList) {
            return <p className="no-products">no products available now</p>
        }

        
        const filteredProducts = productsList.filter(eachProduct =>
            eachProduct.name.toLowerCase().includes(activeSearch.toLowerCase())
        )
        
        if ( filteredProducts.length === 0 ) {
            return <p className="no-products">no products found</p>
            }

        return (
            <ul className="product-list">
                {filteredProducts.map(product => (
                    <ProductCard productData={product} key={product.id} />
                ))}
            </ul>
        )
    }
    renderLoader = () => (
        <div className="products-loader-container">
            <Oval color="blue" height={50} width={50} />
        </div>
    )
    render() {
        return (
            <CartContext.Consumer>
                {value => {
                    const { activeSearch } = value

                    const { isLoading } = this.state

                    return (
                        <div className="all-products-section">
                            <FiltersGroup
                                searchInput={this.state.searchInput}
                                changeSearchInput={this.changeSearchInput}
                                enterSearchInput={this.getProducts}
                            />
                            {isLoading ? (<div className="products-loader-container">{this.renderLoader()}</div>) : this.renderProductsList(activeSearch)}
                        </div>
                    )
                }}

            </CartContext.Consumer>
        )
    }
}

export default AllProducts

/*
const exactValue = activeSearch.toLowerCase()
{
            const matchesName = eachProduct.name.toLowerCase().includes(exactValue)
            const matchesBrand = eachProduct.brand.toLowerCase().includes(exactValue)
            return matchesName || matchesBrand
        }
<div className="product-price-rating">
     <span className="product-price"> Price :<FaRupeeSign />{product.price} </span> <br/>
      <span className="product-rating"> Rating : {product.rating}  <FaStar /></span>
</div>

                        ---
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

                        ----
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

                        */
