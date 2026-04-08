import bodyParser from 'body-parser';
import express from 'express';
import eventRoutes from './routes/events.js';
import { connectToDatabase } from './data/database.js';

const app = express();

app.use(bodyParser.json());

app.use(eventRoutes);

try {
    await connectToDatabase();
    app.listen(process.env.PORT, () => {
        console.log(`Server is now listening on port ${process.env.PORT}`);
    });
} catch (error) {

}
