import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class AuthorizeClientRoles implements NestMiddleware {
    private readonly usersService;
    constructor(usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<any>;
}
