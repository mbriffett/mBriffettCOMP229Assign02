import mongoose from 'mongoose';

//using mongoose to maniupluate db data
const Schema = mongoose.Schema;

//providing data for mongoose to use with db
//type from mongoose called string (different)
const ContactSchema = new Schema({
    name: String,
    phone: Number,
    email: String
}, {
    timestamps: true,
    collection: 'contacts'
});
//utilises mongoose functionality to save timestamps etc

//exporting mongoose model - passing ContactSchema into model called Contacts
export default mongoose.model('Contacts', ContactSchema)