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
    public class LibraryRepository : BaseRepository<TrackInfo>
    {
        #region Constructors
        public LibraryRepository(DataContext dataContext) : base(dataContext)
        {

        }

        #endregion Constructors
        #region Methods
        public async Task<bool> CheckIfTrackExists(string artist, string trackName)
        {
            var result = await DataContext.TrackInfo
                .AnyAsync(e => e.Band == artist && e.TrackName == trackName);

            return result;
        }

        #endregion Methods
    }
}
