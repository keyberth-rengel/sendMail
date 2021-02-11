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
    hora_reservada,
    fecha_reservada,
    typeMsg,
  } = body;

  if (typeMsg === "taller") {
    const { nombre_taller, link_taller } = body;

    mensaje = `
    Taller inscrito exitosamente

    Estimado ${user_name}
  
    Se ha inscrito al taller ${nombre_taller}. Para participar del taller debe ingresar por este link ${link_taller} el día ${fecha_reservada} a las ${hora_reservada}.
  
    En caso de cancelar se avisará por correo.
  
    Ccdn App`;
  } else {
    const { nombre_doctor } = body;
    mensaje = `
    Hora agendada exitosamente
    
    Estimado ${user_name}
    
    Se ha agendado una hora con ${nombre_doctor}, el día ${fecha_reservada} a las ${hora_reservada}.
    
    En caso de cancelar la hora se avisará con antelación.
    
    Ccdn App`;
  }

  let opcionEmail = {
    from: process.env.MAIL,
    to: email_user,
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
