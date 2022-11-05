using Data.CustomDataAttributes.InjectionAttributes;

namespace Services
{
    [ScopedAttribute]
    public class AuthService
    {
        public bool CheckIfUserExists(string email)
        {
            Console.WriteLine("weszlo");

            return false;
        }
    }
}