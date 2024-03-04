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
exports.ProvidersService = void 0;
const common_1 = require("@nestjs/common");
const appointments_model_1 = require("./appointments.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProvidersService = class ProvidersService {
    constructor(apptModel) {
        this.apptModel = apptModel;
    }
    async createAppointment(createAppointmentDto) {
        const appointments = await this.createAppointments(createAppointmentDto);
        const updateOperations = appointments.map((appointment) => {
            const filter = {
                user: appointment.user,
                availabilityOption: appointment.availabilityOption
            };
            const update = {
                $set: appointment
            };
            return {
                updateOne: {
                    filter: filter,
                    update: update,
                    upsert: true
                }
            };
        });
        const result = await this.apptModel.bulkWrite(updateOperations);
        return result;
    }
    async createAppointments(createAppointmentDto) {
        let dates = createAppointmentDto.availabilities.map((a) => new Date(a));
        const evenNumberOfDates = this.ensureAnEvenNumberOfTimes(dates);
        if (evenNumberOfDates && dates.every(this.isTimeBlockDivisibleByFifteen)) {
            let arr = [];
            dates.sort((a, b) => a.getTime() - b.getTime());
            for (let i = 0; i < dates.length - 1; i += 2) {
                const leftDate = dates[i];
                const rightDate = dates[i + 1];
                const returnedTimeBlocks = await this.makeTheDateMap(leftDate, rightDate);
                arr.push(...returnedTimeBlocks.map(value => this.mapIntoAppointmentObject(createAppointmentDto.user, value)));
            }
            return arr;
        }
        else {
            return [];
        }
    }
    async makeTheDateMap(leftDate, rightDate) {
        return new Promise((resolve, reject) => {
            const timeBlocks = [];
            let currentDate = new Date(leftDate);
            currentDate.setMilliseconds(900000 - (currentDate.getMinutes() * 60000 + currentDate.getSeconds() * 1000 + currentDate.getMilliseconds()) % 900000);
            while (currentDate <= rightDate) {
                timeBlocks.push(new Date(currentDate));
                currentDate.setMinutes(currentDate.getMinutes() + 15);
            }
            resolve(timeBlocks);
        });
    }
    mapIntoAppointmentObject(user, availability) {
        let appt = new appointments_model_1.Appointment();
        appt.availabilityOption = availability;
        appt.taken_by_user = null;
        appt.time_confirmed = null;
        appt.user = user;
        return appt;
    }
    isTimeBlockDivisibleByFifteen(d) {
        return new Date(d).getMinutes() % 15 === 0;
    }
    ensureAnEvenNumberOfTimes(dates) {
        return dates.length % 2 === 0;
    }
};
exports.ProvidersService = ProvidersService;
exports.ProvidersService = ProvidersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('appointments')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProvidersService);
//# sourceMappingURL=providers.service.js.map