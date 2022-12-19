import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [CustomersService, UsersService],
  imports: [ProductsModule],
})
export class UsersModule {}
