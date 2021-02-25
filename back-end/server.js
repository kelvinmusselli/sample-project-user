import cors from 'cors';
import app from './src/app';

app.use(cors());
app.listen(5555);
