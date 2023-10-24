using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RareFormRoasting.Data;
using Microsoft.EntityFrameworkCore;
using RareFormRoasting.Models;

namespace RareFormRoasting.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private RareFormRoastingDbContext _dbContext;

    public OrderController(RareFormRoastingDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public IActionResult GetAllOrders()
    {
        return Ok(_dbContext.Orders.ToList());
    }

    // gets all non-current (submitted) orders, expanded to spec, for a given user.
    [HttpGet("noncurrent/{userId}")]
    [Authorize]
    public IActionResult GetUserOrders(int userId)
    {
        return Ok(_dbContext.Orders
            .Include(o => o.UserProfile)
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Product)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Weight)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Grind)
            .Where(o => o.IsCurrent == false)
            .Where(o => o.UserProfileId == userId)
            .ToList());
    }

    // adds an OrderProduct object to the database. Finds the logged-in user's currently-open Order to link.
    [HttpPost("addtocart/{userId}")]
    [Authorize]
    public IActionResult AddProductToCart (OrderProduct newOrderProduct, int userId)
    {
        Order foundOrder = _dbContext.Orders
            .Where(o => o.UserProfileId == userId)
            .SingleOrDefault(o => o.IsCurrent == true);

        newOrderProduct.OrderId = foundOrder.Id;
        _dbContext.OrderProducts.Add(newOrderProduct);
        _dbContext.SaveChanges();
        return Created($"/api/orderproduct/{newOrderProduct.Id}", newOrderProduct);
    }

    // Read by the cart. Finds the single currently-open Order for a given logged in user.
    [HttpGet("current/{userId}")]
    // [Authorize]
    public IActionResult GetCurrentUserOrder(int userId)
    {
        return Ok(_dbContext.Orders
            .Include(o => o.UserProfile)
            .Include(o => o.ShippingAddress) // will initially be null
            .Include(o => o.OrderProducts) // will initially be null, but built as user adds to cart
                .ThenInclude(o => o.Product)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Weight)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Grind)
            .Where(o => o.UserProfileId == userId)
            .SingleOrDefault(o => o.IsCurrent == true));
    }

}