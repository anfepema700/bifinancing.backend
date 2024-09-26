import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalSupportModule } from './technical-support/technical-support.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { LotteryModule } from './lottery/lottery.module';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WithdrawalRequestModule } from './withdrawal-request/withdrawal-request.module';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    TechnicalSupportModule,
    LoginModule,
    UserModule,
    LotteryModule,
    WithdrawalRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
