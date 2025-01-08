import Link from 'next/link';
import { RxLoop } from 'react-icons/rx';
import type { Editor } from '@tiptap/react';

import PublishDialog from './PublishDialog';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/common/DropdownMenu';
import Button from '@/components/common/button';

interface EditorHeaderProps {
  setIsMarkdown: (value: boolean) => void;
  isMarkdown: boolean;
  editor: Editor | null;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ editor, setIsMarkdown, isMarkdown }) => {
  return (
    <header className="flex justify-between items-center min-h-16 px-4 sticky top-0 bg-white dark:bg-dark-card z-10 border-b">
      <div className="text-3xl">😎</div>
      <div className="flex gap-4 items-center">
        <blockquote className="text-gray-400 hidden sm:block">文章将自动保存至草稿箱</blockquote>
        <Button size="sm" className="rounded-[3px] border-[1px]" variant="secondary">
          草稿箱
        </Button>
        <PublishDialog editor={editor} />
        <span className="cursor-pointer" onClick={() => setIsMarkdown(!isMarkdown)}>
          <RxLoop />
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src="https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition duration-200 ease-in-out cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            <Link href="/user/1" passHref>
              <DropdownMenuItem>写文章</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>草稿</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>我的主页</DropdownMenuItem>
            <DropdownMenuItem>我喜欢的</DropdownMenuItem>
            <DropdownMenuItem>我的收藏集</DropdownMenuItem>
            <DropdownMenuItem>标签管理</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>设置</DropdownMenuItem>
            <DropdownMenuItem>关于</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default EditorHeader;
