using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

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