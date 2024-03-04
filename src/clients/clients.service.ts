import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from 'src/providers/appointments.model';
import { ReserveDto } from './reserve.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class ClientsService {
    constructor(
        @InjectModel('appointments') private readonly apptModel: Model<AppointmentDocument>,
        private readonly usersService: UsersService
    ) {}

    

    async getAllProviderTimeSlots() {
        // find all the appointments that aren't taken
            // Calculate time constraints
    const twentyFourHoursLater = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const thirtyMinutesLater = new Date(Date.now() + 30 * 60 * 1000);
        const filter = {
            availabilityOption: { $gte: twentyFourHoursLater},
            $or: [
                { taken_by_user: null },
                { taken_by_user: { $ne: null }, time_confirmed: null, time_reserved: { $gte: thirtyMinutesLater } }
            ]
        }
        return this.apptModel.find(filter).lean();
    }

    async reserveApptSlot(reserveDto: ReserveDto, request: Request) {
    // Get user and provider
    const provider = await this.usersService.getUser({ username: reserveDto.providerName });
    const user = await this.usersService.getCurrentUserFromToken(request);

    // Calculate time constraints
    const twentyFourHoursLater = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const thirtyMinutesLater = new Date(Date.now() + 30 * 60 * 1000);

    // Construct filter
    const filter = {
        user: provider,
        availabilityOption: { $gte: twentyFourHoursLater, $eq: reserveDto.availability },
        $or: [
            { taken_by_user: null },
            { taken_by_user: { $ne: null }, time_confirmed: null, time_reserved: { $gte: thirtyMinutesLater } }
        ]
    };

    // Construct update based on confirmation status
    const update = reserveDto.isConfirmed
        ? { $set: { taken_by_user: user, time_confirmed: new Date(), time_reserved: new Date() } }
        : { $set: { taken_by_user: user, time_reserved: new Date() } };

    const options = { new: true };

    // Execute findOneAndUpdate
    return this.apptModel.findOneAndUpdate(filter, update, options).exec();
    }
}
