import { CommentReply, Action } from '../commentItem';

export const ReplyItem: React.FC<{
  reply: CommentReply;
  postId: string;
}> = ({ reply, postId }) => {
  return (
    <div className="relative py-2 px-0 flex min-w-0 ">
      <div className="reply-avatar relative flex-shrink-0 flex-grow-0 mr-3">
        <div>
          <a href="/user/123456" target="_blank">
            <div className="w-7 h-7">
              <img
                src="https://p3-passport.byteacctimg.com/img/user-avatar/8fb18d985e0b5aa72cafd6d1cab32f06~50x50.awebp"
                alt="成田君的头像"
                loading="lazy"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </a>
        </div>
      </div>
      <div className="reply-wrapper relative flex-1 min-w-0">
        {/* TODO：这里需要设置多行文本截断 */}
        <div className="reply-content text-post-text_1 font-normal text-base text-ellipsis overflow-hidden">
          {/* <div className="user-info inline">
            <div className="user-popover inline-flex">
              <a href="/user/123456" target="_blank">
                <span className="max-w-28 inline-flex align-top overflow-hidden text-ellipsis whitespace-nowrap">
                  成田君
                </span>
              </a>
            </div>
            <div className="author-tag text-primary text-xs bg-[#eaf2ff] rounded-sm h-4 w-7 inline-flex items-center justify-center ml-2 relative top-[-2px] flex-shrink-0">
              作者
            </div>
            <span>：</span>
          </div> */}
          <div className="user-info inline">
            <div className="user-popover inline-flex">
              <a
                href="/user/123456"
                target="_blank"
                className="text-post-text_2 text-base font-normal"
              >
                <span className="max-w-28 inline-flex align-top overflow-hidden text-ellipsis whitespace-nowrap">
                  成田君
                </span>
              </a>
            </div>
            <span className="mx-1">回复</span>
            <div className="user-popover inline-flex">
              <a
                href="/user/123456"
                target="_blank"
                className="text-post-text_2 text-base font-normal"
              >
                <span className="max-w-28 inline-flex align-top overflow-hidden text-ellipsis whitespace-nowrap">
                  成田君
                </span>
              </a>
            </div>
            <div className="author-tag text-primary text-xs bg-[#eaf2ff] rounded-sm h-4 w-7 inline-flex items-center justify-center ml-1 relative top-[-2px] flex-shrink-0">
              作者
            </div>
            <span>：</span>
          </div>
          <span>{reply.content}</span>
        </div>
        <Action reply={reply} postId={postId} />
      </div>
    </div>
  );
};
