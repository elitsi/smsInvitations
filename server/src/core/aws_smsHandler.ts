import * as AWS from 'aws-sdk';
AWS.config.update({
    region: 'us-east-1'
});

import {
    getUsers
} from '../services/user.service'
import {
    User as MUser
} from '../models/user.model'
import {
    ModelType
} from 'typegoose';
import { readFileSync } from 'fs';
import * as path from 'path';
import env from '../utils/config/variables';

const TinyURL = require('tinyurl')

export default class SMSHandler {
    apiKey: string
    textMessage: string;

    constructor() {
        this.apiKey = process.env.API_KEYF
        this.textMessage = readFileSync(path.resolve(__dirname, '../../smsText.txt'), 'utf-8');
        console.log(this.textMessage );
    }

    
    private async buildMessage(phone: string, userId: string) {
        const url = `${env.CLIENT_URL}?userId=${userId}`
        const finalUrl = await TinyURL.shorten(url)

        const message =
            this.textMessage + "\n" + finalUrl;

        return message;
    }

    public async handleInvitationMesages() {
        try {
            const users = await getUsers()
            if (users) {
                const usersToHandle: InstanceType < ModelType < MUser >> [] = users.filter(
                    (user: MUser) => !user.invitationSent
                )

                console.log(`Number of users to send invitation: ${usersToHandle.length}`);

                for (const user of usersToHandle) {
                    await this.sendInvitationWithSNS(user._id.toHexString(), user.phoneNumber)
                    user.invitationSent = true;
                    await user.save();
                }
            } else {
                console.log('No users to handle.')
            }

            //this.sendInvitationWithSNS("1234", "+972543102724");
        } catch (error) {
            console.error(error)
        }
    }

    private async sendInvitationWithSNS(userId: string, phone: string) {
        try {

            const number = phone.startsWith('0') ? phone.substring(1) : phone
            const message = await this.buildMessage(phone, userId)

            // Create publish parameters
            var params = {
                Message: message,
                /* required */
                PhoneNumber: `+972${number}`,
            };

            // Create promise and SNS service object
            var publishTextPromise = new AWS.SNS({
                apiVersion: '2010-03-31'
            }).publish(params).promise();

            // Handle promise's fulfilled/rejected states
            publishTextPromise.then(
                function (data) {
                    console.log("MessageID is " + data.MessageId);
                }).catch(
                function (err) {
                    console.error(err, err.stack);
                });

        } catch (error) {
            console.error(error)
        }
    }
}