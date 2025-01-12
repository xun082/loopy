'use client';

import { useState, useRef, useEffect } from 'react';
import { ThumbsUp, MessageSquareMore, Ellipsis } from 'lucide-react';

import { CommentInput } from '../commentForm';
import { ReplyItem } from '../replyItem';

import { Comment } from '@/app/(page)/post/_component/postComment/index';
export type CommentReply = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_id: string;
  like_count: number;
  is_liked: boolean;
};

// 评论操作组件
export const Action: React.FC<{
  comment?: Comment;
  reply?: CommentReply;
  postId: string;
}> = ({ comment, reply, postId }) => {
  console.log('comment', postId);

  const [isComment, setIsComment] = useState(false);
  const commentBtnRef = useRef<HTMLDivElement>(null); //评论按钮
  const inputBoxRef = useRef<HTMLDivElement>(null); //评论输入框外围
  const commentInputRef = useRef<HTMLDivElement>(null); //评论输入框

  useEffect(() => {
    //若回复评论处于展开状态，则自动聚焦
    if (isComment) {
      commentInputRef.current?.focus();
    }

    // 点击外部区域，关闭回复评论，不包含按钮区域
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commentBtnRef.current &&
        inputBoxRef.current &&
        !commentBtnRef.current.contains(event.target as Node) &&
        !inputBoxRef.current.contains(event.target as Node)
      ) {
        setIsComment(false);
      }
    };

    if (isComment) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isComment]);

  return (
    <>
      <div className="flex items-center mt-2 text-gray-400 text-sm font-normal">
        <time dateTime="1656671531000" className="mr-3">
          {reply ? reply.created_at.slice(0, 10) : comment?.created_at.slice(0, 10)}
        </time>
        {/* 点赞 */}
        <div className="flex items-center px-3 cursor-pointer transition-all duration-200">
          <ThumbsUp className="mr-1" size={16} />
          {reply ? reply.like_count : comment?.like_count}
        </div>
        {/* 回复 */}
        <div
          ref={commentBtnRef}
          className={`flex items-center px-3 cursor-pointer transition-all duration-200`}
          onClick={(e) => {
            e.stopPropagation();
            setIsComment(!isComment);
          }}
        >
          {isComment ? (
            <MessageSquareMore className="mr-1" size={16} />
          ) : (
            <MessageSquareMore className="mr-1 " size={16} />
          )}
          {isComment ? '取消回复' : comment?.total_replies}
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center px-3 cursor-pointer transition-all duration-200">
          <Ellipsis size={16} strokeWidth={1} absoluteStrokeWidth />
          {/* <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer">
                <AiOutlineEllipsis className="hover:text-gray-700" />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="end"
                sideOffset={10}
                alignOffset={0}
                className="p-0"
              >
                <ul>
                  <li className="h-8 py-0 pr-4 pl-3 flex items-center min-w-0 transition-all duration-200 cursor-pointer hover:bg-[#f7f8fa]">
                    <AiOutlineUserDelete className="mr-2 shrink-0 text-post-text_2" />
                    屏蔽作者：chang辰
                  </li>
                  <li className="h-8 py-0 pr-4 pl-3 flex items-center min-w-0 transition-all duration-200 cursor-pointer hover:bg-[#f7f8fa]">
                    <AiOutlineWarning className="mr-2 shrink-0 text-post-text_2" />
                    举报
                  </li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>
      {/* 回复输入框 */}
      {isComment && (
        <div
          ref={inputBoxRef}
          className=" mt-3 animate-in slide-in-from-top-2 duration-200 ease-in-out"
        >
          <CommentInput ref={commentInputRef} />
        </div>
      )}
    </>
  );
};

//评论组件
export default function CommonItem({ data, postId }: { data: Comment; postId: string }) {
  const userInfo = {
    username: '罗小黑',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=990320751&s=5',
  };
  const replyList: CommentReply[] = [
    {
      id: '1',
      content: '回复1',
      created_at: '2024-01-01',
      user_id: '1',
      parent_id: '1',
      like_count: 1,
      is_liked: false,
    },
    {
      id: '2',
      content: '回复2',
      created_at: '2024-01-01',
      user_id: '2',
      parent_id: '1',
      like_count: 1,
      is_liked: false,
    },
  ];

  return (
    <div className="comment-item py-4 px-0 flex min-w-0 relative">
      <div className="comment-avatar relative w-8 flex-shrink-0 flex-grow-0 mr-4">
        <div className="flex items-center">
          <a href="/user/123456" target="_blank">
            <div className="w-9 h-9">
              <img
                src={userInfo?.avatar}
                alt={userInfo?.username}
                loading="lazy"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </a>
        </div>
      </div>
      <div className="comment-wrapper relative flex-1 min-w-0">
        <div className="comment-header flex items-center px-[1px] py-0">
          <div className="user-popover">
            <a href="/user/123456" target="_blank">
              <span className="max-w-[300px] inline-block align-top overflow-hidden overflow-ellipsis whitespace-nowrap">
                {userInfo?.username}
              </span>
            </a>
          </div>
          {/* <div className="author-info text-post-text_3 font-normal text-sm ml-3 whitespace-nowrap overflow-hidden overflow-ellipsis break-words">
            前端开发
          </div> */}
          <div className="flex-1"></div>
          {/* <div className="flex flex-shrink-0 flex-grow-0">
            <img src="" alt="热评" loading="lazy" className="w-11 h-5" />
          </div> */}
        </div>
        <div className="comment-content mt-1">
          <div className="content text-post-text_1 text-base">{data.content}</div>
        </div>
        <Action comment={data} postId={postId} />
        <div className="comment-reply-wrapper mt-2">
          {replyList.map((item) => (
            <ReplyItem key={item.id} reply={item} postId={postId} />
          ))}
          {/* {hasMoreReplies && (
            <div
              className={`h-10 flex items-center justify-center
              bg-[#f7f8fa] hover:bg-[#f2f3f5] text-post-text_2
              rounded-md cursor-pointer transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextComment}
            >
              {isLoading
                ? '加载中...'
                : `查看全部${total > 0 && total - currentPage * COMMENTS_PER_PAGE}条评论`}
              {!isLoading && <AiOutlineDown className="ml-3" />}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
