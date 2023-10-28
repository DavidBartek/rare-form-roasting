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

    // get all weight configurations
    [HttpGet("weights")]
    public IActionResult GetAllWeights()
    {
        return Ok(_dbContext.Weights.ToList());
    }

    // gets a particular weight obj by id
    [HttpGet("weights/{weightId}")]
    public IActionResult GetWeightById(int weightId)
    {
        Weight foundWeight = _dbContext.Weights.SingleOrDefault(w => w.Id == weightId);

        if (foundWeight == null)
        {
            return NotFound();
        }

        return Ok(foundWeight);
    }

    // get all grind configurations
    [HttpGet("grinds")]
    public IActionResult GetAllGrinds()
    {
        return Ok(_dbContext.Grinds.ToList());
    }

    // gets all **live** products. For Product view.
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

    // gets single product info by id
    [HttpGet("{productId}")]
    public IActionResult GetProductDetails(int productId)
    {
        Product foundProduct = _dbContext.Products.SingleOrDefault(p => p.Id == productId);

        if (foundProduct == null)
        {
            return NotFound();
        }

        return Ok(foundProduct);        
    }

    // Admin-only
    // gets ALL products; query can specify live only
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAllProductsAdmin([FromQuery] string? sort)
    {
        List<Product> allProducts = _dbContext.Products
            .ToList();

        if (sort == null)
        {
            return Ok(allProducts);
        }
        else if (sort == "live")
        {
            return Ok(allProducts.Where(p => p.IsLive == true).ToList());
        }
        else
        {
            return BadRequest("Invalid 'sort' parameter.");
        }

    }

}