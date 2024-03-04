"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeProviderRoles = void 0;
const common_1 = require("@nestjs/common");
const parseJwt_helper_1 = require("../helpers/parseJwt.helper");
const role_enum_1 = require("../roles/role.enum");
const users_service_1 = require("../users/users.service");
let AuthorizeProviderRoles = class AuthorizeProviderRoles {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async use(req, res, next) {
        const token = req.header("Authorization");
        if (!token)
            return null;
        const translatedToken = (0, parseJwt_helper_1.default)(token);
        if (!translatedToken)
            return null;
        const username = translatedToken['username'];
        if (!username)
            return null;
        const user = await this.usersService.getUser({ username });
        if (!user)
            return null;
        const matchingRoles = user.roles.includes(role_enum_1.Role.Provider);
        if (matchingRoles) {
            next();
        }
        else {
            res.write("You do not have permission to access this resource.");
            res.end();
        }
    }
};
exports.AuthorizeProviderRoles = AuthorizeProviderRoles;
exports.AuthorizeProviderRoles = AuthorizeProviderRoles = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthorizeProviderRoles);
//# sourceMappingURL=authorizeProviderRoles.middleware.js.map