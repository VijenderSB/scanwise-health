CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;

DROP POLICY "Published modalities are public" ON public.modalities;
DROP POLICY "Admins manage modalities" ON public.modalities;
CREATE POLICY "Published modalities are public" ON public.modalities FOR SELECT TO anon, authenticated USING (published OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage modalities" ON public.modalities FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Published scans are public" ON public.scan_types;
DROP POLICY "Admins manage scans" ON public.scan_types;
CREATE POLICY "Published scans are public" ON public.scan_types FOR SELECT TO anon, authenticated USING (published OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage scans" ON public.scan_types FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Published locations are public" ON public.locations;
DROP POLICY "Admins manage locations" ON public.locations;
CREATE POLICY "Published locations are public" ON public.locations FOR SELECT TO anon, authenticated USING (published OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage locations" ON public.locations FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Published centres are public" ON public.centres;
DROP POLICY "Admins manage centres" ON public.centres;
CREATE POLICY "Published centres are public" ON public.centres FOR SELECT TO anon, authenticated USING (published OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage centres" ON public.centres FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Centre availability is public" ON public.centre_modalities;
DROP POLICY "Admins manage centre availability" ON public.centre_modalities;
CREATE POLICY "Centre availability is public" ON public.centre_modalities FOR SELECT TO anon, authenticated USING (available OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage centre availability" ON public.centre_modalities FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Published conditions are public" ON public.conditions;
DROP POLICY "Admins manage conditions" ON public.conditions;
CREATE POLICY "Published conditions are public" ON public.conditions FOR SELECT TO anon, authenticated USING (published OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage conditions" ON public.conditions FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Published guides are public" ON public.guides;
DROP POLICY "Admins manage guides" ON public.guides;
CREATE POLICY "Published guides are public" ON public.guides FOR SELECT TO anon, authenticated USING (published OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage guides" ON public.guides FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins view enquiries" ON public.enquiries;
DROP POLICY "Admins update enquiries" ON public.enquiries;
DROP POLICY "Admins delete enquiries" ON public.enquiries;
CREATE POLICY "Admins view enquiries" ON public.enquiries FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins view upload records" ON public.enquiry_uploads;
DROP POLICY "Admins delete upload records" ON public.enquiry_uploads;
CREATE POLICY "Admins view upload records" ON public.enquiry_uploads FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete upload records" ON public.enquiry_uploads FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
DROP FUNCTION public.has_role(uuid, public.app_role);