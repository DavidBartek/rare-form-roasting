using System.ComponentModel.DataAnnotations;

namespace RareFormRoasting.Models;

public class ShippingAddress
{
    public int Id { get; set; }

    [Required]

    public int UserProfileId { get; set; }

    public UserProfile? UserProfile { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "Address line 1 must be at least 1 character")]
    public string Address1 { get; set; }

    public string? Address2 { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "City must be at least 1 character")]
    public string City { get; set; }

    [Required]
    [StringLength(2, ErrorMessage = "State code must be 2 characters (e.g., 'CO'")]
    
    public string StateCode { get; set; }

    [Required]
    [MinLength(5, ErrorMessage = "Zip must be at least 5 characters")]
    public string Zip { get; set; }
    
    [Required]
    public bool IsActive { get; set; }
}