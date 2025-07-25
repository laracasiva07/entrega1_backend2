import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import { sendRecoveryEmail } from '../utils/email.utils.js';
import { isValidPassword, createHash } from '../utils/hash.utils.js';
import config from '../config/index.js';

const router = Router();
const userRepository = new UserRepository();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await userRepository.getByEmail(email);
  if (!user) return res.status(404).send('Usuario no encontrado');

  const token = jwt.sign({ email }, config.SECRET, { expiresIn: '1h' });
  const recoveryLink = `http://localhost:3000/reset-password/${token}`;
  await sendRecoveryEmail(email, recoveryLink);

  res.send('Correo de recuperación enviado');
});

router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  res.render('resetPassword', { token }); // vista handlebars con form
});

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, config.SECRET);
    const user = await userRepository.getByEmail(decoded.email);
    if (!user) return res.status(404).send('Usuario no encontrado');

    if (isValidPassword(user, password)) {
      return res.status(400).send('No podés usar la misma contraseña anterior');
    }

    user.password = createHash(password);
    await user.save();

    res.send('Contraseña restablecida correctamente');
  } catch (error) {
    return res.status(400).send('Token inválido o expirado');
  }
});

export default router;
