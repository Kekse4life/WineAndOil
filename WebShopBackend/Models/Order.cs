using System.ComponentModel.DataAnnotations;
namespace WebShopBackend.Models;
public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    [Required]
    public string Status { get; set; } = "Pending";
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Required][MaxLength(200)]
    public string ShippingAddress { get; set; } = string.Empty;
    [Required][MaxLength(100)]
    public string ShippingCity { get; set; } = string.Empty;
    [Required][MaxLength(20)]
    public string ShippingZip { get; set; } = string.Empty;
    [Required][MaxLength(100)]
    public string ShippingCountry { get; set; } = string.Empty;
    public List<OrderItem> Items { get; set; } = new();
}