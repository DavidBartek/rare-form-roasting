using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RareFormRoasting.Models;

public class Order
{
    public int Id { get; set; }
    
    [Required]
    public int UserProfileId { get; set; }
    
    public UserProfile UserProfile { get; set; }
    
    [Required]
    public int ShippingAddressId { get; set; }
    
    public ShippingAddress ShippingAddress { get; set; }
    
    [Required]
    public DateTime DatePlaced { get; set; }
    
    public DateTime? DateShipped { get; set; }
    
    public int? SubscriptionId { get; set; }
    
    public Subscription? Subscription { get; set; }
    
    [Required]
    public bool IsCancelled { get; set; }

    public List<OrderProduct>? OrderProducts { get; set; }

    [NotMapped]
    public decimal TotalPrice
    {
        get
        {
            decimal CalculatedPrice = 0M;
            
            if (OrderProducts != null)
            {
                List<OrderProduct> MatchingOrderProducts = OrderProducts.Where(op => op.OrderId == Id).ToList();
                // more logic; account for quantity multiplier, weight multiplier
                // loop through the above list, += to CalculatedPrice

                foreach (OrderProduct op in MatchingOrderProducts)
                {
                    CalculatedPrice += op.Product.Price * op.Weight.PriceMultiplier * op.ProductQuantity;
                }

                return CalculatedPrice;
            }
            else
            {
                return CalculatedPrice;
            }

        }
    }
    // ^ make this a calculated getter property, referencing all related product.price through the OrderProduct join table
}





