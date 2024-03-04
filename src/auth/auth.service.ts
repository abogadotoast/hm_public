import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(pass, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            const payload = { sub: user._id, username: user.username  };
            return {
              access_token: await this.jwtService.signAsync(payload),
            };
        }
        return null;
      }
}