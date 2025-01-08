import ReadConfig from '@/components/business/readConfig';

// 文章类型
// interface Post {
//   title: string;
//   content: string;
// }

export default async function Page({ params }: { params: { pid: string } }) {
  const { pid } = params;
  console.log(pid);
  // 根据文章 ID 获取文章数据
  // const res = await fetch(`https://api.example.com/posts/${pid}`);
  // const post: Post = await res.json();

  // if (!post) {
  //   // 处理文章不存在的情况
  //   return <div>文章未找到</div>;
  // }

  return (
    <main className="relative mt-7">
      {/* <h1>{post.title}</h1>
      <div>{post.content}</div> */}
      <div className="fixed ml-[-7rem] top-30">
        <ReadConfig />
      </div>
    </main>
  );
}
