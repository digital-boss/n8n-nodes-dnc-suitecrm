import type { INodeProperties } from "n8n-workflow";

export const moduleOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a module entry.",
      },
      {
        name: "Get",
        value: "get",
        description: "Get a module entry.",
      },
      {
        name: "Get All",
        value: "getAll",
        description: "Get all module entries.",
      },
      {
        name: "Update",
        value: "update",
        description: "Update a module entry.",
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a module entry.",
      },
    ],
    default: "create",
    required: true,
    description: "The operation to perform.",
  },
];

export const moduleFields: INodeProperties[] = [
  {
    displayName: "Module name",
    name: "moduleName",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
      },
    },
    default: "",
    description:
      'The module to operate on. Is optional for operations create and update if set as "Module name" in data field. Will be overwritten by the "Module name" fields value if set.',
  },
  {
    displayName: "Module entry ID",
    name: "moduleEntryId",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["delete", "get", "update"],
      },
    },
    default: "",
    placeholder: "b13a39f8-1c24-c5d0-ba0d-5ab123d6e899",
    description:
      'The ID of the entry to operate on. Is optional for update operation if set as "Module entry ID" in data field. Will be overwritten by the "Module entry ID" fields value if set.',
  },
  {
    displayName: "Data",
    name: "data",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["create", "update"],
      },
    },
    default: "",
    required: true,
    description:
      'The data to send to Suite CRM. Example: {"type":"Contacts", "id": "12345", "attributes": {"name": "Leonardo da Vinci"}}',
  },
  {
    displayName: "Fields",
    name: "fields",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["get", "getAll"],
      },
    },
    options: [
      {
        displayName: "Field",
        name: "field",
        values: [
          {
            displayName: "Name",
            name: "fieldName",
            type: "string",
            default: "",
            description: "Name of the field.",
          },
        ],
      },
    ],
    default: {},
    placeholder: "Add Field",
    description: "Specify the fields you want to request.",
  },
  {
    displayName: "Paginate",
    name: "paginate",
    type: "boolean",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
      },
    },
    default: false,
    description: "Select true if you want to paginate the module.",
  },
  {
    displayName: "Results per page",
    name: "resultsPerPage",
    type: "number",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        paginate: [true],
      },
    },
    default: 20,
    description: "Select the numbers per page.",
  },
  {
    displayName: "Page number",
    name: "page",
    type: "number",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        paginate: [true],
      },
    },
    default: 1,
    description: "Page you want to retrieve.",
  },
  {
    displayName: "Sort",
    name: "sort",
    type: "boolean",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
      },
    },
    default: false,
    description: "Select true if you want to sort the results.",
  },
  {
    displayName: "Sort By",
    name: "sortBy",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        sort: [true],
      },
    },
    default: "",
    description: "Field to sort by.",
  },
  {
    displayName: "Descending",
    name: "desc",
    type: "boolean",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        sort: [true],
      },
    },
    default: false,
    description:
      "Select true if you want to sort the results in descending order.",
  },
  {
    displayName: "Filter",
    name: "filter",
    type: "boolean",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
      },
    },
    default: false,
    description: "Select true if you want to filter the results.",
  },
  {
    displayName: "Filter By",
    name: "filterBy",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        filter: [true],
      },
    },
    default: "",
    description: "Field to filter by.",
  },
  {
    displayName: "Operator",
    name: "operator",
    type: "options",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        filter: [true],
      },
    },
    options: [
      {
        name: "Equals",
        value: "eq",
      },
      {
        name: "Not Equals",
        value: "neq",
      },
      {
        name: "Greater than",
        value: "gt",
      },
      {
        name: "Greater or equals than",
        value: "gte",
      },
      {
        name: "Lower than",
        value: "lt",
      },
      {
        name: "Lower or equals than",
        value: "lte",
      },
    ],
    default: "eq",
    description: "Operator to filter by.",
  },
  {
    displayName: "Value",
    name: "value",
    type: "string",
    displayOptions: {
      show: {
        mode: ["custom"],
        resource: ["module"],
        operation: ["getAll"],
        filter: [true],
      },
    },
    default: "",
    description: "Value to compare the results with.",
  },
];
