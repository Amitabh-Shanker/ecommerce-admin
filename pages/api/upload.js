// pages/api/upload.js
import ImageKit from "imagekit";
import multiparty from "multiparty";
import fs from "fs";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await mongooseConnect();
  await isAdminRequest(req,res);
  if (req.method !== "POST") return res.status(405).end();

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const links = [];

      for (const file of files.file) {
        const buffer = fs.readFileSync(file.path);

        const result = await imagekit.upload({
          file: buffer,
          fileName: file.originalFilename,
        });

        links.push(result.url);
      }

      res.status(200).json({ links });
    } catch (uploadErr) {
      res.status(500).json({ error: uploadErr.message });
    }
  });
}
