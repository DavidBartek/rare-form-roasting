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

    // subtracts 1 from the quantity of an OrderProduct object
    [HttpDelete("subtract/{opId}")]
    [Authorize]
    public IActionResult SubtractOne(int opId)
    {
        OrderProduct orderProductToChange = _dbContext.OrderProducts.SingleOrDefault(op => op.Id == opId);

        if (orderProductToChange == null)
        {
            return NotFound();
        }

        orderProductToChange.ProductQuantity -= 1;
        _dbContext.SaveChanges();

        return NoContent();
    }

    // adds 1 to the quantity of an OrderProduct object
    [HttpDelete("add/{opId}")]
    [Authorize]
    public IActionResult AddOne(int opId)
    {
        OrderProduct orderProductToChange = _dbContext.OrderProducts.SingleOrDefault(op => op.Id == opId);

        if (orderProductToChange == null)
        {
            return NotFound();
        }

        orderProductToChange.ProductQuantity += 1;
        _dbContext.SaveChanges();

        return NoContent();
    }

    // hard delete - deletes OrderProduct obj by id
    [HttpDelete("delete/{opId}")]
    [Authorize]
    public IActionResult DeleteOrderProduct(int opId)
    {
        OrderProduct orderProductToDelete = _dbContext.OrderProducts.SingleOrDefault(op => op.Id == opId);

        if (orderProductToDelete == null)
        {
            return NotFound();
        }

        _dbContext.OrderProducts.Remove(orderProductToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }


}