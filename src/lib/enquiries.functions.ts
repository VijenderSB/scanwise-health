import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
const schema=z.object({name:z.string().trim().min(2).max(100),mobile:z.string().trim().regex(/^[+0-9\s-]{10,16}$/),email:z.string().trim().email().max(255).or(z.literal("")),city:z.string().trim().min(2).max(100),preferredLocality:z.string().trim().max(150),scanType:z.string().trim().min(2).max(200),centreName:z.string().trim().max(180),protocolCode:z.string().trim().max(100),offerId:z.string().uuid().or(z.literal("")),preferredDate:z.string().max(10),notes:z.string().trim().max(2000),consent:z.literal("true"),website:z.string().max(0),sourcePath:z.string().max(300)});
const quickEnquirySchema=z.object({name:z.string().trim().min(2,"Enter your full name.").max(100),mobile:z.string().trim().regex(/^\+?[0-9\s-]{10,16}$/,"Enter a valid mobile number."),scanType:z.string().trim().min(2,"Select a scan.").max(200),consent:z.literal("true"),website:z.string().max(0),sourcePath:z.string().trim().max(300)});

export const createQuickEnquiry=createServerFn({method:"POST"}).inputValidator((input:FormData)=>{if(!(input instanceof FormData)) throw new Error("Invalid form");return input;}).handler(async({data})=>{
 const parsed=quickEnquirySchema.parse(Object.fromEntries(data.entries()));
 const reference=`BMS-${Date.now().toString(36).toUpperCase()}`;
 const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
 const {error}=await supabaseAdmin.from("enquiries").insert({reference_code:reference,name:parsed.name,mobile:parsed.mobile,city:"Delhi NCR",scan_type:parsed.scanType,consent_given:true,source_path:parsed.sourcePath,status:"New Enquiry",notes:"Submitted through the timed scan-price assistance form."});
 if(error) throw new Error("We could not submit your request. Please try again.");
 return {reference};
});
export const createEnquiry=createServerFn({method:"POST"}).inputValidator((input:FormData)=>{if(!(input instanceof FormData)) throw new Error("Invalid form"); return input;}).handler(async({data})=>{
 const parsed=schema.parse(Object.fromEntries(Array.from(data.entries()).filter(([k])=>k!=="file")));
 const file=data.get("file");
 if(file instanceof File && file.size>0 && (file.size>10485760||!["application/pdf","image/jpeg","image/png"].includes(file.type))) throw new Error("Upload a PDF, JPG or PNG up to 10 MB.");
 const reference=`BMS-${Date.now().toString(36).toUpperCase()}`;
 const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
 let verifiedOffer:{id:string;centre_id:string;protocol_code:string;scan_name:string;inclusions:string[];exclusions:string[];regular_price_inr:number;offer_price_inr:number;mandatory_charges_inr:number}|null=null;
 if(parsed.offerId){const {data:offer}=await supabaseAdmin.from("scan_offers").select("id,centre_id,protocol_code,scan_name,inclusions,exclusions,regular_price_inr,offer_price_inr,mandatory_charges_inr").eq("id",parsed.offerId).eq("verified",true).lte("valid_from",new Date().toISOString()).gt("valid_until",new Date().toISOString()).maybeSingle();if(offer&&(!parsed.protocolCode||offer.protocol_code===parsed.protocolCode))verifiedOffer=offer;}
 const total=verifiedOffer?verifiedOffer.offer_price_inr+verifiedOffer.mandatory_charges_inr:null;const savings=verifiedOffer&&total!==null?verifiedOffer.regular_price_inr-total:null;const discount=verifiedOffer&&savings!==null?Math.round(savings/verifiedOffer.regular_price_inr*100):null;
 const protocolCode=verifiedOffer?.protocol_code??(parsed.protocolCode||null);
 const {data:lead,error}=await supabaseAdmin.from("enquiries").insert({reference_code:reference,name:parsed.name,mobile:parsed.mobile,email:parsed.email||null,city:parsed.city,preferred_locality:parsed.preferredLocality||null,scan_type:verifiedOffer?.scan_name??parsed.scanType,preferred_date:parsed.preferredDate||null,notes:parsed.notes||null,consent_given:true,source_path:parsed.sourcePath,status:"New Enquiry",selected_centre_id:verifiedOffer?.centre_id??null,protocol_code:protocolCode,offer_id:verifiedOffer?.id??null,regular_price_inr:verifiedOffer?.regular_price_inr??null,offer_price_inr:verifiedOffer?.offer_price_inr??null,mandatory_charges_inr:verifiedOffer?.mandatory_charges_inr??null,savings_inr:savings,discount_percent:discount,price_verified:Boolean(verifiedOffer),pricing_snapshot:verifiedOffer?{scan:verifiedOffer.scan_name,protocol:verifiedOffer.protocol_code,inclusions:verifiedOffer.inclusions,exclusions:verifiedOffer.exclusions,regularPrice:verifiedOffer.regular_price_inr,offerPrice:verifiedOffer.offer_price_inr,mandatoryCharges:verifiedOffer.mandatory_charges_inr,total,savings,discount,verifiedAtSubmission:new Date().toISOString()}:parsed.centreName?{requestedCentre:parsed.centreName,priceStatus:"pending centre and protocol review"}:null}).select("id").single();
 if(error||!lead) throw new Error("We could not submit your request. Please try again.");
 if(file instanceof File && file.size>0){ const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"-"); const path=`${lead.id}/${crypto.randomUUID()}-${safe}`; const uploaded=await supabaseAdmin.storage.from("prescriptions").upload(path,await file.arrayBuffer(),{contentType:file.type,upsert:false}); if(uploaded.error) throw new Error("Your request was saved, but the document upload failed."); await supabaseAdmin.from("enquiry_uploads").insert({enquiry_id:lead.id,storage_path:path,file_name:file.name,mime_type:file.type,size_bytes:file.size});}
 return {reference,scanName:verifiedOffer?.scan_name??parsed.scanType,totalPrice:total,savings,discount};
});
