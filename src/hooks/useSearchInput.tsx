import { ChangeEvent, useRef, useState } from 'react';

const useSearchInput = (onSearch?: (value: string) => void) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 搜索框是否聚焦
  const [isFocused, setIsFocused] = useState(false);
  // 搜索框输入得值
  const [inputValue, setInputValue] = useState('');
  // 搜索历史列表
  const [searchHistoryList, setSearchHistoryList] = useState<any[]>([]);
  // 根据搜索框值联想列表
  const [thinkList, setThinkList] = useState<any[]>([]);

  // 点击搜索按钮进行搜索
  const inputSearch = () => {
    if (inputRef.current) {
      if (onSearch) {
        onSearch(inputRef.current.value);
      }
    }
  };
  // 搜索框聚焦事件
  const inputFocus = () => {
    setIsFocused(true);
  };
  // 搜索框失焦事件
  const inputBlur = () => {
    setIsFocused(false);
  };

  // 搜索历史清空事件
  const clearHandler = () => {
    setSearchHistoryList([]);
  };

  // 搜索框值改变事件
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target?.value);
    // 根据输入框得值进行联想搜索
    // setThinkList([...])
  };

  return {
    inputRef,
    isFocused,
    inputValue,
    searchHistoryList,
    thinkList,

    setIsFocused,
    setInputValue,
    setSearchHistoryList,
    setThinkList,

    inputSearch,
    inputFocus,
    inputBlur,
    clearHandler,
    inputChange,
  };
};

export default useSearchInput;
