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
    public class LibraryRepository : BaseRepository<User>
    {
        #region Constructors
        public LibraryRepository(DataContext dataContext) : base(dataContext)
        {

        }

        #endregion Constructors
        #region Methods
        

        #endregion Methods
    }
}
