import { title } from "process"

const domain = import.meta.env.WP_DOMAIN
const apiURL = `${domain}/wp-json/wp/v2`
console.log(domain)

export const getPageInfo = async (slug: string)=>{
    const response = await fetch(`${apiURL}/pages?slug=${slug}`)
    if (!response.ok) throw new Error(' Failed fetch page info')

    const [data] = await response.json()  
    const {title: { rendered: title }, content:{rendered: content} } = data 
    return {title, content }
}
export const getPostInfo = async (slug: string)=>{
    const response = await fetch(`${apiURL}/posts?slug=${slug}`)
    if (!response.ok) throw new Error(' Failed fetch page info')

    const [data] = await response.json()  
    const {title: { rendered: title }, content:{rendered: content} } = data 
    return {title, content }
}

export const getLatesPosts = async({ perPage = 10} : {perPage?: number} = {}) =>{
    const response = await fetch(`${apiURL}/posts?per_page=${perPage}&_embed`)
    if(!response.ok) throw new Error("Failed to fetch latest posts")

    const results = await response.json()
    if (!results.length) throw new Error("No posts found")
    
    const posts= results.map(post=>{
    //     const {
    //     title:{rendered: title},
    //     excerpt:{rendered: excerpt},
    //     content:{rendered:content},
    //     date, 
    //     slug
    // } = post
        const title  = post.title.rendered
        const excerpt = post.title.rendered 
        const content = post.content.rendered
        const {date, slug, } = post
        const featureImage = post._embedded['wp:featuredmedia'][0].source_url
        
        return {title,excerpt,content, date, slug, featureImage}
    })
    return posts
}