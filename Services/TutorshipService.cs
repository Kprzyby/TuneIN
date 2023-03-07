using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Tutorship;
using Data.DTOs.User;
using Data.Entities;
using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    [ScopedAttribute]
    public class TutorshipService
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

        #endregion Methods
    }
}