import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String, //required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number, //required: true
    },
    category: {
        type: String,default:null
    },
    rating: {
        avgRating: { type: Number, default: 0 },
        noOfUsersRated: { type: Number, default: 0 }
    },
    brand: {
        type: String,default:null
    },
    image: {
        type: String
    },
    discountInPercentage: {
        type: String,default:"0%"
    },
    stock: {
        type:String
    }

}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);