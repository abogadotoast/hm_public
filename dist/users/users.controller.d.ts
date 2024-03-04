import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/role.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(password: string, username: string, roles: Role[]): Promise<User>;
}
