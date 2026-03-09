
-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-screenshots', 'payment-screenshots', false);

-- Allow authenticated users to upload their own screenshots
CREATE POLICY "Users can upload payment screenshots"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'payment-screenshots' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to view their own screenshots
CREATE POLICY "Users can view own payment screenshots"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'payment-screenshots' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow admins to view all screenshots
CREATE POLICY "Admins can view all payment screenshots"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'payment-screenshots' AND has_role(auth.uid(), 'admin'::app_role));

-- Add screenshot_url to payment_logs
ALTER TABLE public.payment_logs ADD COLUMN screenshot_url text DEFAULT '';
