import Pool from "./db/config";
import { app } from "./app";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;

Pool.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${process.env.NODE_ENV} port ${PORT}!`);
    });
  })
  .catch((err: any) => {
    console.error(err);
  });
