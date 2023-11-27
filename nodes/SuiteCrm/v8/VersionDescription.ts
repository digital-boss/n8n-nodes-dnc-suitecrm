import type { INodeProperties } from 'n8n-workflow';

import { linkFields, linkOperations } from './LinkDescription';
import { moduleFields, moduleOperations } from './ModuleDescription';
import { relationshipFields, relationshipOperations } from './RelationshipDescription';

export const versionDescription: INodeProperties[] = [
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		displayOptions: {
			show: {
				version: [8],
			},
		},
		options: [
			{
				name: 'Standard (to Be Implemented)',
				value: 'standard',
			},
			{
				name: 'Custom',
				value: 'custom',
			},
		],
		default: 'custom',
		required: true,
		description: 'Choose between standard or customized Suite CRM',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				version: [8],
				mode: ['custom'],
			},
		},
		options: [
			{
				name: 'Link',
				value: 'link',
			},
			{
				name: 'Log Out',
				value: 'logout',
			},
			{
				name: 'Module',
				value: 'module',
			},
			{
				name: 'Relationship',
				value: 'relationship',
			},
			{
				name: 'Swagger Documentation',
				value: 'swagger',
			},
		],
		default: 'module',
		required: true,
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
