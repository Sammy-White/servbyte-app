const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendOrderMail = function (name, email) {
    sgMail.send({
        to: email,
        from: 'samson.ugwu.com@gmail.com',
        subject: 'Meal Order Successfull',
        html: `
            <h2>Order Recieved</h2>
            <p>Dear ${name}, this is to inform you that we have recieved your meal order you placed from on the servbyte application. 
            This is to notify you that you will recieve your order at the stipulated time.</p>
            <p>Thanks for your patronage</p>
            <p><b>ServByte Team</b></p>
        `
    })
}

module.exports = sendOrderMail