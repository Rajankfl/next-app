import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected sucessfully");
    });

    connection.on("error", (err) => {
      console.log("connection failed", err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}
