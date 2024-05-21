import userDTO from "../dao/DTOs/user.dto.js";

const userRepository = {
  createUser: (user) => {
    const newUser = new userDTO(user);
    return newUser;
  },
};

export default userRepository;
