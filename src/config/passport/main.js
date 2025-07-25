import passport from 'passport';
import { jwtStrategy } from './jwt.strategy.js';
import { registerStrategy } from './register.strategy.js';
import { loginStrategy } from './login.strategy.js';
import { UserRepository } from '../../repositories/user.repository.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwtCookie;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserRepository.getById(jwt_payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const initializePassport = () => {
  passport.use('jwt', jwtStrategy);
  passport.use('register', registerStrategy);
  passport.use('login', loginStrategy);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user)
  });
};



