import mongoose from "mongoose";
import { CreateUserDto } from "../dtos/user/CreateUser.dto";
import { UpdateUserDto } from "../dtos/user/UpdateUser.dto";

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
    role: { type: String, required: false, enum: ["Professor", "Student"],default: 'Student' }
});


export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUsersByRole = (role: string) => UserModel.find({ role });
export const getUserByFullname = (fullname: string) => UserModel.findOne({ fullname });
export const getUserByEmail = (email: string) => UserModel.findOne({ email });


export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'sessionToken': sessionToken,
});

export const createUser = (values: CreateUserDto) => new UserModel(values).save().then((user) => user.toObject()).catch(err => console.log(err));
export const deleteUserByEmail = (email: string) => UserModel.findOneAndDelete({ email });
export const updateUserByEmail = (email: string, values: UpdateUserDto) => UserModel.findOneAndUpdate({ email }, values, {new: true});
