import type { INodeProperties } from 'n8n-workflow';

export const relationshipOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				mode: ['custom'],
				resource: ['relationship'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a relationship for an module entry',
				action: 'Create a relationship',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many relationships of an module entry',
				action: 'Get many relationships',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a relationship',
				action: 'Delete a relationship',
			},
		],
		default: 'create',
		required: true,
	},
];

export const relationshipFields: INodeProperties[] = [
	{
		displayName: 'Module Name',
		name: 'moduleName',
		type: 'string',
		displayOptions: {
			show: {
				mode: ['custom'],
				resource: ['relationship'],
			},
		},
		default: '',
		required: true,
		description: 'The module to operate on',
	},
	{
		displayName: 'Module Entry ID',
		name: 'moduleEntryId',
		type: 'string',
		displayOptions: {
			show: {
				mode: ['custom'],
				resource: ['relationship'],
			},
		},
		default: '',
		required: true,
		placeholder: 'b13a39f8-1c24-c5d0-ba0d-5ab123d6e899',
		description: 'The ID of the entry to operate on',
	},
	{
		displayName: 'Relationship Name',
		name: 'relationshipName',
		type: 'string',
		displayOptions: {
			show: {
				mode: ['custom'],
				resource: ['relationship'],
			},
		},
		default: '',
		required: true,
		description: 'The relationship name related to the module entry',
	},
	{
		displayName: 'Related Bean ID',
		name: 'relatedBeanId',
		type: 'string',
		displayOptions: {
			show: {
				mode: ['custom'],
				resource: ['relationship'],
				operation: ['delete', 'create'],
			},
		},
		default: '',
		required: true,
		placeholder: '11806811-0b4b-fcdd-268b-5b2260e68333',
		description: 'The ID of the related module entry',
	},
];
