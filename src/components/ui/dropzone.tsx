"use client";
import { useToast } from "@/hooks/use-toast";
import { UploadFile } from "@/lib/config/storage";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await fetch("/api/create-chat", {
        method: "POST",
        body: JSON.stringify({ file_key, file_name }),
      });
      return await response.json();
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      // console.log(acceptedFiles);
      const file = acceptedFiles[0];

      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10mb",
          variant: "destructive",
        });
        return;
      }

      try {
        setUploading(true);
        const data = await UploadFile(file, setProgress);
        if (!data?.file_key || !data.file_name) {
          toast({
            title: "Error",
            description: "Error uploading file",
            variant: "destructive",
          });
          return;
        }

        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast({
              title: "Success",
              description: "chat created!",
            });
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast({
              title: "Error",
              description: err.message,
              variant: "destructive",
            });
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-transparent rounded-xl">
      <div
        {...getRootProps({
          className:
            "flex flex-col items-center justify-center w-full max-w-5xl bg-default-50 h-48 rounded-3xl shadow-sm drop-shadow-xl bg-transparent/10 border-2 border-white/30 border-dashed cursor-pointer",
        })}
      >
        <input {...getInputProps()} disabled={uploading || isPending} />
        {uploading || isPending ? (
          <>
            <div className="relative">
              <Loader2 className="size-12 text-violet-500 animate-spin" />
              <span className="absolute inset-2 flex items-center justify-center text-gray-300 text-xs">
                {progress}%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-300">Uploading...</p>
          </>
        ) : (
          <>
            <Inbox className="size-12 text-violet-500" />
            <p className="mt-2 text-sm text-gray-300">
              {isDragActive ? (
                <span>Yes, Drop It!</span>
              ) : (
                <span>Drop PDF Here</span>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
