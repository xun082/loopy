'use client';

import { Editor, useEditor, type JSONContent } from '@tiptap/react';
import { useEffect } from 'react';

import ExtensionKit from '../_extensions/extension-kit';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = (content: JSONContent | string = '') => {
  const editor = useEditor({
    extensions: [...ExtensionKit()],
    content: content || '',
    autofocus: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      window.editor = editor;
    }

    // 在组件销毁时清除全局 editor
    return () => {
      if (window.editor) {
        window.editor = null;
      }
    };
  }, [editor]);

  return { editor };
};
