import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { UserModule } from './users/user.module';
import { AuthMiddleware } from './users/middlewares/auth.middleware';
import { TicketModule } from './ticket/ticket.module';
import { MessageModule } from './messages/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    TicketModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
