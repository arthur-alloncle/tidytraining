import { Migration } from '@mikro-orm/migrations';

export class Migration20251020073856 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop index \`user_email_unique\`;`);
  }

}
