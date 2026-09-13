import {createServerFn} from "@tanstack/react-start";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "@/integrations/supabase/types";

export const getPublishedTherapySlugs=createServerFn({method:"GET"}).handler(async()=>{
 const url=process.env['SUPABASE_URL'];
 const key=process.env['SUPABASE_ANON_KEY']??process.env['SUPABASE_PUBLISHABLE_KEY'];
 if(!url||!key)return [] as string[];
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
 const {data,error}=await client.from('nuclear_medicine_therapies').select('slug').eq('published',true).not('clinical_reviewer','is',null).not('clinical_reviewed_at','is',null).order('display_order');
 if(error)throw new Error('Therapy publication status is temporarily unavailable.');
 return (data??[]).map(item=>item.slug);
});
