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
  // Cambiamos rol a premium
  changeToPremium = async (uid) => {
    try {
      let { flag1, flag2, flag3 } = false;
      const user = await userModel.findById(uid);
      user.documents.forEach((doc) => {
        if (doc.name == "identificacion") {
          flag1 = true;
        }
        if (doc.name == "comprobanteDomicilio") {
          flag2 = true;
        }
        if (doc.name == "comprobanteCuenta") {
          flag3 = true;
        }
      });
      if (flag1 && flag2 && flag3) {
        user.role = "premium";
        await user.save();
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  // Subimos documento
  uploadDocument = async (uid, files) => {
    try {
      const user = await userModel.findById(uid);
      if (!user) {
        return null;
      }
      if (files.identificacion) {
        user.documents.push({
          name: files.identificacion[0].fieldname,
          reference: files.identificacion[0].path,
        });
      }
      if (files.comprobanteDomicilio) {
        user.documents.push({
          name: files.comprobanteDomicilio[0].fieldname,
          reference: files.comprobanteDomicilio[0].path,
        });
      }
      if (files.comprobanteCuenta) {
        user.documents.push({
          name: files.comprobanteCuenta[0].fieldname,
          reference: files.comprobanteCuenta[0].path,
        });
      }
      await user.save();
      return user.documents;
    } catch (error) {
      return null;
    }
  };
}
