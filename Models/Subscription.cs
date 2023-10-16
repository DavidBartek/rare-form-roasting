using System.ComponentModel.DataAnnotations;

namespace RareFormRoasting.Models;

public class Subscription
{
    public int Id { get; set; }

    [Required]
    public int UserProfileId { get; set; }

    public UserProfile UserProfile { get; set; }

    [Required]
    public int SubscriptionTypeId { get; set; }

    public SubscriptionType SubscriptionType { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}