using Microsoft.EntityFrameworkCore;
using WebShopBackend.Models;
namespace WebShopBackend.Data;
public class ShopContext : DbContext
{
    public ShopContext(DbContextOptions<ShopContext> options) : base(options)
    {
    }
    public DbSet<Product> Products => Set<Product>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);
        modelBuilder.Entity<OrderItem>().Property(o => o.Price).HasPrecision(10, 2);
        modelBuilder.Entity<Order>().Property(o => o.Total).HasPrecision(10, 2);
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.OrderId);
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId);
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Premium Olivenöl",    Price = (decimal)18.50, Category = "Öl",    ImageUrl = "wine01.jpeg" },
            new Product { Id = 2, Name = "Rotwein Riserva",     Price = (decimal)24.90, Category = "Wein",  ImageUrl = "wine01.jpeg" },
            new Product { Id = 3, Name = "Weißwein Chardonnay", Price = (decimal)14.20, Category = "Wein",  ImageUrl = "wine01.jpeg" },
            new Product { Id = 4, Name = "Balsamico Essig",     Price = (decimal)12.00, Category = "Essig", ImageUrl = "wine01.jpeg" }
        );
    }
}