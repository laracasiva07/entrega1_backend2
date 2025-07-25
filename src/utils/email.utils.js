// utils/email.utils.js
import nodemailer from 'nodemailer';

export const sendRecoveryEmail = async (to, link) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tucorreo@gmail.com',
      pass: 'tu_app_password'
    },
    tls: {
    rejectUnauthorized: false, // 🔴 NO usar en producción
  }
  });

  await transport.sendMail({
    from: 'Recuperación <tucorreo@gmail.com>',
    to,
    subject: 'Restablece tu contraseña',
    html: `<p>Hacé clic en el siguiente botón para restablecer tu contraseña:</p>
           <a href="${link}"><button>Restablecer contraseña</button></a>`
  });
};
