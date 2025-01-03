'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/utils';
import { Input } from '@/components/ui/input';
import useSearchInput from '@/hooks/useSearchInput';

const SearchInput: React.FC<{
  className?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
}> = ({ className, placeholder, onSearch, ...props }) => {
  const {
    inputRef,
    isFocused,
    inputValue,
    searchHistoryList,
    thinkList,

    setSearchHistoryList,

    inputSearch,
    inputFocus,
    inputBlur,
    clearHandler,
    inputChange,
  } = useSearchInput(onSearch);

  const isShowSearchHistory = isFocused && !inputValue && searchHistoryList.length;
  const isShowThinkList = isFocused && inputValue;

  useEffect(() => {
    // 获取搜索历史列表
    setSearchHistoryList([
      { content: '111', id: 1 },
      { content: '222', id: 2 },
    ]);
  }, []);

  return (
    <div
      className={cn(
        'flex border rounded border-gray-200 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-200 items-center relative px-1',
        className,
        isFocused ? '!border-ring' : '',
      )}
    >
      <Input
        ref={inputRef}
        className="border-none focus-visible:ring-0 h-1/2"
        value={inputValue}
        onChange={inputChange}
        onFocus={inputFocus}
        onBlur={inputBlur}
        placeholder={placeholder}
        {...props}
      ></Input>
      <button className="ml-2" onClick={inputSearch}>
        🔍
      </button>
      {/* 搜索历史列表 */}
      <AnimatePresence>
        {isShowSearchHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full absolute left-0 mt-1 rounded top-full bg-slate-50 dark:bg-slate-800"
          >
            <div className="w-full rounded h-8 bg-slate-50 dark:bg-slate-800 flex justify-between px-2 py-2 border-b">
              <span className="text-xs">搜索记录</span>
              <span className="text-xs cursor-pointer text-ring" onClick={clearHandler}>
                清空
              </span>
            </div>
            <div className="w-full rounded bg-slate-50 dark:bg-slate-800">
              {searchHistoryList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-full px-2 py-4 text-xs cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    {item.content}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 搜索联想列表 */}
      <AnimatePresence>
        {isShowThinkList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full absolute top-full left-0 mt-1"
          >
            <div className="w-full bg-slate-50 dark:bg-slate-800">
              {thinkList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-full px-2 py-4 text-xs cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    {item.content}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
