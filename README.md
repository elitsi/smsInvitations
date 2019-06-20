# smsInvitations

Send SMS invitations &amp; confirmations

### API's

| Method  | URL                          | Parameters                                                                                                           | Description                       |
| ------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `GET`   | `/`                          |                                                                                                                      | Retrieve client main apge.        |
| `GET`   | `/api/users/getUsers`        |                                                                                                                      | Get all existing users.           |
| `POST`  | `/api/users/insertUser`      | firstName, lastName, phoneNumber                                                                                     | Insert single user.               |
| `PATCH` | `/api/users/updateAnswer`    | userId, invitationAnswer (number of guests) , foodType (Object with vegie, vegan and glotan_free fields that hold integer value), needRide ( 0 -No, 1 - Yes)  | Update data for user with 123 id. |
| `POST`  | `/api/users/sendInvitations` |                                                                                          | Send invitations to all users.    |
