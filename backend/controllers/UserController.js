
const MainController = require('./mainController/MainController');
const EmailUtil = require("../util/EmailUtil");


class UserController extends MainController {

    actionContact = async ({username, email, subject, message}) => {
        await EmailUtil.sendEmailFromNoreply({
            to: EmailUtil.CONTACT_ADDRESS,
            subject: `${username} a envoyé une demande : ${subject}`,
            replyTo: email,
            html:
                `<p style="font-size: 1.4em; margin-bottom: 20px">${username} a envoyé une demande : ${subject}</p>
<p style="margin-bottom: 30px">${message}</p>
<p>${username}</p>
<p>${email}</p>
`,
            text:
                `
${username} a envoyé une demande : ${subject}.
${message}.
${username}
${email}
`
        })
    }

}

module.exports = UserController;
