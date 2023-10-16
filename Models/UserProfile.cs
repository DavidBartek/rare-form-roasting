using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Identity;

namespace RareFormRoasting.Models;

public class UserProfile
{
    public int Id { get; set; }

    [Required]
    [NotNull]
    public string FirstName { get; set; }

    [Required]
    [NotNull]
    public string LastName { get; set; }

    public string FullName
    {
        get
        {
            return FirstName + " " + LastName;
        }
    }

    [NotMapped] // not mapped means that EF Core won't create column for this property in the db
    [EmailAddress]
    [MaxLength(100, ErrorMessage = "Email must be 100 characters or less")]
    public string Email { get; set; }

    [NotMapped]
    [MinLength(1, ErrorMessage = "Username must be at least 1 character")]
    [MaxLength(50, ErrorMessage = "Username must be 50 characters or less")]
    public string UserName { get; set; }

    [NotMapped]
    public List<string> Roles { get; set; }

    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    
    [Required]
    public bool IsActive { get; set; }

}