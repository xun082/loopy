import { clsx } from 'clsx';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  QuoteIcon,
  // Link2Icon,
  ListBulletIcon,
} from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';

interface EdirorToolbarProps {
  editor: Editor | null;
  setIsMarkdown: (value: boolean) => void;
  isMarkdown: boolean;
}

interface MarkdownToolbarItem {
  name: string;
  icon: React.ReactNode;
  ariaLabel: string;
  action: (editor: Editor) => void;
}

// 菜单
const MARKDOWN_TOOLBAR_ITEMS: MarkdownToolbarItem[] = [
  {
    name: 'bold',
    icon: <FontBoldIcon />,
    ariaLabel: '加粗',
    action: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    name: 'italic',
    icon: <FontItalicIcon />,
    ariaLabel: '斜体',
    action: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    name: 'strike',
    icon: <StrikethroughIcon />,
    ariaLabel: '删除线',
    action: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    name: 'blockquote',
    icon: <QuoteIcon />,
    ariaLabel: '引用',
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    name: 'alignLeft',
    icon: <TextAlignLeftIcon />,
    ariaLabel: '左对齐',
    action: (editor) => editor.chain().focus().setTextAlign('left').run(),
  },
  {
    name: 'alignCenter',
    icon: <TextAlignCenterIcon />,
    ariaLabel: '居中对齐',
    action: (editor) => editor.chain().focus().setTextAlign('center').run(),
  },
  {
    name: 'alignRight',
    icon: <TextAlignRightIcon />,
    ariaLabel: '右对齐',
    action: (editor) => editor.chain().focus().setTextAlign('right').run(),
  },
  {
    name: 'orderedList',
    icon: <ListBulletIcon />,
    ariaLabel: '有序列表',
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    name: 'bulletList',
    icon: <ListBulletIcon />,
    ariaLabel: '无序列表',
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
];

const EditorToolbar: React.FC<EdirorToolbarProps> = ({ editor, isMarkdown }) => {
  if (!editor) return null;

  return (
    <Toolbar.Root
      className={clsx('flex justify-between w-full min-w-max rounded-md bg-white p-2.5 m-auto', {
        'border-b': isMarkdown,
        'max-w-[44rem]': !isMarkdown,
      })}
      aria-label="Formatting options"
    >
      <div className="flex-1 flex">
        <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
          {MARKDOWN_TOOLBAR_ITEMS.map((item) => (
            <Toolbar.ToggleItem
              key={item.name}
              className="ml-0.5 inline-flex h-6 items-center justify-center rounded px-[5px] focus:shadow-[0_0_0_2px]"
              value={item.name}
              aria-label={item.ariaLabel}
              onClick={() => editor && item.action(editor)}
            >
              {item.icon}
            </Toolbar.ToggleItem>
          ))}
        </Toolbar.ToggleGroup>
      </div>
      <Toolbar.Link
        className="ml-0.5 hidden items-center justify-center px-1 text-[13px] outline-none first:ml-0 cursor-pointer sm:inline-flex"
        href="#"
        target="_blank"
      >
        2小时前编辑
      </Toolbar.Link>
    </Toolbar.Root>
  );
};

export default EditorToolbar;
