// import { useData } from "vitepress";
import { getAllPosts, getAllCategories } from "../../.vitepress/theme/utils/getPostData.mjs";

// const posts = await getAllPosts()
const postData = await getAllPosts();
const categories = getAllCategories(postData);
export default {
    paths() {
        const paths = [];
        Object.keys(categories).forEach(category => {
            paths.push({ params: { name: category.toString() }});
        });
        return paths;
    }
}