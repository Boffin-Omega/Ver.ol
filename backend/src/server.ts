import 'dotenv/config'; // Loads the .env variables
import express, {Application, Request, Response} from 'express';
import {connectDB, conn} from './config/db';
import {initGridFS} from './config/gridfs';
import repoRoutes from './routes/repoRoutes';

// Initialize DB and GridFS
await connectDB();
initGridFS(conn);

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json()); // to parse json bodies such as commit messages
app.use(express.urlencoded({extended: true})); // to handle url-encoded data


// Health Check route
app.get('/', (req: Request, res: Response) => {
    res.send('VCS Backend is running. Status: OK');
});


// Main API Routes
app.use('/app/repo', repoRoutes); // mounting repo routes


// Starting Server
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));