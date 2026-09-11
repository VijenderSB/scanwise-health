import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
const schema=z.object({name:z.string().trim().min(2).max(100),mobile:z.string().trim().regex(/^[+0-9\s-]{10,16}$/),email:z.string().trim().email().max(255).or(z.literal("")),city:z.string().trim().min(2).max(100),preferredLocality:z.string().trim().max(150),scanType:z.string().trim().min(2).max(200),preferredDate:z.string().max(10),notes:z.string().trim().max(2000),consent:z.literal("true"),website:z.string().max(0),sourcePath:z.string().max(300)});
export const createEnquiry=createServerFn({method:"POST"}).inputValidator((input:FormData)=>{if(!(input instanceof FormData)) throw new Error("Invalid form"); return input;}).handler(async({data})=>{
 const parsed=schema.parse(Object.fromEntries(Array.from(data.entries()).filter(([k])=>k!=="file")));
 const reference=`BMS-${Date.now().toString(36).toUpperCase()}`;
 const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
 const {data:lead,error}=await supabaseAdmin.from("enquiries").insert({reference_code:reference,name:parsed.name,mobile:parsed.mobile,email:parsed.email||null,city:parsed.city,preferred_locality:parsed.preferredLocality||null,scan_type:parsed.scanType,preferred_date:parsed.preferredDate||null,notes:parsed.notes||null,consent_given:true,source_path:parsed.sourcePath,status:"New Enquiry"}).select("id").single();
 if(error||!lead) throw new Error("We could not submit your request. Please try again.");
 const file=data.get("file");
 if(file instanceof File && file.size>0){if(file.size>10485760||!["application/pdf","image/jpeg","image/png"].includes(file.type)) throw new Error("Upload a PDF, JPG or PNG up to 10 MB."); const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"-"); const path=`${lead.id}/${crypto.randomUUID()}-${safe}`; const uploaded=await supabaseAdmin.storage.from("prescriptions").upload(path,await file.arrayBuffer(),{contentType:file.type,upsert:false}); if(uploaded.error) throw new Error("Your request was saved, but the document upload failed."); await supabaseAdmin.from("enquiry_uploads").insert({enquiry_id:lead.id,storage_path:path,file_name:file.name,mime_type:file.type,size_bytes:file.size});}
 return {reference};
});
