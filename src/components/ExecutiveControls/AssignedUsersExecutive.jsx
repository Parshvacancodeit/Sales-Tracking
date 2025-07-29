// // src/components/ExecutiveControls/AssignedUsersExecutive.jsx
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../assets/utils/axiosInstance";

// const AssignedUsersExecutive = () => {
//   const [telecallers, setTelecallers] = useState([]);
//   const [executives, setExecutives] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axiosInstance
//       .get("/executive/get-assign")
//       .then((res) => {
//         setTelecallers(res.data.user.telecaller || []);
//         setExecutives(res.data.user.executive || []);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.response?.data || "Error fetching assigned users");
//       });
//   }, []);

//   return (
//     <div className="assigned-users-list">
//       <h3>Assigned Telecallers</h3>
//       {telecallers.length === 0 ? (
//         <p>No Telecallers Assigned</p>
//       ) : (
//         <ul>
//           {telecallers.map((tc, i) => (
//             <li key={i}>
//               <strong>{tc.name}</strong> ({tc.email})
//             </li>
//           ))}
//         </ul>
//       )}

//       <h3>Assigned Executives</h3>
//       {executives.length === 0 ? (
//         <p>No Executives Assigned</p>
//       ) : (
//         <ul>
//           {executives.map((ex, i) => (
//             <li key={i}>
//               <strong>{ex.name}</strong> ({ex.email})
//             </li>
//           ))}
//         </ul>
//       )}

//       {error && (
//         <div className="error-box">
//           <h4>Error</h4>
//           <pre>{JSON.stringify(error, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedUsersExecutive;

// src/components/ExecutiveControls/AssignedUsersExecutive.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import LeadResultModal from "../ExecutiveControls/LeadResultModal";
// import "../../styles/ExecutiveStyles/assignedUsersExecutive.css";

const AssignedUsersExecutive = () => {
  const [telecallers, setTelecallers] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [error, setError] = useState(null);

  const [selectedTelecaller, setSelectedTelecaller] = useState(null);
  const [telecallerLeads, setTelecallerLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/executive/get-assign")
      .then((res) => {
        setTelecallers(res.data.user.telecaller || []);
        setExecutives(res.data.user.executive || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data || "Error fetching assigned users");
      });
  }, []);

  const handleTelecallerClick = async (tc) => {
    setSelectedTelecaller(tc);
    try {
      const res = await axiosInstance.get("/executive/get-all-lead");
      const filteredLeads = res.data?.leads?.filter(
        (lead) => lead.lead.created_by === tc.id
      );
      setTelecallerLeads(filteredLeads || []);
    } catch (err) {
      setError("Error fetching leads for selected telecaller.");
      setTelecallerLeads([]);
    }
  };

  return (
    <div className="assigned-users-list">
      <h3>Assigned Telecallers</h3>
      <div className="telecaller-cards">
        {telecallers.length === 0 ? (
          <p>No Telecallers Assigned</p>
        ) : (
          telecallers.map((tc) => (
            <div
              key={tc.id}
              className="user-card"
              onClick={() => handleTelecallerClick(tc)}
            >
              <strong>{tc.name}</strong>
              <p>{tc.email}</p>
              <small>{tc.role}</small>
            </div>
          ))
        )}
      </div>

      {selectedTelecaller && (
        <>
          <h4>Leads created by: {selectedTelecaller.name}</h4>
          {telecallerLeads.length === 0 ? (
            <p>No leads created.</p>
          ) : (
            <ul className="lead-list">
              {telecallerLeads.map((lead) => (
                <li
                  key={lead.lead.id}
                  onClick={() => setSelectedLeadId(lead.lead.id)}
                  className="lead-item"
                >
                  {lead.lead.name} – {lead.lead.phone}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {selectedLeadId && (
        <LeadResultModal
          leadId={selectedLeadId}
          onClose={() => setSelectedLeadId(null)}
        />
      )}

      {error && (
        <div className="error-box">
          <h4>Error</h4>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AssignedUsersExecutive;
