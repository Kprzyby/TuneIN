using Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Hubs;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration((hostingContext, config) =>
{
    var env = hostingContext.HostingEnvironment;

    config.SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true) //load base settings
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true) //load local settings
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true) //load environment settings
                .AddEnvironmentVariables();
});

//builder.WebHost.ConfigureKestrel(options => options.Listen(System.Net.IPAddress.Parse("192.168.1.3"), 7074));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://thankful-forest-010f5cf0f.3.azurestaticapps.net")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                      });
});

//add DbContext
builder.Services.AddDbContext<DataContext>(e => e.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
/*
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptions => sqlServerOptions.EnableRetryOnFailure()));
*/

//DependencyInjection
builder.Services.RegisterServices(builder.Configuration);

//SignalR
builder.Services.AddSignalR().AddHubOptions<ChatHub>(options =>
{
    
});

//adding session
builder.Services.AddDistributedMemoryCache();

//adding authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.Name = "UserLoginCookie";
    options.SlidingExpiration = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.IsEssential = true;
    options.ExpireTimeSpan = new TimeSpan(0, 1, 0, 0);
    options.Events.OnRedirectToLogin = (context) =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Cookie.HttpOnly = true;
});

builder.Services.AddSession(options =>
{
    options.IdleTimeout = new TimeSpan(0, 30, 0);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

//apply migrations
DBPrep.ApplyMigrations(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

app.MapHub<ChatHub>("Services/ChatService");

app.MapControllers();

//app.Urls.Add("https://192.168.1.3:7074");

app.Run();