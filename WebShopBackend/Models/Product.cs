using System.ComponentModel.DataAnnotations;

namespace WebShopBackend.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Range(0, 100000)]
    public decimal Price { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    [Required]
    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;
}
