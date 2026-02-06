import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true });


userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
};

userSchema.methods.genrateAuthToken = function() {
    const token = jwt.sign({_id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
};

userSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password , this.password);
}

const User = mongoose.model("User", userSchema);

export default User;