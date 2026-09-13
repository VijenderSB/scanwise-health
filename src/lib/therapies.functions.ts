import {createServerFn} from "@tanstack/react-start";
export const getPublishedTherapySlugs=createServerFn({method:"GET"}).handler(async()=>{
 const url=process.env['SUPABASE_URL'];
 const key=process.env['SUPABASE_ANON_KEY']??process.env['SUPABASE_PUBLISHABLE_KEY'];
 if(!url||!key)return [] as string[];
 const response=await fetch(`${url}/rest/v1/nuclear_medicine_therapies?select=slug&published=eq.true&clinical_reviewer=not.is.null&clinical_reviewed_at=not.is.null&order=display_order.asc`,{headers:{apikey:key}});
 if(!response.ok)return [] as string[];
 const data=await response.json() as {slug:string}[];
 return data.map(item=>item.slug);
});
