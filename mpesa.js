const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const baseURL = "https://sandbox.safaricom.co.ke/";
axios.defaults.baseURL = baseURL;

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;

const consumer = `${consumer_key}:${consumer_secret}`;

const BEARER_TOKEN = Buffer.from(consumer).toString("base64");

console.log(BEARER_TOKEN);
const getAccessToken = async () => {
  const url = `oauth/v1/generate?grant_type=client_credentials`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Basic ${BEARER_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    // console.log(error);
  }
};

const getHeaders = async () => {
  const accessToken = await getAccessToken();
  return {
    Authorization: `Bearer ${accessToken.access_token}`,
    "Content-Type": "application/json",
  };
};

const registerURL = async (url) => {
  const urlToRegister = `mpesa/c2b/v1/registerurl`;
  try {
    const { data } = await axios.post(
      urlToRegister,
      {
        ShortCode: "600984",
        ResponseType: "Completed",
        ConfirmationURL: url,
        ValidationURL: url,
      },
      {
        headers: await getHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const simulateTransaction = async (phone, amount) => {
  const urlToSimulate = `mpesa/c2b/v1/simulate`;
  try {
    const { data } = await axios.post(
      urlToSimulate,
      {
        ShortCode: 600984,
        CommandID: "CustomerBuyGoodsOnline",
        Amount: amount,
        Msisdn: phone,
        BillRefNumber: "null",
      },
      {
        headers: await getHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

registerURL("https://barber-project-mu.vercel.app/api/transactions").then(
  (data) => {
    console.log(data);
    simulateTransaction(254708374149, 100).then(console.log);
  }
);

// const data = {
//   TransactionType: "Pay Bill",
//   TransID: "F9GUIN3XSJ",
//   TransTime: "20240423173028",
//   TransactionTime: "2024-04-23T14:30:28.000Z",
//   TransAmount: 350,
//   BusinessShortCode: "602345",
//   BillRefNumber: "invoice832",
//   InvoiceNumber: "",
//   OrgAccountBalance: "",
//   ThirdPartyTransID: "",
//   MSISDN: "254709876543",
//   FirstName: "Olivia",
//   MiddleName: "",
//   LastName: "Martinez",
// };

// axios
//   .post("https://barber-project-mu.vercel.app/api/transactions", data)
//   .then(console.log);
