using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RareFormRoasting.Data;
using Microsoft.EntityFrameworkCore;
using RareFormRoasting.Models;

namespace RareFormRoasting.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShippingAddressController : ControllerBase
{
    private RareFormRoastingDbContext _dbContext;

    public ShippingAddressController(RareFormRoastingDbContext context)
    {
        _dbContext = context;
    }

    // get all addresses (for debugging)
    // [HttpGet]
    // public IActionResult GetAddresses()
    // {
    //     return Ok(_dbContext.ShippingAddresses.ToList());
    // }

    // get details by address id
    [HttpGet("{addressId}")]
    [Authorize]
    public IActionResult GetAddressDetails(int addressId)
    {
        ShippingAddress foundAddress = _dbContext.ShippingAddresses
            .Include(sa => sa.UserProfile)
            .SingleOrDefault(sa => sa.Id == addressId);

        if (foundAddress == null)
        {
            return NotFound();
        }

        return Ok(foundAddress);
    }
    
    // modify an existing address
    [HttpPut("{addressId}")]
    [Authorize]
    public IActionResult ModifyAddress(int addressId, [FromBody]ShippingAddress updatedAddress)
    {
        ShippingAddress foundAddress = _dbContext.ShippingAddresses.SingleOrDefault(sa => sa.Id == addressId);

        if (foundAddress == null)
        {
            return NotFound();
        }
        else if (addressId != updatedAddress.Id)
        {
            return BadRequest();
        }

        foundAddress.Address1 = updatedAddress.Address1;
        foundAddress.Address2 = updatedAddress.Address2;
        foundAddress.City = updatedAddress.City;
        foundAddress.StateCode = updatedAddress.StateCode;
        foundAddress.Zip = updatedAddress.Zip;

        _dbContext.SaveChanges();
        return NoContent();
    }

    // soft-delete address by id
    [HttpDelete("{addressId}")]
    [Authorize]
    public IActionResult DeleteAddress(int addressId)
    {
        ShippingAddress foundAddress = _dbContext.ShippingAddresses.SingleOrDefault(sa => sa.Id == addressId);

        if (foundAddress == null)
        {
            return NotFound();
        }

        foundAddress.IsActive = false;

        _dbContext.SaveChanges();
        return NoContent();
    }

    // create a new address tied to a particular user
    [HttpPost()]
    [Authorize]
    public IActionResult CreateAddress(ShippingAddress newAddress)
    {
        newAddress.IsActive = true;
        _dbContext.ShippingAddresses.Add(newAddress);
        _dbContext.SaveChanges();
        return Created($"/api/shippingaddress/{newAddress.Id}", newAddress);
    }
    
}