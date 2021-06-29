const MainController = require('./mainController/MainController');
const EmailUtil = require("../util/EmailUtil");
const InvalidEmailError = require("../errors/auth/email/InvalidEmailError");
const EmptyBodyError = require("../errors/misc/EmptyBodyError");

class UserController extends MainController {

    actionContact = async ({username, email, subject, message}) => {

        if (!EmailUtil.isEmailAddressValid(email)) throw new InvalidEmailError();

        if (subject === '' || message === '' || username === '') throw new EmptyBodyError();

        await EmailUtil.sendEmailFromNoreply({
            to: EmailUtil.CONTACT_ADDRESS,
            subject: `${username} a envoyé un message  : ${subject}`,
            replyTo: email,
            html:
`<p style="font-size: 1.4em; margin-bottom: 20px">${username} a envoyé un message : ${subject}</p>
<p style="margin-bottom: 30px">${message}</p>
<p>${username}</p>
<p>${email}</p>
`,
            text:
`${username} a envoyé un message : ${subject}.
${message}
${username}
${email}
`
        })
    }

    actionFeedback = async ({subject, message}) => {

        if (message === '') throw new EmptyBodyError();

        await EmailUtil.sendEmailFromNoreply({
            to: EmailUtil.CONTACT_ADDRESS,
            subject: `Un feedback a été envoyé ${subject ? `: ${subject}` : ''}`,
            html:
`<p style="font-size: 1.4em; margin-bottom: 20px">Un feedback a été envoyé ${subject ? `: ${subject}` : ''}</p>
<p style="margin-bottom: 30px">${message}</p>`,
            text:
`Un feedback a été envoyé ${subject ? `: ${subject}` : ''}.
${message}.`
        })
    }

}

module.exports = UserController;
