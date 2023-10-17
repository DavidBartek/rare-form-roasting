namespace RareFormRoasting.Models;

using System.ComponentModel.DataAnnotations;

public class Grind
{
    public int Id { get; set; }
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(50, ErrorMessage = "Must be 50 or fewer characters.")]
    
    public string GrindSetting { get; set; }
}