interface AuthorInfoProps {
  author: string;
  authorAvatar: string;
  description: string;
  coverImage: string;
  articleNum: number;
  readNum: number;
  fansNum: number;
  hasAttention: boolean;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  author,
  authorAvatar,
  description,
  coverImage,
  articleNum,
  readNum,
  fansNum,
  hasAttention,
}) => {
  return (
    <div
      id="author-info"
      className="pb-4 bg-white rounded-xl border border-solid border-post-border hover:border hover:border-solid hover:border-primary"
    >
      <div className="is-center text-center overflow-hidden rounded-xl">
        <div
          id="avatar-img"
          className="overflow-hidden relative mx-auto w-full h-40 "
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={authorAvatar}
            alt="avatar"
            className="w-28 h-28 absolute left-[50%] bottom-4 transform -translate-x-1/2 rounded-full object-cover border-[5px] border-solid border-white"
          />
          <div
            className={`absolute left-[50%] bottom-0 transform -translate-x-1/2  mt-2 px-4 py-1 text-sm inline-block rounded-full cursor-pointer transition-colors duration-300 ${
              hasAttention
                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {hasAttention ? '已关注' : '关注'}
          </div>
        </div>
        <div id="avatar-name" className="font-medium text-xl mt-2">
          {author}
        </div>

        <div id="avatar-description" className="mt-2">
          {description}
        </div>
      </div>
      <div className="author-info-data flex justify-evenly my-2">
        <a
          href="/"
          className="flex flex-col items-center relative after:content-[''] after:absolute after:right-[-50%] after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-gray-300 hover:text-primary transition-colors duration-300"
        >
          <div className="length-num">{articleNum}</div>
          <div className="headline">文章</div>
        </a>
        <a
          href="/"
          className="flex flex-col items-center relative after:content-[''] after:absolute after:right-[-50%] after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-gray-300 hover:text-primary transition-colors duration-300"
        >
          <div className="length-num">{readNum}</div>
          <div className="headline">阅读</div>
        </a>
        <a
          href="/"
          className="flex flex-col items-center hover:text-blue-500 transition-colors duration-300"
        >
          <div className="length-num">{fansNum}</div>
          <div className="headline">粉丝</div>
        </a>
      </div>
    </div>
  );
};

export default AuthorInfo;
