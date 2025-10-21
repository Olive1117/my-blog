import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAllPosts() {
  let paths = await getPostMDFilePaths();
  let posts = await Promise.all(
    paths.map(async (path) => {
      const content = await fs.promises.readFile(path, 'utf-8');
      const stat = await fs.promises.stat(path);
      const { data } = matter(content);
      const { title, date, categories, description, tags, top, cover } = data;
      const { birthtimeMs, mtimeMs } = stat;
      return {
        id: (path+birthtimeMs),
        title: title || "未命名",
        date: date ? new Date(date) : new Date(birthtimeMs),
        lastModifiedDate: new Date(mtimeMs),
        categories: categories || [],
        description: description || "",
        tags: tags || [],
        top: top || false,
        cover: cover || "",
        // content: content,
        filePath: path,
      };
    }));
    posts.map(post => {
      console.log(post)
    })
  return posts;
};

const getPostMDFilePaths = async () => {
  try {
    const POSTS_DIR = path.resolve(process.cwd(), 'posts');
    // console.log(`[VitePress] 正在讀取文章目錄 ${POSTS_DIR}...`);
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
    const paths = files.map(file => path.join(POSTS_DIR, file));
    // console.log(`[VitePress] 共找到 ${paths.length} 篇文章.`);
    return paths;
  } catch (error) {
    console.error("获取文章路径时出错:", error);
    throw error;
  }
};

// const getPostMDFilePaths_globby = async () => {
//   try {
//     // 获取所有 md 文件路径
//     let paths = await globby(["**.md"], {
//       ignore: ["node_modules", "pages", ".vitepress", "README.md"],
//     });
//     // 过滤路径，只包括 'posts' 目录下的文件
//     return paths.filter((item) => item.includes("posts/"));
//   } catch (error) {
//     console.error("获取文章路径时出错:", error);
//     throw error;
//   }
// };