import { Strategy as LocalStrategy } from 'passport-local';
import { createHash } from '../../utils/hash.utils.js';
import { UserRepository } from '../../repositories/user.repository.js';

const userRepository = new UserRepository();

export const registerStrategy = new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const existingUser = await userRepository.findOne({ email });
      if (existingUser) return done(null, false, { message: 'Usuario ya existe' });

      const newUser = await userRepository.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email,
        age: req.body.age,
        password: createHash(password)
      });

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
);
