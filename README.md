# smsInvitations

Send SMS invitations &amp; confirmations

### API's

| Method  | URL                          | Parameters                                                                                                           | Description                       |
| ------- | ---------------------------- | ----------------------------------------------------------------------------------------                             | --------------------------------- |
| `GET`   | `/`                          |                                                                                                                      | Retrieve client main apge.        |
| `GET`   | `/api/users/getUsers`        |                                                                                                                      | Get all existing users.           |
| `POST`  | `/api/users/insertUser`      | firstName, lastName, phoneNumber                                                                                     | Insert single user.               |
| `PATCH` | `/api/users/updateAnswer`    | userId, invitationAnswer (number of guests) , foodType (1 - meat, 2 - fish, 3 - vegie, 4 - vegan), needRide ( 0 -No, 1 - Yes)  | Update data for user with 123 id. |
| `POST`  | `/api/users/sendInvitations` |                                                                                          | Send invitations to all users.    |
