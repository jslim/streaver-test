import { PrismaClient } from '@prisma/client';
import PostsList from '@/components/PostsList';

const prisma = new PrismaClient();

// Getting Posts
async function fetchPosts() {
  return prisma.post.findMany({
    include: { user: true },
  });
}

export default async function Page() {
  try {
    const posts = await fetchPosts();
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Posts</h1>
        <PostsList posts={posts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Error loading posts</h1>
      </div>
    );
  }
}
