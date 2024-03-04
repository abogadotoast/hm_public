import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/roles/role.enum';
import { User } from 'src/users/users.model';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  availabilityOption: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  taken_by_user: User;

  @Prop()
  time_confirmed: Date;

  @Prop()
  time_reserved: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);