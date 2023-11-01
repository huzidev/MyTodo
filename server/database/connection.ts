import mongoose, { ConnectOptions } from "mongoose";
const DB: string = process.env.DATA!;

// try {
//     mongoose.connect(DB, {
//         useNewUrlParser : true,
//         useUnifiedTopology : true,
//     } as ConnectOptions) => console.log('Connection Successful!');
// } catch (err) {
//     console.log("Failed To Connect", err);
// }

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => {
    console.log("Failed To Connect", err);
  });
