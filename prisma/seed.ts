import { prisma } from '../lib/prisma';

const users = [
  {
    email: 'demo@example.com',
    name: 'Demo User',
    emailVerified: new Date(),
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  },
  {
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: new Date(),
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`✓ User ${user.email} already exists`);
    } else {
      const newUser = await prisma.user.create({
        data: user,
      });
      console.log(`✓ Created user: ${newUser.email}`);
    }
  }

  console.log('✅ Database seed completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
