import express from 'express';
import { apiRouter } from './routers/apiRouter';
import { json } from 'body-parser';

const app = express();
const port = 5000;

//accept json body object for all routes
app.use(json());
app.get('/', (req, res) => {
  res.send('This is a test route');
});
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});