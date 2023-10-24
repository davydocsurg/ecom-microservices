import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
    userId: string;
    items: { productId: string; quantity: number }[];
}

const cartSchema = new Schema<ICart>(
    {
        userId: { type: String, required: true },
        items: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
