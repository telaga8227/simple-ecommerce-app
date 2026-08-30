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

