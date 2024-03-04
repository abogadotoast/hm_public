import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { Appointment, AppointmentDocument } from './appointments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentDto } from './appointment.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class ProvidersService {
    constructor(@InjectModel('appointments') private readonly apptModel: Model<AppointmentDocument>) {}

    async createAppointment(createAppointmentDto: AppointmentDto): Promise<any> {
        const appointments: Appointment[] = await this.createAppointments(createAppointmentDto);
    
        // Create an array of update operations for bulkWrite
        const updateOperations = appointments.map((appointment) => {
            // Filter criteria
            const filter = {
                user: appointment.user,
                availabilityOption: appointment.availabilityOption
            };
    
            // Update data
            const update = {
                $set: appointment // Assuming appointment contains all fields to be updated
            };
    
            // Create the update operation
            return {
                updateOne: {
                    filter: filter,
                    update: update,
                    upsert: true // Create if not found
                }
            };
        });
    
        // Perform bulkWrite
        const result = await this.apptModel.bulkWrite(updateOperations);
    
        return result;
    }

    async createAppointments(createAppointmentDto : AppointmentDto) : Promise<Appointment[]> {
        let dates = createAppointmentDto.availabilities.map((a) => new Date(a));
        const evenNumberOfDates = this.ensureAnEvenNumberOfTimes(dates);
        
        if(evenNumberOfDates && dates.every(this.isTimeBlockDivisibleByFifteen)) {
            let arr = [];

            // sort dates if not already sorted
            dates.sort((a, b) => a.getTime() - b.getTime());

            for (let i = 0; i < dates.length - 1; i += 2) {
                const leftDate = dates[i];
                const rightDate = dates[i + 1];
                const returnedTimeBlocks = await this.makeTheDateMap(leftDate, rightDate);
                arr.push(...returnedTimeBlocks.map(value => this.mapIntoAppointmentObject(createAppointmentDto.user, value)));
            }
            return arr;
        } else {
            return [];
        }
    }

    async makeTheDateMap(leftDate : Date, rightDate : Date) : Promise<Date[]> {
        return new Promise((resolve, reject) => {
            const timeBlocks = [];
            let currentDate = new Date(leftDate);
        
            // Round the left date to the nearest 15 minutes
            currentDate.setMilliseconds(900000 - (currentDate.getMinutes() * 60000 + currentDate.getSeconds() * 1000 + currentDate.getMilliseconds()) % 900000);
        
            while (currentDate <= rightDate) {
                timeBlocks.push(new Date(currentDate));
                currentDate.setMinutes(currentDate.getMinutes() + 15);
            }
        
            resolve(timeBlocks);
        });
    }

    mapIntoAppointmentObject(user : User, availability : Date) : Appointment {
        let appt = new Appointment();
        appt.availabilityOption = availability;
        appt.taken_by_user = null;
        appt.time_confirmed = null;
        appt.user = user;
        return appt;
    }

    isTimeBlockDivisibleByFifteen(d: Date) : boolean {
        return new Date(d).getMinutes() % 15 === 0;
    }

    ensureAnEvenNumberOfTimes(dates : Date[]) : boolean {
        return dates.length % 2 === 0;
    }
}
