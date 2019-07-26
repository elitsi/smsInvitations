import { UserModel, User } from '../models/user.model'
import * as path from 'path'
import { InvitedUserItem, IFoodType, IDashboardData } from '../utils/types/globalTypes'
//import SMSHandler from '../core/smsHandler'
import SMSHandler from '../core/aws_smsHandler'
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

async function updateUserAnswer(
  userId: string,
  invitationAnswer: number,
  foodType: IFoodType,
  transportSouth: boolean,
  transportCenter: boolean
) {

  const res: {valid: boolean, error: string} = await validateAnswerData(userId, invitationAnswer, foodType, transportSouth, transportCenter);
  if(res.valid) {
    return UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          invitationAnswer: invitationAnswer,
          foodType: foodType,
          transportSouth: transportSouth,
          transportCenter: transportCenter,
          updatedAt: new Date(),
          userAnswered: true,
        },
      }
    ).exec()
  }
  else {
    return Promise.reject(`Invalid data: ${res.error}`)
  }
}

async function getUsersData() {
  const users: User[] = await UserModel.find({})

  const data: IDashboardData = {
    totalInvited: 0,
    pendingInvitation: 0,
    unrecievedInvitation: 0,
    numOfconfirmed: 0,
    numOfNotArriving: 0,
    numOfOverArriving: 0,
    numOfVegie: 0,
    numOfVegan: 0,
    numOfGlotenFree: 0,
    numOfSouthTrasport: 0,
    numOfCenterTransport: 0,
    arrivingTable: [],
    notArrivingTable: [],
    partiallyArrivingTable: [],
    pendingInvitationTable: [],
    unrecievedInvitationTable: [],
    overArrivingTable: []
  }

  for (const user of users) {
    data.totalInvited += user.invited
    data.numOfVegie += user.foodType ? user.foodType.vegie : 0;
    data.numOfVegan += user.foodType ? user.foodType.vegan: 0;
    data.numOfGlotenFree += user.foodType ? user.foodType.gloten_free : 0;

    if(user.transportSouth) {
      data.numOfSouthTrasport += user.invitationAnswer;
    }
    else if(user.transportCenter) {
      data.numOfCenterTransport += user.invitationAnswer;
    }
    
    if (user.invitationSent && user.userAnswered) {
      if (user.invited > user.invitationAnswer && user.invitationAnswer > 0) {
        data.numOfconfirmed += user.invitationAnswer
        data.numOfNotArriving += user.invited - user.invitationAnswer
        data.partiallyArrivingTable.push({
          name: `${user.firstName} ${user.lastName}`,
          phone: user.phoneNumber,
          invited: user.invited,
          confirmed: user.invitationAnswer,
        })
      } else if (user.invited === user.invitationAnswer) {
        data.numOfconfirmed += user.invitationAnswer
        data.arrivingTable.push({
          name: `${user.firstName} ${user.lastName}`,
          phone: user.phoneNumber,
          invited: user.invited,
        })
      }
      else if(user.invited < user.invitationAnswer) {
        data.numOfconfirmed += user.invitationAnswer;
        data.numOfOverArriving += user.invitationAnswer;
        data.overArrivingTable.push({
          name: `${user.firstName} ${user.lastName}`,
          phone: user.phoneNumber,
          invited: user.invited,
          confirmed: user.invitationAnswer
        })
      } 
      else {
        data.numOfNotArriving += user.invited
        data.notArrivingTable.push({
          name: `${user.firstName} ${user.lastName}`,
          phone: user.phoneNumber,
          invited: user.invited,
        })
      }
    } else if (user.invitationSent && !user.userAnswered) {
      data.pendingInvitation += user.invited
      data.pendingInvitationTable.push({
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phoneNumber,
        invited: user.invited,
      })
    } else if (!user.invitationSent) {
      data.unrecievedInvitation += user.invited
      data.unrecievedInvitationTable.push({
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phoneNumber,
        invited: user.invited,
      })
    }
  }

  return data;
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
        user.firstName.length > 0 &&
        user.lastName.length > 0 &&
        user.phoneNumber.length > 0 &&
        user.invited > 0
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

async function validateAnswerData(userId: string,
  invitationAnswer: number,
  foodType: IFoodType,
  transportSouth: boolean,
  transportCenter: boolean): Promise<{valid: boolean, error: string}> {
    try {
      const user = await UserModel.findOne({_id: userId});
      if(isNaN(foodType.vegie) || isNaN(foodType.vegan) || isNaN(foodType.gloten_free)) {
        return {valid: false, error: "Food object is not valid."}
      }
      if((foodType.vegie + foodType.vegan + foodType.gloten_free) > invitationAnswer) {
        return {valid: false, error: "Food answer is larger than invited number."}
      }
      if(transportSouth && transportCenter) {
        return {valid: false, error: "Transport from two places is not valid."};
      }
      if(transportSouth && transportCenter) {
        return {valid: false, error: "Transport from two places is not valid."};
      }
      else {
        return {valid: true, error: ""};
      }
    }
    catch(error) {
      throw error;
    }
}

export { getUsers, insertUser, updateUserAnswer, sendUsersInvitation, loadUsersFromCsv , getUsersData}
