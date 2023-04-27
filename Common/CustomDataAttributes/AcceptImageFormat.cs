using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Common.CustomDataAttributes
{
    public class AcceptImageFormat : ValidationAttribute
    {
        #region Constructors

        public AcceptImageFormat(params string[] acceptedFormats)
        {
            AcceptedFormats = acceptedFormats;
        }

        #endregion Constructors

        #region Properties

        private string[] AcceptedFormats;

        #endregion Properties

        #region Methods

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var file = (IFormFile)value;

                bool isOfAcceptedFormat = AcceptedFormats.Any(e => e == file.ContentType);

                if (isOfAcceptedFormat == false)
                {
                    return new ValidationResult("The image has to be of the png or jpg format");
                }
            }

            return ValidationResult.Success;
        }

        #endregion Methods
    }
}