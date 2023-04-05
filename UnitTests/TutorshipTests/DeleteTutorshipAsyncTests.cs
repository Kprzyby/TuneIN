using Data.Entities;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace UnitTests.TutorshipTests
{
    public class DeleteTutorshipAsyncTests : BaseTutorshipTests
    {
        [Fact]
        public async Task DeleteTutorshipAsync_WhenNotFound_ShouldFail()
        {
            //arrange
            int id = -1;
            Tutorship tutorship = null;

            tutorshipRepo.Setup(e => e.GetTutorshipAsync(id))
                .ReturnsAsync(tutorship);

            //act
            var result = await tutorshipService.DeleteTutorshipAsync(id);

            //assert
            Assert.False(result.IsSuccess);
            Assert.Equal<int>(404, result.StatusCode);

            tutorshipRepo.Verify(e => e.GetTutorshipAsync(id), Times.Once);
            tutorshipRepo.Verify(e => e.UpdateTutorshipAsync(It.IsAny<Tutorship>()), Times.Never);
        }

        [Fact]
        public async Task DeleteTutorshipAsync_WhenFound_ShouldDelete()
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

            tutorshipRepo.Setup(e => e.GetTutorshipAsync(id))
                .ReturnsAsync(tutorship);

            //act
            var result = await tutorshipService.DeleteTutorshipAsync(id);

            //assert
            Assert.True(result.IsSuccess);
            Assert.Equal<int>(204, result.StatusCode);

            tutorshipRepo.Verify(e => e.GetTutorshipAsync(id), Times.Once);
            tutorshipRepo.Verify(e => e.UpdateTutorshipAsync(It.IsAny<Tutorship>()), Times.Once);
        }
    }
}