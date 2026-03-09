
-- Allow admins to access all payment screenshots (needed for signed URLs)
CREATE POLICY "Admins can access all payment screenshot objects"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'::public.app_role));
