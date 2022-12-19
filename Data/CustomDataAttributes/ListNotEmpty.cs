using System.ComponentModel.DataAnnotations;

namespace Data.CustomDataAttributes
{
    public class ListNotEmpty : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            List<int> ids = value as List<int>;

            if (ids.Count > 0)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("Please specify at least one participant");
        }
    }
}