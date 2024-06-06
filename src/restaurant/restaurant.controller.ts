import { Controller, Delete, Get, Post, Param, Body, Put } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { NotFoundException } from "@nestjs/common";
import { Restaurant, RestaurantRating } from "@prisma/client";

@Controller('')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Get('restaurant')
    async getAllRestaurants() {
        return this.restaurantService.getAllRestaurants();
    }

    @Get('restaurant/:id')
    async getRestaurantById(@Param('id') id: string) {
        const restaurant = await this.restaurantService.getRestaurantById(Number(id));
        if (!restaurant) throw new NotFoundException('Restaurant does not exists');
        return restaurant;
    }

    @Delete('restaurant/:id')
    async deleteRestaurant(@Param('id') id: string) {
        try {
            return await this.restaurantService.deleteRestaurant(Number(id));
        } catch (error) {
            throw new NotFoundException('Restaurant does not exists');
        }
    }

    @Post('restaurant')
    async createRestaurant(@Body() data: Restaurant) {
        return this.restaurantService.createRestaurant(data);
    }

    @Put('restaurant/:id')
    async updateRestaurant(@Param('id') id: string, @Body() data: Restaurant) {
        try {
            return await this.restaurantService.updateRestaurant(Number(id), data);
        } catch (error) {
            throw new NotFoundException('RestaurantRating does not exists');
        }
    }

    @Get('ratings')
    async getRestaurantRatings() {
        return this.restaurantService.getAllRestaurantRatings()
    }

    @Get('ratings/:id')
    async getRestaurantRatingsById(@Param('id') id: string) {
        console.log(id)
        const restaurant = await this.restaurantService.getRatingsByRestaurantId(Number(id));
        if (!restaurant) throw new NotFoundException('Restaurant does not exists');
        return restaurant;
    }

    @Post('ratings')
    async createRating(@Body() data: RestaurantRating) {
        return this.restaurantService.createRestaurantRating(data);
    }

    @Delete('ratings/:id')
    async deleteRating(@Param('id') id: string) {
        try {
            return await this.restaurantService.deleteRestaurantRating(Number(id));
        } catch (error) {
            throw new NotFoundException('RestaurantRating does not exists');
        }
    }

    @Put('ratings/:id')
    async updateRestaurantRating(@Param('id') id: string, @Body() data: RestaurantRating) {
        try {
            return await this.restaurantService.updateRestaurantRating(Number(id), data);
        } catch (error) {
            throw new NotFoundException('RestaurantRating does not exists');
        }
    }

    @Get('ratings/avg/:id')
    async getAvgByRestaurantId(@Param('id') id: string) {
        const avg = await this.restaurantService.getAverageRatingByRestaurantId(Number(id))
        if (!avg) throw new NotFoundException('Restaurant does not exists');
        return Math.floor(avg);
    }
}