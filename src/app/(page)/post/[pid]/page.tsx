import ReadConfig from '@/components/business/readConfig';
import AuthorInfo from '@/app/(page)/post/_component/authorInfo';
import PostCatalog from '@/app/(page)/post/_component/postCatalog';
import PostRecommend from '@/app/(page)/post/_component/postContent/postRecommend';
import PostContent from '@/app/(page)/post/_component/postContent';
// 文章类型

export type Category = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  name: string;
};

export interface Post {
  id: string;
  title: string;
  content: string;
  summary: string;
  cover_image: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
  tags: Tag[];
  is_like: boolean;
  like_count: number;
  comment_count: number;
  is_collection: boolean;
  collection_count: number;
}

export default async function Page({ params }: { params: { pid: string } }) {
  const { pid } = params;
  console.log(pid);

  // 根据文章 ID 获取文章数据
  // const res = await fetch(`https://api.example.com/posts/${pid}`);
  // const post: Post = await res.json();
  const post: Post = {
    id: '1',
    title: 'pnpm才是前端工程化项目的未来',
    content: 'pnpm才是前端工程化项目的未来,我们一起来学习pnpm吧',
    summary: '该文章主要介绍了pnpm在工程化项目中的应用',
    cover_image: 'https://cdn.leonus.cn/other/bg2.webp',
    is_public: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    category: {
      id: 1,
      name: '前端',
    },
    tags: [
      {
        id: 1,
        name: 'pnpm',
      },
      {
        id: 2,
        name: '前端',
      },
    ],
    is_like: false,
    like_count: 0,
    comment_count: 0,
    is_collection: false,
    collection_count: 0,
  };

  // if (!post) {
  //   // 处理文章不存在的情况
  //   return <div>文章未找到</div>;
  // }

  return (
    <main className="relative mt-7 mb-10">
      <div className="flex gap-4">
        <main className="flex-1 flex flex-col">
          <article className="bg-white h-max w-full px-8 py-10 rounded-xl border border-solid border-post-border hover:border hover:border-solid hover:border-primary">
            <PostContent post={post} />
          </article>
          {/* <div><PostComment /></div> */}
        </main>
        <aside className="w-1/4 flex flex-col ">
          <AuthorInfo
            author="罗小黑"
            authorAvatar="https://q1.qlogo.cn/g?b=qq&nk=990320751&s=5"
            description="进一寸有进一寸的欢喜"
            coverImage="https://cdn.leonus.cn/other/bg2.webp"
            articleNum={82}
            readNum={2023}
            fansNum={3000}
            hasAttention={true}
          />
          <PostCatalog />
          <PostRecommend />
        </aside>
      </div>
      <div className="fixed ml-[-7rem] top-24">
        <ReadConfig />
      </div>
    </main>
  );
}
