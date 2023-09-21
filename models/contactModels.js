const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Please add a contact name"],
        },
        phone: {
            type: String,
            required: [true, "Please add a contact phone number"],
        },
        email: {
            type: String,
            required: [true, "Please add a contact email address"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);
