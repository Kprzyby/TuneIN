using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Library;
using Data.Repositories;
using Microsoft.Identity.Client;
using Data.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Services
{
    [ScopedAttribute]
    public class LibraryService
    {
        #region Properties
       
        private readonly LibraryRepository _libraryRepository;

        #endregion Properties
        #region Constructors

        public LibraryService(LibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        #endregion Constructors
        #region Methods

        public async Task<bool> CheckIfTrackExistsAsync(string artist, string trackName)
        {
            var trackExists = await _libraryRepository.CheckIfTrackExistsAsync(artist, trackName);

            return trackExists;
        }
        public async Task<bool> CheckIfTrackExistsByIdAsync(int id)
        {
            var trackExists = await _libraryRepository.CheckIfTrackExistsByIdAsync(id);

            return trackExists;
        }

        public async Task<IEnumerable<TrackInfo>> GetTracksAsync()
        {
            IEnumerable<TrackInfo> result;
            try
            {
                result = await Task.FromResult(_libraryRepository.GetAll());
            }
            catch(Exception ex) 
            {
                return null;
            }
            return result;
        }
        public async Task<IEnumerable<TrackInfo>> GetTracksFilteredByTrackNameAsync(string toFilter)
        {
            IEnumerable<TrackInfo> result;
            try
            {
                result = await Task.FromResult(_libraryRepository.GetAll());
                result = result
                    .Where(e => e.TrackName.ToLower().Contains(toFilter.ToLower()) || e.Band.ToLower().Contains(toFilter.ToLower()) || e.Genre.ToLower().Contains(toFilter.ToLower()))
                    .OrderBy(e => e.TrackName)
                    .Take(5);
            }
            catch (Exception ex)
            {
                return null;
            }
            return result;
        }


        public async Task<bool> RemoveTracksAsync(int id)
        {
            try
            {
                await _libraryRepository.RemoveByIdAndSaveChangesAsync(id);
            }
            catch (Exception ex) 
            {
                return false;
            }
            return true;
        }

        public async Task<bool> AddTrackAsync(TrackInfoDTO trackInfoDTO)
        {
            try
            {
                var link = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + trackInfoDTO.TrackName;

                TrackInfo trackInfo = new TrackInfo()
                {
                    MbId = trackInfoDTO.MbId,
                    TrackName = trackInfoDTO.TrackName,
                    Band = trackInfoDTO.Band,
                    Genre = trackInfoDTO.Genre,
                    LinkToCover = trackInfoDTO.LinkToCover,
                    LinkToTabs = link
                };

                await _libraryRepository.AddAndSaveChangesAsync(trackInfo);

            }
            catch (Exception ex)
            {
                return false;
            }
            return true;

        }

        
        #endregion Methods

    }
}
