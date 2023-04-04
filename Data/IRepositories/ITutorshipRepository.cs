using Data.Entities;

namespace Data.IRepositories
{
    public interface ITutorshipRepository
    {
        Task<Tutorship> AddTutorshipAsync(Tutorship tutorship);

        Task<Tutorship> GetTutorshipAsync(int id);

        IQueryable<Tutorship> GetTutorships();

        Task UpdateTutorshipAsync(Tutorship tutorship);
    }
}