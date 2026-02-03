import { useEffect, useState } from "react"

export function useWazuhAgents() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetch("/api/wazuh/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data.data || []))
      .catch((err) => console.error("Failed to fetch Wazuh agents:", err))
  }, [])

  return { agents }
}
