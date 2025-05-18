import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            minLength: 3,
        }, 
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
const Product = mongoose.model('Product', productSchema);

// Tạo ra model Product
export default mongoose.model('Products', productSchema);


