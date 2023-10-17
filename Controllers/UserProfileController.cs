using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RareFormRoasting.Data;
using Microsoft.EntityFrameworkCore;
using RareFormRoasting.Models;

namespace RareFormRoasting.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private RareFormRoastingDbContext _dbContext;

    public UserProfileController(RareFormRoastingDbContext context)
    {
        _dbContext = context;
    }

    // get all users
    [HttpGet]
    // [Authorize(Roles = "Admin")]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    // get all users, roles included if specified
    // a very inefficient way of retrieving this data, but without much complexity (relatively).
    [HttpGet("withroles")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    // get all addresses (test)
    [HttpGet("addresses")]
    public IActionResult GetAllAddresses()
    {
        return Ok(_dbContext.ShippingAddresses.ToList());
    }

    // get all addresses associated with a user id
    [HttpGet("{userId}/addresses")]
    // [Authorize]
    public IActionResult GetUserAddresses(int userId)
    {
        List<ShippingAddress> foundAddresses = _dbContext.ShippingAddresses
            .Where(sa => sa.UserProfileId == userId)
            .ToList();

        if (foundAddresses == null || !foundAddresses.Any())
        {
            return NotFound("No addresses found for this user.");
        }

        return Ok(foundAddresses);
    }

}