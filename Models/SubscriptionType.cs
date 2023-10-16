using System.ComponentModel.DataAnnotations;

namespace RareFormRoasting.Models;

public class SubscriptionType
{
    public int Id { get; set; }

    [Required]
    [Range(1, 4)]
    public int FrequencyWeeks { get; set; }
}