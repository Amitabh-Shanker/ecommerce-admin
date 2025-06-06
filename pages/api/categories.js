import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req; 

  await mongooseConnect();
  await isAdminRequest(req,res);


  if (method === 'GET') {
    const categories = await Category.find().populate('parent'); // Populate parent category details
    res.json(categories);
  }

  if (method === 'POST') {
    try {
      const { name, parentCategory,properties } = req.body;
      const categoryDoc = await Category.create({
        name,
        parent: parentCategory || null, // Assign parent category if provided
        properties,
      });
      res.json(categoryDoc);
    } catch (error) {
      console.error("Category creation error:", error.message);
      res.status(500).json({ error: "Error creating category" });
    }
  }

  if(method=='PUT')
  {
    const {name,parentCategory,properties,_id}=req.body;
    const categoryDoc=await Category.updateOne({_id},{
      name,
      parent:parentCategory||undefined,
      properties,
    });
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.body;
    await Category.deleteOne({ _id });
    res.json({ success: true });
  }
}
