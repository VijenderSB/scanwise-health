import type { ReactNode } from "react";
import { PageIntro } from "@/components/bookmyscan/Blocks";

export function LegalPage({eyebrow,title,intro,children}:{eyebrow:string;title:string;intro:string;children:ReactNode}){
 return <><PageIntro eyebrow={eyebrow} title={title} copy={intro}/><article className="section page-wrap legal-copy">{children}<p className="legal-updated">Last updated: 13 September 2026</p></article></>;
}

export function LegalSection({title,children}:{title:string;children:ReactNode}){
 return <section><h2>{title}</h2><div>{children}</div></section>;
}