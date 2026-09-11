CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
CREATE TYPE public.enquiry_status AS ENUM ('New Enquiry', 'Contacted', 'Appointment Requested', 'Booked', 'Closed');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.modalities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL,
  icon text NOT NULL DEFAULT 'scan',
  published boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.modalities TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.modalities TO authenticated;
GRANT ALL ON public.modalities TO service_role;
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published modalities are public" ON public.modalities FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage modalities" ON public.modalities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER modalities_updated BEFORE UPDATE ON public.modalities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.scan_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  modality_id uuid NOT NULL REFERENCES public.modalities(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  short_description text NOT NULL,
  what_it_is text NOT NULL DEFAULT '',
  common_uses text[] NOT NULL DEFAULT '{}',
  evaluates text[] NOT NULL DEFAULT '{}',
  preparation text NOT NULL DEFAULT '',
  contrast_tracer text NOT NULL DEFAULT '',
  safety text NOT NULL DEFAULT '',
  typical_duration text NOT NULL DEFAULT 'Varies by protocol',
  report_turnaround text NOT NULL DEFAULT 'Confirm with the selected centre',
  price_min_inr integer,
  price_max_inr integer,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (modality_id, slug),
  CHECK (price_min_inr IS NULL OR price_min_inr >= 0),
  CHECK (price_max_inr IS NULL OR price_max_inr >= price_min_inr)
);
GRANT SELECT ON public.scan_types TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.scan_types TO authenticated;
GRANT ALL ON public.scan_types TO service_role;
ALTER TABLE public.scan_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published scans are public" ON public.scan_types FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage scans" ON public.scan_types FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER scan_types_updated BEFORE UPDATE ON public.scan_types FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  slug text NOT NULL UNIQUE,
  region text NOT NULL DEFAULT 'Delhi NCR',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.locations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.locations TO authenticated;
GRANT ALL ON public.locations TO service_role;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published locations are public" ON public.locations FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage locations" ON public.locations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER locations_updated BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.centres (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid NOT NULL REFERENCES public.locations(id),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  locality text NOT NULL,
  address text NOT NULL,
  overview text NOT NULL,
  equipment text[] NOT NULL DEFAULT '{}',
  services text[] NOT NULL DEFAULT '{}',
  timings text NOT NULL,
  accreditations text[] NOT NULL DEFAULT '{}',
  cashless_support boolean NOT NULL DEFAULT false,
  open_24x7 boolean NOT NULL DEFAULT false,
  report_turnaround text NOT NULL DEFAULT 'Confirm with centre',
  wheelchair_access boolean NOT NULL DEFAULT false,
  is_demo boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.centres TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.centres TO authenticated;
GRANT ALL ON public.centres TO service_role;
ALTER TABLE public.centres ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published centres are public" ON public.centres FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage centres" ON public.centres FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER centres_updated BEFORE UPDATE ON public.centres FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.centre_modalities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id uuid NOT NULL REFERENCES public.centres(id) ON DELETE CASCADE,
  modality_id uuid NOT NULL REFERENCES public.modalities(id) ON DELETE CASCADE,
  scan_type_id uuid REFERENCES public.scan_types(id) ON DELETE CASCADE,
  available boolean NOT NULL DEFAULT true,
  indicative_price_inr integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (centre_id, modality_id, scan_type_id)
);
GRANT SELECT ON public.centre_modalities TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.centre_modalities TO authenticated;
GRANT ALL ON public.centre_modalities TO service_role;
ALTER TABLE public.centre_modalities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Centre availability is public" ON public.centre_modalities FOR SELECT TO anon, authenticated USING (available OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage centre availability" ON public.centre_modalities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL,
  body text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.conditions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.conditions TO authenticated;
GRANT ALL ON public.conditions TO service_role;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published conditions are public" ON public.conditions FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage conditions" ON public.conditions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER conditions_updated BEFORE UPDATE ON public.conditions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  guide_type text NOT NULL CHECK (guide_type IN ('cost', 'preparation', 'condition', 'comparison', 'safety')),
  summary text NOT NULL,
  body text NOT NULL,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.guides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.guides TO authenticated;
GRANT ALL ON public.guides TO service_role;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published guides are public" ON public.guides FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage guides" ON public.guides FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER guides_updated BEFORE UPDATE ON public.guides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text NOT NULL UNIQUE,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  mobile text NOT NULL CHECK (char_length(mobile) BETWEEN 10 AND 16),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  city text NOT NULL CHECK (char_length(city) <= 100),
  preferred_locality text CHECK (preferred_locality IS NULL OR char_length(preferred_locality) <= 150),
  scan_type text NOT NULL CHECK (char_length(scan_type) <= 200),
  preferred_date date,
  notes text CHECK (notes IS NULL OR char_length(notes) <= 2000),
  consent_given boolean NOT NULL CHECK (consent_given = true),
  source_path text NOT NULL DEFAULT '/',
  status public.enquiry_status NOT NULL DEFAULT 'New Enquiry',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER enquiries_updated BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.enquiry_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  file_name text NOT NULL,
  mime_type text NOT NULL,
  size_bytes integer NOT NULL CHECK (size_bytes > 0 AND size_bytes <= 10485760),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.enquiry_uploads TO authenticated;
GRANT ALL ON public.enquiry_uploads TO service_role;
ALTER TABLE public.enquiry_uploads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view upload records" ON public.enquiry_uploads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete upload records" ON public.enquiry_uploads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.modalities (name, slug, summary, icon, display_order) VALUES
('MRI Scan','mri-scan','Detailed imaging using a strong magnetic field and radio waves; it does not use ionising radiation.','magnet',1),
('CT Scan','ct-scan','Fast cross-sectional imaging that uses X-rays and may include contrast depending on the protocol.','scan-line',2),
('Dual Energy / GSI Spectral CT','spectral-ct','Advanced CT techniques that separate material information and can support selected diagnostic protocols.','layers',3),
('PET-CT Scan','pet-ct-scan','Functional and anatomical imaging using a radiotracer, commonly used in specialist-led oncology and other pathways.','atom',4),
('PET-MRI Scan','pet-mri-scan','Combined molecular imaging and MRI available for selected specialist-led indications.','orbit',5),
('Gamma Camera / SPECT / SPECT-CT','gamma-camera-spect','Nuclear medicine imaging that evaluates organ function using a prescribed radiotracer.','activity',6),
('Ultrasound / Sonography','ultrasound','Real-time imaging using sound waves for abdominal, pregnancy, vascular and other examinations.','waves',7),
('X-Ray / Fluoroscopy','x-ray-fluoroscopy','Radiographic and real-time X-ray examinations for bones, chest and selected contrast studies.','bone',8),
('DEXA Scan','dexa-scan','Low-dose X-ray assessment used for bone mineral density and selected body-composition evaluations.','chart',9),
('Mammography / Breast Imaging','mammography','Specialised breast imaging for screening or diagnostic evaluation under clinical guidance.','heart-pulse',10);

WITH scan_seed(modality_slug,name,slug,featured) AS (VALUES
('mri-scan','Brain MRI','brain-mri',true),('mri-scan','Pituitary MRI','pituitary-mri',false),('mri-scan','Orbit MRI','orbit-mri',false),('mri-scan','Inner Ear/IAC MRI','inner-ear-iac-mri',false),('mri-scan','MR Angiography','mr-angiography',false),('mri-scan','MR Venography','mr-venography',false),('mri-scan','Cervical Spine MRI','cervical-spine-mri',true),('mri-scan','Dorsal Spine MRI','dorsal-spine-mri',false),('mri-scan','Lumbar Spine MRI','lumbar-spine-mri',true),('mri-scan','Whole Spine MRI','whole-spine-mri',false),('mri-scan','Shoulder MRI','shoulder-mri',false),('mri-scan','Elbow MRI','elbow-mri',false),('mri-scan','Wrist MRI','wrist-mri',false),('mri-scan','Hip MRI','hip-mri',false),('mri-scan','Knee MRI','knee-mri',true),('mri-scan','Ankle MRI','ankle-mri',false),('mri-scan','Pelvis MRI','pelvis-mri',false),('mri-scan','Prostate Multiparametric MRI','prostate-multiparametric-mri',true),('mri-scan','Abdomen MRI','abdomen-mri',false),('mri-scan','Liver MRI','liver-mri',false),('mri-scan','MRCP','mrcp',true),('mri-scan','Cardiac MRI','cardiac-mri',false),('mri-scan','Breast MRI','breast-mri',false),('mri-scan','Whole-Body MRI','whole-body-mri',false),('mri-scan','Fetal MRI','fetal-mri',false),
('ct-scan','CT Brain','ct-brain',true),('ct-scan','CT PNS/Sinus','ct-pns-sinus',false),('ct-scan','CT Orbit','ct-orbit',false),('ct-scan','CT Neck','ct-neck',false),('ct-scan','CT Chest','ct-chest',true),('ct-scan','HRCT Chest','hrct-chest',true),('ct-scan','CT Pulmonary Angiography','ct-pulmonary-angiography',false),('ct-scan','CT Coronary Angiography','ct-coronary-angiography',true),('ct-scan','CT Cardiac Calcium Score','ct-cardiac-calcium-score',false),('ct-scan','CT Abdomen','ct-abdomen',false),('ct-scan','CT Abdomen and Pelvis','ct-abdomen-pelvis',true),('ct-scan','CT KUB','ct-kub',false),('ct-scan','CT Urography','ct-urography',false),('ct-scan','CT Enterography','ct-enterography',false),('ct-scan','CT Colonography','ct-colonography',false),('ct-scan','CT Spine','ct-spine',false),('ct-scan','CT Angiography','ct-angiography',false),('ct-scan','Whole-Body Trauma CT','whole-body-trauma-ct',false),
('spectral-ct','Spectral CT Scan','spectral-ct-scan',true),('spectral-ct','Spectral CT Brain','spectral-ct-brain',false),('spectral-ct','Spectral CT Chest','spectral-ct-chest',false),('spectral-ct','Spectral CT Abdomen','spectral-ct-abdomen',false),('spectral-ct','Spectral CT Liver','spectral-ct-liver',false),('spectral-ct','Spectral CT Pancreas','spectral-ct-pancreas',false),('spectral-ct','Spectral CT Kidney Stone Analysis','spectral-ct-kidney-stone-analysis',true),('spectral-ct','Spectral CT for Gout','spectral-ct-gout',false),('spectral-ct','Spectral CT Angiography','spectral-ct-angiography',false),('spectral-ct','Spectral CT Pulmonary Angiography','spectral-ct-pulmonary-angiography',false),('spectral-ct','Spectral CT Coronary Angiography','spectral-ct-coronary-angiography',false),('spectral-ct','Spectral CT for Cancer Staging','spectral-ct-cancer-staging',false),('spectral-ct','Iodine Mapping / Perfusion Imaging','iodine-mapping-perfusion-imaging',false),
('pet-ct-scan','FDG PET-CT','fdg-pet-ct',true),('pet-ct-scan','PSMA PET-CT','psma-pet-ct',true),('pet-ct-scan','DOTANOC PET-CT','dotanoc-pet-ct',true),('pet-ct-scan','DOTATATE PET-CT','dotatate-pet-ct',false),('pet-ct-scan','Ga-68 PET-CT','ga-68-pet-ct',false),('pet-ct-scan','F-18 PET-CT','f-18-pet-ct',false),('pet-ct-scan','NaF Bone PET-CT','naf-bone-pet-ct',false),('pet-ct-scan','Amyloid PET-CT','amyloid-pet-ct',false),('pet-ct-scan','Brain PET-CT','brain-pet-ct',false),('pet-ct-scan','Cardiac PET-CT','cardiac-pet-ct',false),('pet-ct-scan','Whole-Body PET-CT','whole-body-pet-ct',true),('pet-ct-scan','PET-CT for Cancer Staging','pet-ct-cancer-staging',false),('pet-ct-scan','PET-CT for Treatment Response','pet-ct-treatment-response',false),('pet-ct-scan','PET-CT for Cancer Recurrence','pet-ct-cancer-recurrence',false),
('pet-mri-scan','Whole-Body PET-MRI','whole-body-pet-mri',true),('pet-mri-scan','Brain PET-MRI','brain-pet-mri',false),('pet-mri-scan','PSMA PET-MRI','psma-pet-mri',true),('pet-mri-scan','Pelvic PET-MRI','pelvic-pet-mri',false),('pet-mri-scan','Liver PET-MRI','liver-pet-mri',false),('pet-mri-scan','Head and Neck PET-MRI','head-neck-pet-mri',false),('pet-mri-scan','Breast PET-MRI','breast-pet-mri',false),('pet-mri-scan','Paediatric PET-MRI','paediatric-pet-mri',false),('pet-mri-scan','FDG PET-MRI','fdg-pet-mri',false),('pet-mri-scan','Ga-68 PET-MRI','ga-68-pet-mri',false),('pet-mri-scan','DOTATATE PET-MRI','dotatate-pet-mri',false),
('gamma-camera-spect','Thyroid Scan','thyroid-scan',true),('gamma-camera-spect','Thyroid Uptake Scan','thyroid-uptake-scan',false),('gamma-camera-spect','Bone Scan','bone-scan',true),('gamma-camera-spect','Three-Phase Bone Scan','three-phase-bone-scan',false),('gamma-camera-spect','DTPA Renal Scan','dtpa-renal-scan',true),('gamma-camera-spect','MAG3 Renogram','mag3-renogram',false),('gamma-camera-spect','DMSA Scan','dmsa-scan',false),('gamma-camera-spect','HIDA Scan','hida-scan',true),('gamma-camera-spect','Lung Perfusion Scan','lung-perfusion-scan',false),('gamma-camera-spect','VQ Scan','vq-scan',false),('gamma-camera-spect','Myocardial Perfusion Scan','myocardial-perfusion-scan',true),('gamma-camera-spect','MUGA Scan','muga-scan',false),('gamma-camera-spect','Parathyroid Scan','parathyroid-scan',false),('gamma-camera-spect','Meckel’s Scan','meckels-scan',false),('gamma-camera-spect','GI Bleeding Scan','gi-bleeding-scan',false),('gamma-camera-spect','Lymphoscintigraphy','lymphoscintigraphy',false),('gamma-camera-spect','Sentinel Lymph Node Scan','sentinel-lymph-node-scan',false),('gamma-camera-spect','SPECT Scan','spect-scan',false),('gamma-camera-spect','SPECT-CT Scan','spect-ct-scan',true),
('ultrasound','Whole Abdomen Ultrasound','whole-abdomen-ultrasound',true),('ultrasound','Abdomen and Pelvis Ultrasound','abdomen-pelvis-ultrasound',true),('ultrasound','KUB Ultrasound','kub-ultrasound',false),('ultrasound','Pelvic Ultrasound','pelvic-ultrasound',false),('ultrasound','Prostate Ultrasound','prostate-ultrasound',false),('ultrasound','TRUS','trus',false),('ultrasound','Scrotal Ultrasound','scrotal-ultrasound',false),('ultrasound','Pregnancy Ultrasound','pregnancy-ultrasound',true),('ultrasound','NT Scan','nt-scan',false),('ultrasound','Anomaly Scan','anomaly-scan',true),('ultrasound','Growth Scan','growth-scan',false),('ultrasound','Fetal Doppler','fetal-doppler',false),('ultrasound','Transvaginal Ultrasound','transvaginal-ultrasound',false),('ultrasound','Follicular Monitoring','follicular-monitoring',false),('ultrasound','Breast Ultrasound','breast-ultrasound',false),('ultrasound','Thyroid Ultrasound','thyroid-ultrasound',false),('ultrasound','Neck Ultrasound','neck-ultrasound',false),('ultrasound','Carotid Doppler','carotid-doppler',false),('ultrasound','Venous Doppler','venous-doppler',false),('ultrasound','Arterial Doppler','arterial-doppler',false),('ultrasound','Lower Limb Doppler','lower-limb-doppler',false),('ultrasound','Renal Doppler','renal-doppler',false),('ultrasound','Liver Elastography','liver-elastography',false),
('x-ray-fluoroscopy','Chest X-Ray','chest-x-ray',true),('x-ray-fluoroscopy','X-Ray PNS','x-ray-pns',false),('x-ray-fluoroscopy','X-Ray Cervical Spine','x-ray-cervical-spine',false),('x-ray-fluoroscopy','X-Ray Dorsal Spine','x-ray-dorsal-spine',false),('x-ray-fluoroscopy','X-Ray Lumbar Spine','x-ray-lumbar-spine',false),('x-ray-fluoroscopy','X-Ray Pelvis','x-ray-pelvis',false),('x-ray-fluoroscopy','X-Ray Hip','x-ray-hip',false),('x-ray-fluoroscopy','X-Ray Shoulder','x-ray-shoulder',false),('x-ray-fluoroscopy','X-Ray Knee','x-ray-knee',false),('x-ray-fluoroscopy','X-Ray Ankle','x-ray-ankle',false),('x-ray-fluoroscopy','X-Ray Abdomen','x-ray-abdomen',false),('x-ray-fluoroscopy','X-Ray KUB','x-ray-kub',false),('x-ray-fluoroscopy','Dental X-Ray','dental-x-ray',false),('x-ray-fluoroscopy','OPG','opg',true),('x-ray-fluoroscopy','Fluoroscopy','fluoroscopy',false),('x-ray-fluoroscopy','Barium Swallow','barium-swallow',false),('x-ray-fluoroscopy','Barium Meal','barium-meal',false),('x-ray-fluoroscopy','HSG','hsg',false),
('dexa-scan','Bone Mineral Density Scan','bone-mineral-density-scan',true),('dexa-scan','Spine DEXA','spine-dexa',false),('dexa-scan','Hip DEXA','hip-dexa',false),('dexa-scan','Forearm DEXA','forearm-dexa',false),('dexa-scan','Whole-Body DEXA','whole-body-dexa',false),('dexa-scan','Osteoporosis Screening','osteoporosis-screening',true),('dexa-scan','Body Composition DEXA','body-composition-dexa',false),('dexa-scan','Vertebral Fracture Assessment','vertebral-fracture-assessment',false),
('mammography','Digital Mammography','digital-mammography',true),('mammography','Screening Mammography','screening-mammography',true),('mammography','Diagnostic Mammography','diagnostic-mammography',false),('mammography','2D Mammography','2d-mammography',false),('mammography','3D Mammography / Tomosynthesis','3d-mammography-tomosynthesis',true),('mammography','Contrast-Enhanced Mammography','contrast-enhanced-mammography',false),('mammography','Mammography with Breast Ultrasound','mammography-breast-ultrasound',false),('mammography','Stereotactic Breast Biopsy','stereotactic-breast-biopsy',false)
)
INSERT INTO public.scan_types (modality_id,name,slug,short_description,what_it_is,common_uses,evaluates,preparation,contrast_tracer,safety,typical_duration,report_turnaround,price_min_inr,price_max_inr,featured,faqs)
SELECT m.id,s.name,s.slug,
  'A patient-friendly overview of ' || s.name || ', including preparation, safety and appointment support.',
  s.name || ' is an imaging examination performed according to a doctor-advised protocol. The exact technique varies with the clinical question and centre equipment.',
  ARRAY['Assessment requested by a treating doctor','Clarifying findings from clinical examination or earlier tests'],
  ARRAY['The body area named in the prescription','Findings relevant to the clinical question'],
  'Preparation varies by protocol. Carry your prescription and prior reports, and confirm fasting, medication and clothing instructions with the centre.',
  CASE WHEN m.slug IN ('pet-ct-scan','pet-mri-scan','gamma-camera-spect') THEN 'A prescribed radiotracer may be used. The centre will confirm tracer-specific preparation and timing.' WHEN m.slug IN ('ct-scan','spectral-ct','mri-scan') THEN 'Contrast may be advised for selected protocols after appropriate safety screening.' ELSE 'Usually not applicable; confirm the exact protocol with the centre.' END,
  'Tell the centre about pregnancy, breastfeeding, allergies, kidney concerns, implants and relevant medical history. Always consult your treating doctor.',
  CASE WHEN m.slug IN ('pet-ct-scan','pet-mri-scan','gamma-camera-spect') THEN 'Allow approximately 2–4 hours including preparation; scan time varies.' WHEN m.slug='mri-scan' THEN 'Usually 20–60 minutes, depending on protocol.' WHEN m.slug IN ('ct-scan','spectral-ct') THEN 'Often 10–30 minutes including preparation.' ELSE 'Usually 15–45 minutes, depending on the examination.' END,
  'Often same day or within 24–48 hours; confirm with the selected centre.',
  CASE WHEN m.slug IN ('pet-ct-scan','pet-mri-scan') THEN 18000 WHEN m.slug='mri-scan' THEN 3500 WHEN m.slug IN ('ct-scan','spectral-ct') THEN 2000 WHEN m.slug='gamma-camera-spect' THEN 3500 WHEN m.slug='ultrasound' THEN 800 WHEN m.slug='x-ray-fluoroscopy' THEN 400 WHEN m.slug='dexa-scan' THEN 1200 ELSE 1200 END,
  CASE WHEN m.slug IN ('pet-ct-scan','pet-mri-scan') THEN 35000 WHEN m.slug='mri-scan' THEN 12000 WHEN m.slug IN ('ct-scan','spectral-ct') THEN 15000 WHEN m.slug='gamma-camera-spect' THEN 12000 WHEN m.slug='ultrasound' THEN 4000 WHEN m.slug='x-ray-fluoroscopy' THEN 5000 WHEN m.slug='dexa-scan' THEN 3500 ELSE 6000 END,
  s.featured,
  jsonb_build_array(jsonb_build_object('question','Do I need a prescription?','answer','A doctor’s prescription is commonly required and helps the centre follow the intended protocol.'),jsonb_build_object('question','How should I prepare?','answer','Preparation depends on the exact protocol. The centre should confirm instructions before your visit.'))
FROM scan_seed s JOIN public.modalities m ON m.slug=s.modality_slug;

INSERT INTO public.locations (city,slug) VALUES ('Delhi','delhi'),('Gurgaon','gurgaon'),('Noida','noida'),('Greater Noida','greater-noida'),('Faridabad','faridabad'),('Ghaziabad','ghaziabad');

INSERT INTO public.centres (location_id,name,slug,locality,address,overview,equipment,services,timings,accreditations,cashless_support,open_24x7,report_turnaround,wheelchair_access,is_demo)
SELECT l.id, c.name, c.slug, c.locality, c.address, 'Illustrative diagnostic-centre profile showing how verified partner information will appear.', c.equipment, c.services, c.timings, ARRAY[]::text[], c.cashless, c.open24, c.turnaround, true, true
FROM (VALUES
('delhi','Northstar Imaging Delhi — Demo','northstar-imaging-delhi-demo','South Delhi','Demo address, South Delhi',ARRAY['3T MRI','128-slice CT','Digital X-Ray'],ARRAY['MRI','CT','Ultrasound','X-Ray'],'Mon–Sat, 7:00 am–9:00 pm',true,false,'Most routine reports within 24 hours'),
('gurgaon','Aravali Molecular Imaging — Demo','aravali-molecular-imaging-demo','Sector 44','Demo address, Gurgaon',ARRAY['Digital PET-CT','Gamma Camera / SPECT-CT'],ARRAY['PET-CT','Nuclear Medicine','CT'],'Mon–Sat, 8:00 am–8:00 pm',true,false,'PET reports typically within 24–48 hours'),
('noida','Yamuna Advanced Diagnostics — Demo','yamuna-advanced-diagnostics-demo','Sector 62','Demo address, Noida',ARRAY['1.5T MRI','Spectral CT','3D Mammography'],ARRAY['MRI','Spectral CT','Mammography','Ultrasound'],'Open daily, 7:00 am–10:00 pm',false,true,'Routine reports often same day'),
('greater-noida','NCR Scan Point Greater Noida — Demo','ncr-scan-point-greater-noida-demo','Pari Chowk','Demo address, Greater Noida',ARRAY['1.5T MRI','64-slice CT'],ARRAY['MRI','CT','DEXA','X-Ray'],'Mon–Sun, 8:00 am–8:00 pm',true,false,'Most routine reports within 24 hours'),
('faridabad','Crown Breast & Imaging Centre — Demo','crown-breast-imaging-demo','Sector 16','Demo address, Faridabad',ARRAY['3D Tomosynthesis','Ultrasound','DEXA'],ARRAY['Mammography','Breast Ultrasound','DEXA'],'Mon–Sat, 8:00 am–7:00 pm',false,false,'Most routine reports within 24 hours'),
('ghaziabad','Hindon Diagnostic Imaging — Demo','hindon-diagnostic-imaging-demo','Indirapuram','Demo address, Ghaziabad',ARRAY['3T MRI','128-slice CT'],ARRAY['MRI','CT','Ultrasound','X-Ray'],'Open daily, 7:00 am–11:00 pm',true,true,'Routine reports often same day')
) AS c(location_slug,name,slug,locality,address,equipment,services,timings,cashless,open24,turnaround)
JOIN public.locations l ON l.slug=c.location_slug;

INSERT INTO public.conditions (name,slug,summary,body) VALUES
('Prostate Cancer Imaging','prostate-cancer-imaging','A guide to specialist-led imaging options used across prostate cancer care.','Imaging choices depend on disease stage, previous treatment, pathology and the clinical question. PSMA PET-CT and prostate MRI may be considered in selected pathways. Final diagnosis and treatment decisions require specialist review.'),
('Breast Cancer Imaging','breast-cancer-imaging','How mammography, ultrasound, MRI and other tests may fit into a specialist-led breast assessment.','Breast imaging is selected according to age, symptoms, screening history and clinical findings. Imaging alone may not establish a final diagnosis; pathology and specialist correlation may be required.'),
('Lung Cancer Imaging','lung-cancer-imaging','An overview of CT, PET-CT and image-guided evaluation in lung cancer pathways.','CT and PET-CT may support characterisation, staging, treatment planning or response assessment under specialist guidance. Final diagnosis requires correlation with clinical and pathology information.'),
('Back Pain Scan Guide','back-pain-scan-guide','Patient-friendly context on when doctors may discuss X-ray, CT or MRI for back symptoms.','The appropriate scan depends on symptoms, examination, duration and red flags. Imaging is not always required. Always consult your treating doctor.'),
('Knee Pain Scan Guide','knee-pain-scan-guide','How X-ray, MRI and ultrasound may answer different questions in knee assessment.','A treating clinician selects imaging based on injury mechanism, examination and suspected tissue involved. This guide does not recommend a test for an individual.'),
('Osteoporosis Test Guide','osteoporosis-test-guide','An introduction to DEXA and bone-density assessment.','DEXA may be used to evaluate bone mineral density and fracture risk in appropriate patients. Interpretation belongs with a qualified clinician.'),
('Pregnancy Scan Guide','pregnancy-scan-guide','General information about doctor-advised ultrasound examinations during pregnancy.','Pregnancy ultrasound timing and type are determined by the treating obstetric team. The platform does not provide fetal diagnosis and does not support sex determination.');

INSERT INTO public.guides (title,slug,guide_type,summary,body,faqs) VALUES
('MRI versus CT Scan','mri-versus-ct-scan','comparison','A practical comparison of how MRI and CT create images and why a doctor may choose one.','MRI uses magnetic fields and radio waves, while CT uses X-rays. Their strengths, timing, preparation and suitability differ by body area and clinical question. Neither is universally better. Always consult your treating doctor.','[]'),
('PET-CT versus PET-MRI','pet-ct-versus-pet-mri','comparison','How two hybrid molecular-imaging approaches differ.','Both combine functional tracer imaging with anatomical information. Availability, radiation exposure, scan duration and clinical use differ. Selection requires specialist guidance.','[]'),
('1.5T MRI versus 3T MRI','1-5t-mri-versus-3t-mri','comparison','What MRI field strength means and why protocol quality matters.','Field strength is one part of image quality. The appropriate scanner depends on the examination, protocol, coils, expertise, implants and patient factors; higher field strength is not automatically better for every person.','[]'),
('PET-CT Cost in Delhi NCR','pet-ct-cost-delhi-ncr','cost','Understand the factors that shape an indicative PET-CT price.','Tracer type, body coverage, protocol, reporting expertise and centre facilities influence cost. Prices shown are indicative and must be confirmed before booking.','[]'),
('MRI Scan Cost in Delhi','mri-scan-cost-delhi','cost','Indicative MRI cost factors across Delhi.','Body part, contrast use, field strength, specialised sequences and reporting affect the final amount. Always confirm the prescribed protocol and total price with the centre.','[]'),
('CT Scan Cost in Delhi NCR','ct-scan-cost-delhi-ncr','cost','Indicative CT cost factors across Delhi NCR.','Body area, contrast, angiography, cardiac protocols and scanner technology can affect price. Figures are not quotations.','[]'),
('How to Prepare for MRI','how-to-prepare-for-mri','preparation','General preparation questions to confirm before an MRI appointment.','Carry your prescription and prior reports. Tell the centre about implants, devices, metal exposure, pregnancy, claustrophobia and kidney concerns. Remove metal items as directed. Fasting and contrast instructions vary by protocol.','[]'),
('PET-CT Fasting Instructions','pet-ct-fasting-instructions','preparation','General context on fasting and scheduling for PET-CT.','Tracer-specific preparation can include fasting, hydration, blood glucose review and avoiding strenuous exercise. Follow only the instructions issued for your prescribed tracer and centre.','[]'),
('Radiation Safety in CT, PET-CT and X-Ray','radiation-safety-ct-pet-ct-x-ray','safety','Plain-language context on ionising-radiation imaging.','These examinations use ionising radiation. Appropriateness, protocol and dose optimisation are clinical responsibilities of the referring doctor and imaging centre. Tell them about pregnancy or possible pregnancy.','[]');