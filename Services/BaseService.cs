using Data.DTOs.Response;

namespace Services
{
    public abstract class BaseService
    {
        protected ServiceResponseDTO CreateSuccessResponse(int statusCode, string message, Object result)
        {
            ServiceResponseDTO response = new ServiceResponseDTO()
            {
                StatusCode = statusCode,
                Message = message,
                IsSuccess = true,
                Result = result
            };

            return response;
        }

        protected ServiceResponseDTO CreateSuccessResponse(int statusCode, string message)
        {
            ServiceResponseDTO response = new ServiceResponseDTO()
            {
                StatusCode = statusCode,
                Message = message,
                IsSuccess = true,
                Result = null
            };

            return response;
        }

        protected ServiceResponseDTO CreateFailureResponse(int statusCode, string message)
        {
            ServiceResponseDTO response = new ServiceResponseDTO()
            {
                StatusCode = statusCode,
                Message = message,
                IsSuccess = false,
                Result = null
            };

            return response;
        }
    }
}