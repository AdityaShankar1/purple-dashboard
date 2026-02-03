// // client/src/hooks/useAgentList.js
// import { useEffect, useState } from "react";


// export const useAgentList = () => {
//   const [agents, setAgents] = useState([]);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const res = await fetch(`${process.env.REACT_APP_API_URL}/wazuh/agents`);
//         const json = await res.json();
//         setAgents(json);
//       } catch (err) {
//         console.error("❌ useAgentList error:", err);
//       }
//     };
//     fetchAgents();
//   }, []);

//   return agents;
// };


import { useEffect, useState } from "react";

export default function useAgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/wazuh/agents`);
        const json = await res.json();
        setAgents(json);
      } catch (err) {
        console.error("❌ useAgentList error:", err);
      }
    };
    fetchAgents();
  }, []);

  return agents;
}
