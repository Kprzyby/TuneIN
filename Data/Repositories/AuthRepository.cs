using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    [ScopedAttribute]
    public class AuthRepository : BaseRepository<User>
    {
        #region Constructors

        public AuthRepository(DataContext dataContext) : base(dataContext)
        {
        }

        #endregion Constructors

        #region Methods

        public async Task<bool> CheckIfUserExistsAsync(string email)
        {
            var result = await DataContext.Users
                .AnyAsync(e => e.Email == email);

            return result;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var result = await DataContext.Users
                .SingleOrDefaultAsync(e => e.Email == email);

            return result;
        }

        public IQueryable<User> GetAllUsers()
        {
            var result = DataContext.Users;

            return result;
        }

        #endregion Methods
    }
}