import { NodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React, { useEffect, useRef, ChangeEvent } from 'react';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Editor } from '@tiptap/core';

import {
  Accordion as AccordionShadcn,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/TiptapEditor/components/ui/accordion';
import { cn } from '@/utils';

// 定义基础属性类型
interface AccordionAttrs {
  title: string;
  text: string;
}

// 定义扩展的 ProseMirror 节点类型
interface ExtendedProseMirrorNode extends ProseMirrorNode {
  attrs: AccordionAttrs;
}

// 定义组件所需的完整 Props 类型
interface ExtendedNodeViewProps {
  editor: Editor;
  node: ExtendedProseMirrorNode;
  updateAttributes: (attrs: Partial<AccordionAttrs>) => void;
  deleteNode: () => void;
  selected: boolean;
  extension: any;
  getPos: () => number;
}

// 创建一个类型守卫函数
function isExtendedNodeViewProps(props: any): props is ExtendedNodeViewProps {
  return (
    props.editor &&
    props.node &&
    typeof props.updateAttributes === 'function' &&
    typeof props.deleteNode === 'function' &&
    typeof props.selected === 'boolean' &&
    typeof props.getPos === 'function'
  );
}

const AccordionNodeComponent = (props: NodeViewProps): JSX.Element => {
  // 使用类型守卫确保类型安全
  if (!isExtendedNodeViewProps(props)) {
    throw new Error('Invalid props passed to AccordionNodeComponent');
  }

  const { editor, node, updateAttributes } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    updateAttributes({ title: e.target.value });
  };

  const handleContentChange = (): void => {
    if (contentRef.current) {
      updateAttributes({ text: contentRef.current.innerHTML });
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = node.attrs.text || '';
    }
  }, [node.attrs.text]);

  return (
    <NodeViewWrapper className="react-component">
      <AccordionShadcn type="single" collapsible>
        <AccordionItem value="item-1" className="relative">
          <AccordionTrigger
            iconOnOnOff={true}
            locked={false}
            active={true}
            className={'py-0 w-auto'}
          >
            {editor.isEditable ? (
              <input
                type="text"
                className="focus-visible:border-none focus-visible:border-0 w-full !bg-transparent"
                value={node.attrs.title}
                onChange={handleTitleChange}
              />
            ) : (
              <div className="w-full text-start">{node.attrs.title}</div>
            )}
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              'h-auto',
              editor.isEditable ? 'border border-dashed border-gray-300' : '',
            )}
          >
            <NodeViewContent
              ref={contentRef}
              contentEditable={editor.isEditable}
              suppressContentEditableWarning={true}
              onInput={handleContentChange}
              data-drag-handle
            />
          </AccordionContent>
        </AccordionItem>
      </AccordionShadcn>
    </NodeViewWrapper>
  );
};

// 添加显示名称以便调试
AccordionNodeComponent.displayName = 'AccordionNodeComponent';

export default AccordionNodeComponent;
