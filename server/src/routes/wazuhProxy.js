// server/src/routes/wazuhProxy.js
import express from "express"
import fetch from "node-fetch"

const router = express.Router()

router.get("/agents", async (req, res) => {
  const response = await fetch("https://localhost:55000/agents?status=active", {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:admin").toString("base64"),
    },
  })
  const data = await response.json()
  res.json(data)
})

export default router
