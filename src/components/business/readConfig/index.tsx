'use client';

import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client'; // 添加此行以导入 createRoot
import {
  ThumbsUp,
  MessageSquareMore,
  Star,
  Share2,
  BookOpen,
  ArrowUpToLine,
  Link,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

import Popover from '@/components/common/popover';

interface ShareButtonProps {
  buttonStyle: string;
  iconStyle: string;
}

//微信分享
const WebShare: React.FC = () => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      if (!rootRef.current) {
        // 只创建一次 root
        rootRef.current = createRoot(qrCodeRef.current);
      }

      rootRef.current.render(<QRCodeCanvas value={currentUrl} size={80} level="M" />);
    }
  }, [currentUrl]); // 依赖 currentUrl 以便在 URL 变化时更新

  const Trigger = (
    <div className="py-2 px-2 flex items-center gap-2 hover:text-primary hover:bg-gray-100 cursor-pointer whitespace-nowrap">
      <Link className="w-5 h-5" />
      <span>微信</span>
    </div>
  );

  const Content = (
    <div className="min-w-[100px] flex flex-col items-center">
      <div ref={qrCodeRef}></div>
      <span className="text-sm mt-3 text-post-text_1">微信扫码分享</span>
    </div>
  );

  return <Popover trigger={Trigger} content={Content}></Popover>;
};

//分享按钮
const ShareButton = ({ buttonStyle, iconStyle }: ShareButtonProps) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''; // 添加检查以确保 window 可用

  //分享到微博
  const generateWeiboShareLink = (title: string, url: string, pic: string, detail: string) => {
    const baseWeiboURL = 'https://service.weibo.com/share/share.php';
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const encodedPic = encodeURIComponent(pic);
    const encodedDetail = encodeURIComponent(detail);

    return `${baseWeiboURL}?title=${encodedTitle}&url=${encodedUrl}%${encodedDetail}&pic=${encodedPic}`;
  };
  const shareToWeibo = () => {
    // 示例用法
    const title =
      '【前端工程化】项目搭建篇-项目初始化&prettier、eslint、stylelint、lint-staged、husky';
    const pic =
      'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/weibo-share.12467a5.png';

    const detail = '（想看更多技术文章，前往稀土掘金）\n #稀土掘金文章#';

    const weiboShareLink = generateWeiboShareLink(title, currentUrl, pic, detail);
    window.open(weiboShareLink, '_blank'); // '_blank' 表示在新标签页中打开
  };

  //分享到QQ
  const generateQQShareLink = (title: string, url: string, summary: string, pic: string) => {
    const baseQQURL = 'https://connect.qq.com/widget/shareqq/index.html';
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const encodedSummary = encodeURIComponent(summary);
    const encodedPic = encodeURIComponent(pic);

    return `${baseQQURL}?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}&pics=${encodedPic}`;
  };
  const shareToQQ = () => {
    // 示例用法
    const title =
      '【前端工程化】项目搭建篇-项目初始化&prettier、eslint、stylelint、lint-staged、husky';
    const summary =
      '本系列将实现使用react18、ts5、lint三剑客、webpack、storybook搭建react组件库、react+ts项目模板、和一个脚手架项目。';
    const pic =
      'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/favicon-300x300.34d45a4.png';

    const qqShareLink = generateQQShareLink(title, currentUrl, summary, pic);
    window.open(qqShareLink, '_blank'); // '_blank' 表示在新标签页中打开
  };

  const Trigger = (
    <button className={buttonStyle}>
      <Share2 className={iconStyle} />
    </button>
  );
  const Content = (
    <div className="min-w-[120px]">
      <WebShare />
      <div
        className="py-2 px-2 flex items-center gap-2 hover:text-primary hover:bg-gray-100  cursor-pointer whitespace-nowrap"
        onClick={shareToWeibo}
      >
        <Link className="w-5 h-5" />
        <span>新浪微博</span>
      </div>
      <div
        className="py-2 px-2 flex items-center gap-2 hover:text-primary hover:bg-gray-100 cursor-pointer whitespace-nowrap"
        onClick={shareToQQ}
      >
        <Link className="w-5 h-5" />
        <span>QQ</span>
      </div>
    </div>
  );

  return <Popover trigger={Trigger} content={Content} overlayInnerClassName={'px-0 py-2'} />;
};

//阅读操作栏配置
const ReadConfig: React.FC = () => {
  const buttonStyle =
    'relative w-12 h-12 flex items-center justify-center rounded-full  border border-solid bg-white hover:border-primary group';
  // const activeButtonStyle =
  //   'relative w-12 h-12 flex items-center justify-center rounded-full bg-white border border-solid border-primary';

  const iconStyle = 'w-6 h-6 text-post-text_1 group-hover:text-primary';
  // const activeIconStyle = 'w-6 h-6 text-primary';

  //沉浸式阅读
  const onImmersiveReading = () => {
    console.log('沉浸式阅读');
  };

  //退回到顶部
  const onPinTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 点赞 */}
      <button className={buttonStyle}>
        <ThumbsUp className={iconStyle} />
      </button>
      {/* 评论 */}
      <button className={buttonStyle}>
        <MessageSquareMore className={iconStyle} />
      </button>
      {/* 收藏 */}
      <button className={buttonStyle}>
        <Star className={iconStyle} />
      </button>
      {/* 分享 */}
      <ShareButton buttonStyle={buttonStyle} iconStyle={iconStyle} />
      {/* 沉浸式阅读 */}
      <button className={buttonStyle} onClick={onImmersiveReading}>
        <BookOpen className={iconStyle} />
      </button>
      {/* 退回到顶部   */}
      <button className={buttonStyle} onClick={onPinTop}>
        <ArrowUpToLine className={iconStyle} />
      </button>
    </div>
  );
};

export default ReadConfig;
