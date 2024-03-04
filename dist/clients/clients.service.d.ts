/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from 'src/providers/appointments.model';
import { ReserveDto } from './reserve.dto';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
export declare class ClientsService {
    private readonly apptModel;
    private readonly usersService;
    constructor(apptModel: Model<AppointmentDocument>, usersService: UsersService);
    getAllProviderTimeSlots(): Promise<(import("mongoose").FlattenMaps<AppointmentDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    reserveApptSlot(reserveDto: ReserveDto, request: Request): Promise<import("mongoose").Document<unknown, {}, AppointmentDocument> & Appointment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
