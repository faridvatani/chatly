import { S3 } from "aws-sdk";

const endpoint = process.env.NEXT_PUBLIC_STORAGE_ENDPOINT,
  bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET_NAME,
  accessKeyId = process.env.NEXT_PUBLIC_STORAGE_ACCESS_KEY,
  secretAccessKey = process.env.NEXT_PUBLIC_STORAGE_SECRET_KEY;

export async function UploadFile(file: File) {
  try {
    if (!file) {
      console.log("No file selected");
    }

    if (file.size > 10 * 1024 * 1024) {
      // bigger than 10mb!
      console.log("File too large");
      return;
    }

    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      endpoint,
    });

    const file_key =
      "uploads/" + Date.now().toString() + "-" + file.name.replace(" ", "-");

    const params = {
      Bucket: bucketName!,
      Key: file_key,
      Body: file,
    };

    const response = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading to storage...",
          parseInt(((evt.loaded * 100) / evt.total).toString()) + "%",
        );
      })
      .promise();

    await response.then((data) => {
      console.log("File uploaded successfully.", data);
    });

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });

    // const signedUrl = s3.getSignedUrl("getObject", {
    //   Bucket: bucketName,
    //   Key: file_key,
    //   Expires: 3600,
    // });

    // const permanentSignedUrl = s3.getSignedUrl("getObject", {
    //   Bucket: bucketName,
    //   Key: file_key,
    //   Expires: 31536000, // 1 year
    // });
  } catch (error) {
    console.log("UploadFile fn error", error);
  }
}