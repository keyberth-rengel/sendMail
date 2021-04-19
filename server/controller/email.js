const nodemailer = require("nodemailer");

//======envio de email
exports.emailSend = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      ok: false,
      message: "Por favor llene todos los campos del formulario",
    });
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let mensaje = "";
  const {
    user_name,
    email_user,
    typeMsg,
    mensj,
  } = body;

  mensaje = `
  Nombre Cliente = ${user_name}

  Email Cliente = ${email_user}

  Asunto = ${typeMsg}

  Mensaje = ${mensj} 
`;

  let opcionEmail = {
    from: process.env.MAIL,
    to: "keyrengel24@gmail.com",
    subject: body.asunto || "Importante",
    text: mensaje,
  };

  await transporter.sendMail(opcionEmail, (error, mail) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
        message: "No se envio el mensaje, Intentelo nuevamente",
      });
    }

    res.json({
      ok: true,
      message: "Mensaje enviado correctamente",
    });
  });
};
