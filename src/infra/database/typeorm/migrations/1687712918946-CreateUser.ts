import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1687712918946 implements MigrationInterface {
	public name = 'CreateUser1687712918946';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
		await queryRunner.query(`
      ALTER TABLE "tools"
      ADD "userId" uuid NOT NULL
    `);
		await queryRunner.query(`
      ALTER TABLE "tools"
      ADD CONSTRAINT "FK_d16f67296fd9b08df781295cb46" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "tools" DROP CONSTRAINT "FK_d16f67296fd9b08df781295cb46"
    `);
		await queryRunner.query(`
      ALTER TABLE "tools" DROP COLUMN "userId"
    `);
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
