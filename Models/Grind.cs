namespace RareFormRoasting.Models;

using System.ComponentModel.DataAnnotations;

public class Grind
{
    public int Id { get; set; }
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    
    public string GrindSetting { get; set; }
}