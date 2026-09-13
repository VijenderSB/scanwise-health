import {createServerFn} from "@tanstack/react-start";
import {publishedTherapies} from "@/lib/therapies";
export const getPublishedTherapySlugs=createServerFn({method:"GET"}).handler(async()=>{
 return publishedTherapies.map(item=>item.slug);
});
