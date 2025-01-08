import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import type { Editor } from '@tiptap/react';
import { Cross2Icon } from '@radix-ui/react-icons';

import { FormCategory, FormCover, FormSummary, FormTags } from './components/form-component';

import { Form } from '@/components/common/form';
import { type ArticleType, type ArticleTag } from '@/services/editor';
import Button from '@/components/common/button';

interface PublishDialogProps {
  editor: Editor | null;
}

const FormSchema = z.object({
  category_id: z.string().min(1, '请选择文章分类'),
  tag_ids: z.string().min(1, '请选择标签'),
  summary: z.string().min(1, '请填写摘要').max(100, '文章摘要，最大长度为 100 个字符。'),
  cover_image: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

const PublishDialog: React.FC<PublishDialogProps> = ({ editor }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category_id: '',
      tag_ids: '',
      summary: '',
      cover_image: '',
    },
  });

  const [articleType] = useState<ArticleType[]>([]);
  const [tags] = useState<ArticleTag[]>([]);

  useEffect(() => {
    // async function fetchArticleType() {
    //   const types = await getArticleType();
    //   setArticleType(types);
    // }
    // async function fetchAllTags() {
    //   const tags = await getAllTags();
    //   setTags(tags);
    // }
    // fetchArticleType();
    // fetchAllTags();
  }, []);

  // 表单提交
  const onSubmit = async (body: FormData) => {
    console.log(body);
    console.log(editor?.getJSON());
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" className="rounded-[3px]">
          发布
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] z-40 overflow-auto w-[90vw] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="my-3 text-[17px] font-medium text-mauve12">
            发布文章
          </Dialog.Title>
          <Dialog.Description className="text-[15px] py-3 border-t-2 text-gray-500">
            请选择文章分类，发布后不可修改。
          </Dialog.Description>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
              <FormCategory name="category_id" form={form} articleType={articleType} />
              <FormTags name="tag_ids" form={form} tags={tags} />
              <FormSummary name="summary" form={form} />
              <FormCover name="cover_image" form={form} />
              <Button type="submit" className="w-full rounded-[3px]">
                确定并发布
              </Button>
            </form>
          </Form>
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              className="absolute top-2.5 right-2.5 p-1 bg-white  text-gray-500 hover:text-gray-700"
              aria-label="关闭发布弹窗"
            >
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PublishDialog;
