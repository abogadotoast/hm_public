"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const clients_controller_1 = require("./clients.controller");
const clients_service_1 = require("./clients.service");
const mongoose_1 = require("@nestjs/mongoose");
const appointments_model_1 = require("../providers/appointments.model");
const users_service_1 = require("../users/users.service");
const users_model_1 = require("../users/users.model");
const authorizeClientRoles_middleware_1 = require("../middleware/authorizeClientRoles.middleware");
let ClientsModule = class ClientsModule {
    configure(consumer) {
        consumer.apply(authorizeClientRoles_middleware_1.AuthorizeClientRoles).forRoutes('providers');
    }
};
exports.ClientsModule = ClientsModule;
exports.ClientsModule = ClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "appointments", schema: appointments_model_1.AppointmentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "user", schema: users_model_1.UserSchema }])],
        controllers: [clients_controller_1.ClientsController],
        providers: [clients_service_1.ClientsService, users_service_1.UsersService]
    })
], ClientsModule);
//# sourceMappingURL=clients.module.js.map