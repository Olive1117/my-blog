// import { useData } from "vitepress";
import { getAllPosts, getAllTags } from "../../.vitepress/theme/utils/getPostData.mjs";

const postData = await getAllPosts();
const tags = getAllTags(postData);
export default {
    paths() {
        const paths = [];
        Object.keys(tags).forEach(tag => {
            paths.push({ params: { name: tag.toString() }});
        });
        return paths;
    }
}