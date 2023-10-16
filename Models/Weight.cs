namespace RareFormRoasting.Models;

using System;
using System.ComponentModel.DataAnnotations;

public class Weight
{
    public int Id { get; set; }

    [Required]
    [Range(6, 24)]
    public int WeightOz { get; set; }

    [Required]
    public int PriceMultiplier { get; set; }
}