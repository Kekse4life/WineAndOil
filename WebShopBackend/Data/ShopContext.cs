using Microsoft.EntityFrameworkCore;
using WebShopBackend.Models;

namespace WebShopBackend.Data;

public class ShopContext : DbContext
{
    // WICHTIG: Der Parameter muss DbContextOptions<ShopContext> sein
    public ShopContext(DbContextOptions<ShopContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
}