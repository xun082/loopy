'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Sparkles, History } from 'lucide-react';

import { cn } from '@/utils';
import Input from '@/components/common/input';
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
        'flex relative w-full max-w-md group',
        'bg-background/50 backdrop-blur-xl',
        'rounded-2xl',
        'shadow-sm',
        'transition-all duration-300 ease-in-out',
        'border border-border/50',
        'hover:border-primary/30 hover:shadow-md hover:shadow-primary/5',
        isFocused && 'border-primary/50 shadow-lg shadow-primary/10',
        className,
      )}
    >
      {/* 搜索输入框 */}
      <div className="flex items-center w-full px-4 py-2.5">
        <Search
          className={cn(
            'w-4 h-4 text-muted-foreground/70 transition-colors duration-200',
            isFocused && 'text-primary',
          )}
        />
        <Input
          ref={inputRef}
          className="border-none bg-transparent focus-visible:ring-0 px-3 py-1 h-8 placeholder:text-muted-foreground/50"
          value={inputValue}
          onChange={inputChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          placeholder={placeholder}
          {...props}
        />
        <AnimatePresence>
          {inputValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearHandler}
              className="p-1.5 rounded-full hover:bg-muted/80 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground/70" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 搜索历史列表 */}
      <AnimatePresence>
        {isShowSearchHistory && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-2 rounded-xl border bg-popover/80 backdrop-blur-xl shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <History className="w-4 h-4 text-primary/70" />
                <span>搜索记录</span>
              </div>
              <button
                onClick={clearHandler}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
              >
                清空记录
              </button>
            </div>
            <div className="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10">
              {searchHistoryList.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2.5 text-sm cursor-pointer hover:bg-muted/50 transition-colors flex items-center gap-3 group"
                >
                  <Clock className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 搜索联想列表 */}
      <AnimatePresence>
        {isShowThinkList && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-2 rounded-xl border bg-popover/80 backdrop-blur-xl shadow-lg"
          >
            <div className="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10">
              {thinkList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer hover:bg-muted/50 transition-colors group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
