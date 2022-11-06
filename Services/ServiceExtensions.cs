using Data.CustomDataAttributes.InjectionAttributes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Services
{
    public static class ServiceExtensions
    {
        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            Type scoped = typeof(ScopedAttribute);

            var classes = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(s => s.GetTypes())
                    .Where(p => p.IsDefined(scoped, true) && !p.IsInterface)
                   .Select(s => new
                   {
                       Implementation = s
                   });

            foreach (var type in classes)
            {
                if (type.Implementation.IsDefined(scoped, false))
                {
                    services.AddScoped(type.Implementation);
                }
            }
        }
    }
}