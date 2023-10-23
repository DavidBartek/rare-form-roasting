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

    // get all orders - admin only

}