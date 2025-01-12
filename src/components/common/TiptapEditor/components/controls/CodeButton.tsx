import React from 'react';
import { useEditorState } from '@tiptap/react';

import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';

const CodeButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive('code'),
        disabled: !ctx.editor.can().toggleCode(),
      };
    },
  });

  return (
    <MenuButton
      icon="Code"
      tooltip="Inline code"
      shortcuts={['Mod', 'E']}
      onClick={() => editor.chain().focus().toggleCode().run()}
      {...state}
    />
  );
};

export default CodeButton;
