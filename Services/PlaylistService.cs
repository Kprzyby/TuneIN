using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Library;
using Data.Entities;
using Data.Repositories;
using Data.DTOs.Tutorship;
using Data.DTOs.User;
using X.PagedList;
using Data.DTOs.Response;
using Data.DTOs.Playlist;

namespace Services
{
    [ScopedAttribute]
    public class PlaylistService : BaseService
    {
        #region Properties

        private readonly PlaylistRepository _playlistRepository;

        #endregion Properties

        #region Constructors

        public PlaylistService(PlaylistRepository playlistRepository)
        {
            _playlistRepository = playlistRepository;
        }

        #endregion Constructors

        #region Methods   

        public async Task<ServiceResponseDTO> GetPlaylistAsync(int id)
        {
            try
            {
                Playlist playlist = await _playlistRepository.GetPlaylistAsync(id);

                if (playlist == null)
                {
                    return CreateFailureResponse(404, "Playlist with such an id was not found");
                }

                ReadPlaylistDTO result = new ReadPlaylistDTO()
                {
                    Id = playlist.Id,
                    Name = playlist.Name,
                    trackInfos = new List<ReadTrackInfoDTO>(),
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = playlist.User.Id,
                        Username = playlist.User.UserName
                    }
                };

                foreach (PlaylistTracks playlistTrack in playlist.PlaylistTracks)
                {
                    ReadTrackInfoDTO trackInfoDTO = new ReadTrackInfoDTO()
                    {
                        Id = playlistTrack.TrackInfo.Id,
                        TrackName = playlistTrack.TrackInfo.TrackName,
                        Band = playlistTrack.TrackInfo.Band,
                        Genre = playlistTrack.TrackInfo.Genre,
                        LinkToCover = playlistTrack.TrackInfo.LinkToCover,
                        LinkToTabs = playlistTrack.TrackInfo.LinkToTabs,
                        Author = new ReadTutorshipAuthorDTO()
                        {
                            Id = playlist.User.Id,
                            Username = playlist.User.UserName
                        }
                    };

                    result.trackInfos.Add(trackInfoDTO);
                }

                return CreateSuccessResponse(200, "Playlist retrieved successfully", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the playlist");
            }
        }
        public async Task<ServiceResponseDTO> AddPlaylistAsync(string name, int userId)
        {
            try
            {               

                Playlist playlist = new Playlist()
                {
                    Name = name,
                    UserId = userId
                };

                playlist = await _playlistRepository.AddPlaylistAsync(playlist);

                ReadPlaylistDTO result = new ReadPlaylistDTO()
                {
                    Id = playlist.Id,
                    Name = playlist.Name,
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = playlist.User.Id,
                        Username = playlist.User.UserName
                    }

                };

                return CreateSuccessResponse(201, "Playlist added successfully", result);

            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while adding the playlist");
            }
        }

        #endregion Methods
    }
}
