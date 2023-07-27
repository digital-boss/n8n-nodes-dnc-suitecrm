import { INodeProperties } from 'n8n-workflow';

const suiteCrmOperations: INodeProperties[] = [
    {
        // Dummy property for node display purpose (i.e. "method: {resource}")
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden',
        default: 'method',
        description: '',
	},
    {
        displayName: 'Resource',
		name: 'resource',
		type: 'options',
		// noDataExpression: true,
		options: [
			{
				name: 'Login',
				value: 'login',
				description: 'Logs into SuiteCRM and returns a session ID used for subsequent API calls.',
			},
			{
				name: 'Logout',
				value: 'logout',
				description: 'Logs the web user out of SuiteCRM and destroys the session.',
			},
			{
				name: 'Get Available Modules',
				value: 'get_available_modules',
				description: 'Returns a list of the modules available for use. Also returns the ACL (Access Control List) for each module.',
			},
			{
				name: 'Get Document Revision',
				value: 'get_document_revision',
				description: 'Returns the details for a specific document revision.',
			},
            {
				name: 'Get Entries',
				value: 'get_entries',
				description: 'Gets a list of entries for a specific module and list of module ids. Optionally allows returning related records.',
			},
            {
				name: 'Get Entries Count',
				value: 'get_entries_count',
				description: 'Returns a count of entries matching the given query.',
			},
            {
				name: 'Get Entry',
				value: 'get_entry',
				description: 'Returns the details for a single record. Optionally allows returning related records.',
			},
            {
				name: 'Get Entry List',
				value: 'get_entry_list',
				description: 'Identical to the response by \'get_entries\' except only one record will be returned.',
			},
            {
				name: 'Get Language Definition',
				value: 'get_language_definition',
				description: '',
			},
            {
				name: 'Get Last Viewed',
				value: 'get_last_viewed',
				description: 'Returns a list of the most recently viewed modules for the current user.',
			},
            {
				name: 'Get Modified Relationships',
				value: 'get_modified_relationships',
				description: 'Returns a list of the modified relationships for the current user between one of the Calls, Meetings or Contacts modules.',
			},
            {
				name: 'Get Module Fields',
				value: 'get_module_fields',
				description: 'Returns the field definitions for a given module.',
			},
            {
				name: 'Get Module Fields MD5',
				value: 'get_module_fields_md5',
				description: 'Returns an md5 of the a modules field definitions. Useful for caching.',
			},
            {
				name: 'Get Module Layout',
				value: 'get_module_layout',
				description: 'Returns the layout for specified modules and views. Optionally returns an md5 of the layouts.',
			},
            {
				name: 'Get Module Layout MD5',
				value: 'get_module_layout_md5',
				description: 'Returns the md5 of the specified views for the specified modules. Behaves identically to get_module_layout with the md5 parameter set to true.',
			},
            {
				name: 'Get Relationships',
				value: 'get_relationships',
				description: 'Returns related records given a specific module, record and list of links.',
			},
            {
				name: 'Get Server Info',
				value: 'get_server_info',
				description: 'Returns information about the SuiteCRM server. Currently still returns information about the SugarCRM flavor and versions.',
			},
            {
				name: 'Get Upcoming Activities',
				value: 'get_upcoming_activities',
				description: 'Returns a list of the 10 upcoming activities (Meetings, Calls and Tasks - also includes Opportunities) for the currently logged in user.',
			},
            {
				name: 'Get User ID',
				value: 'get_user_id',
				description: 'Returns the id of the currently logged in user.',
			},
            {
				name: 'Seamless Login',
				value: 'seamless_login',
				description: 'Marks a session as allowing a seamless login. If successful then the session id (see the login call) can be used in a URL (as MSID) to log the user into SuiteCRM in the browser seamlessly. For example if you have the session id 1234 then accessing the URL example.com/index.php?MSID=1234. The MSID parameter can be used in any valid SuiteCRM URL.',
			},
            {
				name: 'Search By Module',
				value: 'search_by_module',
				description: 'Allows searching for records that contain a specific search string.',
			},
            {
				name: 'Set Document Revision',
				value: 'set_document_revision',
				description: 'Creates a new document revision for a document.',
			},
            {
				name: 'Set Entries',
				value: 'set_entries',
				description: 'Creates or updates a list of records.',
			},
            {
				name: 'Set Entry',
				value: 'set_entry',
				description: 'Creates or updates a single record.',
			},
            {
				name: 'Get Note Attachment',
				value: 'get_note_attachment',
				description: 'Returns the details of a given note attachment.',
			},
            {
				name: 'Set Note Attachment',
				value: 'set_note_attachment',
				description: 'Creates a not attachment for a specified record.',
			},
            {
				name: 'Set Relationship',
				value: 'set_relationship',
				description: 'Sets a relationship between a record and other records.',
			},
            {
				name: 'Set Relationships',
				value: 'set_relationships',
				description: 'Sets relationships between multiple records.',
			},
            {
				name: 'Custom',
				value: 'custom',
				description: 'Custom API method',
			},
		],
		default: 'login',
        displayOptions: {
            show: {
                version: [
                    4,
                ],
            },
        },
    }
];

const suiteCrmFields: INodeProperties[] = [
    // login
    {
		displayName: 'User',
		name: 'user_auth',
		type: 'fixedCollection',
        default: {},
		required: true,
        typeOptions: {
            multipleValues: false,
        },
        description: 'Authentication details for the API User',
		options: [
            {
                name: 'value',
                displayName: 'Users',
                values: [
                    {
                        displayName: 'Username',
                        name: 'user_name',
                        type: 'string',
                        default: '',
                        description: 'The user name of the SuiteCRM user',
                        required: true,
                    },
                    {
                        displayName: 'Password',
                        name: 'password',
                        type: 'string',
                        typeOptions: {
                            password: true,
                        },
                        default: '',
                        description: 'The MD5 hash of the password for user_name',
                        required: true,
                    },
                ],
            },
        ],
        displayOptions: {
            show: {
                resource: [
                    'login'
                ],
            }
        },
	},
    {
        displayName: 'Application',
        name: 'application_name',
        type: 'string',
        default: '',
        description: 'An identifier for the application accessing the API',
        displayOptions: {
            show: {
                resource: [
                    'login'
                ],
            }
        },
    },
    {
		displayName: 'Login Options',
		name: 'name_value_list',
		type: 'fixedCollection',
        default: {},
		required: true,
        typeOptions: {
            multipleValues: false,
        },
        description: 'An array of login options',
		options: [
            {
                name: 'value',
                displayName: 'Options',
                values: [
                    {
                        displayName: 'Language',
                        name: 'language',
                        type: 'string',
                        default: '',
                        description: 'The language for this user',
                    },
                    {
                        displayName: 'Send Notifications',
                        name: 'sendNotification',
                        type: 'boolean',
                        default: false,
                        description: 'Send email notifications when a new record is saved and assigned to a user',
                    },
                ],
            },
        ],
        displayOptions: {
            show: {
                resource: [
                    'login'
                ],
            }
        },
	},

    // logout
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'logout'
                ],
            }
        },
    },

    // get_available_modules
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_available_modules'
                ],
            }
        },
    },
    {
        displayName: 'Filter',
        name: 'filter',
        type: 'options',
        default: 'default',
        description: 'Filter the modules returned',
        options: [
			{
                name: 'Default',
				value: 'default',
				description: '',
            },
            {
                name: 'Mobile',
				value: 'mobile',
				description: '',
            },
            {
                name: 'All',
				value: 'all',
				description: '',
            },
        ],
        displayOptions: {
            show: {
                resource: [
                    'get_available_modules'
                ],
            }
        },
    },

    // get_document_revision
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_document_revision'
                ],
            }
        },
    },
    {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        description: 'The id of the document revision to retrieve',
        displayOptions: {
            show: {
                resource: [
                    'get_document_revision'
                ],
            }
        },
    },

    // get_entries
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_entries'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to display entries for',
        displayOptions: {
            show: {
                resource: [
                    'get_entries'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'IDs',
        name: 'ids',
        type: 'string',
        default: [],
        description: 'An array of record IDs to fetch',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_entries'
                ],
            }
        },
    },
    {
        displayName: 'Fields',
        name: 'select_fields',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        displayOptions: {
            show: {
                resource: ['get_entries'],
            },
        },
        description: 'An array of fields to return. An empty array will return all fields.',
    },
    {
        displayName: 'Relationships',
        name: 'link_name_to_fields_array',
        type: 'fixedCollection',
        default: [],
        description: 'An array of relationships to retrieve',
        options: [
            {
                name: 'value',
                displayName: 'Relationship',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the link to follow (as defined in \'module_name\').'
                    },
                    {
                        displayName: 'Values',
                        name: 'values',
                        type: 'string',
                        default: [],
                        description: 'An array of the fields to return for this related module',
                        typeOptions: {
                            multipleValues: true,
                        },
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_entries'
                ],
            }
        },
    },
    {
        displayName: 'Track View',
        name: 'track_view',
        type: 'boolean',
        default: false,
        description: 'Whether to mark these records as recently viewed',
        displayOptions: {
            show: {
                resource: [
                    'get_entries'
                ],
            }
        },
    },

    // get_entries_count
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_entries_count'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to display entries for',
        displayOptions: {
            show: {
                resource: [
                    'get_entries_count'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        default: '',
        description: 'An SQL WHERE clause to apply to the query',
        displayOptions: {
            show: {
                resource: [
                    'get_entries_count'
                ],
            }
        },
    },
    {
        displayName: 'Deleted',
        name: 'deleted',
        type: 'boolean',
        default: false,
        description: 'Whether to include deleted records',
        displayOptions: {
            show: {
                resource: [
                    'get_entries_count'
                ],
            }
        },
    },
    
    // get_entry
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_entry'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to display entries for',
        displayOptions: {
            show: {
                resource: [
                    'get_entry'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        description: 'The id of the record to fetch',
        displayOptions: {
            show: {
                resource: [
                    'get_entry'
                ],
            }
        },
    },
    {
        displayName: 'Fields',
        name: 'select_fields',
        type: 'string',
        default: [],
        description: 'An array of fields to return. An empty array will return all fields.',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_entry'
                ],
            }
        },
    },
    {
        displayName: 'Relationships',
        name: 'link_name_to_fields_array',
        type: 'fixedCollection',
        default: [],
        description: 'An array of relationships to retrieve',
        options: [
            {
                name: 'value',
                displayName: 'Relationship',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the link to follow (as defined in \'module_name\').'
                    },
                    {
                        displayName: 'Values',
                        name: 'values',
                        type: 'string',
                        default: [],
                        description: 'An array of the fields to return for this related module',
                        typeOptions: {
                            multipleValues: true,
                        },
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_entry'
                ],
            }
        },
    },
    {
        displayName: 'Track View',
        name: 'track_view',
        type: 'boolean',
        default: false,
        description: 'Whether to mark these records as recently viewed',
        displayOptions: {
            show: {
                resource: [
                    'get_entry'
                ],
            }
        },
    },

    // get_entry_list
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to display entries for',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        default: '',
        description: 'An SQL WHERE clause to apply to the query',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Order By',
        name: 'order_by',
        type: 'string',
        default: '',
        description: 'In theory for ordering results but this is unused',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: '',
        description: 'The result offset. Useful for pagination.',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Fields',
        name: 'select_fields',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        displayOptions: {
            show: {
                resource: ['get_entry_list'],
            },
        },
        description: 'An array of fields to return. An empty array will return all fields.',
    },
    {
        displayName: 'Relationships',
        name: 'link_name_to_fields_array',
        type: 'fixedCollection',
        default: [],
        description: 'An array of relationships to retrieve',
        options: [
            {
                name: 'value',
                displayName: 'Relationship',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the link to follow (as defined in \'module_name\').'
                    },
                    {
                        displayName: 'Values',
                        name: 'values',
                        type: 'string',
                        default: [],
                        description: 'An array of the fields to return for this related module',
                        typeOptions: {
                            multipleValues: true,
                        },
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Max Results',
        name: 'max_results',
        type: 'number',
        default: '',
        description: 'The maximum number of results to return. Useful for pagination.',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Deleted',
        name: 'deleted',
        type: 'boolean',
        default: false,
        description: 'Whether to include deleted records',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },
    {
        displayName: 'Favorites',
        name: 'favorites',
        type: 'boolean',
        default: false,
        description: 'Favorites were SugarCRM Professional functionality. This is unused.',
        displayOptions: {
            show: {
                resource: [
                    'get_entry_list'
                ],
            }
        },
    },

    // get_language_definition
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_language_definition'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'modules',
        type: 'string',
        default: [],
        description: 'An array of the modules to return language labels for',
        typeOptions: {
            multipleValues: false,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_language_definition'
                ],
            }
        },
    },
    {
        displayName: 'MD5',
        name: 'md5',
        type: 'boolean',
        default: false,
        description: 'Whether to return the md5 for each module. Can be useful for caching responses.',
        displayOptions: {
            show: {
                resource: [
                    'get_language_definition'
                ],
            }
        },
    },

    // get_last_viewed
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_last_viewed'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'module_names',
        type: 'string',
        default: [],
        description: 'An array of the modules to return language labels for',
        typeOptions: {
            multipleValues: true,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_last_viewed'
                ],
            }
        },
    },

    // get_modified_relationships
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to retrieve relationships for. Always \'Users\'.',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Related Module',
        name: 'related_module',
        type: 'string',
        default: '',
        description: 'The related module to retrieve records for. One of \'Meetings\', \'Calls \' or \'Contacts \'.',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'From Date',
        name: 'from_date',
        type: 'dateTime',
        default: '',
        description: 'The start date of the range to search',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'To Date',
        name: 'to_date',
        type: 'dateTime',
        default: '',
        description: 'The end date of the range to search',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: '',
        description: 'The result offset. Useful for pagination.',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Max Results',
        name: 'max_results',
        type: 'number',
        default: '',
        description: 'The maximum number of results to return. Useful for pagination.',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Deleted',
        name: 'deleted',
        type: 'boolean',
        default: false,
        description: 'Whether to include deleted records',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Module User ID',
        name: 'module_user_id',
        type: 'string',
        default: '',
        description: 'In theory the id of the user to return relationships for. However the current user is always used.',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Fields',
        name: 'select_fields',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        displayOptions: {
            show: {
                resource: ['get_modified_relationships'],
            },
        },
        description: 'An array of fields to return. An empty array will return all fields.',
    },
    {
        displayName: 'Relationship Name',
        name: 'relationship_name',
        type: 'string',
        default: '',
        description: 'The name of the relationship between \'module_name\' and \'related_module\'.',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Deletion Date',
        name: 'deletion_date',
        type: 'dateTime',
        default: '',
        description: 'A start date for the range in which to return deleted records',
        displayOptions: {
            show: {
                resource: [
                    'get_modified_relationships'
                ],
            }
        },
    },

    // get_module_fields
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_fields'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to return field definitions for',
        displayOptions: {
            show: {
                resource: [
                    'get_module_fields'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: [],
        description: 'An array of fields to return definitions for. An empty array will return all fields.',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_module_fields'
                ],
            }
        },
    },

    // get_module_fields_md5
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_fields_md5'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'module_names',
        type: 'string',
        default: [],
        description: 'An array of modules to return the md5 for',
        typeOptions: {
            multipleValues: true,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_fields_md5'
                ],
            }
        },
    },

    // get_module_layout
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'modules',
        type: 'string',
        default: [],
        description: 'An array of the modules to return layouts for',
        typeOptions: {
            multipleValues: false,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout'
                ],
            }
        },
    },
    {
        displayName: 'Types',
        name: 'types',
        type: 'options',
        default: 'default',
        description: 'An array of the types of views to return. Only \'default\' is supported.',
        options: [
            {
                name: 'Default',
                value: 'default',
                description: 'The type of the view'
            },
        ],
        typeOptions: {
            multipleValues: false,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout'
                ],
            }
        },
    },
    {
        displayName: 'Views',
        name: 'views',
        type: 'options',
        default: 'list',
        description: 'An array of the views to return',
        options: [
            {
                name: 'Detail',
                value: 'detail',
                description: 'The name of the view',
            },
            {
                name: 'Edit',
                value: 'edit',
                description: 'The name of the view',
            },
            {
                name: 'List',
                value: 'list',
                description: 'The name of the view',
            },
            {
                name: 'Subpanel',
                value: 'subpanel',
                description: 'The name of the view',
            },
        ],
        typeOptions: {
            multipleValues: false,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout'
                ],
            }
        },
    },
    {
        displayName: 'Access Check',
        name: 'acl_check',
        type: 'boolean',
        default: false,
        description: 'Whether or not to check that the current user has access to this module and view',
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout'
                ],
            }
        },
    },
    {
        displayName: 'MD5',
        name: 'md5',
        type: 'boolean',
        default: false,
        description: 'Whether or not to return the view as an MD5 string. Useful for caching.',
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout'
                ],
            }
        },
    },

    // get_module_layout_md5
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout_md5'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'modules',
        type: 'string',
        default: [],
        description: 'An array of the modules to return layouts for',
        typeOptions: {
            multipleValues: false,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout_md5'
                ],
            }
        },
    },
    {
        displayName: 'Types',
        name: 'types',
        type: 'options',
        default: '',
        description: 'An array of the types of views to return. Only \'default\' is supported.',
        options: [
            {
                name: 'Default',
                value: 'default',
                description: 'The type of the view'
            },
        ],
        typeOptions: {
            multipleValues: false,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout_md5'
                ],
            }
        },
    },
    {
        displayName: 'Views',
        name: 'views',
        type: 'options',
        default: '',
        description: 'An array of the views to return',
        options: [
            {
                name: 'Edit',
                value: 'edit',
                description: 'The name of the view',
            },
            {
                name: 'Detail',
                value: 'detail',
                description: 'The name of the view',
            },
            {
                name: 'List',
                value: 'list',
                description: 'The name of the view',
            },
            {
                name: 'Subpanel',
                value: 'subpanel',
                description: 'The name of the view',
            },
        ],
        typeOptions: {
            multipleValues: false,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout_md5'
                ],
            }
        },
    },
    {
        displayName: 'Access Check',
        name: 'acl_check',
        type: 'boolean',
        default: false,
        description: 'Whether or not to check that the current user has access to this module and view',
        displayOptions: {
            show: {
                resource: [
                    'get_module_layout_md5'
                ],
            }
        },
    },

    // get_relationships
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The module to return relationships for',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'ID',
        name: 'module_id',
        type: 'string',
        default: '',
        description: 'The record to return relationships for',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Link Field',
        name: 'link_field_name',
        type: 'string',
        default: '',
        description: 'The link field to follow for this record',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Related Module Query',
        name: 'related_module_query',
        type: 'string',
        default: '',
        description: 'A WHERE clause to use to filter the related modules by',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Fields',
        name: 'related_fields',
        type: 'string',
        default: [],
        description: 'An array of the fields to return for matching records',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Matching Record Fields',
        name: 'related_module_link_name_to_fields_array',
        type: 'fixedCollection',
        default: [],
        description: 'An array of related fields to return for matching records',
        options: [
            {
                name: 'value',
                displayName: 'Field',
                description: 'Details for a specific link',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the link to follow for matching records'
                    },
                    {
                        displayName: 'Values',
                        name: 'values',
                        type: 'string',
                        default: [],
                        description: 'An array of fields to return for this link',
                        typeOptions: {
                            multipleValues: true,
                        },
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Deleted',
        name: 'deleted',
        type: 'boolean',
        default: false,
        description: 'Whether to include deleted records',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Order By',
        name: 'order_by',
        type: 'string',
        default: '',
        description: 'In theory for ordering results but this is unused',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'offset',
        name: 'offset',
        type: 'number',
        default: 0,
        description: 'The record offset to start with',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: '',
        description: 'The maximum number of results to return',
        displayOptions: {
            show: {
                resource: [
                    'get_relationships'
                ],
            }
        },
    },

    // get_server_info

    // get_upcoming_activities
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_upcoming_activities'
                ],
            }
        },
    },

    // get_user_id
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_user_id'
                ],
            }
        },
    },

    // seamless_login
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'seamless_login'
                ],
            }
        },
    },

    // search_by_module
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Search String',
        name: 'search_string',
        type: 'string',
        default: '',
        description: 'The string to search for',
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'modules',
        type: 'string',
        default: [],
        description: 'An array of the modules to include in the search',
        typeOptions: {
            multipleValues: false,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: 0,
        description: 'The result offset. Useful for pagination.',
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Max Results',
        name: 'max_results',
        type: 'number',
        default: '',
        description: 'The maximum number of results to return. Useful for pagination.',
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Assigned User ID',
        name: 'assigned_user_id',
        type: 'string',
        default: '',
        description: 'Filter by the given assigned user. Leave blank to do no user filtering.',
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Fields',
        name: 'select_fields',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        displayOptions: {
            show: {
                resource: ['search_by_module'],
            },
        },
        description: 'An array of the fields to return for the found records. An empty array will return all fields.',
    },
    {
        displayName: 'Unified Search Only',
        name: 'unified_search_only',
        type: 'boolean',
        default: false,
        description: 'Whether to only return records for modules that participate in the global search',
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },
    {
        displayName: 'Favorites',
        name: 'favorites',
        type: 'boolean',
        default: false,
        description: 'Favorites were SugarCRM Professional functionality. This is unused.',
        displayOptions: {
            show: {
                resource: [
                    'search_by_module'
                ],
            }
        },
    },

    // set_document_revision
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_document_revision'
                ],
            }
        },
    },
    {
        displayName: 'Notes',
        name: 'note',
        type: 'fixedCollection',
        default: {},
        description: 'An array containing the document revision details',
        options: [
            {
                name: 'value',
                displayName: 'Note',
                values: [
                    {
                        displayName: 'ID',
                        name: 'id',
                        type: 'string',
                        default: '',
                        description: 'The ID of the document to add this revision to'
                    },
                    {
                        displayName: 'File',
                        name: 'file',
                        type: 'string',
                        default: '',
                        description: 'The binary contents of the file, base 64 encoded'
                    },
                    {
                        displayName: 'Filename',
                        name: 'filename',
                        type: 'string',
                        default: '',
                        description: 'The name of the file'
                    },
                    {
                        displayName: 'Revision',
                        name: 'revision',
                        type: 'number',
                        default: '',
                        description: 'The revision number for this revision'
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: false,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_document_revision'
                ],
            }
        },
    },

    // set_entries
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_entries'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to create/update records for',
        displayOptions: {
            show: {
                resource: [
                    'set_entries'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Fields',
        name: 'name_value_lists',
        type: 'fixedCollection',
        default: [],
        description: 'An array of the details for each record to create/update',
        options: [
            {
                name: 'value',
                displayName: 'Field',
                description: 'Details of an individual record',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the field'
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'The value for the field',
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_entries'
                ],
            }
        },
    },

    // set_entry
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_entry'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to create/update record for',
        displayOptions: {
            show: {
                resource: [
                    'set_entry'
                ],
            }
        },
        required: true,
    },
    {
        displayName: 'Fields',
        name: 'name_value_lists',
        type: 'fixedCollection',
        default: [],
        description: 'An array of the fields for the new/updated record',
        options: [
            {
                name: 'value',
                displayName: 'Field',
                description: 'A name value pair for each field value',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the field'
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'The value for the field',
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_entry'
                ],
            }
        },
    },

    // get_note_attachment
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_note_attachment'
                ],
            }
        },
    },
    {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        description: 'The ID of the note to retrieve information for',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'get_note_attachment'
                ],
            }
        },
    },

    // set_note_attachment
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_note_attachment'
                ],
            }
        },
    },
    {
        displayName: 'Notes',
        name: 'note',
        type: 'fixedCollection',
        default: {},
        description: 'An array containing the document revision details',
        options: [
            {
                name: 'value',
                displayName: 'Note',
                values: [
                    {
                        displayName: 'ID',
                        name: 'id',
                        type: 'string',
                        default: '',
                        description: 'The ID of the note to add an attachment for'
                    },
                    {
                        displayName: 'Filename',
                        name: 'filename',
                        type: 'string',
                        default: '',
                        description: 'The filename of the file'
                    },
                    {
                        displayName: 'File',
                        name: 'file',
                        type: 'string',
                        default: '',
                        description: 'The full contents of the file base 64 encoded'
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: false,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_note_attachment'
                ],
            }
        },
    },

    // set_relationship
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        },
    },
    {
        displayName: 'Module',
        name: 'module_name',
        type: 'string',
        default: '',
        description: 'The name of the module to relate records to',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        }, 
    },
    {
        displayName: 'Module ID',
        name: 'module_id',
        type: 'string',
        default: '',
        description: 'The ID of the record to relate records to',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        },
    },
    {
        displayName: 'Link Name',
        name: 'link_field_name',
        type: 'string',
        default: '',
        description: 'The name of the link field on the module through which records will be related',
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        },
    },
    {
        displayName: 'Related IDs',
        name: 'related_ids',
        type: 'string',
        default: [],
        description: 'An array of record IDs to relate',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        },
    },
    {
        displayName: 'Relationship Fields',
        name: 'name_value_list',
        type: 'fixedCollection',
        default: [],
        description: 'A name value list of additional relationship fields to set',
        options: [
            {
                name: 'value',
                displayName: 'Field',
                description: 'Details of an individual record',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the field to set'
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'The value of the field to set',
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        },
    },
    {
        displayName: 'Delete',
        name: 'delete',
        type: 'boolean',
        default: false,
        description: 'Whether or not to delete the specified relationship instead of creating/updating it',
        displayOptions: {
            show: {
                resource: [
                    'set_relationship'
                ],
            }
        },
    },

    // set_relationships
    {
        displayName: 'Session',
        name: 'session',
        type: 'string',
        default: '',
        description: 'The session ID',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Modules',
        name: 'module_names',
        type: 'string',
        default: [],
        description: 'An array of modules to relate records to',
        typeOptions: {
            multipleValues: true,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },
    {
        displayName: 'IDs',
        name: 'module_ids',
        type: 'string',
        default: [],
        description: 'An array of the IDs of records to relate records to',
        typeOptions: {
            multipleValues: true,
        },
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Link Names',
        name: 'link_field_names',
        type: 'string',
        default: [],
        description: 'An array of the link names through which records will be related',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Related IDs',
        name: 'related_ids',
        type: 'string',
        default: [],
        description: 'An array of record ids for the corresponding module',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Relationship Fields',
        name: 'name_value_lists',
        type: 'fixedCollection',
        default: [],
        description: 'An array of an array of name value list of additional relationship fields to set',
        options: [
            {
                name: 'value',
                displayName: 'Field',
                description: 'Details of an individual record',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        description: 'The name of the field to set'
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'The value of the field to set',
                    },
                ],
            },
        ],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },
    {
        displayName: 'Delete',
        name: 'delete_array',
        type: 'boolean',
        default: [],
        description: 'An array of booleans indicating whether or not the relationship should be deleted for each module',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: [
                    'set_relationships'
                ],
            }
        },
    },

    // custom
    {
        displayName: 'Custom Method',
        name: 'method',
        type: 'string',
        default: '',
        required: true,
        description: 'The name of the custom method',
        displayOptions: {
            show: {
                resource: [
                    'custom'
                ],
            }
        },
    },
    {
        displayName: 'Data',
        name: 'data',
        type: 'json',
        default: {},
        description: 'The method data',
        displayOptions: {
            show: {
                resource: [
                    'custom'
                ],
            }
        },
    },
];

export const versionDescription: INodeProperties[] = [
    ...suiteCrmOperations,
    ...suiteCrmFields,
];