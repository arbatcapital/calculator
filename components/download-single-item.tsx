"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function DownloadSingleItem({
  docId,
}: {
  docId: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  if (!docId) return;

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/download/excel-single?docId=${docId}`);

      const contentType = res.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        const data = await res.json();
        toast({
          title: data.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = docId + "_application.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      document.body.removeChild(a);
    } catch (error) {
      console.log("Failed to download the file.", error);
    }
    setLoading(false);
  };

  return (
    <>
      <button type="button" onClick={handleDownload} disabled={loading}>
        {loading ? "Downloading..." : "Download"}
      </button>
    </>
  );
}
