using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    [ScopedAttribute]
    public class UserRepository : BaseRepository<User>
    {
        #region Constructors

        public UserRepository(DataContext dataContext) : base(dataContext)
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

        public async Task UpdateUserAsync(User user)
        {
            await UpdateAndSaveChangesAsync(user);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var result = await DataContext.Users
                .SingleOrDefaultAsync(e => e.Id == id);

            return result;
        }

        #endregion Methods
    }
}