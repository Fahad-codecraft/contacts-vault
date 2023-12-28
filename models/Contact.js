import mongoose from "mongoose";
import { Schema } from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    jobtitle: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
)

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);