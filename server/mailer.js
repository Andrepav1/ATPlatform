const nodemailer = require("nodemailer");
const { getUser } = require("./util/users");

const sendMail = async(api_key, { bot, instrument, units }) => {


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "atsp.hwu@gmail.com", 
      pass: "atsplatform", 
    },
    tls: {
      rejectUnauthorized: false
  }
  });

  // const { email } = await getUser(api_key);
  const email = "pavanandrea97@icloud.com";

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "atsp.hwu@gmail.com", 
    to: email,
    subject: "New Signal by [" + bot.name + "]",
    text: 
      "Your bot [" + bot.name + "] using strategy [" + bot.activeStrategy.name + "] has placed a new " + 
      (units>=0?"BUY":"SELL") + " order of " + Math.abs(units) + " units, on instrument [" + instrument + "]."
  });
  
  console.log("mail INFO", info);
}

module.exports = {
  sendMail
}