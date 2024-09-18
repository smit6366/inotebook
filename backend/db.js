const mongoose=require('mongoose');
const mongoURI="mongodb+srv://myinternacc:Sen04yr6UBmXOKXE@cluster0.o38bn.mongodb.net/"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
  module.exports = connectToMongo;
  