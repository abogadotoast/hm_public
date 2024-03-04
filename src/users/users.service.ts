import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import { Role } from 'src/roles/role.enum';
import parseJwt from 'src/helpers/parseJwt.helper';
import {Request} from 'express';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string, roles: Role[]): Promise<User> {
        return this.userModel.create({
            username,
            password,
            roles
        });
    }
    async getUser(query: object ): Promise<User> {
        return this.userModel.findOne(query);
    }
    async getCurrentUserFromToken(req : Request) : Promise<User>{
        const token = req.header("Authorization");
        if(!token) return null;
        const translatedToken = parseJwt(token);
        if(!translatedToken) return null;
        const username = translatedToken['username'];
        if(!username) return null;
        const user = await this.getUser({ username });
        if (!user) return null;
        return user;
    }
}