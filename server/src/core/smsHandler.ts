import twilio = require('twilio')
import { getUsers } from '../services/user.service'
import { User as MUser } from '../models/user.model'
import { ModelType } from 'typegoose'
const TinyURL = require('tinyurl')

export default class SMSHandler {
  apiKey: string
  smsClient: twilio.Twilio

  constructor() {
    this.apiKey = process.env.API_KEYF
  }

  private async sendInvitationToUser(userId: string, phone: string) {
    try {
      const accountSid = process.env.ACCOUNT_SID
      const authToken = process.env.ACCOUNT_TOKEN
      const smsPhoneNumber = process.env.PHONE_NUMBER
      const client = require('twilio')(accountSid, authToken)
      const number = phone.startsWith('0') ? phone.substring(1) : phone
      const message = await this.buildMessage(phone, userId)

      const ans = await client.messages.create({
        body: message,
        from: smsPhoneNumber,
        to: `+972${number}`,
      })
      console.log(ans)
    } catch (error) {
      console.error(error)
    }
  }

  private async buildMessage(phone: string, userId: string) {
    const hebTitle = 'שלום \n'
    const hebSubTitle = 'הוזמנתם לחתונה של אמבר ואלי\n'
    const hebBody = 'בתאריך' + ' 12/09/2019 ' + 'בהרמוניה בגן '
    const hebFinal = '\n\n נשמח לראותכם\n\n'
    const footer = 'לחצו לעדכון הגעתכם - \n'
    const url = `https://one.co.il/${userId}`
    const finalUrl = await TinyURL.shorten(url)

    const message = hebTitle + hebSubTitle + hebBody + hebFinal + footer + finalUrl
    return message
  }

  public async handleInvitationMesages() {
    try {
      const users = await getUsers()
      if (users) {
        const usersToHandle: InstanceType<ModelType<MUser>>[] = users.filter((user: MUser) => !user.invitationSent)
        for (const user of usersToHandle) {
          console.log(`User id is: ${user._id.toHexString()}`)
          await this.sendInvitationToUser(user._id.toHexString(), user.phoneNumber)
        }
      } else {
        console.log('No users to handle.')
      }
    } catch (error) {
      console.error(error)
    }
  }
}
