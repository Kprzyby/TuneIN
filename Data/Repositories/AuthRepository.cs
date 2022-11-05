using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    [ScopedAttribute]
    public class AuthRepository : BaseRepository<User>
    {
        #region Properties

        private readonly DataContext _dataContext;

        #endregion Properties

        #region Constructors

        public AuthRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        #endregion Constructors

        #region Methods

        public async Task<bool> CheckIfUserExists(string email)
        {
            var result = await _dataContext.Users
                .AnyAsync(e => e.Email == email);

            return result;
        }

        #endregion Methods
    }
}