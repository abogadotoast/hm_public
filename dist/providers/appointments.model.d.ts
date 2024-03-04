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
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/users.model';
export type AppointmentDocument = Appointment & Document;
export declare class Appointment {
    user: User;
    availabilityOption: Date;
    taken_by_user: User;
    time_confirmed: Date;
    time_reserved: Date;
}
export declare const AppointmentSchema: mongoose.Schema<Appointment, mongoose.Model<Appointment, any, any, any, mongoose.Document<unknown, any, Appointment> & Appointment & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Appointment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Appointment>> & mongoose.FlatRecord<Appointment> & {
    _id: mongoose.Types.ObjectId;
}>;
