import { Injectable } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async addToCart(
    clientId: number,
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data: {
        clientId,
        productId,
        quantity,
      },
    });
  }

  async getCartItemsByClient(clientId: number): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      where: {
        clientId,
      },
    });
  }

  async deleteCartItem(clientItemId: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where: {
        id: clientItemId,
      },
    });
  }

  async clearCartByClientId(clientId: number): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where: {
        clientId: clientId,
      },
    });
  }

  async deleteProductFromCart(
    productId: number,
    clientId: number,
  ): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where: {
        productId: productId,
        clientId: clientId,
      },
    });
  }
}
