import messagesModel from "../models/messages.js";

export default class ChatManager {
  constructor() {}
  // Agrego el mensaje nuevo a la base de datos
  addMessage = async (message) => {
    try {
      const result = await messagesModel.create(message);
      console.log("Mensaje guardado");
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
