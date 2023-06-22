import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { HTTPmodule } from '@infra/http/http.module';

@Module({
	imports: [DatabaseModule, HTTPmodule],
})
export class AppModule {}
