using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RareFormRoasting.Models;

public class OrderProduct
{
    public int Id { get; set; }

    [Required]
    public int OrderId { get; set; }

    public Order Order { get; set; }

    [Required]
    public int ProductId { get; set; }

    public Product Product { get; set; }

    [Required]
    public int WeightId { get; set; }

    public Weight Weight { get; set; }

    [Required]
    public int GrindId { get; set; }

    public Grind Grind { get; set; }

    [Required]
    [Range(1, 60)]
    public int ProductQuantity { get; set; }

    [NotMapped]
    public decimal Subtotal
    {
        get
        {
            decimal CalculatedPrice = 0M;

            if (Product != null && Weight != null && Grind != null)
            {
                CalculatedPrice += Product.Price * Weight.PriceMultiplier * ProductQuantity;
            }

            return CalculatedPrice;
        }
    }
}