import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  try {
    const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');

    // Map to store the mapping between API user IDs and Prisma user IDs
    const userIdMap = new Map<number, number>();

    // Seed Geo, Address, Company, and Users
    for (const user of users) {
      const geo = await prisma.geo.create({
        data: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng,
        },
      });

      const address = await prisma.address.create({
        data: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geoId: geo.id,
        },
      });

      const company = await prisma.company.create({
        data: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        },
      });

      // Create User and store the mapping
      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          addressId: address.id,
          companyId: company.id,
        },
      });

      userIdMap.set(user.id, createdUser.id); // Map API user ID to Prisma user ID
    }

    // Seed Posts
    for (const post of posts) {
      const prismaUserId = userIdMap.get(post.userId); // Get the corresponding Prisma user ID
      if (!prismaUserId) {
        console.warn(`Skipping post with userId ${post.userId} as no matching user was found.`);
        continue;
      }

      await prisma.post.create({
        data: {
          title: post.title,
          body: post.body,
          userId: prismaUserId, // Use mapped Prisma user ID
        },
      });
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
