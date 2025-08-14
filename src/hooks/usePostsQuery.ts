import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { POSTS_API_URL } from "../constants";

interface Post{
    id:number;
    title:string
}

const fetchPost=async():Promise<Post[]>=>{
    const response=await api.get(POSTS_API_URL)
    return response.data;
}

export const usePostsQuery=()=>{
    return useQuery<Post[],Error>({
        queryKey:["posts"],
        queryFn:fetchPost,
    })
}