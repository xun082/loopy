import React, { CSSProperties, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEditorState } from '@tiptap/react';

import MenuButton from '../MenuButton';
import useMount from '../../hooks/useMount';
import { useTiptapContext } from '../Provider';
import ColorPicker from '../color-picker';

const TextHighlightButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useMount();
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor.getAttributes('highlight').color || 'DEFAULT',
      disabled: !ctx.editor.can().setHighlight(),
    }),
  });

  const highlightBarStyle = {
    position: 'absolute',
    bottom: 1.5,
    insetInline: 4,
    height: 4,
    borderRadius: 4,
    pointerEvents: 'none',
    background: state.color === 'DEFAULT' ? 'var(--rte-bg, white)' : state.color,
  };

  const renderBar =
    mounted && buttonRef.current
      ? createPortal(<div style={highlightBarStyle as CSSProperties} />, buttonRef.current)
      : null;

  return (
    <>
      <MenuButton
        ref={buttonRef}
        type="popover"
        icon="Highlighter"
        hideArrow={true}
        tooltip="Highlight"
        disabled={state.disabled}
      >
        <ColorPicker
          //  color={highlightColor}
          color={state.color}
          onChange={(color) => editor.chain().focus().setHighlight({ color }).run()}
          onReset={() => editor.chain().focus().unsetHighlight().run()}
        />
      </MenuButton>
      {renderBar}
    </>
  );
};

export default TextHighlightButton;
