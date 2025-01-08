import { Node, ReactNodeViewRenderer } from '@tiptap/react';

import { ImageUpload as ImageUploadComponent } from './view/ImageUpload';
// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     imageBlock: {
//       setImageBlock: (attributes: { src: string }) => ReturnType
//       setImageBlockAt: (attributes: { src: string; pos: number | Range }) => ReturnType
//       setImageBlockAlign: (align: 'left' | 'center' | 'right') => ReturnType
//       setImageBlockWidth: (width: number) => ReturnType
//     }
//   }
// }
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType;
      setImageBlock: (attributes: { src: string }) => ReturnType;
    };
  }
}

export const ImageUpload = Node.create({
  name: 'imageUpload',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  inline: false,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }];
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
      setImageBlock:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'imageBlock',
            attrs: { src: attrs.src },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent);
  },
});

export default ImageUpload;
