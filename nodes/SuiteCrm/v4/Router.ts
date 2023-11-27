import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

const crypto = require('crypto');

import { suiteCrmApiRequest } from './GenericFunctions';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: IDataObject[] = [];
	const length = items.length as unknown as number;

	let body: IDataObject = {};

	for (let i = 0; i < length; i++) {
		let resource = this.getNodeParameter('resource', 0) as string;

		if (resource === 'login') {
			const user = (this.getNodeParameter('user_auth', 0) as IDataObject)?.value as IDataObject;
			user.password = crypto.createHash('md5').update(user.password).digest('hex').toString();
			body.user_auth = user;
			body.application_name = this.getNodeParameter('application_name', 0) as string;
			body.name_value_list = (this.getNodeParameter('name_value_list', 0) as IDataObject)?.value;
		} else if (resource === 'logout') {
			body.session = this.getNodeParameter('session', 0) as string;
		} else if (resource === 'get_available_modules') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.filter = this.getNodeParameter('filter', 0) as string;
		} else if (resource === 'get_document_revision') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.id = this.getNodeParameter('id', 0) as string;
		} else if (resource === 'get_entries') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.ids = this.getNodeParameter('ids', 0) as IDataObject[];
			body.select_fields = this.getNodeParameter('select_fields', 0) as IDataObject[];
			body.link_name_to_fields_array = this.getNodeParameter(
				'link_name_to_fields_array',
				0,
			) as IDataObject[];
			body.track_view = this.getNodeParameter('track_view', 0) as boolean;
		} else if (resource === 'get_entries_count') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.query = this.getNodeParameter('query', 0) as string;
			body.deleted = this.getNodeParameter('deleted', 0) as boolean;
		} else if (resource === 'get_entry') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.id = this.getNodeParameter('id', 0) as string;
			body.select_fields = this.getNodeParameter('select_fields', 0) as IDataObject[];
			body.link_name_to_fields_array = this.getNodeParameter(
				'link_name_to_fields_array',
				0,
			) as IDataObject[];
			body.track_view = this.getNodeParameter('track_view', 0) as boolean;
		} else if (resource === 'get_entry_list') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.query = this.getNodeParameter('query', 0) as string;
			body.order_by = this.getNodeParameter('order_by', 0) as string;
			body.offset = this.getNodeParameter('offset', 0) as number;
			body.select_fields = this.getNodeParameter('select_fields', 0) as IDataObject[];
			body.link_name_to_fields_array = this.getNodeParameter(
				'link_name_to_fields_array',
				0,
			) as IDataObject[];
			body.max_results = this.getNodeParameter('max_results', 0) as number;
			body.deleted = this.getNodeParameter('deleted', 0) as boolean;
			body.favorites = this.getNodeParameter('favorites', 0) as boolean;
		} else if (resource === 'get_language_definition') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.modules = this.getNodeParameter('modules', 0) as IDataObject[];
			body.md5 = this.getNodeParameter('md5', 0) as boolean;
		} else if (resource === 'get_last_viewed') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_names = this.getNodeParameter('module_names', 0) as IDataObject[];
		} else if (resource === 'get_modified_relationships') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.related_module = this.getNodeParameter('related_module', 0) as string;
			body.from_date = this.getNodeParameter('from_date', 0) as Date;
			body.to_date = this.getNodeParameter('to_date', 0) as Date;
			body.offset = this.getNodeParameter('offset', 0) as number;
			body.max_results = this.getNodeParameter('max_results', 0) as number;
			body.deleted = this.getNodeParameter('deleted', 0) as boolean;
			body.module_user_id = this.getNodeParameter('module_user_id', 0) as string;
			body.select_fields = this.getNodeParameter('select_fields', 0) as IDataObject[];
			body.relationship_name = this.getNodeParameter('relationship_name', 0) as string;
			body.deletion_date = this.getNodeParameter('deletion_date', 0) as Date;
		} else if (resource === 'get_module_fields') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.fields = this.getNodeParameter('fields', 0) as IDataObject[];
		} else if (resource === 'get_module_fields_md5') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_names = this.getNodeParameter('module_names', 0) as IDataObject[];
		} else if (resource === 'get_module_layout') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.modules = this.getNodeParameter('modules', 0) as IDataObject[];
			body.types = this.getNodeParameter('types', 0) as IDataObject[];
			body.views = this.getNodeParameter('views', 0) as IDataObject[];
			body.acl_check = this.getNodeParameter('acl_check', 0) as boolean;
			body.md5 = this.getNodeParameter('md5', 0) as boolean;
		} else if (resource === 'get_module_layout_md5') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.modules = this.getNodeParameter('modules', 0) as IDataObject[];
			body.types = this.getNodeParameter('types', 0) as IDataObject[];
			body.views = this.getNodeParameter('views', 0) as IDataObject[];
			body.acl_check = this.getNodeParameter('acl_check', 0) as boolean;
		} else if (resource === 'get_relationships') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.module_id = this.getNodeParameter('module_id', 0) as string;
			body.link_field_name = this.getNodeParameter('link_field_name', 0) as string;
			body.related_module_query = this.getNodeParameter('related_module_query', 0) as string;
			body.related_fields = this.getNodeParameter('related_fields', 0) as IDataObject[];
			body.related_module_link_name_to_fields_array = this.getNodeParameter(
				'related_module_link_name_to_fields_array',
				0,
			) as IDataObject[];
			body.deleted = this.getNodeParameter('deleted', 0) as boolean;
			body.order_by = this.getNodeParameter('order_by', 0) as string;
			body.offset = this.getNodeParameter('offset', 0) as number;
			body.limit = this.getNodeParameter('limit', 0) as number;
		} else if (resource === 'get_server_info') {
		} else if (resource === 'get_upcoming_activities') {
			body.session = this.getNodeParameter('session', 0) as string;
		} else if (resource === 'get_user_id') {
			body.session = this.getNodeParameter('session', 0) as string;
		} else if (resource === 'seamless_login') {
			body.session = this.getNodeParameter('session', 0) as string;
		} else if (resource === 'search_by_module') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.search_string = this.getNodeParameter('search_string', 0) as string;
			body.modules = this.getNodeParameter('modules', 0) as IDataObject[];
			body.offset = this.getNodeParameter('offset', 0) as number;
			body.max_results = this.getNodeParameter('max_results', 0) as number;
			body.assigned_user_id = this.getNodeParameter('assigned_user_id', 0) as string;
			body.select_fields = this.getNodeParameter('select_fields', 0) as IDataObject[];
			body.unified_search_only = this.getNodeParameter('unified_search_only', 0) as boolean;
			body.favorites = this.getNodeParameter('favorites', 0) as boolean;
		} else if (resource === 'set_document_revision') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.note = (this.getNodeParameter('note', 0) as IDataObject)?.value;
		} else if (resource === 'set_entries') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_named = this.getNodeParameter('module_name', 0) as string;
			body.name_value_lists = this.getNodeParameter('name_value_lists', 0) as IDataObject[];
		} else if (resource === 'set_entry') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_named = this.getNodeParameter('module_name', 0) as string;
			body.name_value_lists = this.getNodeParameter('name_value_lists', 0) as IDataObject[];
		} else if (resource === 'get_note_attachment') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.id = this.getNodeParameter('id', 0) as string;
		} else if (resource === 'set_note_attachment') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.note = (this.getNodeParameter('note', 0) as IDataObject)?.value;
		} else if (resource === 'set_relationship') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_name = this.getNodeParameter('module_name', 0) as string;
			body.module_id = this.getNodeParameter('module_id', 0) as string;
			body.link_field_name = this.getNodeParameter('link_field_name', 0) as string;
			body.related_ids = this.getNodeParameter('related_ids', 0) as IDataObject[];
			body.name_value_list = this.getNodeParameter('name_value_list', 0) as IDataObject[];
			body.delete = this.getNodeParameter('delete', 0) as boolean;
		} else if (resource === 'set_relationships') {
			body.session = this.getNodeParameter('session', 0) as string;
			body.module_names = this.getNodeParameter('module_names', 0) as IDataObject[];
			body.module_ids = this.getNodeParameter('module_ids', 0) as IDataObject[];
			body.link_field_names = this.getNodeParameter('link_field_names', 0) as IDataObject[];
			body.related_ids = this.getNodeParameter('related_ids', 0) as IDataObject[];
			body.name_value_lists = this.getNodeParameter('name_value_lists', 0) as IDataObject[];
			body.delete_array = this.getNodeParameter('delete_array', 0) as IDataObject[];
		} else if (resource === 'custom') {
			resource = this.getNodeParameter('method', 0) as string;
			body = JSON.parse(this.getNodeParameter('data', 0) as string);
		} else {
			throw new Error(`The resource "${resource}" is not known!`);
		}

		const responseData = await suiteCrmApiRequest.call(this, resource, body);

		if (Array.isArray(responseData)) {
			returnData.push.apply(returnData, responseData as IDataObject[]);
		} else if (responseData) {
			returnData.push(responseData as IDataObject);
		}
	}
	return [this.helpers.returnJsonArray(returnData)];
}
