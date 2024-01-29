// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs/promises'
type Data = 
  | { name: string }
  | { error: string }
  | { findUser: any };
;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await fs.readFile("data/users.json","utf-8");
  const dataJson = JSON.parse(data)
  const findUser =  dataJson.user.find(user => user.email === "admin@email.com" && user.password === "1234");
  console.log(dataJson)
  if(findUser){
    res.status(200).json({ findUser });
  }
  else{
    res.status(200).json({error:"invaild credentials"});
  }
 
}
