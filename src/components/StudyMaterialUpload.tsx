import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image, Loader2, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface StudyMaterialUploadProps {
  onTextExtracted: (text: string) => void;
}

const extractTextFromPDF = async (file: File): Promise<string> => {
  const pdfjsLib = await import("pdfjs-dist");
  
  // Use CDN worker for compatibility
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const textParts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");
    if (pageText.trim()) {
      textParts.push(pageText.trim());
    }
  }
  
  return textParts.join("\n\n");
};

const extractTextFromImage = async (file: File): Promise<string> => {
  const Tesseract = await import("tesseract.js");
  const { data } = await Tesseract.recognize(file, "eng", {
    logger: () => {},
  });
  return data.text;
};

const StudyMaterialUpload = ({ onTextExtracted }: StudyMaterialUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; textLength: number }[]>([]);
  const [processingStatus, setProcessingStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const allText: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const isPDF = file.type === "application/pdf" || file.name.endsWith(".pdf");
        const isImage = file.type.startsWith("image/");

        if (!isPDF && !isImage) {
          toast.error(`${file.name}: Only PDF and image files are supported`);
          continue;
        }

        if (file.size > 20 * 1024 * 1024) {
          toast.error(`${file.name}: File too large (max 20MB)`);
          continue;
        }

        setProcessingStatus(isPDF ? `Reading ${file.name}...` : `Scanning text from ${file.name}...`);

        let text = "";
        if (isPDF) {
          text = await extractTextFromPDF(file);
        } else {
          text = await extractTextFromImage(file);
        }

        if (text.trim()) {
          allText.push(text.trim());
          setUploadedFiles((prev) => [...prev, { name: file.name, textLength: text.trim().length }]);
        } else {
          toast.error(`${file.name}: No text could be extracted`);
        }
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
        toast.error(`Failed to process ${file.name}`);
      }
    }

    if (allText.length > 0) {
      onTextExtracted(allText.join("\n\n"));
      toast.success(`Extracted text from ${allText.length} file(s) ✨`);
    }

    setIsProcessing(false);
    setProcessingStatus("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearFiles = () => {
    setUploadedFiles([]);
    onTextExtracted("");
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-display text-muted-foreground">📄 Upload study materials (PDF / Image)</label>

      {/* Upload area */}
      <div
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
          isProcessing
            ? "border-primary/40 bg-primary/5"
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <Loader2 size={24} className="text-primary animate-spin" />
            <p className="text-xs font-display text-primary">{processingStatus}</p>
          </motion.div>
        ) : (
          <>
            <Upload size={20} className="text-muted-foreground" />
            <div className="text-center">
              <p className="text-xs font-display text-foreground font-medium">
                Tap to upload PDF or Image
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Text will be extracted & converted to sleep audio
              </p>
            </div>
            <div className="flex gap-3 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <FileText size={12} /> PDF
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Image size={12} /> Images
              </span>
            </div>
          </>
        )}
      </div>

      {/* Uploaded files list */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-display">
                {uploadedFiles.length} file(s) loaded
              </span>
              <button
                onClick={clearFiles}
                className="text-[10px] text-destructive hover:underline font-display"
              >
                Clear all
              </button>
            </div>
            {uploadedFiles.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary/10 text-xs"
              >
                <CheckCircle size={12} className="text-primary shrink-0" />
                <span className="font-display text-foreground truncate">{f.name}</span>
                <span className="text-[10px] text-muted-foreground ml-auto shrink-0">
                  {f.textLength > 1000
                    ? `${(f.textLength / 1000).toFixed(1)}k chars`
                    : `${f.textLength} chars`}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyMaterialUpload;
