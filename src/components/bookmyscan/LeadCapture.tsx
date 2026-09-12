import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Clock3, LoaderCircle, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categories, popularScanEstimates } from "@/lib/catalog";
import { createQuickEnquiry } from "@/lib/enquiries.functions";

const POPUP_KEY="bookmyscan-lead-popup-seen";
const EXCLUDED_PATHS=["/admin","/auth","/book-a-scan","/booking-confirmation"];
const whatsappUrl=`https://wa.me/919990519519?text=${encodeURIComponent("Hello BookMyScan.in, I need help comparing scan prices and booking a radiology scan.")}`;

export function LeadCapture(){
 const {pathname}=useLocation();
 const submit=useServerFn(createQuickEnquiry);
 const [seconds,setSeconds]=useState(20);
 const [open,setOpen]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [reference,setReference]=useState("");
 const excluded=EXCLUDED_PATHS.some(path=>pathname.startsWith(path));

 useEffect(()=>{
  if(excluded||sessionStorage.getItem(POPUP_KEY))return;
  setSeconds(20);
  const interval=window.setInterval(()=>setSeconds(value=>Math.max(0,value-1)),1000);
  const timeout=window.setTimeout(()=>{window.clearInterval(interval);sessionStorage.setItem(POPUP_KEY,"true");setOpen(true)},20000);
  return()=>{window.clearInterval(interval);window.clearTimeout(timeout)};
 },[excluded,pathname]);

 function changeOpen(next:boolean){setOpen(next);if(!next)sessionStorage.setItem(POPUP_KEY,"true")}
 async function onSubmit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setError("");setBusy(true);
  try{const result=await submit({data:new FormData(event.currentTarget)});setReference(result.reference);sessionStorage.setItem(POPUP_KEY,"true")}
  catch(issue){setError(issue instanceof Error?issue.message:"Please try again.")}
  finally{setBusy(false)}
 }
 const scans=Array.from(new Set([...popularScanEstimates.map(scan=>scan.name),...categories.map(category=>category.name),"MRI Abdomen with MRCP"]));
 return <>
  {!excluded&&seconds>0&&!open&&<div className="lead-countdown" aria-live="polite"><Clock3/><span>Scan-price help in</span><strong>00:{String(seconds).padStart(2,"0")}</strong></div>}
  <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with BookMyScan on WhatsApp"><MessageCircle/><span>WhatsApp</span></a>
  <Dialog open={open} onOpenChange={changeOpen}><DialogContent className="lead-dialog sm:max-w-md">
   {reference?<div className="lead-success"><ShieldCheck/><DialogHeader><DialogTitle>Request received</DialogTitle><DialogDescription>Your reference is {reference}. A BookMyScan coordinator will contact you to understand the prescribed scan and centre preference.</DialogDescription></DialogHeader><Button onClick={()=>changeOpen(false)}>Done</Button></div>:<><DialogHeader><div className="lead-dialog-icon"><PhoneCall/></div><DialogTitle>Get scan price assistance</DialogTitle><DialogDescription>Share three details. Our coordinator will help compare suitable radiology centres and current prices.</DialogDescription></DialogHeader><form className="quick-lead-form" onSubmit={onSubmit}><label>Full name<input name="name" required minLength={2} maxLength={100} autoComplete="name"/></label><label>Mobile number<input name="mobile" type="tel" required minLength={10} maxLength={16} pattern="[+0-9 -]{10,16}" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210"/></label><label>Scan / test<select name="scanType" required defaultValue=""><option value="" disabled>Select scan or test</option>{scans.map(scan=><option key={scan}>{scan}</option>)}</select></label><input type="hidden" name="sourcePath" value={pathname}/><input className="hidden" name="website" tabIndex={-1} autoComplete="off"/><label className="consent-row quick-consent"><input type="checkbox" name="consent" value="true" required/><span>I consent to being contacted about this scan enquiry and to my details being shared only with suitable imaging centres for appointment assistance.</span></label>{error&&<p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" size="lg" className="w-full" disabled={busy}>{busy?<><LoaderCircle className="animate-spin"/>Submitting</>:"Request a callback"}</Button><p className="lead-medical-note">BookMyScan is a booking facilitator, not a medical provider. Always consult your treating doctor.</p></form></>}
  </DialogContent></Dialog>
 </>;
}