using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Library;
using Data.DTOs.Playlist;
using Data.DTOs.Response;
using Data.DTOs.User;
using Data.Entities;
using Data.Repositories;
using X.PagedList;

using Data.DTOs.Response;
using Data.DTOs.Playlist;

using Common.Helpers;

namespace Services
{
    [ScopedAttribute]
    public class PlaylistService : BaseService
    {
        #region Properties

        private readonly PlaylistRepository _playlistRepository;
        private readonly TrackRepository _trackRepository;

        #endregion Properties

        #region Constructors

        public PlaylistService(PlaylistRepository playlistRepository, TrackRepository trackRepository)
        {
            _playlistRepository = playlistRepository;
            _trackRepository = trackRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<ServiceResponseDTO> GetPlaylistsAsync(GetPlaylistsDTO dto)
        {
            try
            {
                IQueryable<Playlist> playlists = _playlistRepository.GetPlaylists();

                //filtorwanie po użytkowniku
                playlists = playlists.Where(t => t.User.Id == dto.UserIdFilterValue);

                //filtrowanie i sortowanie po nazwie playlisty
                if (!String.IsNullOrEmpty(dto.PlaylistNameFilterValue))
                {
                    playlists = playlists.Where(t => t.Name.ToUpper().Contains(dto.PlaylistNameFilterValue.ToUpper()));
                    playlists = playlists.OrderBy(t => t.Name);
                }

                GetPlaylistsResponseDTO response = new GetPlaylistsResponseDTO();

                response.TotalCount = playlists.Count();
                response.PageNumber = dto.PageNumber;
                response.PageSize = dto.PageSize;
                response.PlaylistNameFilterValue = dto.PlaylistNameFilterValue;

                response.Playlists = await playlists.
                    Select(t => new PlaylistDTO()
                    {
                        Id = t.Id,
                        Name = t.Name,
                        UserId = t.UserId,
                        trackInfos = t.PlaylistTracks.Select(ti => new ReadTrackInfoDTO()
                        {
                            Id = ti.TrackInfo.Id,
                            TrackName = ti.TrackInfo.TrackName,
                            Band = ti.TrackInfo.Band,
                            Genre = ti.TrackInfo.Genre,
                            LinkToCover = ti.TrackInfo.LinkToCover,
                            LinkToTabs = ti.TrackInfo.LinkToTabs,
                            Author = new ReadTutorshipAuthorDTO()
                            {
                                Id = ti.TrackInfo.User.Id,
                                Username = ti.TrackInfo.User.UserName
                            }
                        }),
                    })
                    .ToPagedListAsync(dto.PageNumber, dto.PageSize);

                return CreateSuccessResponse(200, "Playlists retrieved successfully", response);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the playlists");
            }
        }

        public async Task<ServiceResponseDTO> GetPlaylistFilteredAsync(int id, GetPlaylistFilteredDTO dto)
        {
            try
            {
                Playlist playlist = await _playlistRepository.GetPlaylistAsync(id);

                if (playlist == null)
                {
                    return CreateFailureResponse(404, "Playlist with such an id was not found");
                }

                if (!String.IsNullOrEmpty(dto.TrackNameFilterValue))
                {
                    playlist.PlaylistTracks = playlist.PlaylistTracks
                        .Where(pt => pt.TrackInfo.TrackName.ToUpper().StartsWith(dto.TrackNameFilterValue.ToUpper()))
                        .ToList();
                }
                List<KeyValuePair<string, string>> sortInfo = new List<KeyValuePair<string, string>>();

                sortInfo.Add((KeyValuePair<string, string>)dto.SortInfo);

                playlist.PlaylistTracks = playlist.PlaylistTracks.OrderBy(pt => pt.TrackInfo.TrackName).ToList();

                if (sortInfo[0].Value == "asc")
                {
                    if (sortInfo[0].Key == "Genre")
                    {
                        playlist.PlaylistTracks = playlist.PlaylistTracks.OrderBy(pt => pt.TrackInfo.Genre).ToList();
                    }
                    else if (sortInfo[0].Key == "Band")
                    {
                        playlist.PlaylistTracks = playlist.PlaylistTracks.OrderBy(pt => pt.TrackInfo.Band).ToList();
                    }
                    else
                    {
                        playlist.PlaylistTracks = playlist.PlaylistTracks.OrderBy(pt => pt.TrackInfo.TrackName).ToList();
                    }
                }
                else if (sortInfo[0].Value == "desc")
                {
                    if (sortInfo[0].Key == "Genre")
                    {
                        playlist.PlaylistTracks = playlist.PlaylistTracks.OrderByDescending(pt => pt.TrackInfo.Genre).ToList();
                    }
                    else if (sortInfo[0].Key == "Band")
                    {
                        playlist.PlaylistTracks = playlist.PlaylistTracks.OrderByDescending(pt => pt.TrackInfo.Band).ToList();
                    }
                    else if (sortInfo[0].Key == "TrackName")
                    {
                        playlist.PlaylistTracks = playlist.PlaylistTracks.OrderByDescending(pt => pt.TrackInfo.TrackName).ToList();
                    }
                }

                GetPlaylistResponseDTO response = new GetPlaylistResponseDTO();
                response.Id = playlist.Id;
                response.Name = playlist.Name;
                response.TotalCount = playlist.PlaylistTracks.Count();
                response.TrackNameFilterValue = dto.TrackNameFilterValue;
                response.SortInfo = dto.SortInfo;
                response.Author = new ReadTutorshipAuthorDTO()
                {
                    Id = playlist.User.Id,
                    Username = playlist.User.UserName
                };
                response.TrackInfos = playlist.PlaylistTracks.Select(pt => new ReadTrackInfoDTO
                {
                    Id = pt.TrackInfo.Id,
                    TrackName = pt.TrackInfo.TrackName,
                    Band = pt.TrackInfo.Band,
                    Genre = pt.TrackInfo.Genre,
                    LinkToCover = pt.TrackInfo.LinkToCover,
                    LinkToTabs = pt.TrackInfo.LinkToTabs,
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = playlist.User.Id,
                        Username = playlist.User.UserName
                    }
                }).ToList();

                return CreateSuccessResponse(200, "Playlist retrieved successfully", response);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the playlist");
            }
        }

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

        public async Task<ServiceResponseDTO> GetPlaylistsDataAsync(string playlistName, int userId)
        {
            try
            {
                IQueryable<Playlist> playlists = _playlistRepository.GetPlaylists();

                playlists = playlists.Where(p => p.User.Id == userId);

                if (!String.IsNullOrEmpty(playlistName))
                {
                    playlists = playlists.Where(p => p.Name.StartsWith(playlistName));
                }

                List<GetPlaylistDataDTO> result = await playlists
                    .Select(p => new GetPlaylistDataDTO()
                    {
                        Id = p.Id,
                        Name = p.Name,
                        TrackAmount = p.PlaylistTracks.Count(),
                        Author = new ReadUserDTO()
                        {
                            Id = p.User.Id,
                            UserName = p.User.UserName
                        }
                    })
                    .ToListAsync();

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

        public async Task<bool> RemovePlaylistAsync(int id)
        {
            try
            {
                await _playlistRepository.RemoveByIdAndSaveChangesAsync(id);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public async Task<ServiceResponseDTO> UpdatePlaylistAsync(int id, string newName)
        {
            try
            {
                Playlist oldPlaylist = await _playlistRepository.GetPlaylistAsync(id);

                if (oldPlaylist == null)
                {
                    return CreateFailureResponse(404, "Playlist with such an id was not found");
                }

                oldPlaylist.Name = newName;

                await _playlistRepository.UpdateTrackInfoAsync(oldPlaylist);

                return CreateSuccessResponse(204, "");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while updating the playlist");
            }
        }

        public async Task<ServiceResponseDTO> AddTrackToPlaylistAsync(int playlistId, int trackId)
        {
            try
            {
                TrackInfo trackInfo = await _trackRepository.GetTrackAsync(trackId);

                if (trackInfo == null)
                {
                    return CreateFailureResponse(404, "Track with such an id was not found");
                }

                Playlist oldPlaylist = await _playlistRepository.GetPlaylistAsync(playlistId);

                if (oldPlaylist == null)
                {
                    return CreateFailureResponse(404, "Playlist with such an id was not found");
                }

                var isTrackInPlaylist = oldPlaylist.PlaylistTracks.Any(pt => pt.TrackInfoId == trackId && pt.PlaylistId == playlistId);

                if (isTrackInPlaylist)
                {
                    return CreateFailureResponse(404, "Track with such an id already exists in playlist");
                }

                var playlistTrack = new PlaylistTracks
                {
                    PlaylistId = playlistId,
                    TrackInfoId = trackId
                };

                oldPlaylist.PlaylistTracks.Add(playlistTrack);

                await _playlistRepository.UpdateTrackInfoAsync(oldPlaylist);

                return CreateSuccessResponse(204, "");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while updating the playlist");
            }
        }

        public async Task<ServiceResponseDTO> DeleteTrackFromPlaylistAsync(int playlistId, int trackId)
        {
            try
            {
                TrackInfo trackInfo = await _trackRepository.GetTrackAsync(trackId);

                if (trackInfo == null)
                {
                    return CreateFailureResponse(404, "Track with such an id was not found");
                }

                Playlist oldPlaylist = await _playlistRepository.GetPlaylistAsync(playlistId);

                if (oldPlaylist == null)
                {
                    return CreateFailureResponse(404, "Playlist with such an id was not found");
                }

                var playlistTrack = oldPlaylist.PlaylistTracks.FirstOrDefault(pt => pt.TrackInfoId == trackId);

                if (playlistTrack == null)
                {
                    return CreateFailureResponse(404, "Track doesn't exist in this playlist");
                }

                oldPlaylist.PlaylistTracks.Remove(playlistTrack);

                await _playlistRepository.UpdateTrackInfoAsync(oldPlaylist);

                return CreateSuccessResponse(204, "");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while updating the playlist");
            }
        }

        #endregion Methods
    }
}