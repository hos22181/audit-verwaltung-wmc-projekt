import { CollectionConfig } from "payload/types";

const Audit: CollectionConfig = {
  slug: "audit",
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
    update: () => true
  },
  fields: [
    {
      name: "date",
      label: "Date",
      required: true,
      type: "date",
    },
    {
      name: "dateCount",
      label: "Date Count",
      required: true,
      type: "number",
    },
    {
      name: "leadAuditorId",
      label: "Lead Auditor ID",
      required: true,
      type: "number",
    },
    {
      name: "leadAuditeeId",
      label: "Lead Auditee ID",
      required: true,
      type: "number",
    },
    {
      name: "status",
      label: "Status",
      required: true,
      type: "text",
    },
    {
      name: "place",
      label: "Place",
      required: true,
      type: "text",
    },
    {
      name: "topic",
      label: "Topic",
      required: true,
      type: "text",
    },
    {
      name: "type",
      label: "Type",
      required: true,
      type: "text",
    },
    {
      name: "questions", // required
      type: "relationship", // required
      relationTo: "question", // required
      hasMany: true,
    },
  ],
};

export default Audit;
