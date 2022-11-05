﻿using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> CheckIfUserExistsAsync(string email)
        {
            var result = await _dataContext.Users
                .AnyAsync(e => e.Email == email);

            return result;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var result = await _dataContext.Users
                .SingleOrDefaultAsync(e => e.Email == email);

            return result;
        }

        #endregion Methods
    }
}