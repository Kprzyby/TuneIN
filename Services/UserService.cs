using Common.Helpers;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Response;
using Data.DTOs.User;
using Data.Entities;
using Data.Repositories;
using Microsoft.EntityFrameworkCore;
using X.PagedList;

namespace Services
{
    [ScopedAttribute]
    public class UserService : BaseService
    {
        #region Constructors

        public UserService(UserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        #endregion Constructors

        #region Properties

        private readonly UserRepository _userRepository;

        #endregion Properties

        #region Methods

        public async Task<ServiceResponseDTO> GetUserAsync(string email, int? id)
        {
            try
            {
                User user;

                if (id != null)
                {
                    user = await _userRepository.GetByIdAsync((int)id);
                }
                else
                {
                    user = await _userRepository.GetUserByEmailAsync(email);
                }

                if (user == null)
                {
                    return CreateFailureResponse(404, "User was not found");
                }

                ReadUserDTO result = new ReadUserDTO()
                {
                    Id = user.Id,
                    UserRole = user.UserRole,
                    UserName = user.UserName,
                    Email = user.Email,
                    AvatarId = user.AvatarId,
                };

                return CreateSuccessResponse(200, "User found", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while loading the user");
            }
        }

        public async Task<ServiceResponseDTO> GetAllUsersAsync(GetAllUsersDTO dto)
        {
            try
            {
                IQueryable<User> users = _userRepository.GetAllUsers();

                if (!String.IsNullOrEmpty(dto.UsernameFilterValue))
                {
                    users = users
                        .Where(u => u.UserName.ToUpper()
                                .StartsWith(dto.UsernameFilterValue.ToUpper()));
                }

                if (!String.IsNullOrEmpty(dto.EmailFilterValue))
                {
                    users = users
                        .Where(u => u.Email.ToUpper()
                            .StartsWith(dto.EmailFilterValue.ToUpper()));
                }

                if (dto.SortInfo == null)
                {
                    users = users
                        .OrderBy(u => u.UserName);
                }
                else
                {
                    List<KeyValuePair<string, string>> sortValues = dto.SortInfo;

                    users = SortingHelper<User>.Sort(users, sortValues);
                }

                GetUsersResponseDTO response = new GetUsersResponseDTO();
                response.TotalCount = users.Count();
                response.PageSize = dto.PageSize;
                response.PageNumber = dto.PageNumber;
                response.SortInfo = dto.SortInfo;
                response.UsernameFilterValue = dto.UsernameFilterValue;
                response.EmailFilterValue = dto.EmailFilterValue;

                response.Users = await users
                    .Select(u => new ReadUserDTO()
                    {
                        Id = u.Id,
                        Email = u.Email,
                        UserName = u.UserName,
                        UserRole = u.UserRole,
                        AvatarId = u.AvatarId
                    })
                    .ToPagedListAsync(dto.PageNumber, dto.PageSize);

                return CreateSuccessResponse(200, "Users loaded successfully", response);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while loading users");
            }
        }

        public async Task<ServiceResponseDTO> GetAllUsernamesAsync()
        {
            try
            {
                IQueryable<User> users = _userRepository.GetAllUsers();

                var result = await users
                    .Select(u => u.UserName)
                    .ToListAsync();

                return CreateSuccessResponse(200, "Usernames loaded successfully", result);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while getting usernames");
            }
        }

        public async Task<ServiceResponseDTO> UpdateAvatarAsync(UpdateAvatarDTO dto)
        {
            try
            {
                if (dto.AvatarId < 0 || dto.AvatarId > 5)
                {
                    return CreateFailureResponse(400, "Avatar id has to be an integer greater or equal to 0 and less or equal to 5");
                }

                User user = await _userRepository
                    .GetUserByIdAsync(dto.UserId);

                if (user == null)
                {
                    CreateFailureResponse(404, "User with such id was not found");
                }

                user.AvatarId = dto.AvatarId;

                await _userRepository
                    .UpdateUserAsync(user);

                return CreateSuccessResponse(204, "");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while updating the avatar");
            }
        }

        public async Task<ServiceResponseDTO> UpdateUsernameAsync(UpdateUsernameDTO dto)
        {
            try
            {
                User user = await _userRepository.GetUserByIdAsync(dto.UserId);

                if (user == null)
                {
                    CreateFailureResponse(404, "User with such id was not found");
                }

                user.UserName = dto.Username;

                await _userRepository.UpdateUserAsync(user);

                return CreateSuccessResponse(204, "");
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while updating the username");
            }
        }

        #endregion Methods
    }
}