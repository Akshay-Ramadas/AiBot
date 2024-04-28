require('dotenv').config();
var express = require('express');

var router = express.Router();

/* GET users listing. */
router.post('/chat', async function(req, res, next) {
  const {history} = req.body;
  const question = req.body.message
  

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const message = question
  const MODEL_NAME = "gemini-1.5-pro-latest";
  //console.log(process.env.API_KEY);
  const API_KEY = "AIzaSyCwlfEoiIlcRKWQwJ1EfCU0-Ja-qp5jR50"//process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };


    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];


    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: history
    });

    const result = await chat.sendMessage(message);
    const response = await result.response.text();
    console.log(response);
    res.send(response)
  }

  
  //res.send(finalresponse)
);

module.exports = router;
