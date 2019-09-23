const nodemailer = require('nodemailer');

//======envio de email
exports.emailSend = async (req, res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            ok:false,
            message: 'Por favor llene todos los campos del formulario'
        })
    }
    let transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.MAIL, 
            pass: process.env.PASS 
        }
    });

    let mensaje = `Nombre: ${body.nombre}
    
    Mail: ${body.correo}
    
    Asunto: ${body.asunto}
    
    ${body.contenido}`;

    let opcionEmail = {
        from: body.nombre || body.correo, 
        to: body.correo, 
        subject: body.asunto || 'Importante', 
        text: mensaje    
    }

    await transporter.sendMail(opcionEmail, (error, mail) => {
        if (error) {
            return res.status(400).json({
                ok:false,
                error,
                message: 'No se envio el mensaje, Intentelo nuevamente'
            })
        }

        res.json({
            ok: true,
            message: 'Mensaje enviado correctamente'
        })
    })
}

