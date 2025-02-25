"use client";
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import { Loader, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MAX_FILE_SIZE } from "@/lib/constants";

interface FileInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

const FileInput = <T extends FieldValues>({
  form,
  name,
  label,
}: FileInputProps<T>) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [filename, setFilename] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const formatFilename = (filename: string) => {
    if (filename.length > 15) {
      const slicedName = filename.slice(0, 15);
      const fileExtension = filename.split(".")[1];
      filename = `(${slicedName}...).${fileExtension}`;
    }
    return filename;
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target?.files?.[0];
    if (!file) return;
    const allowedFiles = ["application/pdf"];
    const isCorrectType = allowedFiles.some(
      (allowedFile) => allowedFile === file.type
    );
    if (!isCorrectType) {
      setFileError("Please upload a pdf file");
      return;
    }
    const size = file.size;
    if (size > MAX_FILE_SIZE) {
      setFileError("Please select a file of size 4m or less");
      return;
    }
    setIsUploading(true);
    const data = new FormData();
    data.set("file", file);
    const uploadRequest = await fetch("/api/files", {
      method: "POST",
      body: data,
    });
    const ipfsUrl = await uploadRequest.json();
    if (ipfsUrl) {
      setFilename(formatFilename(file.name || "file"));
      form.setValue(name, ipfsUrl as PathValue<T, Path<T>>);
    }
    setIsUploading(false);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              className="relative cursor-pointer bg-white min-h-[52px] border-[1px] border-solid border-gray1 flex items-center justify-between px-4 py-2 rounded-md"
              onClick={() => inputRef?.current?.click()}
            >
              <Input
                type="hidden"
                value={field.value}
                onChange={field.onChange}
              />
              <span className="text-muted-foreground">
                {filename ? filename : "Browse and upload"}
              </span>
              <Input
                type="file"
                className="hidden"
                accept=".pdf"
                ref={inputRef}
                onChange={handleOnChange}
              />

              <Button
                type="button"
                className="absolute top-2 right-2"
                disabled={isUploading}
              >
                {isUploading ? <Loader className="animate-spin" /> : <Upload />}
              </Button>
            </div>
          </FormControl>

          <FormMessage />
          {fileError && (
            <div className="text-destructive text-sm">{fileError}</div>
          )}
        </FormItem>
      )}
    />
  );
};
export default FileInput;
