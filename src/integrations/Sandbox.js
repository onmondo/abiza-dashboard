import axios from "axios"

export const getPosts = async () => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        const posts = res.data
        return posts
    } catch (err) {
        throw Error("Failed to fetch posts")
    }
}