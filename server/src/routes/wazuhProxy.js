// server/src/routes/wazuhProxy.js
import express from "express"
import fetch from "node-fetch"

const router = express.Router()

router.get("/agents", async (req, res) => {
  const wazuhUrl = process.env.WAZUH_API_URL || "https://localhost:55000";
  const user = process.env.WAZUH_API_USER || "admin";
  const pass = process.env.WAZUH_API_PASS || "admin";

  const response = await fetch(`${wazuhUrl}/agents?status=active`, {
    headers: {
      Authorization: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64"),
    },
  })
  const data = await response.json()
  res.json(data)
})

export default router
