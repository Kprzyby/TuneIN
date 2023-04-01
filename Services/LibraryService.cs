using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Library;
using Data.Entities;
using Data.Repositories;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Data.DTOs.Tutorship;
using Data.DTOs.User;
using X.PagedList;
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

        public async Task<GetTracksResponseDTO> GetTracksAsync(GetTracksDTO dto)
        {
            try
            {
                IQueryable<TrackInfo> trackInfos = _libraryRepository.GetAll();
                //filtrowanie po gatunku utworu
                if (!String.IsNullOrEmpty(dto.GenreFilterValue))
                {
                    trackInfos = trackInfos.Where(t => t.Genre.ToUpper() == dto.GenreFilterValue.ToUpper());
                    trackInfos = trackInfos.OrderBy(t => t.Genre);
                }
                //filtrowanie po zespole
                if (!String.IsNullOrEmpty(dto.BandFilterValue))
                {
                    trackInfos = trackInfos.Where(t => t.Band.ToUpper().StartsWith(dto.BandFilterValue.ToUpper()));
                    trackInfos = trackInfos.OrderBy(t => t.Band);
                }
                //filtrowanie po nazwie utworu
                if (!String.IsNullOrEmpty(dto.TrackNameFilterValue))
                {
                    trackInfos = trackInfos.Where(t => t.TrackName.ToUpper().StartsWith(dto.TrackNameFilterValue.ToUpper()));
                    trackInfos = trackInfos.OrderBy(t => t.TrackName);
                }
                //filtrowanie po użytkowniku
                if (dto.UserIdFilterValue != null)
                {
                    trackInfos = trackInfos.Where(t => t.UserId == dto.UserIdFilterValue);

                }
                GetTracksResponseDTO response = new GetTracksResponseDTO();

                response.TotalCount = trackInfos.Count();
                response.PageNumber = dto.PageNumber;
                response.PageSize = dto.PageSize;
                response.TrackNameFilterValue = dto.TrackNameFilterValue;
                response.BandFilterValue = dto.BandFilterValue;
                response.GenreFilterValue = dto.GenreFilterValue;

                response.TrackInfos = await trackInfos.
                    Select(t => new TrackInfoDTO()
                    {
                        Id = t.Id,
                        TrackName = t.TrackName,
                        Band = t.Band,
                        Genre = t.Genre,
                    })
                    .ToPagedListAsync(dto.PageNumber, dto.PageSize);

                return response;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        /*
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
        */
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
                    TrackName = trackInfoDTO.TrackName,
                    Band = trackInfoDTO.Band,
                    Genre = trackInfoDTO.Genre,
                    LinkToCover = trackInfoDTO.LinkToCover,
                    LinkToTabs = new List<string>() { link }
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