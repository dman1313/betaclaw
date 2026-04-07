#!/usr/bin/env node

/**
 * BEEFree SDK Authentication Proxy
 * Securely handles server-to-server authentication
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'beefree-auth-proxy' });
});

// Authentication proxy endpoint
app.post('/proxy/bee-auth', async (req, res) => {
  try {
    const { uid = 'default-user' } = req.body;

    if (!process.env.BEEFREE_CLIENT_ID || !process.env.BEEFREE_CLIENT_SECRET) {
      return res.status(500).json({
        error: 'Missing BEEFree credentials',
        message: 'Please set BEEFREE_CLIENT_ID and BEEFREE_CLIENT_SECRET in .env'
      });
    }

    const response = await axios.post('https://auth.getbee.io/loginV2', {
      client_id: process.env.BEEFREE_CLIENT_ID,
      client_secret: process.env.BEEFREE_CLIENT_SECRET,
      uid: uid
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Return the full response (token + v2 flag)
    res.json({
      token: response.data.access_token,
      v2: response.data.v2
    });

  } catch (error) {
    console.error('BEEFree auth error:', error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      error: 'Authentication failed',
      details: error.response?.data || error.message
    });
  }
});

// Token refresh endpoint
app.post('/proxy/bee-refresh', async (req, res) => {
  try {
    const { uid } = req.body;

    if (!process.env.BEEFREE_CLIENT_ID || !process.env.BEEFREE_CLIENT_SECRET) {
      return res.status(500).json({
        error: 'Missing BEEFree credentials'
      });
    }

    const response = await axios.post('https://auth.getbee.io/loginV2', {
      client_id: process.env.BEEFREE_CLIENT_ID,
      client_secret: process.env.BEEFREE_CLIENT_SECRET,
      uid: uid || 'default-user'
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    res.json({
      token: response.data.access_token,
      v2: response.data.v2
    });

  } catch (error) {
    console.error('BEEFree refresh error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Token refresh failed',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🐝 BEEFree Auth Proxy running on port ${PORT}`);
  console.log(`🔑 Auth endpoint: http://localhost:${PORT}/proxy/bee-auth`);
  console.log(`🔄 Refresh endpoint: http://localhost:${PORT}/proxy/bee-refresh`);
});
