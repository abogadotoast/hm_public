import { ProvidersService } from './providers.service';
import { AppointmentDto } from './appointment.dto';
export declare class ProvidersController {
    private providerService;
    constructor(providerService: ProvidersService);
    submitTimes(appointmentDto: AppointmentDto): Promise<any>;
}
