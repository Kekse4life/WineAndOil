using Microsoft.AspNetCore.Mvc;
using WebShopBackend.Models;

namespace WebShopBackend.Controllers;

[ApiController]
[Route("api/[controller]")] // Erreichbar unter /api/products
public class ProductsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        var products = new List<Product>
        {
            new Product { Id = 1, Name = "Premium Olivenöl", Price = 18.50m, Category = "Öl" },
            new Product { Id = 2, Name = "Rotwein Riserva", Price = 24.90m, Category = "Wein" },
            new Product { Id = 3, Name = "Weißwein Chardonnay", Price = 14.20m, Category = "Wein" },
            new Product { Id = 4, Name = "Balsamico Essig", Price = 12.00m, Category = "Essig" }
        };

        return Ok(products);
    }

    public ActionResult SeedDatabase()
    {
        //TODO: Implement Database seeding
        return Ok("Database seeded with sample products.");
    }
}