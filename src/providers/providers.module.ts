import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from './appointments.model';
import { InjectUserIntoDTOMiddleware } from 'src/middleware/injectUserIntoDto.middleware';
import { UsersService } from 'src/users/users.service';
import { UserSchema } from 'src/users/users.model';
import { AuthorizeProviderRoles } from 'src/middleware/authorizeProviderRoles.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: "appointments", schema: AppointmentSchema }])
  , MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [ProvidersController],
  providers: [ProvidersService, UsersService]
})
export class ProvidersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InjectUserIntoDTOMiddleware, AuthorizeProviderRoles).forRoutes('providers');
  }
}
