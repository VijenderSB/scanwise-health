CREATE POLICY "Staff can view prescription files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'prescriptions'
  AND (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Staff can add prescription files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'prescriptions'
  AND (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Staff can update prescription files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'prescriptions'
  AND (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
)
WITH CHECK (
  bucket_id = 'prescriptions'
  AND (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Staff can delete prescription files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'prescriptions'
  AND (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
);