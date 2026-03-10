const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const getAccessToken = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  const url = process.env.MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const response = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` },
  });

  return response.data.access_token;
};

const getSecurityCredential = () => {
  const initiatorPassword = process.env.MPESA_INITIATOR_PASSWORD;
  const certPath = path.join(__dirname, '..', process.env.MPESA_CERT_PATH);
  const publicKey = fs.readFileSync(certPath, 'utf8');

  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(initiatorPassword)
  );

  return encrypted.toString('base64');
};

module.exports = { getAccessToken, getSecurityCredential };