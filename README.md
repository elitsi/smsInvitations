# smsInvitations

Send SMS invitations &amp; confirmations.
This app will let you send a custom SMS content for users that not yet recieved an invite.
All app users are stored in a mongo collection.
Users answer will be updated in the collection as well.

## Running Instructions

1. This app use AWS sms service. In order to send SMS, you'll have to set up env variables matching your account.
2. Set up DB uri (mongo) as environment variable.
3. Run npm start.

### API's

| Method  | URL                          | Parameters                                                                                                           | Description                       |
| ------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `GET`   | `/`                          |                                                                                                                      | Retrieve client main apge.        |
| `GET`   | `/api/users/getUsers`        |                                                                                                                      | Get all existing users.           |
| `POST`  | `/api/users/insertUser`      | firstName, lastName, phoneNumber                                                                                     | Insert single user.               |
| `PATCH` | `/api/users/updateAnswer`    | userId, invitationAnswer (number of guests) , foodType (Object with vegie, vegan and glotan_free fields that hold integer value), needRide ( 0 -No, 1 - Yes)  | Update data for user with 123 id. |
| `POST`  | `/api/users/sendInvitations` |                                                                                          | Send invitations to all users.    |
