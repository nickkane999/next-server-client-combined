import Type from "./types/model";
import User from "./users/model";

const models: any = {
  Type,
  User,
};
const sampleRecords: any = {
  Type: {
    type: "Ex_1",
    name: "Short content",
    description: "This is a short description",
  },
  User: {
    username: "test",
    password: "test",
    fname: "John",
    lname: "Doe",
    email: "johndoe@sample.com",
    phone: "123-456-7890",
  },
};

export { models, sampleRecords };
