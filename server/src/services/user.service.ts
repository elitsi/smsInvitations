import { UserModel } from '../models/user.model'
import * as path from 'path'
import { InvitedUserItem } from '../utils/types/globalTypes'
import SMSHandler from '../core/smsHandler'
const csvtojson = require('csvtojson/v2')

async function getUsers() {
  return UserModel.find({}).exec()
}

async function insertUser(firstName: string, lastName: string, phoneNumber: string) {
  const User = new UserModel({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  })
  return User.save()
}

async function insertUsers(users: InvitedUserItem[]) {
  const usersObject: InvitedUserItem[] = users.map(user => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      invited: user.invited,
    }
  })

  try {
    for (const user of usersObject) {
      const User = new UserModel(user)
      await User.save()
    }
  } catch (error) {
    console.error(error)
  }
}

async function updateUserAnswer(userId: string, invitationAnswer: number, foodType: number, needRide: number) {
  return UserModel.updateOne(
    { _id: userId },
    {
      $set: {
        invitationAnswer: invitationAnswer,
        foodType: foodType,
        needRide: (needRide === 1 ? true : false),
        updatedAt: new Date()
      },
    }
  ).exec()
}

async function loadUsersFromCsv() {
  const filePath = path.resolve(__dirname, '../../inviteList.csv')
  try {
    const jsonArray = await csvtojson().fromFile(filePath)
    const filteredUsers: InvitedUserItem[] = filterUsersFromListForInsertion(jsonArray)

    console.log(`Total users: ${jsonArray.length}`)
    console.log(`Filtered usres: ${filteredUsers.length}`)
    await insertUsers(filteredUsers)
  } catch (e) {
    console.error(e)
  }
}

function filterUsersFromListForInsertion(users: any): InvitedUserItem[] {
  return users
    .filter((user: InvitedUserItem) => {
      const ans =
        user.firstName.length > 0 && user.lastName.length > 0 && user.phoneNumber.length > 0 && user.invited > 0
      if (!ans) {
        console.log(`Invalid user: ${user.firstName} ${user.lastName}`)
      }
      return ans
    })
    .map((user: InvitedUserItem) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber.replace('-', '0').trim(),
        invited: user.invited,
      }
    })
}

function sendUsersInvitation() {
  const smsClient = new SMSHandler()
  smsClient.handleInvitationMesages()
}

export { getUsers, insertUser, updateUserAnswer, sendUsersInvitation, loadUsersFromCsv }
