"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersModule = void 0;
const common_1 = require("@nestjs/common");
const providers_controller_1 = require("./providers.controller");
const providers_service_1 = require("./providers.service");
const mongoose_1 = require("@nestjs/mongoose");
const appointments_model_1 = require("./appointments.model");
const injectUserIntoDto_middleware_1 = require("../middleware/injectUserIntoDto.middleware");
const users_service_1 = require("../users/users.service");
const users_model_1 = require("../users/users.model");
const authorizeProviderRoles_middleware_1 = require("../middleware/authorizeProviderRoles.middleware");
let ProvidersModule = class ProvidersModule {
    configure(consumer) {
        consumer.apply(injectUserIntoDto_middleware_1.InjectUserIntoDTOMiddleware, authorizeProviderRoles_middleware_1.AuthorizeProviderRoles).forRoutes('providers');
    }
};
exports.ProvidersModule = ProvidersModule;
exports.ProvidersModule = ProvidersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "appointments", schema: appointments_model_1.AppointmentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "user", schema: users_model_1.UserSchema }])],
        controllers: [providers_controller_1.ProvidersController],
        providers: [providers_service_1.ProvidersService, users_service_1.UsersService]
    })
], ProvidersModule);
//# sourceMappingURL=providers.module.js.map