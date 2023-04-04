using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Data.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    [ScopedAttribute]
    public class TutorshipRepository : BaseRepository<Tutorship>, ITutorshipRepository
    {
        #region Constructors

        public TutorshipRepository(DataContext dataContext) : base(dataContext)
        {
        }

        #endregion Constructors

        #region Methods

        public async Task<Tutorship> GetTutorshipAsync(int id)
        {
            var result = await DataContext.Tutorships
                .Include(t => t.CreatedBy)
                .Where(t => !t.DeletedDate.HasValue)
                .SingleOrDefaultAsync(t => t.Id == id);

            return result;
        }

        public IQueryable<Tutorship> GetTutorships()
        {
            var result = DataContext.Tutorships
                .Include(t => t.CreatedBy)
                .Where(t => !t.DeletedDate.HasValue);

            return result;
        }

        public async Task<Tutorship> AddTutorshipAsync(Tutorship tutorship)
        {
            await AddAndSaveChangesAsync(tutorship);

            await DataContext
                .Entry(tutorship)
                .Reference(t => t.CreatedBy)
                .LoadAsync();

            return tutorship;
        }

        public async Task UpdateTutorshipAsync(Tutorship tutorship)
        {
            await UpdateAndSaveChangesAsync(tutorship);
        }

        #endregion Methods
    }
}