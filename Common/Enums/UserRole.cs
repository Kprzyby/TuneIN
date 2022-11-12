using System.ComponentModel;

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