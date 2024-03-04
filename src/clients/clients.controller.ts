import { Controller, Request, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientsService } from './clients.service';
import { ReserveDto } from './reserve.dto';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService) { }

    @UseGuards(AuthGuard)
    @Get('/availability')
    //@UseGuards(AuthGuard('local'))
    async availableAppointmentSlots(){
        return await this.clientService.getAllProviderTimeSlots();
    }
    @Post('/reserve')
    async reserveAppointmentSlot(@Request() request, @Body() reserveDto : ReserveDto){
        return await this.clientService.reserveApptSlot(reserveDto, request);
    }
}
