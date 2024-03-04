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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ClientsService } from './clients.service';
import { ReserveDto } from './reserve.dto';
export declare class ClientsController {
    private clientService;
    constructor(clientService: ClientsService);
    availableAppointmentSlots(): Promise<(import("mongoose").FlattenMaps<import("../providers/appointments.model").AppointmentDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    reserveAppointmentSlot(request: any, reserveDto: ReserveDto): Promise<import("mongoose").Document<unknown, {}, import("../providers/appointments.model").AppointmentDocument> & import("../providers/appointments.model").Appointment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
