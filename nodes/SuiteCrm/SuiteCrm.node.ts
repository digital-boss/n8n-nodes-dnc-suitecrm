import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeTypeDescription,
	INodeType,
	NodeApiError,
} from 'n8n-workflow';

import { versionDescription as versionV4Description } from './v4/VersionDescription';
import { router as routerV4 } from './v4/Router';

import { versionDescription as versionV8Description } from './v8/VersionDescription';
import { router as routerV8 } from './v8/Router';

export class SuiteCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Suite CRM',
		name: 'suiteCrm',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:suiteCrm.png',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		group: ['input'],
		version: [4, 8],
		description: 'Consume Suite CRM API',
		defaults: {
			name: 'Suite CRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'suiteCrmV4Api',
				required: true,
				displayOptions: {
					show: {
						version: [4],
					},
				},
			},
			{
				name: 'suiteCrmV8Api',
				required: true,
				displayOptions: {
					show: {
						version: [8],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'API Version',
				name: 'version',
				type: 'options',
				isNodeSetting: true,
				options: [
					{
						name: 'V4',
						value: 4,
					},
					{
						name: 'V8',
						value: 8,
					},
				],
				default: 8,
			},

			// v4
			...versionV4Description,

			// v8
			...versionV8Description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const version = this.getNodeParameter('version', 0) as number;
		if (version === 4) {
			return await routerV4.call(this);
		} else if (version === 8) {
			return await routerV8.call(this);
		} else {
			throw new NodeApiError(this.getNode(), {
				message: 'Invalid API Version',
			});
		}
	}
}
