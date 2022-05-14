import UserModel, { UserDocument, UserInput } from "../models/user.model";
import {DocumentDefinition, FilterQuery} from "mongoose";
import { omit } from "lodash";
export async function createUser( input : DocumentDefinition<Omit<UserDocument,'createdAt'|'updatedAt'|'comparePassword'> >)
{
    try{
        return await UserModel.create(input);
    }
    catch(err : any)
    {
        throw new Error(err);
    }
}

export async function validatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return false;
    }
  
    const isValid = await user.comparePassword(password);
  
    if (!isValid) return false;
  
    return omit(user.toJSON(), "password");
  }

export async function findUser(query : FilterQuery<UserDocument>){
  return UserModel.findOne(query).lean();
}