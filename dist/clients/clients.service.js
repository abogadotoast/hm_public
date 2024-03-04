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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let ClientsService = class ClientsService {
    constructor(apptModel, usersService) {
        this.apptModel = apptModel;
        this.usersService = usersService;
    }
    async getAllProviderTimeSlots() {
        const twentyFourHoursLater = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const thirtyMinutesLater = new Date(Date.now() + 30 * 60 * 1000);
        const filter = {
            availabilityOption: { $gte: twentyFourHoursLater },
            $or: [
                { taken_by_user: null },
                { taken_by_user: { $ne: null }, time_confirmed: null, time_reserved: { $gte: thirtyMinutesLater } }
            ]
        };
        return this.apptModel.find(filter).lean();
    }
    async reserveApptSlot(reserveDto, request) {
        const provider = await this.usersService.getUser({ username: reserveDto.providerName });
        const user = await this.usersService.getCurrentUserFromToken(request);
        const twentyFourHoursLater = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const thirtyMinutesLater = new Date(Date.now() + 30 * 60 * 1000);
        const filter = {
            user: provider,
            availabilityOption: { $gte: twentyFourHoursLater, $eq: reserveDto.availability },
            $or: [
                { taken_by_user: null },
                { taken_by_user: { $ne: null }, time_confirmed: null, time_reserved: { $gte: thirtyMinutesLater } }
            ]
        };
        const update = reserveDto.isConfirmed
            ? { $set: { taken_by_user: user, time_confirmed: new Date(), time_reserved: new Date() } }
            : { $set: { taken_by_user: user, time_reserved: new Date() } };
        const options = { new: true };
        return this.apptModel.findOneAndUpdate(filter, update, options).exec();
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('appointments')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map