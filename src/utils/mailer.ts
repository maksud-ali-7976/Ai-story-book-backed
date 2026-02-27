import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "alimak7976@gmail.com",
        pass: "zteq pyjo vhtp cnxy",
    },
});


export const sendMail = async (options: {
    to: string;
    subject: string;
    text: string;
    html?: string;
}) => {
    try {

        const request = await transporter.sendMail({
            from: 'alimak7976@gmail.com', // sender address
            to: options.to, // list of receivers
            subject: options.subject, // Subject line
            text: options.text, // plain text body
            ...(options?.html && {
                html: options.html,
            })
        });

        console.log("Message sent: %s", request.messageId);

        return request;

    } catch (err) {
        console.log("🚀 ~ sendMail ~ err:", err)

    }
}