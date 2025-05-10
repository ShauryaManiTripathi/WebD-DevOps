import { api, setAuthToken, testData } from '../setup.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

export default async function cleanupScenario() {
  console.log('🧹 Starting database cleanup...');

  // Set librarian token for authorization (if needed for any API calls)
  if (testData.tokens?.librarian) {
    setAuthToken(testData.tokens.librarian);
  }

  try {
    // Load environment variables from .env file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: envPath });

    // Get MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI environment variable not found');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for cleanup');

    // Get all collection names in the database
    try {
      const collections = await mongoose.connection.db.collections();
      
      if (collections.length === 0) {
        console.log('No collections found to clean up');
      } else {
        // Drop each collection
        for (const collection of collections) {
          const collectionName = collection.collectionName;
          await collection.deleteMany({});
          console.log(`✅ Wiped collection: ${collectionName}`);
        }
        console.log(`Total collections wiped: ${collections.length}`);
      }
    } catch (error) {
      console.error(`❌ Error accessing collections: ${error.message}`);
      console.log('Authentication might have succeeded but permissions are insufficient.');
    }

    console.log('🧹 Database cleanup complete');
    
    // Close mongoose connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}
