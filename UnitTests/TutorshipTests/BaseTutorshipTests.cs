using Data.IRepositories;
using Moq;
using Services;

namespace UnitTests.TutorshipTests
{
    public abstract class BaseTutorshipTests
    {
        #region Constructors

        protected BaseTutorshipTests()
        {
            tutorshipRepo = new Mock<ITutorshipRepository>();
            tutorshipService = new TutorshipService(tutorshipRepo.Object);
        }

        #endregion Constructors

        #region Properties

        protected readonly Mock<ITutorshipRepository> tutorshipRepo;
        protected readonly TutorshipService tutorshipService;

        #endregion Properties
    }
}