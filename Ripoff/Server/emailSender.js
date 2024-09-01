import nodemailer from 'nodemailer ';

class emailSender{
    #sender;
    #password;
    constructor(){
        this.#password = "w3'llTryNotToR!pYouOff";
        this.#sender = "ripoffemailservice@gmail.com";
    }
    send(receiver, subject, text){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: this.#sender,
              pass: this.#password
            }
          });
          
          var mailOptions = {
            from: this.#sender,
            to: receiver,
            subject: subject,
            text: text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return false
            } else {
              return true
            }
          }); 
    }
}
export default emailSender;