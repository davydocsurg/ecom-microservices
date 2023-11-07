import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface IProduct extends Document {
    name: string;
    slug: string;
    price: number;
    description: string;
    inStock: boolean;
    unit: number;
    category: string;
}

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, trim: true },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        unit: {
            type: Number,
            default: 1,
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

productSchema.pre("save", async function (next) {
    this.slug = slugify(this.name + this._id, { lower: true });
    next();
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
