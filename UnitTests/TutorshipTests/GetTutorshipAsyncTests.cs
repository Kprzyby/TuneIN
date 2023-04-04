using Data.DTOs.Tutorship;
using Data.Entities;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace UnitTests.TutorshipTests
{
    public class GetTutorshipAsyncTests : BaseTutorshipTests
    {
        [Fact]
        public async Task GetTutorshipAsync_WhenDoesntExist_ShouldFail()
        {
            //arrange
            int id = -1;
            Tutorship tutorship = null;

            tutorshipRepo.Setup(e => e.GetTutorshipAsync(id)).ReturnsAsync(tutorship);

            //act
            var result = await tutorshipService.GetTutorshipAsync(id);

            //assert
            Assert.False(result.IsSuccess);
            Assert.Null(result.Result);
            Assert.Equal<int>(404, result.StatusCode);

            tutorshipRepo.Verify(e => e.GetTutorshipAsync(id), Times.Once);
        }

        [Fact]
        public async Task GetTutorshipAsync_WhenExists_ShouldReturnIt()
        {
            //arrange
            int id = 1;
            Tutorship tutorship = new Tutorship()
            {
                Id = id,
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

            tutorshipRepo.Setup(e => e.GetTutorshipAsync(id)).ReturnsAsync(tutorship);

            //act
            var result = await tutorshipService.GetTutorshipAsync(id);

            //assert
            Assert.True(result.IsSuccess);
            Assert.NotNull(result.Result);
            Assert.Equal<int>(200, result.StatusCode);
            Assert.Equal<int>(id, ((ReadTutorshipDTO)result.Result).Id);

            tutorshipRepo.Verify(e => e.GetTutorshipAsync(id), Times.Once);
        }
    }
}