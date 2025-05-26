import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; 
import cors from 'cors';

// Import routes
import productRoutes from './routes/products.route.js';
import categoryRoutes from './routes/categories.route.js';
import collectionRoutes from './routes/collections.route.js';
import featuredSectionRoutes from './routes/featuredSections.route.js'
import variationRoutes from './routes/variations.route.js';
import subvariationRoutes from './routes/subvariations.route.js';
import productImageRoutes from './routes/productImages.route.js';
import featuredSectionProductRoutes from './routes/featuredSectionProduct.route.js'


dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/featured-sections", featuredSectionRoutes);
app.use("/api/variations", variationRoutes);
app.use("/api/variations/:variationId/subvariations", subvariationRoutes);
app.use("/api/product-images", productImageRoutes);
app.use("/api/featured-section-products", featuredSectionProductRoutes) 

app.listen(PORT, async () => { 
    try {
        await connectDB(); 
        console.log(`Server started at http://localhost:${PORT}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
    }
});
