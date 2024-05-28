import userMongoDao from "../DAOs/mongo/user.mongo.dao.js";

const user = new userMongoDao();

export default class userService {
  // Mostrar usuarios
  getUsers = async () => {
    return await user.getUsers();
  };
  // Mostrar usuario por id
  getById = async () => {
    return await user.getById(id);
  };
}
