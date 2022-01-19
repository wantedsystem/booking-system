import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableBookingsAddUUIDField1642518281633 implements MigrationInterface {
    name = 'AlterTableBookingsAddUUIDField1642518281633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "uuid" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "uuid"`);
    }

}
