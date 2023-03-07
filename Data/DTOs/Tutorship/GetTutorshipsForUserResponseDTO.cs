namespace Data.DTOs.Tutorship
{
    public class GetTutorshipsForUserResponseDTO
    {
        public IEnumerable<ReadTutorshipDTO> Tutorships { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
    }
}