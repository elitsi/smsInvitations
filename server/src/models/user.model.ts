import * as mongoose from 'mongoose'
import { prop, Typegoose, ModelType, InstanceType, pre } from 'typegoose'

@pre<User>('save', function(next: any) {
  this.createdAt = new Date();
  next();
})
@pre<User>('updateOne', function(next: any) {
  this.updatedAt = new Date();
  next();
})
@pre<User>('update', function(next: any) {
  this.updatedAt = new Date();
  next();
})
export class User extends Typegoose {
  _id: mongoose.Schema.Types.ObjectId

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date

  @prop()
  firstName: string

  @prop()
  lastName: string

  @prop()
  invitationSent: boolean

  @prop()
  invitationAnswer: number

  @prop()
  foodType: {vegie: {type: number, default: 0}, vegan: {type: number, default: 0}, gloten_free: {type: number, default: 0}}

  @prop()
  needRide: boolean

  @prop()
  phoneNumber: string

  @prop()
  invited: number
}

export const UserModel = new User().getModelForClass(User)
