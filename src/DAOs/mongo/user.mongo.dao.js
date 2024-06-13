import userModel from "./models/user.model.js";

export default class userMongoDao {
  // Mostrar usuarios
  getUsers = async () => {
    try {
      return await userModel.find({});
    } catch (error) {
      return null;
    }
  };
  // Mostrar usuario por id
  getById = async (id) => {
    try {
      return await userModel.findById(id);
    } catch (error) {
      return null;
    }
  };
  // Mostrar usuario por email
  getByEmail = async (email) => {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      return null;
    }
  };
  // Actualizamos la contrasena
  updatePassword = async (uid, newPassword) => {
    try {
      return await userModel.updateOne(
        { _id: uid },
        { $set: { password: newPassword } }
      );
    } catch (error) {
      return null;
    }
  };
}
