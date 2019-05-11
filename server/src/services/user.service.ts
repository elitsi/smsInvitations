import User from '../models/user.model';

async function getUsers() {
    return await User.find({}).exec();
}

async function insertUser(firstName: string, lastName: string) {
    return await User.insertMany([{firstName: firstName, lastName: lastName}])
}

async function insertDummyUser() {
    return await User.insertMany([{firstName: "test", lastName: "user"}])
}

export { getUsers, insertDummyUser, insertUser };