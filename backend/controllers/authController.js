import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { username, name, email, password} = req.body
        if(!username || !name || !email || !password) {
            res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        // checking if user already exist
        const userExist = await User.findOne({$or:[{email:email},{username:username}] });
        if (userExist) {
            console.log("User Already Exist")
            return res.status(400).json({
                message: "user already exist",
                user: {
                    id: userExist._id,
                    username: userExist.username,
                    name: userExist.name,
                    email: userExist.email,
                    password: userExist.password,
                    token: userExist.token
                }
            })
        }
        //creat and save new user if dont exist
        const hashedPassword = await bcrypt.hash(password, 10);
        const createNewUser = await User.create({
            username,
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            {id:createNewUser._id}, 
            process.env.SECRET_KEY || 'development_fallback_secret', 
            {expiresIn:'1d'}
        );
        //console.log("user registered successfully inside db");
        console.log("User registered Successfully")
        return res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user: createNewUser,
            jwt_token:token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        })

    }

};

export const loginUser = async (req,res) => {
    try {
        const {username, password}=req.body
        
        //finding the user by  username in mongodb

        const user= await User.findOne({username})
        if(!user){
            return res.status(400).json({
                success:false,
                error_msg: "USER not found. Please Register first"
            });
        }
        //compare the subbimted paassword with hashed passwors in db

        if (!password ){
            return res.status(400).json({
                success:false,
                error_msg: "please provide a password in payload"
            })
        }

        if (!user.password ){
            return res.status(400).json({
                success:false,
                error_msg: "the user exist, but their password field is missing or empty in fb document"
            })
        }

        //Invalid request payload or missing account credentials

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                error_msg: "Invalid Password try again"
            });
        }
        // Generate a JWT Token (Make sure JWT_SECRET is defined in your .env file)
        const jwt_token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'your_fallback_secret_key', 
            { expiresIn: '1d' }
        );

        // Send back success and the token to the frontend
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            jwt_token: jwt_token,
            name:user.name
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ 
            success: false, 
            error_msg: "Internal server error during login." 
        });
    }
};

    


/*createNewUser.token=token
        await createNewUser.save()*/