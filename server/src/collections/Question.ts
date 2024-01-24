import { CollectionConfig } from "payload/types";

const Question: CollectionConfig = {
  slug: "question",
  access: {
    read: () => true,
  },
  fields: [

    {
      name: "audited",
      label: "Audited",
      required: true,
      type: "checkbox",
    },
    {
      name: "applicable",
      label: "Applicable",
      required: true,
      type: "checkbox",
    },
    {
      name: "findingLevel",
      label: "Finding Level",
      required: true,
      type: "text",
    },
    {
      name: "laws", // required
      type: "relationship", // required
      relationTo: "law", // required
      hasMany: true,
    },
  ],
};

export default Question;
