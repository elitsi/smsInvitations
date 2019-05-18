import User from '../models/user.model'
import * as path from 'path'
import { serialize } from 'bson'
import { InvitedUserItem } from '../utils/types/globalTypes'
const csvtojson = require('csvtojson/v2')

async function getUsers() {
  return User.find({}).exec()
}

async function insertUser({
  firstName,
  lastName,
  phoneNumber,
}: {
  firstName: string
  lastName: string
  phoneNumber: string
}) {
  return User.insertMany([
    { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber },
  ])
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
  return User.insertMany(usersObject)
}

async function updateUserAnswer({
  userId,
  invitationAnswer,
  foodType,
  needRide,
}: {
  userId: string
  invitationAnswer: number
  foodType: number
  needRide: boolean
}) {
  return User.update(
    { _id: userId },
    {
      $set: {
        invitationAnswer: invitationAnswer,
        foodType: foodType,
        needRide: needRide,
      },
    }
  ).exec()
}

async function loadUsersFromCsv() {
  const filePath = path.resolve(__dirname, '../../inviteList.csv')
  try {
    const jsonArray = await csvtojson().fromFile(filePath)
    const filteredUsers: InvitedUserItem[] = filterUsersFromList(jsonArray)

    console.log(`Total users: ${jsonArray.length}`)
    console.log(`Filtered usres: ${filteredUsers.length}`)
    await insertUsers(filteredUsers)
  } catch (e) {
    console.error(e)
  }
}
//loadUsersFromCsv()

function filterUsersFromList(
  users: any
): [
  {
    firstName: string
    lastName: string
    phoneNumber: string
    invited: number
  }
] {
  return users
    .filter((user: any) => {
      const ans =
        user.firstName.length > 0 &&
        user.lastName.length > 0 &&
        user.phone.length > 0 &&
        user.invited.length > 0
      if (!ans) {
        console.log(`Invalid user: ${user.firstName} ${user.lastName}`)
      }
      return ans
    })
    .map((user: any) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phone.replace('-', '0').trim(),
        invited: parseInt(user.invited),
      }
    })
}

export { getUsers, insertUser, updateUserAnswer }
