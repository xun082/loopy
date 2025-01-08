import { RadioGroup, RadioGroupItem } from './radio-button';
import ImageUploader from './image-uploader';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import type { ArticleType, ArticleTag } from '@/services/editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/select';
import { Textarea } from '@/components/common/textarea';

interface FormComponentProps {
  form: any;
  name: string;
}

interface CategoryProps extends FormComponentProps {
  articleType: ArticleType[];
}

interface ArticleTagProps extends FormComponentProps {
  tags: ArticleTag[];
}

// 分类选择
export const FormCategory: React.FC<CategoryProps> = ({ form, articleType, name }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex" aria-required>
          <FormLabel className="w-20 text-center mt-1 before:content-['*'] before:text-red-500 before:mr-1">
            分类:
          </FormLabel>
          <div className="flex flex-1 flex-col">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap"
              >
                {articleType.map((item) => (
                  <FormItem className="relative w-20 h-8" key={item.id}>
                    <FormControl>
                      <RadioGroupItem value={item.id.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal size-full flex items-center justify-center text-black">
                      {item.name}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage className="mt-1" />
          </div>
        </FormItem>
      )}
    />
  );
};

// 添加标签
export const FormTags: React.FC<ArticleTagProps> = ({ form, tags, name }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex" aria-required>
          <FormLabel className="w-20 text-center mt-1 before:content-['*'] before:text-red-500 before:mr-1">
            添加标签:
          </FormLabel>
          <div className="flex flex-1 flex-col w-full">
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="border border-gray-300 rounded-[5px]">
                  <SelectValue placeholder="请选择一个标签" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="mt-1" />
          </div>
        </FormItem>
      )}
    />
  );
};

// 文章摘要
export const FormSummary: React.FC<FormComponentProps> = ({ form, name }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex" aria-required>
          <FormLabel className="w-20 text-center mt-1 before:content-['*'] before:text-red-500 before:mr-1">
            摘要:
          </FormLabel>
          <div className="flex flex-1 flex-col w-full">
            <FormControl>
              <Textarea
                placeholder="这是文章的摘要信息..."
                className="resize-none border border-gray-300 rounded-[5px]"
                {...field}
              />
            </FormControl>
            <FormMessage className="mt-1" />
          </div>
        </FormItem>
      )}
    />
  );
};

// 上传封面
export const FormCover: React.FC<FormComponentProps> = ({ form, name }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex">
          <FormLabel className="w-20 text-center mt-1">上传封面:</FormLabel>
          <div className="flex flex-1 flex-col w-full">
            <FormControl>
              <ImageUploader
                accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
                onUpload={field.onChange}
              />
            </FormControl>
            <FormMessage className="mt-1" />
          </div>
        </FormItem>
      )}
    />
  );
};
