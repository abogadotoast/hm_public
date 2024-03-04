
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';
import parseJwt from 'src/helpers/parseJwt.helper';
import { Role } from 'src/roles/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthorizeProviderRoles implements NestMiddleware {
constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if(!token) return null;
    const translatedToken = parseJwt(token);
    if(!translatedToken) return null;
    const username = translatedToken['username'];
    if(!username) return null;
    const user = await this.usersService.getUser({ username });
    if (!user) return null;
    const matchingRoles = user.roles.includes(Role.Provider);
    if(matchingRoles){
      next();
    }
    else{
      res.write("You do not have permission to access this resource.");
      res.end();
    }
  }
}
