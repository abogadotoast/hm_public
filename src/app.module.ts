
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    AuthModule,
    UsersModule,

    MongooseModule.forRoot(process.env.DATABASE_URL),

    ProvidersModule,

    ClientsModule],
})
export class AppModule {}
