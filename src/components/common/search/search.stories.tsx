import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CalendarIcon, SearchIcon, SettingsIcon, UserIcon } from 'lucide-react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from './index';

// 定义搜索建议的类型
interface SearchSuggestion {
  id: string;
  title: string;
  type?: string;
  icon?: React.ReactNode;
}

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

// 修改模拟搜索函数的返回类型
const mockSearch = async (query: string): Promise<SearchSuggestion[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allItems: SearchSuggestion[] = [
    { id: '1', title: 'Calendar', type: 'app', icon: <CalendarIcon className="mr-2 h-4 w-4" /> },
    { id: '2', title: 'Search', type: 'app', icon: <SearchIcon className="mr-2 h-4 w-4" /> },
    { id: '3', title: 'Settings', type: 'app', icon: <SettingsIcon className="mr-2 h-4 w-4" /> },
    { id: '4', title: 'Profile', type: 'page', icon: <UserIcon className="mr-2 h-4 w-4" /> },
  ];

  return allItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
};

// 基础命令面板示例
export const Basic: Story = {
  render: () => (
    <div className="w-[400px] border border-gray-200 rounded-xl">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SearchIcon className="mr-2 h-4 w-4" />
              <span>Search</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

// 带搜索功能的对话框模式示例
export const SearchableDialog: Story = {
  render: function SearchableDialogStory() {
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 修改搜索处理函数的类型
    const handleSearch = async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);

        return;
      }

      setIsLoading(true);

      try {
        const results = await mockSearch(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
        >
          Open Search (⌘K)
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search anything..." onValueChange={handleSearch} />
          <CommandList>
            <CommandEmpty>{isLoading ? 'Searching...' : 'No results found.'}</CommandEmpty>

            {suggestions.length > 0 && (
              <CommandGroup heading="Search Results">
                {suggestions.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => {
                      console.log('Selected:', item);
                      setOpen(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

// 带搜索历史的示例
interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

export const WithSearchHistory: Story = {
  render: function SearchHistoryStory() {
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
      { id: '1', query: 'calendar settings', timestamp: Date.now() - 1000 },
      { id: '2', query: 'user profile', timestamp: Date.now() - 2000 },
    ]);

    const handleSearch = async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);

        return;
      }

      try {
        const results = await mockSearch(query);
        setSuggestions(results);

        // 添加到搜索历史
        setSearchHistory((prev) => [
          {
            id: Date.now().toString(),
            query: query.trim(),
            timestamp: Date.now(),
          },
          ...prev.slice(0, 4),
        ]); // 只保留最近5条
      } catch (error) {
        console.error('Search failed:', error);
        setSuggestions([]);
      }
    };

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
        >
          Search with History
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search with history..." onValueChange={handleSearch} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {searchHistory.length > 0 && !suggestions.length && (
              <CommandGroup heading="Recent Searches">
                {searchHistory.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.query}
                    onSelect={() => handleSearch(item.query)}
                  >
                    <SearchIcon className="mr-2 h-4 w-4" />
                    <span>{item.query}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {suggestions.length > 0 && (
              <CommandGroup heading="Results">
                {suggestions.map((item) => (
                  <CommandItem key={item.id} value={item.title} onSelect={() => setOpen(false)}>
                    {item.icon}
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};
