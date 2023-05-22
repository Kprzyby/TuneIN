using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations;

namespace Common.CustomDataAttributes
{
    public class UsernameUnique : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            IConfiguration configuration = (IConfiguration)validationContext
                .GetService(typeof(IConfiguration));
            string connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer(connectionString);

            using (DataContext dataContext = new DataContext(optionsBuilder.Options))
            {
                string username = value.ToString();

                bool usernameExists = dataContext.Users
                    .Any(u => u.UserName == username);

                if (usernameExists == false)
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult("This username is used by another user");
                }
            }
        }
    }
}