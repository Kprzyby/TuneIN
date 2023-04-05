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
    public class GetTutorshipsAsyncTests : BaseTutorshipTests
    {
        #region Helper Methods

        public List<Tutorship> GetTutorshipList()
        {
            List<Tutorship> tutorships = new List<Tutorship>();

            Tutorship tutorship1 = new Tutorship()
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
            Tutorship tutorship2 = new Tutorship()
            {
                Id = 2,
                Title = "Learn the piano",
                Details = "I teach the piano everyone that is willing to learn. Reach out" +
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
            Tutorship tutorship3 = new Tutorship()
            {
                Id = 3,
                Title = "Learn to paint",
                Details = "I teach how to paint to everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 69.99M,
                Category = "Art",
                CreatedById = 1,
                CreatedBy = new User()
                {
                    Id = 1,
                    UserName = "NewUser123"
                }
            };
            Tutorship tutorship4 = new Tutorship()
            {
                Id = 4,
                Title = "Learn how to write novels",
                Details = "I teach wrtiting novels to everyone that is willing to learn. Reach out" +
                " to me if you are interested.",
                Price = 89.99M,
                Category = "Writing",
                CreatedById = 2,
                CreatedBy = new User()
                {
                    Id = 2,
                    UserName = "NovelWriter782"
                }
            };
            Tutorship tutorship5 = new Tutorship()
            {
                Id = 5,
                Title = "Painting lessons online",
                Details = "Painting is my passion and if it's yours too reach out to me and" +
                " I will teach you how to do it well.",
                Price = 59.99M,
                Category = "Art",
                CreatedById = 3,
                CreatedBy = new User()
                {
                    Id = 3,
                    UserName = "WOWPainter67"
                }
            };

            tutorships.Add(tutorship1);
            tutorships.Add(tutorship2);
            tutorships.Add(tutorship3);
            tutorships.Add(tutorship4);
            tutorships.Add(tutorship5);

            return tutorships;
        }

        public static IEnumerable<object[]> GenerateInputData()
        {
            List<object[]> inputData = new List<object[]>()
            {
                new object[]{3, 1, null, null, null, null, 3, new int[] {1,2,4}},
                new object[]{3, 2, null, null, null, null, 2, new int[] { 3,5 } },
                new object[]{2, 2, null, "Learn", null, null, 2, new int[]{2, 3} },
                new object[]{3, 1, null, null, "Music", null, 2, new int[]{1,2} },
                new object[]{10, 1, null, null, null, 1, 3, new int[]{1,2,3} }
            };

            return inputData;
        }

        #endregion Helper Methods

        #region Tests

        [Theory]
        [MemberData(nameof(GenerateInputData))]
        public async Task GetTutorshipsAsync_ShouldReturnTutorships(int pageSize, int pageNumber
            , KeyValuePair<string, string>? sortInfo, string? titleFilterValue
            , string? categoryFilterValue, int? userIdFilterValue, int expectedCount, int[] expectedIds)
        {
            //arrange
            GetTutorshipsDTO dto = new GetTutorshipsDTO()
            {
                PageSize = pageSize,
                PageNumber = pageNumber,
                SortInfo = sortInfo,
                TitleFilterValue = titleFilterValue,
                CategoryFilterValue = categoryFilterValue,
                UserIdFilterValue = userIdFilterValue
            };
            IQueryable<Tutorship> tutorships = GetTutorshipList().AsQueryable();

            tutorshipRepo
                .Setup(e => e.GetTutorships())
                .Returns(tutorships);
            //act
            var result = await tutorshipService.GetTutorshipsAsync(dto);

            //assert
            Assert.True(result.IsSuccess);
            Assert.Equal<int>(200, result.StatusCode);
            Assert.NotNull(result.Result);
            Assert.Equal<int>(expectedCount, ((GetTutorshipsResponseDTO)result.Result).Tutorships.Count());

            foreach (var tutorship in ((GetTutorshipsResponseDTO)result.Result).Tutorships)
            {
                Assert.True(expectedIds.Any(e => e == tutorship.Id));
            }

            tutorshipRepo.Verify(e => e.GetTutorships(), Times.Once);
        }

        #endregion Tests
    }
}