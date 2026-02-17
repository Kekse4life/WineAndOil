namespace WebShopBackend.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; } // Platzhalter für Bild-Pfad
    public string Category { get; set; } = string.Empty;
}