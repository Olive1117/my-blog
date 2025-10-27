import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import crypto from 'crypto';

// 获取所有文章
export const getAllPosts = async () => {
  let paths = await getPostMDFilePaths();
  let posts = await Promise.all(
    paths.map(async (path) => {
      const content = await fs.promises.readFile(path, 'utf-8'); //文件内容
      const stat = await fs.promises.stat(path); //元数据
      const { data } = matter(content);
      const { title, date, categories, description, tags, top, cover, img } = data;
      const { birthtimeMs, mtimeMs } = stat;
      const id = crypto.createHash('md5').update(String(birthtimeMs)).digest('hex');
      return {
        id: id,
        title: title || "未命名",
        description: description || "无摘要",
        date: date ? new Date(date).getTime() : birthtimeMs,
        lastModifiedDate: mtimeMs,
        categories: categories || [],
        tags: tags || [],
        top: top || false,
        cover: cover || "",
        img: img || "",
        filePath: path,
      };
    }));
    // posts.map(post => {
    //   console.log(post)
    // })
  posts.sort(comparePostPriority);
  return posts;
};

// 获取文章地址
const getPostMDFilePaths = async () => {
  try {
    const POSTS_DIR = path.resolve(process.cwd(), 'posts');
    console.log(`[VitePress] 正在讀取文章目錄 ${POSTS_DIR}...`);
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
    const paths = files.map(file => path.join(POSTS_DIR, file));
    console.log(`[VitePress] 共找到 ${paths.length} 篇文章.`);
    return paths;
  } catch (error) {
    console.error("获取文章路径时出错:", error);
    throw error;
  }
};

// 文章按时间降序排序
const comparePostPriority = (a, b) => {
  if (a.top &&!b.top) {
    return -1;
  } else if (!a.top && b.top) {
    return 1;
  } else {
    return compareDate(a, b);
  }
}
const compareDate = (obj1, obj2) => obj1.date < obj2.date ? 1 : -1;

export const getAllCategories = (postData) => {
  let categories = {};
  postData.map((item) => {
    if (!item.categories || item.categories.length === 0) return;
    item.categories.forEach(type => {
      if (!categories[type]) {
        categories[type] = {
          count: 1,
          articles: [item],
        };
      } else {
        categories[type].count++;
        categories[type].articles.push(item);
      }
    });
  })
  return categories;
}
export const getAllTags = (postData) => {
  let tags = {};
  postData.map((item) => {
    if (!item.tags || item.tags.length === 0) return;
    item.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        tags[tag].count++;
        tags[tag].articles.push(item);
      }
    });
  })
  return tags;
}