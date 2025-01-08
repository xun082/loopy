import ArticleCard from '@/components/business/article';

// 模拟文章数据
const articles = [
  {
    author: 'Sarah Johnson',
    authorAvatar: '/user.png',
    teamName: 'Frontend Team',
    timeAgo: '2 hours ago',
    title: 'Understanding React Server Components',
    description:
      "A deep dive into React Server Components and how they can improve your application's performance and user experience.",
    coverImage: 'https://picsum.photos/seed/1/800/600',
    reactions: 124,
    comments: 45,
    tags: ['react', 'nextjs', 'frontend'],
    hotComment: {
      author: 'Mike Chen',
      authorAvatar: '/user.png',
      content: 'This is exactly what I needed to understand RSC better!',
      timeAgo: '1 hour ago',
    },
  },
  {
    author: 'David Lee',
    authorAvatar: '/user.png',
    teamName: 'DevOps Team',
    timeAgo: '5 hours ago',
    title: 'Optimizing Docker Containers for Production',
    description:
      'Learn the best practices for optimizing Docker containers in a production environment, including security and performance considerations.',
    coverImage: 'https://picsum.photos/seed/2/800/600',
    reactions: 89,
    comments: 23,
    tags: ['docker', 'devops', 'optimization'],
    hotComment: {
      author: 'Lisa Wang',
      authorAvatar: '/user.png',
      content: 'Great tips! Especially the section about multi-stage builds.',
      timeAgo: '3 hours ago',
    },
  },
];

export default function Page() {
  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl space-y-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </main>
  );
}
