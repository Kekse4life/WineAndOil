var builder = WebApplication.CreateBuilder(args);

// 1. CORS Policy definieren
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Dein React-Port
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// 2. CORS aktivieren (VOR MapControllers!)
app.UseCors("FrontendPolicy");

app.MapControllers();

app.Run();

