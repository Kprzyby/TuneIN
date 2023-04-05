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
    public class AddTutorshipAsyncTests : BaseTutorshipTests
    {
        [Fact]
        public async Task AddTutorshipAsync_WhenAllIsGood_ShouldCreate()
        {
            //arrange
            CreateTutorshipDTO dto = new CreateTutorshipDTO()
            {
                Title = "Learn the guitar",
                Details = "I teach the guitar everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 59.99M,
                Category = "Music",
                CreatedById = 1
            };
            Tutorship tutorshipReturned = new Tutorship()
            {
                Id = 1,
                Title = "Learn the guitar",
                Details = "I teach the guitar everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 59.99M,
                Category = "Music",
                CreatedById = 1,
                CreatedBy = new User()
                {
                    Id = 1,
                    UserName = "NewUser123"
                }
            };

            tutorshipRepo.Setup(e => e.AddTutorshipAsync(It.IsAny<Tutorship>())).ReturnsAsync(tutorshipReturned);

            //act
            var result = await tutorshipService.AddTutorshipAsync(dto);

            //assert
            Assert.True(result.IsSuccess);
            Assert.Equal<int>(201, result.StatusCode);
            Assert.NotNull(result.Result);
            Assert.True(((ReadTutorshipDTO)result.Result).Id != default);

            tutorshipRepo.Verify(e => e.AddTutorshipAsync(It.IsAny<Tutorship>()), Times.Once);
        }
    }
}