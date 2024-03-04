import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from 'src/providers/appointments.model';
import { UsersService } from 'src/users/users.service';
import { UserSchema } from 'src/users/users.model';
import { AuthorizeClientRoles } from 'src/middleware/authorizeClientRoles.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: "appointments", schema: AppointmentSchema }]),
  MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [ClientsController],
  providers: [ClientsService, UsersService]
})
export class ClientsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizeClientRoles).forRoutes('providers');
  }
}
