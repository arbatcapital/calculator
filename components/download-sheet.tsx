"use client";

import { exportToExcel } from "@/lib/actions";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DownloadSheet() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await exportToExcel();

      if (!res.success) {
        toast({
          title: res.message,
          variant: "destructive",
        });
      }

      if (res.fileUrl) window.location.href = res.fileUrl;
    } catch (error) {
      console.log("Failed to download the file.", error);
    }
    setLoading(false);
  };

  return (
    <Button type="button" onClick={handleDownload} disabled={loading}>
      {loading ? "Downloading..." : "Download Applications"}
    </Button>
  );
}
