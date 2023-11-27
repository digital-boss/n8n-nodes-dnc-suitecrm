import type { ICredentialType, NodePropertyTypes } from "n8n-workflow";

export class SuiteCrmV4Api implements ICredentialType {
  name = "suiteCrmV4Api";
  displayName = "Suite CRM API";
  properties = [
    {
      displayName: "Suite CRM URL",
      name: "url",
      type: "string" as NodePropertyTypes,
      placeholder: "http://example.com/suitecrm/",
      default: "",
      required: true,
    },
    // {
    // 	displayName: 'Username',
    // 	name: 'user_name',
    // 	type: 'string' as NodePropertyTypes,
    // 	default: '',
    // 	required: true,
    // },
    // {
    // 	displayName: 'Password',
    // 	name: 'password',
    // 	type: 'string' as NodePropertyTypes,
    // 	typeOptions: {
    // 		password: true,
    // 	},
    // 	default: '',
    // 	required: true,
    // },
  ];
}
