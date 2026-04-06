import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        
        
        full_name: {
            type: String,
            trim: true,
            require: true,
        },
        email: {
            type: String,
            trim: true,
            require: true,
        },
        username: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {timestamps:true},
)

const User = mongoose.model('User',userSchema);

export default User;