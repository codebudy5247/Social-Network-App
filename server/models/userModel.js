import mongoose from 'mongoose'


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,

            lowercase: true,
            unique: true,
            minlength: 3,
        },
        avatar: {
            type: String,
            default:'https://image.shutterstock.com/image-vector/thin-line-user-icon-on-260nw-519039097.jpg'

        },
        bio: {
            type: String,
            maxlength: 130,
        },
        website: {
            type: String,
            maxlength: 65,
        },
        role:{type:String,default:'user'},
        story:{
            type:String,
            default:'',
            maxlength:'200'
        },
        followers:[
            {
                type:mongoose.Types.ObjectId,ref:'user'
            }
        ],
        following:[
            {
                type:mongoose.Types.ObjectId,ref:'user'
            }
        ],

    },
    {
        timestamps: true,
    }
)



const User = mongoose.model('User', userSchema)

export default User
