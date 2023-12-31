using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RareFormRoasting.Models;

public class Order
{
    public int Id { get; set; }
    
    [Required]
    public int UserProfileId { get; set; }
    
    public UserProfile? UserProfile { get; set; }
    
    public int? ShippingAddressId { get; set; }
    
    public ShippingAddress? ShippingAddress { get; set; }
    
    public DateTime? DatePlaced { get; set; }
    
    public DateTime? DateShipped { get; set; }
    
    public int? SubscriptionId { get; set; }
    
    [Required]
    public bool IsCurrent { get; set; }
    
    [Required]
    public bool IsCancelled { get; set; }

    public List<OrderProduct>? OrderProducts { get; set; }

    [NotMapped]
    public decimal? TotalPrice
    {
        get
        {
            decimal CalculatedPrice = 0M;
            
            if (OrderProducts != null)
            {
                // List<OrderProduct> MatchingOrderProducts = OrderProducts.Where(op => op.OrderId == Id).ToList();
                // more logic; account for quantity multiplier, weight multiplier
                // loop through the above list, += to CalculatedPrice

                foreach (OrderProduct op in OrderProducts)
                {
                    // CalculatedPrice += op.Product.Price * op.Weight.PriceMultiplier * op.ProductQuantity;
                    if (op.Product != null && op.Weight != null && op.Grind != null)
                    {
                        CalculatedPrice += op.Product.Price * op.Weight.PriceMultiplier * op.ProductQuantity;
                    }
                }

            }

            return CalculatedPrice;

        }
    }

    [NotMapped]
    public string? OrderStatus
    {
        get
        {
            if (IsCancelled)
            {
                return "Cancelled";
            }
            else if (IsCurrent == true)
            {
                return "Being created by user";
            }
            else if (DateShipped == null)
            {
                return "Processing";
            }
            else if (DateShipped <= DateTime.Today)
            {
                return "Shipped";
            }
            
            return "Unknown";
            
        }
    }
}





