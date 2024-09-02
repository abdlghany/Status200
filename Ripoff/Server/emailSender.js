import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
dotenv.config({ path: './sendgrid.env' });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const from = "ripoffemailservice@gmail.com";

function send(to, Subject, text, callback){
    const msg = {
        to: to,
        from: from, // Use the email address or domain you verified
        subject: Subject,
        text: text,
      };

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
    callback(true);
  })
  .catch((error) => {
    console.error(error);
    callback(false);
  });
}

export default send;