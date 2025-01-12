import React from 'react';
import { useEditorState } from '@tiptap/react';

import { Toolbar } from '../ui/Toolbar';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';
import StrikeButton from './StrikeButton';
import SubscriptButton from './SubscriptButton';
import SuperscriptButton from './SuperscriptButton';
import CodeButton from './CodeButton';
import { PopoverClose } from '../ui/Popover';

const MoreMarkPopover = () => {
  const { editor } = useTiptapContext();

  const isDisabled = useEditorState({
    editor,
    selector: (ctx) => !ctx.editor.can().setStrike() && !ctx.editor.can().setCode(),
  });

  return (
    <MenuButton type="popover" icon="Type" tooltip="More format" disabled={isDisabled}>
      <PopoverClose asChild>
        <Toolbar dense={true}>
          <StrikeButton />
          <SuperscriptButton />
          <SubscriptButton />
          <CodeButton />
        </Toolbar>
      </PopoverClose>
    </MenuButton>
  );
};

export default MoreMarkPopover;
