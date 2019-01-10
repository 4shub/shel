import dotenv from 'dotenv';

dotenv.config();

export const CURRENT_API_VERSION = '1.0';
export const DATABASE_NAME = (process.env.NODE_ENV === 'testing') ? 'shel-test' : 'shel';
export const DATABASE_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
