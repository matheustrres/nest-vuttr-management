import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTool1687385204850 implements MigrationInterface {
	public name = 'CreateTool1687385204850';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE "tools" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "description" character varying(255) NOT NULL,
        "link" character varying(255) NOT NULL,
        "title" character varying(255) NOT NULL,
        "tags" text array NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_e23d56734caad471277bad8bf85" PRIMARY KEY ("id")
      )
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "tools"`);
	}
}
