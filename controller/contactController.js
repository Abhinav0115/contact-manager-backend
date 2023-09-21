const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc get all contact
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc get a single contact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc create new contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("the requested body is: ", req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are mandatory");
        // res.status(400).json({ message: "all fields are mandatory" });
    } else {
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id,
        });
        res.status(201).json(contact);
    }
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedContact);
});

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to delete this contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
