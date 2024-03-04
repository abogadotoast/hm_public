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
exports.AppointmentSchema = exports.Appointment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_model_1 = require("../users/users.model");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", users_model_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Appointment.prototype, "availabilityOption", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", users_model_1.User)
], Appointment.prototype, "taken_by_user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Appointment.prototype, "time_confirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Appointment.prototype, "time_reserved", void 0);
exports.Appointment = Appointment = __decorate([
    (0, mongoose_1.Schema)()
], Appointment);
exports.AppointmentSchema = mongoose_1.SchemaFactory.createForClass(Appointment);
//# sourceMappingURL=appointments.model.js.map