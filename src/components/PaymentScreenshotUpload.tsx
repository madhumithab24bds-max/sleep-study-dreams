import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, CheckCircle2, Loader2, X, ImagePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PaymentScreenshotUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error("Please sign in first");
        setUploading(false);
        return;
      }

      const userId = session.user.id;
      const ext = file.name.split(".").pop();
      const filePath = `${userId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Log to payment_logs
      await supabase.from("payment_logs").insert({
        user_id: userId,
        amount: 50,
        upi_id: "madhukrr2006@oksbi",
        plan: "Basic Monthly",
        status: "screenshot_uploaded",
        screenshot_url: filePath,
      });

      setUploaded(true);
      toast.success("Screenshot uploaded! We'll verify your payment shortly.");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setUploaded(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="mt-6 glass-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Camera size={18} className="text-primary" />
        <h3 className="font-display font-bold text-sm text-foreground">
          Upload Payment Screenshot
        </h3>
      </div>
      <p className="text-xs text-muted-foreground">
        After paying via UPI, upload a screenshot to activate your subscription.
      </p>

      {/* Gallery / file picker */}
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
      {/* Camera capture */}
      <input
        ref={(el) => { (window as any).__camRef = el; }}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <img
              src={preview}
              alt="Payment screenshot"
              className="w-full rounded-xl border border-border max-h-60 object-contain bg-black/20"
            />
            {!uploaded && !uploading && (
              <button
                onClick={clearPreview}
                className="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
                <Loader2 size={28} className="animate-spin text-primary" />
              </div>
            )}
            {uploaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 rounded-xl gap-2">
                <CheckCircle2 size={32} className="text-green-500" />
                <span className="text-xs font-display font-semibold text-green-400">
                  Uploaded Successfully
                </span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="upload-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => fileRef.current?.click()}
            className="w-full flex flex-col items-center gap-3 py-6 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <Upload size={24} className="text-primary" />
            <span className="text-xs font-display font-semibold text-muted-foreground">
              Tap to upload screenshot
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentScreenshotUpload;
