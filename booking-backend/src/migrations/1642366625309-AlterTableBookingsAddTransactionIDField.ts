import {MigrationInterface, QueryRunner} from "typeorm";

export class addBookingTransactionId1642366625309 implements MigrationInterface {
    name = 'AlterTableBookingsAddTransactionIDFieldId1642366625309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD COLUMN "transaction_id" VARCHAR(255) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD COLUMN "transaction_id" VARCHAR(255) DEFAULT NULL`);
    }

}
