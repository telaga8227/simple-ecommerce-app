import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class AddProduct extends Component {

    state = {
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        avgRating: '',
        noOfUsersRated: '',
        stock: '',
        image: '',
        discountInPercentage: '',
        isSubmitting: false,   //tracks loading state during API calls
        errorMsg: '',          // stores success messages
        message: ''            // stores network or server messages
    }

    onChange = (event) => {
        const { name, value } = event.target;

        this.setState({       //[event.target.name]:event.target.value
            [name]: value,
            message: '',
            errorMsg: ''
        })

    }

    //complete async backend API communicatio loop
    submitForm = async (event) => {
        event.preventDefault()

        console.log("ecaxt payload being sent:", this.state) //swith on loading indicator

        const { name, description, price, category, brand, avgRating, noOfUsersRated, stock, image, discountInPercentage } = this.state

        this.setState({ isSubmitting: true, message: '', errorMsg: " ", })

        const productPayload = {
            name,
            description,
            price,
            category,
            brand,
            rating: {
                avgRating,
                noOfUsersRated
            },
            stock,
            image,
            discountInPercentage
        }

        console.log("Exact payload being sent : ", productPayload)

        try {
            const url = "http://localhost:5001/api/products/add" 
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productPayload)
            }
            const response = await fetch(url, options)
            const data = await response.json()

            console.log(response)
            console.log("Response status :", response.status)
            console.log("server response Data:", data)

            if (response.ok) {
                this.setState({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    brand: "",
                    avgRating: "",
                    noOfUsersRated: '',
                    stock: "",
                    image: "",
                    discountInPercentage: "",
                    isSubmitting: false,
                    message: "Product created successfully!"
                });
                //this.setState({isSubmitting: false, message: "product added successfully"})
                alert("product Added Successfully")

                const { history } = this.props
                history.push('/admin/products')

            }

            else {
                this.setState({
                    isSubmitting: false, message: data.message || "server error"
                })
                alert(`failed to add product : ${data.message || 'server error'}`)
            }
        }
        catch (error) {
            this.setState({
                isSubmitting: false, errorMsg: "network connection failed"
            })
            console.error("Error adding product", error)
            alert("network error, could not connect to backend server")
        }

    }

    render() {
        const inputFields = ['name', 'description', 'price', 'category', 'brand', 'avgRating', 'noOfUsersRated', 'stock', 'image', 'discountInPercentage']
        return (
            <div className="">
                <h1 className="">Add New Product</h1>
                {this.state.message && <p style={{ color: 'green' }}>{this.state.message}</p>}
                {this.state.errorMsg && <p style={{ color: 'red' }}>{this.state.errorMsg}</p>}
                <form className="" onSubmit={this.submitForm}>
                    {inputFields.map((key) => (
                        <div style={{ textAlign: 'left', padding: '5px', margin: '5px' }} key={key}>
                            <label>{key}:</label>
                            <input
                                type={key === 'price' || key === 'avgRating' || key === 'noOfUsersRated' ? 'number' : 'text'}
                                name={key}
                                value={this.state[key]}
                                onChange={this.onChange}
                                placeholder={`Enter ${key}...`}
                                disabled={this.state.isSubmitting ? true : undefined}
                                //required
                                className=""
                            />
                        </div>
                    ))}
                    <div style={{ textAlign: 'left', padding: '5px', margin: '5px' }}>
                        <button
                            type="submit"
                            disbled={this.state.isSubmitting ? true : undefined}
                        >
                            {this.state.isSubmitting ? 'processing Upload...' : 'Submit product data'}
                        </button>
                    </div>

                </form>
            </div>
        )
    }

}

export default withRouter(AddProduct)