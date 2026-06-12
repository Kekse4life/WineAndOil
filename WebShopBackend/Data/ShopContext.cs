using Microsoft.EntityFrameworkCore;
using WebShopBackend.Models;

namespace WebShopBackend.Data;

public class ShopContext : DbContext
{
    public ShopContext(DbContextOptions<ShopContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Premium Olivenöl",     Price = 18.50m, Category = "Öl",    ImageUrl = "wine01.jpeg" },
            new Product { Id = 2, Name = "Rotwein Riserva",      Price = 24.90m, Category = "Wein",  ImageUrl = "wine01.jpeg" },
            new Product { Id = 3, Name = "Weißwein Chardonnay",  Price = 14.20m, Category = "Wein",  ImageUrl = "wine01.jpeg" },
            new Product { Id = 4, Name = "Balsamico Essig",      Price = 12.00m, Category = "Essig", ImageUrl = "wine01.jpeg" }
        );
    }
}
