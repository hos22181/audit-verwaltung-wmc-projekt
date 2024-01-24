import { Audit } from "../payload-types";

export const editAudit = async (audit: Audit) => {
  const req = await fetch('http://localhost:3000/api/audit/' + audit.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(audit),
  })

  return req.json();
}

export const createAudit = async (newAudit: any) => {
  const req = await fetch('http://localhost:3000/api/audit', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAudit)
  })

  if (![200, 201].includes(req.status)) {
    const json = await req.json();
    throw new Error(json.errors[0].message)
  }
};

export const deleteAudit = async (auditId: string) => {
  const req = await fetch('http://localhost:3000/api/audit/' + auditId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (req.status !== 200) {
    const json = await req.json();
    throw new Error(json.errors[0].message)
  }
}

export const fetchAudits = async () => {
  const req = await fetch('http://localhost:3000/api/audit?depth=1&limit=300');
  const json = await req.json();

  if (req.status !== 200) {
    throw new Error(json.errors[0].message)
  }
  return json
}