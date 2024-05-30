import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':clientId/add/:productId/:quantity')
  async addToCart(
    @Param('clientId') clientId: string,
    @Param('productId') productId: string,
    @Param('quantity') quantity: string,
  ): Promise<CartItem> {
    const numericClientId = parseInt(clientId, 10);
    const numericProductId = parseInt(productId, 10);
    const numericQuantity = parseInt(quantity, 10);

    return this.cartService.addToCart(
      numericClientId,
      numericProductId,
      numericQuantity,
    );
  }

  @Get(':clientId')
  async getCartItemsByClient(
    @Param('clientId') clientId: string,
  ): Promise<CartItem[]> {
    const numericClientId = parseInt(clientId, 10);
    return this.cartService.getCartItemsByClient(numericClientId);
  }

  @Delete(':itemCarId')
  async deleteCartItem(
    @Param('itemCarId') itemCarId: string,
  ): Promise<CartItem> {
    const numericItemCarId = parseInt(itemCarId, 10);
    return this.cartService.deleteCartItem(numericItemCarId);
  }
}
