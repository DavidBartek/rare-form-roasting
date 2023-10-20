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
    // accepts params to sort/filter

    [HttpGet]
    public IActionResult GetAllLiveProducts(
        [FromQuery] string? sort)
    {
        List<Product> AllLiveProducts = _dbContext.Products
            .Where(p => p.IsLive == true)
            .ToList();

        if (sort == null)
        {
            return Ok(AllLiveProducts);
        }
        else if (sort == "featured")
        {
            return Ok(AllLiveProducts.Where(p => p.IsFeatured == true));
        }
        else if (sort == "alphabeticalaz")
        {
            return Ok(AllLiveProducts.OrderBy(p => p.DisplayName));
        }
        else if (sort == "alphabeticalza")
        {
            return Ok(AllLiveProducts.OrderByDescending(p => p.DisplayName));
        }
        else if (sort == "pricelowhigh")
        {
            return Ok(AllLiveProducts.OrderBy(p => p.Price));
        }
        else if (sort == "pricehighlow")
        {
            return Ok(AllLiveProducts.OrderByDescending(p => p.Price));
        }
        else
        {
            return Ok(AllLiveProducts);
        }

    }

}