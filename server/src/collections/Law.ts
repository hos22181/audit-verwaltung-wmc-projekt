import { CollectionConfig } from 'payload/types'

const Law: CollectionConfig = {
    slug: "law",
    fields: [
        {
            name: "law",
            label: "Law",
            required: true,
            type: "text"
        },
        {
            name: "type",
            label: "Type",
            required: true,
            type: "text"
        },
        {
            name: "text",
            label: "Text",
            required: true,
            type: "text"
        },
        {
            name: "description",
            label: "Description",
            required: true,
            type: "text"
        },
        {
            name: "validFrom",
            label: "Valid From",
            required: true,
            type: "date"
        },
        {
            name: "validUntil",
            label: "Valid Until",
            required: true,
            type: "date"
        }
    ]
}

export default Law;