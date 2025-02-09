import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('Mathew@321', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'mathewjosef41@gmail.com' },
      update: {},
      create: {
        email: 'mathewjosef41@gmail.com',
        name: 'Admin',
        password: hashedPassword
      }
    });

    console.log('Admin user created:', admin.email);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
