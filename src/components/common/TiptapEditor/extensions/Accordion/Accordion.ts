import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import AccordionNode from './AccordionNode';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    accordion: {
      setAccordion: () => ReturnType;
    };
  }
}

export interface AccordionOptions {
  HTMLAttributes?: Record<string, any>;
}

export const Accordion = Node.create<AccordionOptions>({
  name: 'accordion',

  group: 'block',

  content: 'block+',

  draggable: true,

  addAttributes() {
    return {
      title: {
        default: 'Accordion Title',
        parseHTML: (element) => element.getAttribute('data-title'),
        renderHTML: (attributes) => ({
          'data-title': attributes.title,
        }),
      },
      text: {
        default: '',
        parseHTML: (element) => element.innerHTML,
        renderHTML: (attributes) => ({
          'data-content': attributes.text,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="accordion"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'accordion' }, HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AccordionNode);
  },

  addCommands() {
    return {
      setAccordion:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Accordion Content',
                  },
                ],
              },
            ],
          });
        },
    };
  },
});

export default Accordion;
