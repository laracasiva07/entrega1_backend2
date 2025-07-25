// src/config/passport/login.strategy.js
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../../repositories/user.repository.js';
import { isValidPassword } from '../../utils/hash.utils.js';

const userRepository = new UserRepository()

export const loginStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userRepository.getByEmail(email );
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });

      const validPassword = isValidPassword(user, password);
      if (!validPassword) return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
