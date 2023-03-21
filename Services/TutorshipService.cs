using Common.Enums;
using Common.Helpers;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Tutorship;
using Data.DTOs.User;
using Data.Entities;
using Data.Repositories;
using System.ComponentModel;
using System.Reflection;
using X.PagedList;

namespace Services
{
    [ScopedAttribute]
    public class TutorshipService : BaseService
    {
        #region Constructors

        public TutorshipService(TutorshipRepository tutorshipRepo)
        {
            _tutorshipRepo = tutorshipRepo;
        }

        #endregion Constructors

        #region Properties

        private readonly TutorshipRepository _tutorshipRepo;

        #endregion Properties

        #region Methods

        public async Task<ReadTutorshipDTO> GetTutorshipAsync(int id)
        {
            try
            {
                Tutorship tutorship = await _tutorshipRepo.GetTutorshipAsync(id);

                if (tutorship == null)
                {
                    return null;
                }

                ReadTutorshipDTO result = new ReadTutorshipDTO()
                {
                    Id = tutorship.Id,
                    Title = tutorship.Title,
                    Details = tutorship.Details,
                    Price = tutorship.Price,
                    Category = tutorship.Category,
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = tutorship.CreatedBy.Id,
                        Username = tutorship.CreatedBy.UserName
                    }
                };

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<GetTutorshipsResponseDTO> GetTutorshipsAsync(GetTutorshipsDTO dto)
        {
            try
            {
                IQueryable<Tutorship> tutorships = _tutorshipRepo.GetTutorships();

                if (!String.IsNullOrEmpty(dto.CategoryFilterValue))
                {
                    tutorships = tutorships.Where(t => t.Category.ToUpper() == dto.CategoryFilterValue.ToUpper());
                }

                if (!String.IsNullOrEmpty(dto.TitleFilterValue))
                {
                    tutorships = tutorships.Where(t => t.Title.
                          ToUpper()
                          .StartsWith(dto.TitleFilterValue.ToUpper()));
                }

                if (dto.UserIdFilterValue != null)
                {
                    tutorships = tutorships.Where(t => t.CreatedBy.Id == dto.UserIdFilterValue);
                }

                if (dto.SortInfo == null)
                {
                    tutorships = tutorships.OrderBy(t => t.Title);
                }
                else
                {
                    List<KeyValuePair<string, string>> sortInfo = new List<KeyValuePair<string, string>>();

                    sortInfo.Add((KeyValuePair<string, string>)dto.SortInfo);

                    tutorships = SortingHelper<Tutorship>.Sort(tutorships, sortInfo);
                }

                GetTutorshipsResponseDTO response = new GetTutorshipsResponseDTO();
                response.TotalCount = tutorships.Count();
                response.PageNumber = dto.PageNumber;
                response.PageSize = dto.PageSize;
                response.TitleFilterValue = dto.TitleFilterValue;
                response.CategoryFilterValue = dto.CategoryFilterValue;
                response.SortInfo = dto.SortInfo;

                response.Tutorships = await tutorships.
                    Select(t => new ReadTutorshipDTO()
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Details = t.Details,
                        Price = t.Price,
                        Category = t.Category,
                        Author = new ReadTutorshipAuthorDTO()
                        {
                            Id = t.CreatedBy.Id,
                            Username = t.CreatedBy.UserName
                        }
                    })
                    .ToPagedListAsync(dto.PageNumber, dto.PageSize);

                return response;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ReadTutorshipDTO> AddTutorshipAsync(CreateTutorshipDTO dto)
        {
            try
            {
                Tutorship tutorship = new Tutorship()
                {
                    Title = dto.Title,
                    Details = dto.Details,
                    Price = dto.Price,
                    Category = dto.Category,
                    CreatedById = dto.CreatedById,
                    CreationDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                };

                tutorship = await _tutorshipRepo.AddTutorshipAsync(tutorship);

                ReadTutorshipDTO newTutorship = new ReadTutorshipDTO()
                {
                    Id = tutorship.Id,
                    Title = dto.Title,
                    Details = dto.Details,
                    Price = dto.Price,
                    Category = dto.Category,
                    Author = new ReadTutorshipAuthorDTO()
                    {
                        Id = tutorship.CreatedBy.Id,
                        Username = tutorship.CreatedBy.UserName
                    }
                };

                return newTutorship;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> UpdateTutorshipAsync(UpdateTutorshipDTO dto)
        {
            try
            {
                Tutorship oldTutorship = await _tutorshipRepo.GetTutorshipAsync(dto.Id);

                if (oldTutorship == null)
                {
                    return false;
                }

                oldTutorship.Title = dto.Title;
                oldTutorship.Details = dto.Details;
                oldTutorship.Price = dto.Price;
                oldTutorship.Category = dto.Category;
                oldTutorship.UpdatedDate = DateTime.Now;

                await _tutorshipRepo.UpdateTutorshipAsync(oldTutorship);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteTutorshipAsync(int id)
        {
            try
            {
                Tutorship tutorship = await _tutorshipRepo.GetTutorshipAsync(id);

                if (tutorship == null)
                {
                    return false;
                }

                tutorship.DeletedDate = DateTime.Now;

                await _tutorshipRepo.UpdateTutorshipAsync(tutorship);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<string> GetCategories()
        {
            try
            {
                FieldInfo fieldInfo;
                DescriptionAttribute[] describtionAttributes;
                List<string> categories = new List<string>();

                var enumValues = Enum.GetValues(typeof(TutorshipCategory));

                foreach (var value in enumValues)
                {
                    fieldInfo = typeof(TutorshipCategory).GetField(value.ToString());
                    describtionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

                    categories.Add(describtionAttributes[0].Description);
                }

                return categories;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion Methods
    }
}