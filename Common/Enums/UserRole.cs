using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Enums
{
    public enum UserRole
    {
        [Description("Admin")] ADMIN,
        [Description("Unconfirmed")] UNCONFIRMED,
        [Description("Regular user")] REGULAR_USER,
        [Description("Tutor")] TUTOR
    }
}