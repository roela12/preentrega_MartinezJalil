import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../DAOs/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import CartMongoDao from "../DAOs/mongo/cart.mongo.dao.js";
import { logger } from "../utils/logger.js";

const cartService = new CartMongoDao();
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  //Registrar ususario localmente
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        const profile = req.file;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            logger.warn("el usuario ya existe");
            return done(null, false);
          }
          const cart = await cartService.createCart();
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cart._id,
            documents: [],
          };
          if (profile) {
            newUser.documents.push({
              name: profile.fieldname,
              reference: profile.path,
            });
          }
          // Guardar el usuario
          const result = await userModel.create(newUser);
          return done(null, result); // Exito
        } catch (error) {
          return done(error); // Error
        }
      }
    )
  );

  // Estrategia para iniciar sesión local
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) return done(null, false);
          const valid = isValidPassword(user, password);
          if (!valid) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia para iniciar sesión con github
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.e893f1b4611bcbd8",
        clientSecret: "6d9f5c8bcac4618f627b512a7ac5d5c153fa44bd",
        callbackURL: `preentregamartinezjalil-production.up.railway.app/api/sessions/githubcallback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Buscamos en la db el email
          const user = await userModel.findOne({
            email: profile._json.email,
          });
          // Si no existe lo creamos
          if (!user) {
            const cart = await cartService.createCart();
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
              cart: cart._id,
              documents: [],
            };
            // Guardamos el usuario en la db
            let createdUser = await userModel.create(newUser);
            done(null, createdUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serializar y deserializar usuario
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
