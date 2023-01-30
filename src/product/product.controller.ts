import {
  Body,
  Query,
  Controller,
  HttpStatus,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  /**
   * Crear Producto
   * @param res any
   * @returns
   */
  @Post('/create')
  async CreateProduct(
    @Res() res,
    @Body() createProductsDto: CreateProductDto[],
  ) {
    const productCreated = await this.productService.createProduct(
      createProductsDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: '* Productos Creados', productCreated });
  }

  /**
   *  Obtener Productos
   * @param res any
   * @returns
   */
  @Get('/')
  async GetProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Productos Obtenidos', products });
  }

  /**
   *  Obtener un solo producto
   * @param res any
   * @param id string
   * @returns
   */
  @Get('/:id')
  async GetProduct(@Res() res, @Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Producto Obtenido', product });
  }

  @Put('/:id')
  async UpdateProduct(
    @Res() res,
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    const productUpdated = await this.productService.updateProduct(
      id,
      createProductDto,
    );
    if (!productUpdated) {
      throw new NotFoundException('Producto no encontrado');
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Producto Actualizado', productUpdated });
  }

  /**
   * Eliminar un producto
   * @param res any
   * @param id string
   * @returns
   */
  @Delete('/delete')
  async DeleteProduct(@Res() res, @Query('productID') productID: any) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) {
      throw new NotFoundException('Producto no encontrado');
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Producto Eliminado', productDeleted });
  }

  /**
   * Eliminar todos los productos     =>     Solo para pruebas
   * @param res any
   * @returns
   */
  @Delete('/delete/all')
  async DeleteProducts(@Res() res) {
    const productsDeleted = await this.productService.deleteProducts();
    if (!productsDeleted) {
      throw new NotFoundException(
        'Algunos productos no se han podido eliminar',
      );
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: '* Productos Eliminados', productsDeleted });
  }
}
