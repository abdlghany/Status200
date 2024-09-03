import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
dotenv.config({ path: './sendgrid.env' });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const from = "ripoffemailservice@gmail.com";

/* Package installation and usage based on documentation at: https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail */
export function send(to, subject, text, callback){
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
      };
      callback(sendMsg(msg));
}
// Send PDF files to an email address
export function sendPDF(to, subject, text, filename, callback) {
    // Read the file and encode it in Base64 (to send it as email attachment)
    let receipt = fs.readFileSync(filename, { encoding: 'base64' });
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: filename,
                content: receipt,
                type: 'application/pdf',
                disposition: 'attachment'
            }
        ]
    };
    sendMsg(msg, function(status){
      callback(status);
    });
}

function sendMsg(msg, callback){
  sgMail
  .send(msg)
  .then(() => {
    //console.log('Email sent');
    callback(true);
  })
  .catch((error) => {
    console.error(error);
    callback(false);
  });
}
