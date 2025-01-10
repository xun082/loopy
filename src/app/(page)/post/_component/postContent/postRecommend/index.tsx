const PostRecommend: React.FC = ({}) => {
  const posts = [
    {
      href: '/post/11111',
      title: 'pnpm才是前端工程化项目的未来',
      reads: '8.9k阅读',
      likes: '155点赞',
    },
    {
      href: '/post/11111',
      title: '前端开发中，如何优雅的实现一个拖拽功能',
      reads: '8.9k阅读',
      likes: '155点赞',
    },
    {
      href: '/post/11111',
      title: 'proxy代理的实现原理',
      reads: '8.9k阅读',
      likes: '155点赞',
    },
    {
      href: '/post/11111',
      title: 'element-ui 源码解析',
      reads: '8.9k阅读',
      likes: '155点赞',
    },
    // 可以在这里添加更多的帖子数据
  ];

  return (
    <div className="bg-white rounded-xl border border-solid border-post-border mt-4 p-4 hover:border hover:border-solid hover:border-primary">
      <div className="content-title flex justify-between items-center font-medium text-xl ">
        <h4>推荐内容</h4>
      </div>
      <div className="pb-2">
        {posts.map((post, index) => (
          <a key={index} href={post.href} target="_blank" title={post.title} className="block pt-4">
            <div className="text-sm text-post-text_1 whitespace-nowrap overflow-hidden text-ellipsis hover:text-primary">
              {post.title}
            </div>
            <div className="mt-1 flex">
              <span className="flex text-xs text-post-text_3 font-normal">{post.reads}</span>
              <span className="flex text-xs text-post-text_3 font-normal"> &nbsp;·&nbsp; </span>
              <span className="flex text-xs text-post-text_3 font-normal">{post.likes}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PostRecommend;
