const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(req, res) {
  res.send("verify token");
}

// function sendWhatsAppMessage(req, res) {
//   const data = JSON.stringify({
//     messaging_product: "whatsapp",
//     to: process.env.RECIPIENT_WAID,
//     //to: recipient,
//     type: "template",
//     template: {
//       //"name": "hello_world",
//       name: "order_received",
//       language: {
//         code: "en_US",
//       },
//     },
//   });

//   const config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,

//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//     },
//     data: data,
//   };

//   return axios
//     .request(config)
//     .then((response) => {
//       console.log("message delivered");
//     })
//     .catch((error) => {
//       console.log("test", error);
//     });
// }

// const messaging = async (res, req) => {
//   try {
//     let recipient = req.body;
//     // sendMessageWithImage(recipient);

//     // res.json({ msg: "Order added", number: recipient });
//     // return;
//     console.log(recipient);
//   } catch (error) {
//     //res.json({ msg: error.message });
//     console.log(error);
//   }
// };

//template

// function sendWhatsAppMessage(req, res) {
//   const data = JSON.stringify({
//     messaging_product: "whatsapp",
//     to: process.env.RECIPIENT_WAID,
//     type: "template",
//     template: {
//       name: "hello_world",
//       //name: "order_received",
//       language: {
//         code: "en_US",
//       },
//     },
//   });

//   const config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//     },
//     data: data,
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       //console.log("Message delivered");
//       return res.status(response.status).json(response.data);
//     })
//     .catch((error) => {
//       // console.error('Error sending WhatsApp message:', error.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     });
// }

//sending image NB user has to reply to message before they receive it
function sendMessageWithImage(req, res) {
  let data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: process.env.RECIPIENT_WAID,
    type: "image",
    image: {
      link: "https://th.bing.com/th/id/R.46041bdfab4d6e14c89d161f1a530bad?rik=qkXa%2b9o7VQ61ww&pid=ImgRaw&r=0",
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json({ msg: "Image sent" });
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendTextMessage(req, res) {
  let data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "233505636611",
    type: "text",
    text: {
      preview_url: false,
      body: "You are receiving this message from us",
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json({ msg: "Message sent" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ msg: "Error sending text" });
    });
}

//bulk template
const contact = [
  233505636611, 233202011640, 233275893806, 233246126206, 233201223545,
  233264361130, 233247440223, 233000000000,
];

async function sendBulkMessage(req, res) {
  const templateData = {
    messaging_product: "whatsapp",
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  const results = [];

  for (const phoneNumber of contact) {
    const data = JSON.stringify({
      ...templateData,
      to: phoneNumber,
    });

    const axiosConfig = { ...config, data };

    try {
      const response = await axios.request(axiosConfig);
      results.push({ phoneNumber, success: true, response: response.data });
    } catch (error) {
      results.push({ phoneNumber, success: false, error: error.message });
    }
  }

  return res.status(200).json({ results });
}
function receiveMessage(req, res) {
  res.send("received");
}
module.exports = {
  //sendWhatsAppMessage,
  sendMessageWithImage,
  sendBulkMessage,
  // messaging,
  sendTextMessage,
  verifyToken,
  receiveMessage,
};
