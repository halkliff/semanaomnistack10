import express, { json } from 'express';
import mongoose from 'mongoose';
import Routes from './routes';

mongoose.connect(
  'mongodb+srv://backendAdmin:halkliff2647@omnistack-cl-blpam.gcp.mongodb.net/test?retryWrites=true&w=majority', 
  {useNewUrlParser: true, useUnifiedTopology: true}
  );

  const app = express();

  app.use(json());

  app.use(Routes);

  app.listen(3333, () => console.log('Listening on port 3333'));
