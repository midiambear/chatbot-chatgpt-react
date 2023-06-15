/**
 * https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
 * この公式のコードが元ネタ
 */

 import type { NextApiRequest, NextApiResponse } from "next";
 const { Configuration, OpenAIApi } = require("openai");
 
 const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
 });
 const openai = new OpenAIApi(configuration);
 
 const call35Turbo = async (chat: string) => {
   const completion = await openai.createChatCompletion({
     model: "gpt-3.5-turbo",
     messages: [{ role: "user", content: chat }],
   });
   const ret_str = completion.data.choices[0].message.content;
   return ret_str;
 };
 
 export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
 ) {
   const chatmsg = req.query.chat as string;
   if (chatmsg.length <= 0) {
     res.status(500).json({ error: "no chat message" });
     return;
   }
   res.status(200).json({ chat: await call35Turbo(chatmsg) });
 }