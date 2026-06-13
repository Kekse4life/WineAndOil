using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShopBackend.Data;
using WebShopBackend.Models;

namespace WebShopBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ShopContext _db;

    public AdminController(ShopContext db)
    {
        _db = db;
    }

    // Alle Bestellungen sehen
    [HttpGet("orders")]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _db.Orders
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
        return Ok(orders);
    }

    // Bestellstatus ändern
    [HttpPut("orders/{id:int}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, UpdateStatusDto dto)
    {
        var order = await _db.Orders.FindAsync(id);
        if (order is null) return NotFound();
        order.Status = dto.Status;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // Alle User sehen
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _db.Users
            .Select(u => new { u.Id, u.Email, u.Name, u.IsAdmin, u.CreatedAt })
            .ToListAsync();
        return Ok(users);
    }

    // User zum Admin machen
    [HttpPut("users/{id:int}/admin")]
    public async Task<IActionResult> SetAdmin(int id, SetAdminDto dto)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        user.IsAdmin = dto.IsAdmin;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

public record UpdateStatusDto(string Status);
public record SetAdminDto(bool IsAdmin);