// other bulk
function sendWhatsAppMessage(req, res) {
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

  const promises = [];

  for (const phoneNumber of contact) {
    const data = JSON.stringify({
      ...templateData,
      to: phoneNumber,
    });

    const axiosConfig = { ...config, data };

    promises.push(
      axios
        .request(axiosConfig)
        .then((response) => {
          // console.log(`Message delivered to ${phoneNumber}`);
          return response.data;
        })
        .catch((error) => {
          console.error(
            `Error sending WhatsApp message to ${phoneNumber}:`,
            error.message
          );
          //throw error;
        })
    );
  }

  Promise.all(promises)
    .then((results) => {
      // all sent
      return res.status(200).json({ success: true, results });
    })
    .catch((error) => {
      // failures
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
}
