using Data.DTOs.Tutorship;
using Data.Entities;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace UnitTests.TutorshipTests
{
    public class UpdateTutorshipAsyncTests : BaseTutorshipTests
    {
        [Fact]
        public async Task UpdateTutorshipAsync_WhenTutorshipNotFound_ShouldFail()
        {
            //arrange
            Tutorship tutorship = null;
            UpdateTutorshipDTO dto = new UpdateTutorshipDTO()
            {
                Id = -1,
                Title = "Learn the guitar",
                Details = "I teach the guitar everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 59.99M,
                Category = "Music"
            };

            tutorshipRepo.Setup(e => e.GetTutorshipAsync(dto.Id)).ReturnsAsync(tutorship);

            //act
            var result = await tutorshipService.UpdateTutorshipAsync(dto);

            //arrange
            Assert.False(result.IsSuccess);
            Assert.Equal<int>(404, result.StatusCode);
            Assert.Null(result.Result);

            tutorshipRepo.Verify(e => e.GetTutorshipAsync(dto.Id), Times.Once);
            tutorshipRepo.Verify(e => e.UpdateTutorshipAsync(It.IsAny<Tutorship>()), Times.Never);
        }

        [Fact]
        public async Task UpdateTutorshipAsync_WhenTutorshipFound_ShouldReturnIt()
        {
            //arrange
            UpdateTutorshipDTO dto = new UpdateTutorshipDTO()
            {
                Id = 1,
                Title = "Learn the guitar",
                Details = "I teach the guitar everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 59.99M,
                Category = "Music"
            };
            Tutorship tutorship = new Tutorship()
            {
                Id = 1,
                Title = "Learn the guitar",
                Details = "I teach the guitar everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 59.99M,
                Category = "Music",
                CreationDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                DeletedDate = null,
                CreatedById = 1,
                CreatedBy = new User()
                {
                    Id = 1,
                    UserName = "newUser123"
                }
            };

            tutorshipRepo.Setup(e => e.GetTutorshipAsync(dto.Id))
                .ReturnsAsync(tutorship);

            //act
            var result = await tutorshipService.UpdateTutorshipAsync(dto);

            //assert
            Assert.True(result.IsSuccess);
            Assert.Equal<int>(204, result.StatusCode);

            tutorshipRepo.Verify(e => e.GetTutorshipAsync(dto.Id), Times.Once);
            tutorshipRepo.Verify(e => e.UpdateTutorshipAsync(It.IsAny<Tutorship>()), Times.Once);
        }
    }
}