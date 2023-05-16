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
    public class TrackRepository : BaseRepository<TrackInfo>
    {
        #region Constructors
        public TrackRepository(DataContext dataContext) : base(dataContext)
        {

        }

        #endregion Constructors
        #region Methods
        public async Task<bool> CheckIfTrackExistsByIdAsync(int id)
        {
            var result = await DataContext.TrackInfo
                .AnyAsync(e => e.Id == id);

            return result;
        }
        public async Task<bool> CheckIfTrackExistsAsync(string artist, string trackName)
        {
            var result = await DataContext.TrackInfo
                .AnyAsync(e => e.Band == artist && e.TrackName == trackName);

            return result;
        }

        public async Task<TrackInfo> GetTrackAsync(int id)
        {
            var result = await DataContext.TrackInfo
                .Include(t => t.User)
                .SingleOrDefaultAsync(t => t.Id == id);

            return result;
        }
        public IQueryable<TrackInfo> GetTracks()
        {
            var result = DataContext.TrackInfo
                .Include(t => t.User);

            return result;
        }

        public async Task<TrackInfo> AddTrackInfoAsync(TrackInfo trackInfo)
        {
            await AddAndSaveChangesAsync(trackInfo);

            await DataContext
                .Entry(trackInfo)
                .Reference(t => t.User)
                .LoadAsync();

            return trackInfo;
        }

        public async Task UpdateTrackInfoAsync(TrackInfo trackInfo)
        {
            await UpdateAndSaveChangesAsync(trackInfo);
        }

        #endregion Methods
    }
}
