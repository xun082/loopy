// import { AiOutlineEye, AiOutlineClockCircle, AiOutlineBook } from 'react-icons/ai';

// import { Post } from '@/services/post';
import { Eye, Clock, LibraryBig } from 'lucide-react';

import { postReadingTime, getShortDate } from '@/utils/format';
import { Post } from '@/app/(page)/post/[pid]/page';

//MARK:注意：对于阅读时长计算需要先处理一下接口返回的数据，才能使用postReadingTime
const PostHeader: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <h1 className="article-title text-4xl mb-4 font-semibold">{post.title}</h1>
      <div className="author-info-box flex items-center mb-6">
        <div className="author-name h-8 flex items-center mr-3">
          {/* TODO：作者部分 */}
          <a
            href="/user/1001010"
            target="_blank"
            className="text-post-text_1 text-sm font-normal hover:text-primary"
          >
            UAENA
          </a>
        </div>
        <div className="meta-box shrink-0 text-sm flex items-center text-post-text_3 space-x-4">
          <time dateTime={post.created_at} title={post.created_at} className="time">
            {getShortDate(post.created_at)}
          </time>
          <div className="flex items-center">
            <Eye className="mr-1" />
            <span>3,135</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1" />
            <span>阅读{postReadingTime(post.content)}分钟</span>
          </div>
          {post.category ? (
            <div className="flex items-center">
              <LibraryBig className="mr-1" />
              <span>专栏：{post.category.name}</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

//MARK:这里需要跳转到一个标签页
const PostTags: React.FC<{ post: Post }> = ({ post }) => {
  const tagColor = [
    'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'bg-green-100 text-green-800 hover:bg-green-200',
    'bg-purple-100 text-purple-800 hover:bg-purple-200',
    'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  ];

  return (
    <div className="article-end pt-10 ">
      <div className="flex flex-wrap items-center gap-4">
        <div className="tag-list flex items-center">
          <span className="font-bold mr-2">标签：</span>
          <div className="tag-list-container flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <a
                key={tag.id}
                href=""
                className={`px-2 py-1 rounded ${tagColor[index % tagColor.length]}`}
              >
                <span>{tag.name}</span>
              </a>
            ))}
          </div>
        </div>
        {/* 暂时先不考虑话题 */}
        {/* <div className="theme-list flex items-center">
          <span className="font-bold mr-2">话题：</span>
          <div className="theme-list-container flex flex-wrap gap-2">
            <a
              href=""
              className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200"
            >
              <span>金石计划征文活动</span>
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="post-content">
      <PostHeader post={post} />
      <div className="markdown-body">{post.content}</div>
      <PostTags post={post} />
    </div>
  );
};

export default PostContent;
