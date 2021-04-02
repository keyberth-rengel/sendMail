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
    carType,
    driverName,
    driverContact,
    carModel,
    carNo,
    customer_name,
    numberEconomic,
    user,
    hora_emit
  } = body;

  mensaje = `
  Hora Emitida = ${hora_emit}
  
  Alerta emitida por el usuario = ${user} 

  Nombre Cliente = ${customer_name}

  Numero Economico = ${numberEconomic}

  Nombre Conductor = ${driverName} 

  Placa del vehiculo = ${carNo}
  
  Tipo de servicio = ${carType}

  Modelo del Vehiculo = ${carModel}

  Numero de Contacto del conductor = ${driverContact}
`;

  let opcionEmail = {
    from: process.env.MAIL,
    to: "cuvera50@gmail.com",
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
