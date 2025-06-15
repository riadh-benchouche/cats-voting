import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: 'GET,PUT,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
