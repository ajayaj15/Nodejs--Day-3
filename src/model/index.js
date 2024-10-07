import 'dotenv/config.js'
import mongoose from 'mongoose';
mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`)
.then((value) => console.log('Connected to database'))
.catch((err) => console.log(err));

export default mongoose;
