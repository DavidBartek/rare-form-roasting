using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RareFormRoasting.Data;
using Microsoft.EntityFrameworkCore;
using RareFormRoasting.Models;

namespace RareFormRoasting.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private RareFormRoastingDbContext _dbContext;

    public ProductController(RareFormRoastingDbContext context)
    {
        _dbContext = context;
    }

    // gets all **live** products

    [HttpGet]
    public IActionResult GetAllLiveProducts()
    {
        return Ok(_dbContext.Products
            .Where(p => p.IsLive == true)
            .ToList());
    }

}