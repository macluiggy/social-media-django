from django.db import models

"""
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DEFAULT_LANG } from '../lang';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'username', type: 'varchar', length: 50, unique: true })
  username: string;

  // @Column({ name: 'full_name', type: 'varchar', length: 100 })
  // fullName: string;
  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  fullName: string;
  @AfterLoad()
  async setFullName() {
    if (this.firstName && this.lastName) {
      this.fullName = `${this.firstName} ${this.lastName}`;
    } else {
      this.fullName = this.firstName || this.lastName;
    }
  }

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  password: string;

  @Column({ name: 'is_password_reset', type: 'boolean', default: false })
  isPasswordReset: boolean;

  @Column({ name: 'signature', type: 'varchar', length: 255, nullable: true })
  signature: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'role', type: 'varchar', length: 50, default: 'user' })
  role: string;

  @Column({
    name: 'preferred_language',
    type: 'varchar',
    nullable: false,
    default: DEFAULT_LANG,
  })
  preferredLanguage: string;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @Column({ name: 'phone', type: 'varchar', length: 100, default: '' })
  phone: string;

  @Column({
    name: 'profile_image_key',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profileImageKey: string;

  profileImageUrl: string;

  @BeforeInsert()
  async checkData() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}

"""
# Create your models here.


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100, null=True)
    fullName = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=150, null=True)
    isPasswordReset = models.BooleanField(default=False)
    signature = models.CharField(max_length=255, null=True)
    isActive = models.BooleanField(default=True)
    role = models.CharField(max_length=50, default="user")
    preferredLanguage = models.CharField(max_length=50, default="en")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True)
    phone = models.CharField(max_length=100, default="")
    profileImageKey = models.CharField(max_length=255, null=True)
    profileImageUrl = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.username
