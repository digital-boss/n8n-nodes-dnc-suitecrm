import type { INodeProperties } from "n8n-workflow";

import { linkFields, linkOperations } from "./LinkDescription";
import { moduleFields, moduleOperations } from "./ModuleDescription";
import {
  relationshipFields,
  relationshipOperations,
} from "./RelationshipDescription";

export const versionDescription: INodeProperties[] = [
  {
    displayName: "Mode",
    name: "mode",
    type: "options",
    displayOptions: {
      show: {
        version: [8],
      },
    },
    options: [
      {
        name: "Standard (to be implemented)",
        value: "standard",
      },
      {
        name: "Custom",
        value: "custom",
      },
    ],
    default: "custom",
    required: true,
    description: "Choose between standard or customized Suite CRM.",
  },
  {
    displayName: "Resource",
    name: "resource",
    type: "options",
    displayOptions: {
      show: {
        version: [8],
        mode: ["custom"],
      },
    },
    options: [
      {
        name: "Module",
        value: "module",
      },
      {
        name: "Relationship",
        value: "relationship",
      },
      {
        name: "Link",
        value: "link",
      },
      {
        name: "Swagger Documentation",
        value: "swagger",
      },
      {
        name: "Log out",
        value: "logout",
      },
    ],
    default: "module",
    required: true,
    description: "The resource to operate on.",
  },

  // ----------------------------------
  //         modules
  // ----------------------------------
  ...moduleOperations,
  ...moduleFields,

  // ----------------------------------
  //         relationships
  // ----------------------------------
  ...relationshipOperations,
  ...relationshipFields,

  // ----------------------------------
  //         links
  // ----------------------------------
  ...linkOperations,
  ...linkFields,
];
