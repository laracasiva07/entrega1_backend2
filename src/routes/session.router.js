import { Router } from "express";
import passport from "passport";
import { authToken } from '../middlewares/auth.js';
import { generateToken } from "../utils/jwt.utils.js";
import { generateUserDTO } from '../dto/user.dto.js';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/user.repository.js";
import { isValidPassword } from "../utils/hash.utils.js";

const router = Router();

router.post('/register', passport.authenticate('register', {
  failureRedirect: '/register-fail',
  successRedirect: '/login',
  passReqToCallback: true
}));

const userRepository = new UserRepository();
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.getByEmail(email);

  if (!user || !isValidPassword(user, password)) {
    return res.status(401).send('Credenciales inválidas');
  }

  const token = jwt.sign({
    id: user._id,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age
  }, process.env.SECRET, { expiresIn: '1h' });

  res.cookie('jwtCookie', token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000, // 1 hora
  });

  res.redirect('/profile');
});

router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = req.user;
    const userDTO = generateUserDTO(user);
    res.json({ status: 'success', user: userDTO });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener perfil' });
  }
});

router.get('/profile', authToken, (req, res) => {
  console.log('Usuario decodificado:', req.userDTO);
  const userDTO = generateUserDTO(req.user);
  res.render('profile', { userDTO });
});
export default router;
