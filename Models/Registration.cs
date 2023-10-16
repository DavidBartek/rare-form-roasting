using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace RareFormRoasting.Models;

public class Registration
{
    [Required]
    [EmailAddress]
    [MaxLength(100, ErrorMessage = "Email must be 100 characters or less")]
    public string Email { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    [MaxLength(20, ErrorMessage = "Password must be 20 characters or less")]
    public string Password { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "Username must be at least 1 character")]
    [MaxLength(50, ErrorMessage = "Username must be 50 characters or less")]
    public string UserName { get; set; }

    [Required]
    [NotNull]
    public string FirstName { get; set; }

    [Required]
    [NotNull]
    public string LastName { get; set; }

}