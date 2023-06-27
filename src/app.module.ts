import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { HTTPModule } from '@infra/http/http.module';

@Module({
	imports: [DatabaseModule, HTTPModule],
})
export class AppModule {}
