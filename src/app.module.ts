import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mohmed123:mohmed123@ac-o4nnzs0-shard-00-00.yi9werh.mongodb.net:27017,ac-o4nnzs0-shard-00-01.yi9werh.mongodb.net:27017,ac-o4nnzs0-shard-00-02.yi9werh.mongodb.net:27017/dinamo?ssl=true&replicaSet=atlas-1yqtqc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    ProductModule,
    UserModule,
    CartModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
