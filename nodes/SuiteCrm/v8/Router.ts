import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
} from "n8n-workflow";

import { suiteCrmApiRequest } from "./GenericFunctions";

export async function router(
  this: IExecuteFunctions
): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const returnData: IDataObject[] = [];
  const length = items.length as unknown as number;

  let body: IDataObject = {};
  const qs: IDataObject = {};

  let responseData;
  for (let i = 0; i < length; i++) {
    const mode = this.getNodeParameter("mode", 0) as string;

    if (mode === "standard") {
      throw new Error("Standard Suite CRM is not yet implemented");
    } else if (mode === "custom") {
      const resource = this.getNodeParameter("resource", 0) as string;

      if (resource === "logout") {
        responseData = await suiteCrmApiRequest.call(
          this,
          "POST",
          "/Api/V8/logout",
          {}
        );
      } else if (resource === "swagger") {
        responseData = await suiteCrmApiRequest.call(
          this,
          "GET",
          "/Api/V8/meta/swagger.json",
          {}
        );
      } else if (resource === "module") {
        const operation = this.getNodeParameter("operation", 0) as string;

        if (operation === "create") {
          body = {
            data: this.getNodeParameter("data", i) as object,
          } as IDataObject;

          if (!body!.data!.hasOwnProperty("type")) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (body.data as any).type = this.getNodeParameter(
              "moduleName",
              0
            ) as string;
          }

          responseData = await suiteCrmApiRequest.call(
            this,
            "POST",
            "/Api/V8/module",
            body
          );
        } else if (operation === "update") {
          body = {
            data: this.getNodeParameter("data", i) as object,
          } as IDataObject;

          if (!body!.data!.hasOwnProperty("type")) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (body.data as any).type = this.getNodeParameter(
              "moduleName",
              0
            ) as string;
          }
          if (!body!.data!.hasOwnProperty("id")) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (body.data as any).id = this.getNodeParameter(
              "moduleEntryId",
              0
            ) as string;
          }

          responseData = await suiteCrmApiRequest.call(
            this,
            "PATCH",
            "/Api/V8/module",
            body
          );
        } else if (operation === "delete") {
          const moduleName = this.getNodeParameter("moduleName", 0) as string;
          const moduleEntryId = this.getNodeParameter(
            "moduleEntryId",
            0
          ) as string;

          responseData = await suiteCrmApiRequest.call(
            this,
            "DELETE",
            `/Api/V8/module/${moduleName}/${moduleEntryId}`,
            {}
          );
        } else if (operation === "get") {
          const moduleName = this.getNodeParameter("moduleName", 0) as string;
          const moduleEntryId = this.getNodeParameter(
            "moduleEntryId",
            0
          ) as string;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fields = this.getNodeParameter("fields", 0) as any;

          if (fields.hasOwnProperty("field") && fields.field.length !== 0) {
            let fieldsString = "";
            fields.field.forEach((param: { fieldName: string }) => {
              fieldsString = fieldsString.concat(",").concat(param.fieldName);
            });
            fieldsString = fieldsString.slice(1);
            qs[`fields[${moduleName}]`] = fieldsString;
          }

          responseData = await suiteCrmApiRequest.call(
            this,
            "GET",
            `/Api/V8/module/${moduleName}/${moduleEntryId}`,
            {},
            qs
          );
        } else if (operation === "getAll") {
          const moduleName = this.getNodeParameter("moduleName", 0) as string;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fields = this.getNodeParameter("fields", 0) as any;
          const paginate = this.getNodeParameter("paginate", 0) as boolean;
          const sort = this.getNodeParameter("sort", 0) as boolean;
          const filter = this.getNodeParameter("filter", 0) as boolean;

          if (paginate) {
            const results = this.getNodeParameter(
              "resultsPerPage",
              0
            ) as number;
            const page = this.getNodeParameter("page", 0) as number;
            qs["page[number]"] = page.toString();
            qs["page[size]"] = results.toString();
          }

          if (sort) {
            const sortBy = this.getNodeParameter("sortBy", 0) as string;
            const desc = this.getNodeParameter("desc", 0) as boolean;
            if (desc) {
              qs["sort"] = "-".concat(sortBy);
            } else {
              qs["sort"] = sortBy;
            }
          }

          if (filter) {
            const filterBy = this.getNodeParameter("filterBy", 0) as string;
            const operator = this.getNodeParameter("operator", 0) as string;
            const value = this.getNodeParameter("value", 0) as string;
            qs[`filter[${filterBy}][${operator}]`] = value;
          }

          if (fields.hasOwnProperty("field") && fields.field.length !== 0) {
            let fieldsString = "";
            fields.field.forEach((param: { fieldName: string }) => {
              fieldsString = fieldsString.concat(",").concat(param.fieldName);
            });
            fieldsString = fieldsString.slice(1);
            qs[`fields[${moduleName}]`] = fieldsString;
          }

          responseData = await suiteCrmApiRequest.call(
            this,
            "GET",
            `/Api/V8/module/${moduleName}`,
            {},
            qs
          );
        } else {
          throw new Error(`The operation '${operation}' is not known!`);
        }
      } else if (resource === "relationship") {
        const operation = this.getNodeParameter("operation", 0) as string;

        if (operation === "create") {
          body = {
            data: {
              type: this.getNodeParameter("relationshipName", 0) as string,
              id: this.getNodeParameter("relatedBeanId", 0) as string,
            },
          } as IDataObject;

          const moduleName = this.getNodeParameter("moduleName", 0) as string;
          const moduleEntryId = this.getNodeParameter(
            "moduleEntryId",
            0
          ) as string;

          responseData = await suiteCrmApiRequest.call(
            this,
            "POST",
            `/Api/V8/module/${moduleName}/${moduleEntryId}/relationships`,
            body
          );
        } else if (operation === "delete") {
          const moduleName = this.getNodeParameter("moduleName", 0) as string;
          const moduleEntryId = this.getNodeParameter(
            "moduleEntryId",
            0
          ) as string;
          const relationshipName = (
            this.getNodeParameter("relationshipName", 0) as string
          ).toLowerCase();
          const relatedBeanId = this.getNodeParameter(
            "relatedBeanId",
            0
          ) as string;

          responseData = await suiteCrmApiRequest.call(
            this,
            "DELETE",
            `/Api/V8/module/${moduleName}/${moduleEntryId}/relationships/${relationshipName}/${relatedBeanId}`,
            {}
          );
        } else if (operation === "getAll") {
          const moduleName = this.getNodeParameter("moduleName", 0) as string;
          const moduleEntryId = this.getNodeParameter(
            "moduleEntryId",
            0
          ) as string;
          const relationshipName = (
            this.getNodeParameter("relationshipName", 0) as string
          ).toLowerCase();

          responseData = await suiteCrmApiRequest.call(
            this,
            "GET",
            `/Api/V8/module/${moduleName}/${moduleEntryId}/relationships/${relationshipName}`,
            {}
          );
        } else {
          throw new Error(`The operation '${operation}' is not known!`);
        }
      } else if (resource === "link") {
        const link = this.getNodeParameter("link", 0) as string;

        responseData = await suiteCrmApiRequest.call(
          this,
          "GET",
          `/Api/${link}`,
          {}
        );
      } else {
        throw new Error(`The resource '${resource}' is not known!`);
      }
    } else {
      throw new Error(`The mode '${mode}' is not known!`);
    }

    if (Array.isArray(responseData)) {
      returnData.push.apply(returnData, responseData as IDataObject[]);
    } else if (responseData !== undefined) {
      returnData.push(responseData as IDataObject);
    }
  }
  return [this.helpers.returnJsonArray(returnData)];
}
