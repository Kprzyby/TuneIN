using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DTOs.User
{
    public class UpdateUsernameDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
    }
}