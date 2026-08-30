import Product from '../models/product.js'

//create a new product

export const createProduct = async (req, res) => {
    try {
        /
        const { name, description, price, category, brand, rating, image, discountInPercentage, stock } = req.body;

        const item = await Product.create({
            name: name,
            description: description,
            price: price,
            category: category,
            brand: brand,
            image: image,
            discountInPercentage: discountInPercentage,
            rating: {
                avgRating: Number(rating?.avgRating) || 0,
                noOfUsersRated: Number(rating?.noOfUsersRated) || 0
            },
            stock: stock
        });

        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            item
        });
    } catch (error) {
        
        console.error("Database save failed:", error);

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message 
        });
    }
}


//get all products

export const getProducts = async (req, res) => {
    try {
       
        const { search = "" } = req.query;

        
        const searchFilter = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ]
        };

       
        const items = await Product.find(searchFilter).sort({ showAt: -1 })
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

// getProductById

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Product.findById(id)

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Got the ptoduct details successfully',
            item
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error', error
        })
    }
}


//update products

export const updateProduct = async (req, res) => {

    try {
        const { id } = req.params; 

        const updateData = {};
        for (const key in req.body) {
            const value = req.body[key]
            if (value !== "" && value !== null && req.body[key] !== undefined && value !==0 && value !=="0" ) {
                updateData[key] = req.body[key];
            }
        }

        const updatedItem = await Product.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true } 
        );

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updatedItem
        });

    } catch (error) {
        console.error("Backend Failure Details:", error);
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message 
        });
    }
};

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


