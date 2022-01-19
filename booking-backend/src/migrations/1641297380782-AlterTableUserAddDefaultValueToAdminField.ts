import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableUserAddDefaultValueToAdminField1641297380782 implements MigrationInterface {
    name = 'AlterTableUserAddDefaultValueToAdminField1641297380782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" DROP DEFAULT`);
    }

}
