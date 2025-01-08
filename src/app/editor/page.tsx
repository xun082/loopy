'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { EditorContent } from '@tiptap/react';

import { useBlockEditor } from './_hooks/useBlockEditor';
import EditorHeader from './_components/EditorHeader';
import EditorToolbar from './_components/EditorToolbar';

const Page = () => {
  const { editor } = useBlockEditor();

  const [isMarkdown, setIsMarkdown] = useState(false);

  const { editor: preview } = useBlockEditor();
  // 监听 transaction 事件
  // editor?.on('transaction', (transaction) => {
  //   console.log('编辑器内容发生了变化：', transaction);
  //   preview?.commands.setContent(editor?.getJSON());
  // });

  return (
    <div
      className={clsx('w-full m-auto relative flex flex-col h-[100vh]', {
        'max-w-[1200px]': !isMarkdown,
      })}
    >
      <EditorHeader editor={editor} isMarkdown={isMarkdown} setIsMarkdown={setIsMarkdown} />
      <div className="flex-1 flex">
        <EditorContent
          editor={editor}
          className="tiptap-editor w-[42rem] h-full min-h-[30rem] ml-auto mr-auto flex-1"
        >
          <EditorToolbar editor={editor} isMarkdown={isMarkdown} setIsMarkdown={setIsMarkdown} />
        </EditorContent>
        {isMarkdown && (
          <div className="markdown-preview flex-1 border-l p-4">
            <EditorContent editor={preview} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
