namespace Data.DTOs.Response
{
    public class ServiceResponseDTO
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public Object Result { get; set; }
    }
}