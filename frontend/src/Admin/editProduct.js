import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditProduct extends Component {
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
        isSubmitting: false,
        errorMsg: '',
        message: ''
    };

    async componentDidMount() {
        const { match } = this.props;
        const productId = match.params.id;

        try {
            const response = await fetch(`http://localhost:5001/api/products/${productId}`);
            if (response.ok) {
                const data = await response.json();

                // Update the state with existing data from the database
                this.setState({
                    name: data.name || '',
                    description: data.description || '',
                    price: data.price || '',
                    category: data.category || '',
                    brand: data.brand || '',
                    avgRating: data.rating?.avgRating || '',
                    noOfUsersRated: data.rating?.noOfUsersRated || '',
                    stock: data.stock || '',
                    image: data.image || '',
                    discountInPercentage: data.discountInPercentage || ''
                });
            }
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    }


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitForm = async (event) => {
        event.preventDefault();
        const { match, history } = this.props;
        const productId = match.params.id;

        const {
            name, description, price, category, brand,
            avgRating, noOfUsersRated, stock, image, discountInPercentage
        } = this.state;

        this.setState({ isSubmitting: true, message: '', errorMsg: '' });

        const productPayload = {
            name,
            description,
            price: Number(price) || 0,
            category,
            brand,
            rating: {
                avgRating: Number(avgRating) || 0,
                noOfUsersRated: Number(noOfUsersRated) || 0
            },
            stock: String(stock) || '',
            image,
            discountInPercentage: String(discountInPercentage) || ''
        };

        try {
            const response = await fetch(`http://localhost:5001/api/products/update/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productPayload)
            });

            if (response.ok) {
                this.setState({ isSubmitting: false });
                alert("Product Updated Successfully");

                history.push('/admin/products');
            } else {
                const errorData = await response.json();
                this.setState({ isSubmitting: false, errorMsg: errorData.message || 'Failed to update product' });
            }
        } catch (error) {
            this.setState({ isSubmitting: false, errorMsg: 'Network connection failure.' });
        }
    };

    render() {
        const inputFields = ['name', 'description', 'price', 'category', 'brand', 'avgRating', 'noOfUsersRated', 'stock', 'image', 'discountInPercentage'];

        return (
            <div className="className">
                <h1>Edit Product Details</h1>
                {this.state.message && <p style={{ color: 'green' }}>{this.state.message}</p>}
                {this.state.errorMsg && <p style={{ color: 'red' }}>{this.state.errorMsg}</p>}

                <form className="" onSubmit={this.submitForm}>
                    {inputFields.map((key) => (
                        <div style={{ textAlign: 'left', padding: '5px', margin: '5px' }} key={key}>
                            <label>{key}: </label>
                            <input
                                type={key === 'price' || key === 'avgRating' || key === 'noOfUsersRated' ? 'number' : 'text'}
                                name={key}
                                value={this.state[key]}
                                onChange={this.onChange}
                                placeholder={`Enter ${key}...`}
                                disabled={this.state.isSubmitting ? true : undefined}
                            //required
                            />
                        </div>
                    ))}
                    <div style={{ textAlign: 'left', padding: '5px', margin: '5px' }}>
                        <button type="submit" disabled={this.state.isSubmitting ? true : undefined}>
                            {this.state.isSubmitting ? 'Saving modifications...' : 'Update product details'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditProduct);