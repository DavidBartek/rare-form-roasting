using System.ComponentModel.DataAnnotations;

namespace RareFormRoasting.Models;

public class Product
{
    public int Id { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string DisplayName { get; set; }
    
    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string Country { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string LocationString { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string FarmString { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string Process { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string Varietal { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(75, ErrorMessage = "Must be 75 characters or less.")]
    public string ElevationRangeMASL { get; set; }
    
    
    [Required]
    public DateTime DateAdded { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(100, ErrorMessage = "Must be 100 characters or less.")]
    public string TastingNotes { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    [MaxLength(3500, ErrorMessage = "Must be 3500 characters or less.")]
    public string DescriptionString { get; set; }
    
    [Required]
    [MinLength(1, ErrorMessage = "Must be 1 or more characters.")]
    public string ImageLocation { get; set; }
    
    [Required]
    public bool IsFeatured { get; set; }
    
    [Required]
    public bool IsLive { get; set; }
}