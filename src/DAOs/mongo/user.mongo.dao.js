import userModel from "./user.model.js";

export default class userMongoDao {
  // Mostrar usuarios
  getUsers = async () => {
    try {
      return await userModel.find({});
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Mostrar usuario por id
  getById = async () => {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
