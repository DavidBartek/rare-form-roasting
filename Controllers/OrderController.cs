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

    // for debugging - get all orders
    // [HttpGet]
    // public IActionResult GetAllOrders()
    // {
    //     return Ok(_dbContext.Orders.ToList());
    // }

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
    [Authorize]
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

    // Read by order confirmed placed page. Gets single just-placed order - find by userId
    [HttpGet("complete/{userId}")]
    [Authorize]
    public IActionResult GetCompletedOrder(int userId)
    {
        Order mostRecentOrder = _dbContext.Orders
            .Include(o => o.UserProfile)
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Product)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Weight)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Grind)
            .Where(o => o.UserProfileId == userId)
            .Where(o => o.IsCurrent == false)
            .OrderByDescending(o => o.Id) // finds the most recent by highest ID in database (cannot use DatePlaced if multiple orders placed in same day)
            .FirstOrDefault();

        if (mostRecentOrder == null)
        {
            return NotFound();
        }

        return Ok(mostRecentOrder);
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

    // final order submission - really just changes a few props on a mostly-complete order object
    [HttpDelete("submit/{orderId}")]
    [Authorize]
    public IActionResult SubmitOrder(int orderId, [FromQuery] int addressId)
    {
        Order foundOrder = _dbContext.Orders.SingleOrDefault(o => o.Id == orderId);
        
        if (foundOrder == null)
        {
            return NotFound();
        }

        // 'closes out' this order
        foundOrder.ShippingAddressId = addressId;
        foundOrder.DatePlaced = DateTime.Today;
        foundOrder.IsCurrent = false;

        // creates a new empty order object so the system doesn't break
        _dbContext.Orders.Add(new Order
        {
            UserProfileId = foundOrder.UserProfileId,
            IsCurrent = true,
            IsCancelled = false
        });

        _dbContext.SaveChanges();

        return NoContent();
    }


    // Admin-only endpoints
    
    // Admin-only
    // Get all orders - filterable/orderable: 
    // - all (newest to oldest),
    // - all (oldest to newest), 
    // - unfulfilled (oldest to newest), 
    // - completed (newest to oldest)
    // - cancelled (newest to oldest)
    // note: no filter will show "being created" orders
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAllOrdersAdmin([FromQuery] string? sort)
    {
        List<Order> allOrders = _dbContext.Orders
            .Include(o => o.UserProfile)
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Product)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Weight)
            .Include(o => o.OrderProducts)
                .ThenInclude(o => o.Grind)
            .Where(o => o.IsCurrent == false)
            .ToList();

        if (sort == null || sort == "allnewtoold")
        {
            return Ok(allOrders.OrderByDescending(o => o.Id));
        }
        else if (sort == "alloldtonew")
        {
            return Ok(allOrders.OrderBy(o => o.Id));
        }
        else if (sort == "unfulfilled")
        {
            return Ok(allOrders.OrderBy(o => o.Id).Where(o => o.OrderStatus == "Processing"));
        }
        else if (sort == "fulfilled")
        {
            return Ok(allOrders.OrderByDescending(o => o.Id).Where(o => o.OrderStatus == "Shipped"));
        }
        else if (sort == "cancelled")
        {
            return Ok(allOrders.OrderByDescending(o => o.Id).Where(o => o.OrderStatus == "Cancelled"));
        }
        else
        {
            return BadRequest("Invalid 'sort' parameter.");
        }
    }
}