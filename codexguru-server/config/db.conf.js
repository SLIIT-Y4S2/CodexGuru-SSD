import mongoose, { connect } from "mongoose";

const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/codexguru", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {});
};
export default dbConnect;
