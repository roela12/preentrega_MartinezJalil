import messagesModel from "./models/message.model.js";

export default class MessageMongoDao {
  constructor() {}
  // Agrego el mensaje nuevo a la base de datos
  addMessage = async (message) => {
    try {
      const result = await messagesModel.create(message);
      return result;
    } catch (error) {
      return null;
    }
  };
}
