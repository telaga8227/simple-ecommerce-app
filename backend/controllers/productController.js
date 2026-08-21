import Product from '../models/product.js'

//create a new product

/*export const createProduct = async (req, res) => {
    try {
        
        const item = await Product.create(req.body)
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            item
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error', error
        });
    }
}
*/
export const createProduct = async (req, res) => {
    try {
        // 1. Extract what your React frontend payload sends
        const { name, description, price, category, brand, rating, noOfUsersRated, image, discountInPercentage } = req.body;

        // 2. Format the payload keys so they line up with your Mongoose model schema
        const item = await Product.create({
            name:name,
            description:description,
            price:price,
            category:category,
            brand:brand,
            image:image,
            discountInPercentage:discountInPercentage,
            rating: {
                avgRating: Number(rating) || 0,
                noOfUsersRated: Number(noOfUsersRated) || 0
            }
        });

        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            item
        });
    } catch (error) {
        // 3. Essential: logs the exact error to your terminal if something else breaks
        console.error("Database save failed:", error); 
        
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message // Sends back string instead of empty object
        });
    }
}


//get all products

export const getProducts = async (req, res) => {
    try {
        const items = await Product.find().sort({ showAt: -1 })
        res.status(200).json({
            success: true,
            message: 'got all products ',
            items
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error', error
        })
    }
}

//update products

export const updateProduct = async (req, res) => {
    try {
        const updateItem = await Product.findById(req.params.id)
        if (!updateItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const previousItemsDetails = updateItem.toObject(); // take snapshot of old data

        //identify which field keys are being updated right now
        const updatedFields = Object.keys(req.body); // e.g., ["price"]

        // 3. Extract the old values for those specific fields from our snapshot
        const previousValues = {};
        updatedFields.forEach(field => {
        previousValues[field] = previousItemsDetails[field]
        })

        Object.assign(updateItem, req.body) // overwrite the old data with new data by req.body (target , sorce)

        const updatedItem = await updateItem.save() // save the changes to db


        res.status(200).json({
            success: true,
            message: `product updated successfully `,
            previousValues:previousValues,// show only what changed
            updatedItem
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server erroe', error
        })
    }
}

//Delete product

export const deleteProduct = async (req, res) => {
    try {
        const deletedItem = await Product.findByIdAndDelete(req.params.id)  //deleteMany({})
        res.status(200).json({
            success: true,
            message: 'Product deleted Successfully',
            deletedItem
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Erroe', error
        })
    }
}
