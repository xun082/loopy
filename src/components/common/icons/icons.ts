import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Superscript,
  Subscript,
  List,
  ListOrdered,
  ListTodo,
  Link,
  Link2Off,
  ExternalLink,
  Edit,
  Redo2,
  Undo2,
  AlignLeft,
  AlignRight,
  AlignJustify,
  AlignCenter,
  Eraser,
  ChevronDown,
  Minus,
  Indent,
  Outdent,
  Clipboard,
  Check,
  Maximize2,
  FileCode,
  Type,
  Trash2,
  Image,
  FileText,
  AlignVerticalJustifyCenter,
  Download,
  Youtube,
  X,
  Ruler,
  Palette,
  Ban,
  Plus,
  LucideIcon,
  LucideProps,
  Columns2,
  PanelLeft,
  PanelRight,
  Highlighter,
} from 'lucide-react';

// 自定义图标组件的类型定义
type CustomIconComponent = React.ForwardRefExoticComponent<
  LucideProps & React.RefAttributes<SVGSVGElement>
>;

import IconCorner from './Corner';
import IconInlineCode from './InlineCode';
import IconQuote from './Quote';
import IconTextHighlight from './TextHighlight';
import IconTextColor from './TextColor';

export const icons = {
  Bold,
  Italic,
  Underline,
  Strike: Strikethrough,
  Code,
  SourceCode: FileCode,
  Subscript,
  Superscript,
  BulletList: List,
  OrderedList: ListOrdered,
  TaskList: ListTodo,
  CodeBlock: Code,
  CodeInline: IconInlineCode,
  Link,
  Unlink: Link2Off,
  Edit,
  ExternalLink,
  Redo: Redo2,
  Undo: Undo2,
  AlignLeft,
  AlignRight,
  AlignJustify,
  AlignCenter,
  Eraser,
  ChevronDown,
  Maximize: Maximize2,
  Minimize: Maximize2,
  HorizontalRule: Minus,
  Indent,
  Outdent,
  Clipboard,
  Check,
  Quote: IconQuote,
  Corner: IconCorner,
  LetterCase: Type,
  Trash: Trash2,
  Image,
  ImageCaption: FileText,
  ImageAltText: AlignVerticalJustifyCenter,
  Download,
  Youtube,
  Close: X,
  Ruler,
  Highlighter,
  TextHighlight: IconTextHighlight,
  TextColor: IconTextColor,
  Palette,
  PaletteOff: Ban,
  Ban,
  Plus,
  Columns2,
  PanelLeft,
  PanelRight,
} satisfies Record<string, LucideIcon | CustomIconComponent>;

// 导出类型
export type IconType = LucideIcon | CustomIconComponent;
export type IconProps = LucideProps;

// 创建一个类型来获取所有可用的图标名称
export type IconName = keyof typeof icons;
