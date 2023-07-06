import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>
  ) {}

  create(CreateProductDto: CreateProductDto) {
    return this.repository.save(CreateProductDto);
  }

  findAll() {
    return this.repository.find();
  }

  popular() {
    return this.repository.find({
      order: {
        views: "DESC"
      }
    });
  }

  async findOne(id: number) {
    const find = await this.repository.findOne({where: { id }})
    if(!find) {
      throw new NotFoundException("Продукт не найден!")
    }
    return find;
  }
  
  async update(id: number, dto: UpdateProductDto) {
    const find = await this.repository.findOne({where:{ id }})
    if(!find) {
      throw new NotFoundException("Продукт не найден!")
    }
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const find = await this.repository.findOne({where: { id }})
    if(!find) {
      throw new NotFoundException("Продукт не найден!")
    }
    return this.repository.delete(id);
  }
}
