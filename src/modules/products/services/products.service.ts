import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem Ipsum 🔠 - product service 1 🔢',
      price: 1000,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
      stock: 11,
    },
  ];

  findAll() {
    return this.products;
  }
}
