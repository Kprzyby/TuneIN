using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Common.CustomDataAttributes
{
    public class RequireRole : Attribute, IAuthorizationFilter
    {
        private string[] requiredRoles;

        public RequireRole(params string[] roles)
        {
            requiredRoles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            List<Claim> userClaims = context.HttpContext.User.Claims.ToList();

            var hasAccess = userClaims
                .Any(e => e.Type == "UserRole" && (e.Value == "ADMIN" || requiredRoles.Contains(e.Value)));

            if (hasAccess == true)
            {
                return;
            }

            context.Result = new StatusCodeResult(401);
        }
    }
}