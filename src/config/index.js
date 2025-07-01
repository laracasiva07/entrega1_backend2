import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    MONGO_URI:process.env.MONGO_URI ||"mongodb+srv://casivalara07:3Fj 4g72Or54J7EVV@cluster0.uq0odi7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
}