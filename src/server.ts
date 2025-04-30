import 'dotenv/config';
import app from './app/app';
import db from './app/database/index';

const PORT = process.env.PORT || 3000;

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection established');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });