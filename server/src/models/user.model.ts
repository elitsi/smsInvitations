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

  @prop({default: false})
  userAnswered: boolean

  @prop()
  invitationAnswer: number

  @prop({ default: {vegie: 0, vegan: 0, gloten_free: 0}})
  foodType: {vegie: number, vegan: number, gloten_free: number}

  @prop()
  transportSouth: boolean

  @prop()
  transportCenter: boolean

  @prop()
  phoneNumber: string

  @prop({default: false})
  invited: number
}

export const UserModel = new User().getModelForClass(User)
