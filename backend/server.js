const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// 💡 FIX START: CORS Configuration updated to allow the Live Frontend URL
const allowedOrigins = [
    'http://localhost:5000', // Local Backend Port (Optional)
    'http://localhost:5173', // Local Frontend Port (Optional)
    'https://the-one-property-vfb9.onrender.com', // 👈 REQUIRED: आपका Live Frontend URL
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl) and from allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies/headers
};

app.use(cors(corsOptions));
// 💡 FIX END

app.use(express.json());

app.use('/api/admin', require('./routes/adminRoute.js'));
app.use('/api/properties', require('./routes/propertyRoute.js'));

// --- YEH NAYI LINE ADD KARNI HAI ---
app.use('/api/form', require('./routes/formRoute.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));