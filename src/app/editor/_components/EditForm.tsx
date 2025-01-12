import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import TiptapEditor, { type TiptapEditorRef } from '@/components/common/TiptapEditor';

interface PostForm {
  title: string;
  content: string;
}

export default function EditForm() {
  const editorRef = useRef<TiptapEditorRef>(null);

  const { control } = useForm<PostForm>();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="inline-block font-medium dark:text-white mb-2">Title</label>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full px-4 py-2.5 shadow border border-[#d1d9e0] rounded-md bg-white dark:bg-[#0d1017] dark:text-white dark:border-[#3d444d] outline-none"
              placeholder="Enter post title..."
            />
          )}
        />
      </div>

      <div>
        <label className="inline-block font-medium dark:text-white mb-2">Content</label>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TiptapEditor
              ref={editorRef}
              ssr={true}
              output="html"
              placeholder={{
                paragraph: 'Type your content here...',
                imageCaption: 'Type caption for image (optional)',
              }}
              contentMinHeight={600} // 增加最小高度
              contentMaxHeight={1800}
              onContentChange={field.onChange}
              initialContent={field.value}
            />
          )}
        />
      </div>
    </div>
  );
}
