# smsInvitations

Send SMS invitations &amp; confirmations

### API's

| Method  | URL                          | Parameters                                   | Description                       |
| ------- | ---------------------------- | -------------------------------------------- | --------------------------------- |
| `GET`   | `/`                          |                                              | Retrieve client main apge.        |
| `GET`   | `/api/users/getUsers`        |                                              | Get all existing users.           |
| `POST`  | `/api/users/insertUser`      | firstName, lastName, phoneNumber             | Insert single user.               |
| `PATCH` | `/api/users/updateAnswer`    | userId, invitationAnswer, foodType, needRide | Update data for user with 123 id. |
| `POST`  | `/api/users/sendInvitations` |                                              | Send invitations to all users.    |
