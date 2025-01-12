import CommentForm from '@/components/commentForm';
import CommonItem from '@/components/commentItem';
interface PostCommentProps {
  postId: string;
  showHeader?: boolean;
}
export type CommentReply = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_id: string;
  like_count: number;
  is_liked: boolean;
};
export type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  image_urls: string[];
  is_pinned: boolean;
  replies: CommentReply[];
  total_replies: number;
  remaining_replies: number;
  has_more_replies: boolean;
  like_count: number;
  popularity: number;
  is_liked: boolean;
};

//showHeader 是否显示评论头部,可以用于区分是弹窗评论还是页面评论
export default function PostComment({ postId, showHeader = true }: PostCommentProps) {
  console.log(postId, showHeader);

  // const [sortField, setSortField] = useState('latest'); // 排序字段
  let sortField = 'latest';

  const total = 0; //总评论数
  const comments: Comment[] = [
    {
      id: '1',
      content: '评论内容',
      created_at: '2024-01-01',
      user_id: '1',
      image_urls: [],
      is_pinned: false,
      replies: [],
      total_replies: 0,
      remaining_replies: 0,
      has_more_replies: false,
      like_count: 0,
      popularity: 0,
      is_liked: false,
    },
    {
      id: '2',
      content: '零零落落，我是根评论',
      created_at: '2024-01-01',
      user_id: '1',
      image_urls: [],
      is_pinned: false,
      replies: [],
      total_replies: 0,
      remaining_replies: 0,
      has_more_replies: false,
      like_count: 0,
      popularity: 0,
      is_liked: false,
    },
  ];

  // 排序组件
  const SortButton = ({ type, label }: { type: string; label: string }) => (
    <div
      className={`inline-block text-[15px] px-1 py-1 cursor-pointer font-normal
        ${sortField === type ? 'text-primary' : 'text-post-text_2'}
        hover:text-primary transition-colors`}
    >
      {label}
    </div>
  );

  return (
    <section>
      {showHeader && <h4 className="mb-5 font-bold text-xl">评论{total > 0 && `(${total})`} </h4>}
      {/* 评论框区域 */}
      <div className="flex rounded">
        {/* <div className="mr-4">
          <div className="w-10 h-10 rounded-full">
            <img
              className="w-full h-full object-cover rounded-full"
              src="https://p3-passport.byteacctimg.com/img/user-avatar/9438ce6b090f7b0190f1845a4578141b~100x100.awebp"
              loading="lazy"
            />
          </div>
          <div className="form-box flex-1">
            输入框
          </div>
        </div> */}
        <CommentForm />
      </div>
      {/* 评论列表区域 */}
      <div className="mt-6">
        <div className="sort">
          <SortButton type="popular" label="最热" />
          <div className="inline-block text-[#e4e6eb] mx-2">｜</div>
          <SortButton type="latest" label="最新" />
        </div>
      </div>
      {/* 评论列表 */}
      {comments.map((item) => (
        <CommonItem data={item} key={item.id} postId={postId} />
      ))}
    </section>
  );
}
