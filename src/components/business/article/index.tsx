import React from 'react';

import { cn } from '@/utils';

interface Comment {
  author: string;
  authorAvatar: string;
  content: string;
  timeAgo: string;
}

interface ArticleCardProps {
  author: string;
  authorAvatar: string;
  teamName: string;
  timeAgo: string;
  title: string;
  description: string;
  coverImage: string;
  reactions: number;
  comments: number;
  tags: string[];
  hotComment?: Comment;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  author,
  authorAvatar,
  teamName,
  timeAgo,
  title,
  description,
  coverImage,
  reactions,
  comments,
  tags,
  hotComment,
  className,
}) => {
  return (
    <article
      className={cn(
        'w-full rounded-xl border bg-background shadow-md transition-all hover:shadow-lg',
        'dark:bg-card dark:border-border/50 dark:hover:border-border/80',
        className,
      )}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={authorAvatar}
              alt={`${author}'s avatar`}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-foreground">{author}</span>
                <span className="text-sm text-muted-foreground">for {teamName}</span>
              </div>
              <time className="text-xs text-muted-foreground">{timeAgo}</time>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="md:w-[200px] aspect-[4/3]">
          <img
            src={coverImage}
            alt="Article cover"
            className="h-full w-full rounded-lg object-cover transition-transform group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t p-4 dark:border-border/50">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>❤️‍🔥</span>
            <span>{reactions}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
            <span>💬</span>
            <span>{comments}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>1 min read</span>
          <button className="hover:text-primary transition-colors" aria-label="Save article">
            🔖
          </button>
        </div>
      </div>

      {hotComment && (
        <div className="border-t p-4 bg-muted/50 dark:bg-card/50 rounded-b-xl">
          <div className="flex items-start space-x-3">
            <img
              src={hotComment.authorAvatar}
              alt={`${hotComment.author}'s avatar`}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{hotComment.author}</span>
                <time className="text-xs text-muted-foreground">{hotComment.timeAgo}</time>
              </div>
              <p className="text-sm text-muted-foreground">{hotComment.content}</p>
              <button className="text-sm text-primary hover:underline">See more</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ArticleCard;
