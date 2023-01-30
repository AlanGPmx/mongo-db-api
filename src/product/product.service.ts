import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './interfaces/producto.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID).exec();
    return product;
  }

  async createProduct(
    createProductsDTO: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    let createProductDTO: CreateProductDto;
    let task: any;
    for (createProductDTO of createProductsDTO) {
      task = new this.productModel(createProductDTO);
      await task.save();
    }

    return createProductsDTO;
  }

  async updateProduct(
    productID: string,
    createProductDto: CreateProductDto,
  ): Promise<Product[]> {
    const task: any = await this.productModel
      .findByIdAndUpdate(productID, createProductDto, { new: true }) // El arreglo con la propiedad new: true es para que devuelva el objeto actualizado
      .exec();

    return task;
  }

  async deleteProduct(productID: string): Promise<Product[]> {
    const productoParaEliminar: any = await this.productModel
      .findByIdAndDelete(productID)
      .exec();
    return productoParaEliminar;
  }

  async deleteProducts(): Promise<Product[]> {
    const productosParaEliminar: any = await this.productModel
      .deleteMany()
      .exec();
    return productosParaEliminar;
  }
}
