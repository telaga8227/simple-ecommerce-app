import Product from '../models/product.js'

//create a new product

export const createProduct = async (req, res) => {
    try {
        // 1. Extract what your React frontend payload sends
        const { name, description, price, category, brand, rating, image, discountInPercentage, stock } = req.body;

        // 2. Format the payload keys so they line up with your Mongoose model schema
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
        // 1. Extract the query string value sent from the frontend
        const { search = "" } = req.query;

        // 2. Build a regex query pattern (case-insensitive 'i' mode)
        const searchFilter = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ]
        };

        // 3. Query the collection using that filter pattern
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
        const { id } = req.params; // or however you grab the product ID

        // 1. Create a clean update object ignoring empty strings, null, or undefined fields
        const updateData = {};
        for (const key in req.body) {
            const value = req.body[key]
            if (value !== "" && value !== null && req.body[key] !== undefined && value !==0 && value !=="0" ) {
                updateData[key] = req.body[key];
            }
        }

        // 2. Perform a partial update using $set
        const updatedItem = await Product.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true } // new: true returns the modified document
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
            error: error.message // Sending error.message helps you see the exact Mongoose error in the browser network tab
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

/*

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
            previousValues: previousValues,// show only what changed
            updatedItem
        })
    }
    catch (error) {
        console.error("Backend Failure Details :", error)
        res.status(500).json({
            success: false,
            message: 'server error', error
        })
    }
}

// 2. EDIT/UPDATE EXISTNG PRODUCT CONTROLLER
export const editProduct = async (req, res) => {
    try {
        // Get the specific product ID from the URL path parameters
        const productId = req.params.id;

        // Extract incoming form variables from the frontend update request
        const { name, description, price, category, brand, rating, image, discountInPercentage, stock } = req.body;

        // Find the product by its unique MongoDB ID and update its record properties
        const updatedItem = await Product.findByIdAndUpdate(
            productId,
            {
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
            },
            { new: true, runValidators: true } // Returns the newly modified document to the client
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: 'Target product record not found.'
            });
        }

        // Return successful updated response
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            item: updatedItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update product'
        });
    }
};

    */
