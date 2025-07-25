import UserModel from "../models/users.model.js";

export class UserRepository {
    async create (userData){
        const user = await UserModel.create(userData);
        return user;
    }

    async getByEmail(email){
        return await UserModel.findOne({ email });
    }

    async getById(id){
        return await UserModel.findById(id);
    }

    async update(id, updateData){
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete (id){
        return await UserModel.findByIdAndDelete(id);
    }

    async getAll(){
        return await UserModel.find();
    }
}