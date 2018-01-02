using System;
using System.Collections.Generic;
using System.Linq;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Threading.Tasks;

namespace ONLINETEST.Authorization
{
    public class HttpHeaderOperation : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)

        {

            var filterPipeline = context.ApiDescription.ActionDescriptor.FilterDescriptors;

            var isAuthorized = filterPipeline.Select(filterInfo => filterInfo.Filter).Any(filter => filter is Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter);

            var allowAnonymous = filterPipeline.Select(filterInfo => filterInfo.Filter).Any(filter => filter is Microsoft.AspNetCore.Mvc.Authorization.IAllowAnonymousFilter);

            if (isAuthorized && !allowAnonymous)

            {

                if (operation.Parameters == null)

                    operation.Parameters = new List<IParameter>();

                operation.Parameters.Add(new NonBodyParameter

                {

                    Name = "Authorization",
                    In = "header",
                    Description = "access token",
                    Required = true,
                    Type = "string"

                });

            }

        }
    }
}
