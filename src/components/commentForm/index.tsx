'use client';

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Smile, Image, CircleHelp } from 'lucide-react';

//输入框和输入框操作栏
export const CommentInput = forwardRef<{ focus: () => void }>((props, ref) => {
  const [comment, setComment] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const count = 50;

  // 输入框内容改变
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 发送评论
  const handleSendClick = () => {
    console.log('Comment sent:', comment);
    setComment(''); // 清空输入框
  };

  // 阻止操作栏失去焦点
  const handleOperationMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 阻止默认行为，防止失去焦点
  };

  // 暴露聚焦方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <div className="flex-1 flex flex-col bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-none transition-all duration-300">
      {/* 文本框 */}
      <textarea
        ref={inputRef}
        className={`w-full 'h-20' p-2 rounded-md bg-gray-50 resize-none  focus:outline-none border-none`}
        placeholder="平等表达，友善交流"
        value={comment}
        onChange={handleInputChange}
      ></textarea>

      {/* 操作按钮 */}
      <div
        className="flex justify-between items-center px-2 pb-2"
        onMouseDown={handleOperationMouseDown}
      >
        {/* 左侧图标 */}
        <div className="flex space-x-3 text-gray-500">
          {/* 图片上传： 使用 react-dropzone 或其他库处理图片文件上传。 表情选择： 可用表情包库（如 */}
          {/* emoji-mart）实现表情选择器。 */}
          <Smile className="text-xl cursor-pointer hover:text-gray-700" />
          <Image className="text-xl cursor-pointer hover:text-gray-700" />
        </div>

        {/* 发送按钮 */}
        <div className="flex items-center gap-4">
          <span>{count}/1000</span>
          <CircleHelp />
          <button
            onClick={handleSendClick}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
});

//根评论表单，包含头像信息的
const CommentForm = () => {
  return (
    <div className="flex w-full items-start p-4 rounded-lg ">
      {/* 头像 */}
      <div className="mr-3">
        <img
          className="w-10 h-10 object-cover rounded-full"
          src="https://p3-passport.byteacctimg.com/img/user-avatar/9438ce6b090f7b0190f1845a4578141b~100x100.awebp"
          loading="lazy"
        />
      </div>
      <CommentInput />
    </div>
  );
};

export default CommentForm;
