using System.Collections.Generic;
using Xunit;

namespace UnitTests.TutorshipTests
{
    public class GetCategoriesTests : BaseTutorshipTests
    {
        [Fact]
        public void GetCategories_WhenAllIsGood_ShouldReturnCategories()
        {
            //arrange

            //act
            var result = tutorshipService.GetCategories();

            //assert
            Assert.True(result.IsSuccess);
            Assert.Equal<int>(200, result.StatusCode);
            Assert.NotNull(result.Result);
            Assert.NotEmpty((List<string>)result.Result);
        }
    }
}