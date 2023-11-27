import type { INodeProperties } from "n8n-workflow";

export const linkOperations: INodeProperties[] = [];

export const linkFields: INodeProperties[] = [
  {
    displayName: "Link",
    name: "link",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["link"],
      },
    },
    default: "create",
    required: true,
    description: 'Input the link you want to GET-Request',
  },
];
