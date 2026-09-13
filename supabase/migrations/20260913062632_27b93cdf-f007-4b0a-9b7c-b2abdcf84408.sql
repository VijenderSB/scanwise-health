UPDATE public.nuclear_medicine_therapies
SET published = false,
    updated_at = now()
WHERE clinical_reviewer IS NULL
   OR clinical_reviewed_at IS NULL;