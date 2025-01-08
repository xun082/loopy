import { common, createLowlight } from 'lowlight';
import { Extensions } from '@tiptap/core';
import { StarterKit } from '@tiptap/starter-kit';
// 下面是tiptap扩展
import { Highlight } from '@tiptap/extension-highlight';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Underline } from '@tiptap/extension-underline';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Typography } from '@tiptap/extension-typography';
export { Highlight } from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import { FocusClasses as Focus } from '@tiptap/extension-focus';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';

// 下面是自定义tiptap扩展
import { SlashCommand } from './SlashCommand';
import { ImageUpload } from './ImageUpload';

export const ExtensionKit = (): Extensions => [
  StarterKit.configure({
    codeBlock: false,
  }),
  Highlight.configure({ multicolor: true }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    defaultLanguage: null,
  }),
  CharacterCount,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  FontFamily,
  Typography,
  Color,
  Focus,
  Subscript,
  Superscript,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  // Image,
  SlashCommand,
  ImageUpload,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
];

export default ExtensionKit;
