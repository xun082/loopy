import React, { memo } from 'react';

import { Toolbar, ToolbarDivider } from './ui/Toolbar';
import BoldButton from './controls/BoldButton';
import ItalicButton from './controls/ItalicButton';
import UndoButton from './controls/UndoButton';
import RedoButton from './controls/RedoButton';
import UnderlineButton from './controls/UnderlineButton';
import AlignPopover from './controls/AlignPopover';
import HeadingDropdown from './controls/HeadingDropdown';
import BulletListButton from './controls/BulletListButton';
import OrderedListButton from './controls/OrderedList';
import MoreMarkDropdown from './controls/MoreMarkPopover';
import LinkButton from './controls/LinkButton';
import ImageButton from './controls/ImageButton2';
import TextColorButton from './controls/TextColorButton';
import TextHighlightButton from './controls/TextHighlightButton';
import InsertDropdown from './controls/InsertDropdown';

const MenuBar = () => {
  return (
    <div className="rte-menu-bar">
      <Toolbar dense>
        <UndoButton />
        <RedoButton />
        {/* <ClearFormatButton /> */}

        <ToolbarDivider />

        <HeadingDropdown />

        <ToolbarDivider />

        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <MoreMarkDropdown />

        <ToolbarDivider />

        <TextColorButton />
        <TextHighlightButton />

        <ToolbarDivider />

        <AlignPopover />
        <BulletListButton />
        <OrderedListButton />

        <ToolbarDivider />

        {/* <BlockquoteButton /> */}
        <LinkButton />
        <ImageButton />
        {/* <YoutubeButton /> */}
        {/* <CodeBlockButton /> */}
        <InsertDropdown />
      </Toolbar>
    </div>
  );
};

export default memo(MenuBar);
