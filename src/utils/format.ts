//计算文章的阅读时长,结果为分钟
export function postReadingTime(text: string) {
  const wordsPerMinute = 200; // 平均阅读速度（每分钟字数）
  const words = text.split(/\s+/).length; // 计算文章的字数
  const minutes = words / wordsPerMinute;
  const readingTime = Math.ceil(minutes); // 向上取整，确保时间足够

  return readingTime;
}

//获取一个短时间，2024-11-23T05:47:19.731Z=>2024-11-23
export function getShortDate(date: string) {
  return date.slice(0, 10);
}
