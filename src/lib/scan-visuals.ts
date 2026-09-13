import mri from "@/assets/scan-mri.jpg";
import ct from "@/assets/scan-ct.jpg";
import petCt from "@/assets/scan-pet-ct.jpg";
import ultrasound from "@/assets/scan-ultrasound.jpg";
import mammography from "@/assets/scan-mammography.jpg";
import dexa from "@/assets/scan-dexa.jpg";

const visuals={mri,ct,petCt,ultrasound,mammography,dexa};

export function scanVisual(value:string){
 const key=value.toLowerCase();
 if(key.includes("mammograph"))return {src:visuals.mammography,alt:"Modern digital mammography machine in a specialist imaging room",label:"Breast imaging"};
 if(key.includes("dexa")||key.includes("bone density"))return {src:visuals.dexa,alt:"Modern DEXA bone density scanner in a diagnostic imaging room",label:"Bone density imaging"};
 if(key.includes("ultrasound")||key.includes("sonograph"))return {src:visuals.ultrasound,alt:"Modern diagnostic ultrasound machine in an examination room",label:"Ultrasound imaging"};
 if(key.includes("pet")||key.includes("gamma")||key.includes("spect"))return {src:visuals.petCt,alt:"Modern PET-CT scanner in a nuclear medicine imaging suite",label:"Molecular imaging"};
 if(key.includes("ct")||key.includes("x-ray")||key.includes("fluoroscopy")||key.includes("coronary"))return {src:visuals.ct,alt:"Modern CT scanner in a private radiology imaging centre",label:"CT imaging"};
 return {src:visuals.mri,alt:"Modern MRI scanner in a private radiology imaging centre",label:"MRI imaging"};
}