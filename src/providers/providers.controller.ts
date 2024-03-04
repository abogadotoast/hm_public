import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { AppointmentDto } from './appointment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('providers')
export class ProvidersController {
    constructor(private providerService: ProvidersService) { }

    @UseGuards(AuthGuard)
    @Post('/submitTimes')
    //@UseGuards(AuthGuard('local'))
    async submitTimes(@Body() appointmentDto: AppointmentDto){
        return await this.providerService.createAppointment(appointmentDto);
    }
}
