using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    [ScopedAttribute]
    public class PlaylistRepository : BaseRepository<Playlist>
    {
        #region Constructors

        public PlaylistRepository(DataContext dataContext) : base(dataContext)
        {

        }

        #endregion Constructors

        #region Methods   

        public async Task<Playlist> GetPlaylistAsync(int id)
        {
            var result = await DataContext.Playlists
                .Include(p => p.User)
                .Include(p => p.PlaylistTracks)
                    .ThenInclude(pt => pt.TrackInfo)
                .SingleOrDefaultAsync(p => p.Id == id);

            return result;
        }

        public async Task<Playlist> AddPlaylistAsync(Playlist playlist)
        {
            await AddAndSaveChangesAsync(playlist);

            await DataContext
                .Entry(playlist)
                .Reference(t => t.User)
                .LoadAsync();

            return playlist;
        }

        public async Task UpdateTrackInfoAsync(Playlist playlist)
        {
            await UpdateAndSaveChangesAsync(playlist);
        }

        public IQueryable<Playlist> GetPlaylists()
        {
            var result = DataContext.Playlists
                .Include(t => t.User)
                .Include(p => p.PlaylistTracks)
                    .ThenInclude(pt => pt.TrackInfo);

            return result;
        }
        #endregion Methods
    }
}
