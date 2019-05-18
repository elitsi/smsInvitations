export default class SMSHandler {
  apiKey: string

  constructor() {
    this.apiKey = process.env.API_KEY
  }

  sendInvitationToUser({
    firstName,
    lastName,
    phone,
  }: {
    firstName: string
    lastName: string
    phone: string
  }) {
    const userId = '123';
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.ACCOUNT_TOKEN;
    const client = require('twilio')(accountSid, authToken)
    const number = phone.startsWith('0') ? phone.substring(1) : phone;
    const hebTitle = 'שלום \n';
    const hebSubTitle  = 'הוזמנתם לחתונה של אמבר ואלי\n';
    const hebBody = 'בתאריך' + ' 12/09/2019 '  + 'בהרמוניה בגן ' ;
    const hebFinal = '\n\n נשמח לראותכם\n\n'
    const footer = ' - לחצו לעדכון הגעתכם'
    const url = `\nhttp://localhost:4000/${userId}`
    const message = hebTitle + hebSubTitle + hebBody + hebFinal + footer + url;

    console.log(message);

    // client.messages
    //   .create({
    //     body: `Hi ${firstName} ${lastName}, this is a test.`,
    //     from: '+15005550006',
    //     to: `+972${number}`,
    //   })
    //   .then((message: any) => console.log(message))
    //   .catch((e: Error) => console.error(e))
  }
}
