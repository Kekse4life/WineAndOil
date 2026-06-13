using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebShopBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "diamond")]
public class UploadController : ControllerBase
{
    private readonly Cloudinary _cloudinary;

    public UploadController(IConfiguration config)
    {
        var account = new Account(
            config["Cloudinary__CloudName"],
            config["Cloudinary__ApiKey"],
            config["Cloudinary__ApiSecret"]
        );
        _cloudinary = new Cloudinary(account);
    }

    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Keine Datei hochgeladen.");

        using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "wineandoil",
            Transformation = new Transformation().Width(800).Height(800).Crop("fill")
        };

        var result = await _cloudinary.UploadAsync(uploadParams);

        if (result.Error != null)
            return BadRequest(result.Error.Message);

        return Ok(new { url = result.SecureUrl.ToString() });
    }
}