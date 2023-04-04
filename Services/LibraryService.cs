using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Library;
using Data.Entities;
using Data.Repositories;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Data.DTOs.Tutorship;
using Data.DTOs.User;
using X.PagedList;
using Data.DTOs.Response;

namespace Services
{
    [ScopedAttribute]
    public class LibraryService : BaseService
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

        public async Task<ServiceResponseDTO> GetTrackAsync(int id)
        {
            try
            {
                TrackInfo trackInfo = await _libraryRepository.GetTrackAsync(id);

                if (trackInfo == null)
                {
                    return CreateFailureResponse(404, "Track with such an id was not found");
                }

                ReadTrackInfoDTO result = new ReadTrackInfoDTO()
                {
                    Id = trackInfo.Id,
                    TrackName = trackInfo.TrackName,
                    Band = trackInfo.Band,
                    Genre = trackInfo.Genre,
                    LinkToCover = trackInfo.LinkToCover,
                    LinkToTabs = trackInfo.LinkToTabs,
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = trackInfo.User.Id,
                        Username = trackInfo.User.UserName
                    }
                };

                return CreateSuccessResponse(200, "Track retrieved successfully", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the track");
            }
        }

        public async Task<ServiceResponseDTO> GetTracksAsync(GetTracksDTO dto)
        {
            try
            {
                IQueryable<TrackInfo> trackInfos = _libraryRepository.GetTracks();
                //filtorwanie po użytkowniku
                trackInfos = trackInfos.Where(t => t.User.Id == dto.UserIdFilterValue);
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
                        LinkToCover = t.LinkToCover,
                        LinkToTabs = t.LinkToTabs,
                        UserId = t.UserId,
                    })
                    .ToPagedListAsync(dto.PageNumber, dto.PageSize);

                return CreateSuccessResponse(200, "Tracks retrieved successfully", response);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the tracks");
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

        public async Task<ServiceResponseDTO> AddTrackAsync(TrackInfoDTO trackInfoDTO)
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
                    LinkToTabs = link,
                    UserId = trackInfoDTO.UserId,
                };

                trackInfo = await _libraryRepository.AddTrackInfoAsync(trackInfo);

                ReadTrackInfoDTO result = new ReadTrackInfoDTO()
                {
                    Id = trackInfo.Id,
                    TrackName = trackInfoDTO.TrackName,
                    Band = trackInfoDTO.Band,
                    Genre = trackInfoDTO.Genre,
                    LinkToCover = trackInfoDTO.LinkToCover,
                    LinkToTabs = link,
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = trackInfo.User.Id,
                        Username = trackInfo.User.UserName
                    }

                };

                return CreateSuccessResponse(201, "Track added successfully", result);

            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while adding the track");
            }
        }
        public async Task<ServiceResponseDTO> UpdateTrackInfoAsync(UpdateTrackDTO dto)
        {
            try
            {
                TrackInfo oldTrackInfo = await _libraryRepository.GetTrackAsync(dto.Id);

                if (oldTrackInfo == null)
                {
                    return CreateFailureResponse(404, "Track with such an id was not found");
                }
                if (dto.TrackName != null)
                {
                    oldTrackInfo.TrackName = dto.TrackName;
                }
                if (dto.Band != null)
                {
                    oldTrackInfo.Band = dto.Band;
                }
                if (dto.Genre != null)
                {
                    oldTrackInfo.Genre = dto.Genre;
                }

                await _libraryRepository.UpdateTrackInfoAsync(oldTrackInfo);

                return CreateSuccessResponse(204, "");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while updating the tutorship");
            }
        }


        #endregion Methods
    }
}