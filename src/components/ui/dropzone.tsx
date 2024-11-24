"use client";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
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
        <input {...getInputProps()} />
        <Inbox className="w-10 h-10 text-violet-500" />
        <p className="mt-2 text-sm text-gray-300">
          {isDragActive ? (
            <span>Yes, Drop It!</span>
          ) : (
            <span>Drop PDF Here</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Dropzone;
