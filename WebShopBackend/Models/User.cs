using System.ComponentModel.DataAnnotations;
namespace WebShopBackend.Models;
public class User
{
    public int Id { get; set; }
    [Required][MaxLength(100)]
    public string Email { get; set; } = string.Empty;
    [Required][MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsAdmin { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<Order> Orders { get; set; } = new();
}