import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  async registerUser(): Promise<void> {
    this.createdAt = new Date();
    this.password = await hash(
      this.password,
      Number(process.env.PASSWORD_SALT),
    );
  }

  @BeforeUpdate()
  async updateUser(): Promise<void> {
    if (this.password) {
      this.password = await hash(
        this.password,
        Number(process.env.PASSWORD_SALT),
      );
    }
  }
}
