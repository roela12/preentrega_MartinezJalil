import messagesModel from "../models/messages.js";

export default class ChatManager {
  constructor() {
    console.log("trabajando en chatManager");
  }
  addMessage = async (message) => {
    const result = await messagesModel.create(message);
    console.log("Mensaje guardado");
    return result;
  };
}
