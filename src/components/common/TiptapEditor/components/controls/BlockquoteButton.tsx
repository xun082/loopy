import React from 'react';
import { useEditorState } from '@tiptap/react';

import { useTiptapContext } from '../Provider';
import MenuButton from '../MenuButton';

const BlockquoteButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive('blockquote'),
        disabled: !ctx.editor.can().toggleBlockquote(),
      };
    },
  });

  return (
    <MenuButton
      icon="Quote"
      tooltip="Quote"
      shortcuts={['Mod', 'Shift', 'B']}
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      {...state}
    />
  );
};

export default BlockquoteButton;
