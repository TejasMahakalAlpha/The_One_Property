const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', require('./routes/adminRoute.js'));
app.use('/api/properties', require('./routes/propertyRoute.js'));

// --- YEH NAYI LINE ADD KARNI HAI ---
app.use('/api/form', require('./routes/formRoute.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));