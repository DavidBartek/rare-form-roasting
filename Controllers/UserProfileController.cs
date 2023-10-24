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

    // get all users (admin only)
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult GetUser()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    // get all users with their hidden properties which are mapped only in IdentityUser (email, roles)
    // a very inefficient way of retrieving this data, but without much complexity (relatively).
    [HttpGet("withrolesandemail")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetUsersWithRolesAndEmail()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    // get non-hidden details for a single user
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetUser(int id)
    {
        UserProfile foundUserProfile = _dbContext
            .UserProfiles
            .Include(up => up.Orders)
            .Include(up => up.ShippingAddresses)
            .SingleOrDefault(up => up.Id == id);

        if (foundUserProfile == null)
        {
            return NotFound();
        }

        return Ok(foundUserProfile);
    }

    // gets all details - hidden and non-hidden - for a single user
    [HttpGet("{id}/withrolesandemail")]
    [Authorize]
    public IActionResult GetUserWithRolesAndEmail(int id)
    {
        UserProfile foundUser = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .Include(up => up.Orders)
            .Include(up => up.ShippingAddresses)
            .Select(up => new UserProfile
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Email = up.IdentityUser.Email,
                Orders = up.Orders,
                ShippingAddresses = up.ShippingAddresses.Where(sa => sa.IsActive == true).ToList(),
                IdentityUserId = up.IdentityUserId,
                Roles = _dbContext.UserRoles
                .Where(ur => ur.UserId == up.IdentityUserId)
                .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name).ToList()
            })
            .SingleOrDefault(up => up.Id == id);

        if (foundUser == null)
        {
            return NotFound();
        }

        return Ok(foundUser);
    }

    // modify a given user's details

    [HttpPut("{userId}")]
    [Authorize]
    public IActionResult ChangeUserDetails(
        int userId, 
        [FromQuery] string newFirst, 
        [FromQuery] string newLast, 
        [FromQuery] string newEmail)
    {
        UserProfile foundUserProfile = _dbContext.UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == userId);

        if (foundUserProfile == null)
        {
            return NotFound();
        }

        foundUserProfile.FirstName = newFirst;
        foundUserProfile.LastName = newLast;
        foundUserProfile.IdentityUser.Email = newEmail;

        _dbContext.SaveChanges();

        return NoContent();
    }

}