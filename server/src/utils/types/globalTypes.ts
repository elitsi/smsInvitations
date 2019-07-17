export type ENV_VARIABLES = 'MONGO_URL' | 'ACCOUNT_TOKEN' | 'ACCOUNT_SID' | 'ENV_NAME'

export type InvitedUserItem = {
  firstName: string
  lastName: string
  phoneNumber: string
  invited: number
}

export type IFoodType = {
  vegie: number
  vegan: number
  gloten_free: number
}

export type IDashboardData = {
  totalInvited: number
  pendingInvitation: number
  unrecievedInvitation: number
  numOfconfirmed: number
  numOfNotArriving: number
  numOfVegie: number
  numOfVegan: number,
  numOfGlotenFree: number,
  numOfSouthTrasport: number
  numOfCenterTransport: number
  arrivingTable: Array<{ name: string; phone: string, invited: number }>
  notArrivingTable: Array<{ name: string; phone: string, invited: number }>
  pendingInvitationTable: Array<{ name: string; phone: string, invited: number }>
  unrecievedInvitationTable: Array<{ name: string; phone: string, invited: number }>
  partiallyArrivingTable: Array<{ name: string; phone: string; invited: number; confirmed: number }>
}
