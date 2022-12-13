using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    public class BaseController : Controller
    {
        public int GetUserId()
        {
            List<Claim> claims = HttpContext.User.Claims.ToList();
            Claim? idClaim = claims.FirstOrDefault(e => e.Type == "Id");

            return int.Parse(idClaim.Value);
        }
    }
}