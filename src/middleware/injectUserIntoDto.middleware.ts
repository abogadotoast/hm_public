
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import parseJwt from 'src/helpers/parseJwt.helper';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InjectUserIntoDTOMiddleware implements NestMiddleware {
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
    else{
        // Bind the user to the request.
        req.body.user = user;
    }
    next();
  }
}
