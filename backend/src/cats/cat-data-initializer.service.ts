import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {CatsService} from './cats.service';
import {createCatDto} from './schemas/cat.schema';

@Injectable()
export class CatDataInitializerService implements OnApplicationBootstrap {
    constructor(
        private readonly httpService: HttpService,
        private readonly catsService: CatsService,
    ) {
    }

    async onApplicationBootstrap() {
        try {
            const response = await this.httpService.axiosRef.get<{ images: { url: string, id: string }[] }>(
                'https://data.latelier.co/cats.json',
            );
            const catsData = response.data.images;

            for (const catData of catsData) {
                const existingCat = await this.catsService.findByImage(catData.url);

                if (!existingCat) {
                    const createCatDto: createCatDto = {
                        image: catData.url,
                    };
                    await this.catsService.create(createCatDto);
                }
            }

            console.log('Cat data initialized successfully.');
        } catch (error) {
            console.error('Error initializing cat data:', error);
        }
    }
}