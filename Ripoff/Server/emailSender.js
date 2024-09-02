import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
dotenv.config({ path: './sendgrid.env' });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const from = "ripoffemailservice@gmail.com";
/* Package installation and usage based on documentation at: https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail */
function send(to, Subject, text, callback){
    const msg = {
        to: to,
        from: from,
        subject: Subject,
        text: text,
      };
function sendPDF(to, subject, text, filename,callback){
  let data_base64 = base64_encode('../Client/orderReceipts/'+filename+'.pdf');
}
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