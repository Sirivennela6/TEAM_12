import { connectToDb, getDb } from '../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectToDb(); // Ensure DB connection is established

        const db = getDb();
        const { username, password } = req.body; // Accept username and password

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            username,
            password: hashedPassword,
            createdAt: new Date()
        };

        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
