import React, { useState } from "react";
import CreateLeadForm from "./CreateLeadForm";
import UpdateLeadForm from "./UpdateLeadForm";
import GetLeadDetails from "./GetLeadDetails";

const LeadManager = ({ executiveId }) => {
  const [leadId, setLeadId] = useState(null);

  return (
    <div>
      <CreateLeadForm executiveId={executiveId} setLeadId={setLeadId} />
      <hr />
      <UpdateLeadForm leadId={leadId} />
      <hr />
      <GetLeadDetails leadId={leadId} />
    </div>
  );
};

export default LeadManager;
