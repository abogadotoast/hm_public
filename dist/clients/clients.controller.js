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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const clients_service_1 = require("./clients.service");
const reserve_dto_1 = require("./reserve.dto");
let ClientsController = class ClientsController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async availableAppointmentSlots() {
        return await this.clientService.getAllProviderTimeSlots();
    }
    async reserveAppointmentSlot(request, reserveDto) {
        return await this.clientService.reserveApptSlot(reserveDto, request);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/availability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "availableAppointmentSlots", null);
__decorate([
    (0, common_1.Post)('/reserve'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reserve_dto_1.ReserveDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "reserveAppointmentSlot", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map