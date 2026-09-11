UPDATE public.centres SET published = false WHERE slug IN ('northstar-imaging-delhi-demo','aravali-molecular-imaging-demo','yamuna-advanced-diagnostics-demo','ncr-scan-point-greater-noida-demo','crown-breast-imaging-demo','hindon-diagnostic-imaging-demo');

INSERT INTO public.centres (location_id,name,slug,locality,address,overview,equipment,services,timings,accreditations,cashless_support,open_24x7,report_turnaround,wheelchair_access,is_demo,published)
SELECT l.id,c.name,c.slug,c.locality,c.address,'Directory record supplied to BookMyScan.in. Address and advertised imaging services are pending independent verification.',ARRAY[]::text[],c.services,'Confirm with centre',ARRAY[]::text[],false,false,'Confirm with centre',false,false,true
FROM (VALUES
('delhi','Mahajan Imaging','mahajan-imaging-defence-colony','Defence Colony','E-19 Ring Road, Defence Colony, New Delhi 110024',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Mahajan Imaging','mahajan-imaging-dwarka','Dwarka','Ground Floor, Dwarka Walk Mall, Sector 13, Dwarka, New Delhi 110075',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Mahajan Imaging','mahajan-imaging-sda','SDA','C-6/8, Safdarjung Development Area, New Delhi 110016',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Mahajan Imaging','mahajan-imaging-pusa-road','Pusa Road','7-B Upper Ground Floor, Main Pusa Road, Rajinder Nagar, New Delhi 110005',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Mahajan Imaging','mahajan-imaging-bali-nagar','Bali Nagar','H-17 Block F, Bali Nagar, New Delhi 110026',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Mahajan Imaging','mahajan-imaging-hauz-khas','Hauz Khas','K-18 Hauz Khas Enclave, New Delhi 110016',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Orbit Imaging & Pathlab','orbit-imaging-pathlab-karol-bagh','Karol Bagh','B-35 Block 11 Pusa Road, Old Rajinder Nagar, Delhi 110005',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Orbit Imaging & Pathlab','orbit-imaging-pathlab-rohini','Rohini','First Floor A-1/5 A Block, Prashant Vihar, Sector 14, Rohini, Delhi 110085',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Orbit Imaging & Pathlab','orbit-imaging-pathlab-green-park','Green Park','Green Park, New Delhi',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Orbit Imaging & Pathlab','orbit-imaging-pathlab-dwarka','Dwarka','Dwarka, New Delhi',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Orbit Imaging & Pathlab','orbit-imaging-pathlab-paschim-vihar','Paschim Vihar','Paschim Vihar, New Delhi 110063',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Orbit Imaging & Pathlab','orbit-imaging-pathlab-dilshad-garden','Dilshad Garden','Dilshad Garden, New Delhi 110095',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Ganesh Diagnostic & Imaging Centre','ganesh-diagnostic-imaging-centre-rohini','Rohini','109 Pocket A-1 Near Deepali Chowk, Sector 8, Rohini, New Delhi 110085',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Neurad Diagnostic & Healthcare','neurad-diagnostic-healthcare-paschim-vihar','Paschim Vihar','Opposite Metro Pillar 233, Paschim Vihar West, New Delhi',ARRAY['MRI','CT','PET-CT','PSMA','DOTANOC','FAPI']::text[]),
('delhi','Molecular Diagnostics & Therapy','molecular-diagnostics-therapy-green-park-extension','Green Park Extension','H-2 Basement and Ground Floor, Ch. Hukum Chand Marg, Green Park Extension, New Delhi 110016',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','Molecular Diagnostics & Therapy','molecular-diagnostics-therapy-paschim-vihar','Paschim Vihar','Paschim Vihar, New Delhi',ARRAY['MRI','CT','PET-CT']::text[]),
('delhi','NM PET CT Imaging','nm-pet-ct-imaging-greater-kailash','Greater Kailash','E-18, Greater Kailash, New Delhi',ARRAY['PET-CT','PSMA PET','F-18 DOPA','F-18 Choline']::text[]),
('delhi','MRI/CT Diagnostic Center & Pathology Lab','mri-ct-diagnostic-center-pathology-lab-amritpuri','Amritpuri','Main Street Block A, Amritpuri, New Delhi',ARRAY['MRI','CT']::text[]),
('delhi','Delhi PET CT Scan EVE','delhi-pet-ct-scan-eve-delhi','Delhi','89B, New Delhi',ARRAY['PET-CT','DOTA PET']::text[]),
('delhi','Pet CT Scan Providers','pet-ct-scan-providers-delhi','Delhi','First Floor 14 Chaudhary Dilip Singh Marg, New Delhi',ARRAY['PET-CT']::text[]),
('gurgaon','Sanar Care Diagnostic Centre','sanar-care-diagnostic-centre-sector-15','Sector 15','Plot No. 1 Shaheed Major Vikas Yadav Marg, Sector 15, Gurugram',ARRAY['MRI','PET-CT']::text[]),
('gurgaon','GGN Diagnostic Care','ggn-diagnostic-care-badshahpur-sohna-road','Badshahpur Sohna Road','Vipul Greens, Badshahpur Sohna Road, Near JMD Garden, Gurugram',ARRAY['MRI','Open MRI','CT','PET']::text[]),
('gurgaon','Sanar Care Diagnostic Centre','sanar-care-diagnostic-centre-sushant-lok','Sushant Lok','Ground Floor Times Square Building, Near Huda City Centre Metro, Gurugram',ARRAY['MRI','Open MRI','CT','PET']::text[]),
('gurgaon','DR MRI Center Gurgaon','dr-mri-center-gurgaon-sohna-road','Sohna Road','Ground Floor Vipul Trade Center, Sohna Gurgaon Road, Gurugram',ARRAY['MRI','CT','PET-CT']::text[]),
('gurgaon','Sanar Care Diagnostic Centre','sanar-care-diagnostic-centre-sector-14','Sector 14','SCO 30 Part 2, Huda Market Road, Sector 14, Gurugram',ARRAY['MRI','CT','PET-CT']::text[]),
('gurgaon','Sanar Care Diagnostics & Imaging','sanar-care-diagnostics-imaging-sector-55','Sector 55','104 Sector 55, Metro Mall Road, Gurugram',ARRAY['MRI','CT','PET-CT']::text[]),
('gurgaon','Future CT Scan Centre','future-ct-scan-centre-pataudi-road','Pataudi Road','Near Kamla Hospital, Main Pataudi Road, Gurugram',ARRAY['CT']::text[]),
('gurgaon','Sanar Care Diagnostic Centre','sanar-care-diagnostic-centre-gurugram','Gurugram','F-221 UGF, Gurugram',ARRAY['MRI','CT']::text[]),
('gurgaon','The Scan Centre','the-scan-centre-circular-road','Circular Road','P-11 Circular Road, Gurugram',ARRAY['MRI','CT']::text[]),
('gurgaon','The MRI Scan Centre','the-mri-scan-centre-golf-course-road','Golf Course Road','Golf Course Road, Gurugram',ARRAY['MRI']::text[]),
('faridabad','Regional Diagnostic Centre','regional-diagnostic-centre-bk-civil-hospital','BK Civil Hospital','Badshah Khan Civil Hospital, Faridabad',ARRAY['MRI','CT']::text[]),
('faridabad','Swanya Imaging Centre','swanya-imaging-centre-sector-16','Sector 16','SCO 97 Inner Road, Near Om Sweets Restaurant, Sector 16, Faridabad',ARRAY['MRI','CT']::text[]),
('faridabad','Aarthi Scans & Labs','aarthi-scans-labs-railway-road','Railway Road','Plot No. 5C-8A Railway Road, Faridabad',ARRAY['MRI','CT']::text[]),
('faridabad','Focus Diagnostics','focus-diagnostics-bk-chowk','BK Chowk','G-5 Rama Palace, BK Chowk, Faridabad',ARRAY['MRI','CT']::text[]),
('faridabad','Advanced NCR Diagnostics','advanced-ncr-diagnostics-bk-chowk','BK Chowk','21BP 5E Near BK Chowk, Faridabad',ARRAY['MRI','CT']::text[]),
('faridabad','Faridabad Diagnostic Centre','faridabad-diagnostic-centre-faridabad','Faridabad','Clinic 1 Road, Opposite Hanuman Mandir, Faridabad',ARRAY['MRI','CT']::text[]),
('faridabad','Raj MRI Centre & PET CT Center','raj-mri-centre-pet-ct-center-faridabad','Faridabad','Clinic Site No. 8, Faridabad',ARRAY['MRI','PET-CT']::text[]),
('ghaziabad','Molecular Imaging & Therapy','molecular-imaging-therapy-sanjay-nagar','Sanjay Nagar','Plot 14-15 Sector 23, Sanjay Nagar, Behind Vardhman Hospital, Ghaziabad 201002',ARRAY['MRI','CT','PET-CT']::text[]),
('ghaziabad','Dr Piyush MRI & Diagnostic Centre','dr-piyush-mri-diagnostic-centre-niti-khand-ii-indirapuram','Niti Khand II Indirapuram','Ground Floor Plot 237, Near Peepal Chowk, Niti Khand II, Indirapuram, Ghaziabad',ARRAY['MRI','CT','PET-CT']::text[]),
('ghaziabad','MRI Scan Centre Ghaziabad','mri-scan-centre-ghaziabad-vasundhara','Vasundhara','31C Ground Floor VMB Tower, Sector 13, Vasundhara, Ghaziabad',ARRAY['MRI','CT','PET-CT']::text[]),
('ghaziabad','Krishna Diagnostics & CT MRI Center','krishna-diagnostics-ct-mri-center-indirapuram','Indirapuram','385 Near D Mall, Indirapuram, Ghaziabad',ARRAY['MRI','CT']::text[]),
('ghaziabad','Smart CT Scan Centre','smart-ct-scan-centre-patel-marg','Patel Marg','96 Patel Marg, Ghaziabad',ARRAY['CT']::text[]),
('ghaziabad','Krsnaa Diagnostic','krsnaa-diagnostic-combined-hospital','Combined Hospital','District Combined Hospital, Ghaziabad',ARRAY['CT']::text[]),
('ghaziabad','APNA Health Advisor Molecular Imaging','apna-health-advisor-molecular-imaging-ghaziabad','Ghaziabad','Duplex Flats Plot No. 20, Ghaziabad',ARRAY['MRI','CT','PET-CT']::text[]),
('greater-noida','HealthiIndia','healthiindia-greater-noida-west','Greater Noida West','Greater Noida West Road, Greater Noida',ARRAY['MRI','CT','PET-CT']::text[]),
('greater-noida','Meenakshi CT Scan Centre','meenakshi-ct-scan-centre-greater-noida','Greater Noida','Plot Nos. 2 to 5, Greater Noida',ARRAY['CT','PET-CT']::text[]),
('noida','Izen Imaging & Interventions','izen-imaging-interventions-noida','Noida','Plot Nos. 3 and 4, Noida',ARRAY['MRI','CT']::text[]),
('noida','Classic Diagnostics','classic-diagnostics-noida-sector-39','Noida Sector 39','E-1B Sector 39 Main Road, Near Ryan International School, Noida',ARRAY['MRI','CT']::text[]),
('noida','Noida MRI & Diagnostic Centre','noida-mri-diagnostic-centre-noida-sector-39','Noida Sector 39','Shop No. 1 39 B Block Road, Sector 39, Noida',ARRAY['MRI','CT']::text[]),
('noida','VR Diagnostics Centre for Advanced Clinical Imaging','vr-diagnostics-centre-for-advanced-clinical-imaging-noida','Noida','HA-111, Noida',ARRAY['MRI','CT']::text[])
) AS c(location_slug,name,slug,locality,address,services)
JOIN public.locations l ON l.slug=c.location_slug
ON CONFLICT (slug) DO UPDATE SET location_id=EXCLUDED.location_id,name=EXCLUDED.name,locality=EXCLUDED.locality,address=EXCLUDED.address,overview=EXCLUDED.overview,equipment=EXCLUDED.equipment,services=EXCLUDED.services,timings=EXCLUDED.timings,accreditations=EXCLUDED.accreditations,cashless_support=EXCLUDED.cashless_support,open_24x7=EXCLUDED.open_24x7,report_turnaround=EXCLUDED.report_turnaround,wheelchair_access=EXCLUDED.wheelchair_access,is_demo=EXCLUDED.is_demo,published=EXCLUDED.published;

INSERT INTO public.centre_modalities (centre_id, modality_id, available)
SELECT DISTINCT c.id,m.id,true
FROM public.centres c
JOIN public.modalities m ON ((m.slug='mri-scan' AND ('MRI'=ANY(c.services) OR 'Open MRI'=ANY(c.services))) OR (m.slug='ct-scan' AND 'CT'=ANY(c.services)) OR (m.slug='pet-ct-scan' AND EXISTS (SELECT 1 FROM unnest(c.services) s WHERE s ILIKE '%PET%')))
WHERE c.slug IN ('mahajan-imaging-defence-colony','mahajan-imaging-dwarka','mahajan-imaging-sda','mahajan-imaging-pusa-road','mahajan-imaging-bali-nagar','mahajan-imaging-hauz-khas','orbit-imaging-pathlab-karol-bagh','orbit-imaging-pathlab-rohini','orbit-imaging-pathlab-green-park','orbit-imaging-pathlab-dwarka','orbit-imaging-pathlab-paschim-vihar','orbit-imaging-pathlab-dilshad-garden','ganesh-diagnostic-imaging-centre-rohini','neurad-diagnostic-healthcare-paschim-vihar','molecular-diagnostics-therapy-green-park-extension','molecular-diagnostics-therapy-paschim-vihar','nm-pet-ct-imaging-greater-kailash','mri-ct-diagnostic-center-pathology-lab-amritpuri','delhi-pet-ct-scan-eve-delhi','pet-ct-scan-providers-delhi','sanar-care-diagnostic-centre-sector-15','ggn-diagnostic-care-badshahpur-sohna-road','sanar-care-diagnostic-centre-sushant-lok','dr-mri-center-gurgaon-sohna-road','sanar-care-diagnostic-centre-sector-14','sanar-care-diagnostics-imaging-sector-55','future-ct-scan-centre-pataudi-road','sanar-care-diagnostic-centre-gurugram','the-scan-centre-circular-road','the-mri-scan-centre-golf-course-road','regional-diagnostic-centre-bk-civil-hospital','swanya-imaging-centre-sector-16','aarthi-scans-labs-railway-road','focus-diagnostics-bk-chowk','advanced-ncr-diagnostics-bk-chowk','faridabad-diagnostic-centre-faridabad','raj-mri-centre-pet-ct-center-faridabad','molecular-imaging-therapy-sanjay-nagar','dr-piyush-mri-diagnostic-centre-niti-khand-ii-indirapuram','mri-scan-centre-ghaziabad-vasundhara','krishna-diagnostics-ct-mri-center-indirapuram','smart-ct-scan-centre-patel-marg','krsnaa-diagnostic-combined-hospital','apna-health-advisor-molecular-imaging-ghaziabad','healthiindia-greater-noida-west','meenakshi-ct-scan-centre-greater-noida','izen-imaging-interventions-noida','classic-diagnostics-noida-sector-39','noida-mri-diagnostic-centre-noida-sector-39','vr-diagnostics-centre-for-advanced-clinical-imaging-noida')
ON CONFLICT (centre_id,modality_id,scan_type_id) DO NOTHING;