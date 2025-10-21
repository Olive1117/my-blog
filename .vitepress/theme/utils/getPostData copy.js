import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.resolve(process.cwd(), 'posts');
console.log(`[VitePress] 正在讀取文章目錄 ${POSTS_DIR}...`);
export async function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`[VitePress] 警告：文章目錄 ${POSTS_DIR} 不存在，返回空列表。`)
    return [];
  }
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  const posts = files.map(file => {
    const filePath = path.join(POSTS_DIR, file);
    
    // 讀取文件內容
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // 使用 gray-matter 解析 Frontmatter 和內容
    const { data: frontmatter } = matter(fileContent);

    // 構建文章物件
    return {
      title: frontmatter.title || path.basename(file, '.md'), // 使用標題或文件名
      date: frontmatter.date ? new Date(frontmatter.date) : new Date(0), // 確保日期是 Date 物件
      link: `/posts/${path.basename(file, '.md')}.html`, // 導航連結
      filePath: filePath,
    };
  });
  // 按日期降序排序 (最新的在前面)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  // 將 Date 物件轉換回字串，因為 VitePress 構建時會將它序列化
  return posts.map(post => ({
    ...post,
    date: post.date.toISOString().split('T')[0] // 轉換為 YYYY-MM-DD 格式
  }));
}