import { Injectable } from "@nestjs/common";
import { Restaurant, RestaurantRating } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class RestaurantService {

    constructor(private prisma: PrismaService) { }

    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.prisma.restaurant.findMany();
    }

    async getRestaurantById(id: number): Promise<Restaurant> {
        return this.prisma.restaurant.findUnique({
            where: {
                id: id,
            },
        });
    }

    async createRestaurant(data: Restaurant): Promise<Restaurant> {
        return this.prisma.restaurant.create({
            data,
        });
    }

    async updateRestaurant(id: number, data: Restaurant): Promise<Restaurant> {
        return this.prisma.restaurant.update({
            where: {
                id: id,
            },
            data,
        });
    }

    async deleteRestaurant(id: number): Promise<Restaurant> {
        return this.prisma.restaurant.delete({
            where: {
                id,
            },
        });
    }

    async getAllRestaurantRatings(): Promise<RestaurantRating[]> {
        return this.prisma.restaurantRating.findMany();
    }

    async createRestaurantRating(data: RestaurantRating): Promise<RestaurantRating> {
        return this.prisma.restaurantRating.create({
            data,
        });
    }

    async deleteRestaurantRating(id: number): Promise<RestaurantRating> {
        return this.prisma.restaurantRating.delete({
            where: {
                id,
            },
        });
    }

    async updateRestaurantRating(id: number, data: RestaurantRating): Promise<RestaurantRating> {
        return this.prisma.restaurantRating.update({
            where: {
                id: id,
            },
            data,
        });
    }

    async getRatingsByRestaurantId(restaurantId: number): Promise<RestaurantRating[]> {
        return this.prisma.restaurantRating.findMany({
            where: {
                restaurantId: restaurantId,
            },
        });
    }

    async getAverageRatingByRestaurantId(restaurantId: number): Promise<number> {
        const query = this.prisma.restaurantRating.aggregate(
            {
                _avg: {
                    rating: true
                },
                where: {
                    restaurantId: restaurantId
                }
            }
        )

        return (await query)._avg.rating;
    }
}