using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RareFormRoasting.Models;
using Microsoft.AspNetCore.Identity;

namespace RareFormRoasting.Data;
public class RareFormRoastingDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Grind> Grinds { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ShippingAddress> ShippingAddresses { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<SubscriptionProduct> SubscriptionProducts { get; set; }
    public DbSet<SubscriptionType> SubscriptionTypes { get; set; }
    public DbSet<Weight> Weights { get; set; }

    public RareFormRoastingDbContext(DbContextOptions<RareFormRoastingDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            Email = "david@rfr.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "David",
            LastName = "Bartek",
            IsActive = true
        });
        modelBuilder.Entity<Grind>().HasData(new Grind[]
        {
            new Grind {Id = 1, GrindSetting = "Whole Bean"},
            new Grind {Id = 2, GrindSetting = "French Press (Coarse)"},
            new Grind {Id = 3, GrindSetting = "Drip (Medium Coarse)"},
            new Grind {Id = 4, GrindSetting = "Pourover (Medium)"},
            new Grind {Id = 5, GrindSetting = "Aeropress (Medium Fine)"},
            new Grind {Id = 6, GrindSetting = "Espresso (Fine)"}
        });
        modelBuilder.Entity<Weight>().HasData(new Weight[]
        {
            new Weight {Id = 1, WeightOz = 12, PriceMultiplier = 1M},
            new Weight {Id = 2, WeightOz = 24, PriceMultiplier = 1.95M}
        });
        modelBuilder.Entity<ShippingAddress>().HasData(new ShippingAddress[]
        {
            new ShippingAddress 
            {
                Id = 1, 
                UserProfileId = 1, 
                Address1 = "214 Chamberlin St", 
                City = "Nashville", 
                StateCode = "TN", 
                Zip = "37209", 
                IsActive = true
            },
            new ShippingAddress 
            {
                Id = 2, 
                UserProfileId = 1, 
                Address1 = "12405 W 19th Pl", 
                City = "Lakewood", 
                StateCode = "CO", 
                Zip = "80215", 
                IsActive = true
            }
        });
        modelBuilder.Entity<Product>().HasData(new Product[]
        {
            new Product 
            {
                Id = 1, 
                DisplayName = "Ethiopia Hambela Buliye", 
                Price = 22.00M, 
                Country = "Ethiopia", 
                LocationString = "Buliye Kebele, Shakiso, Guji", 
                FarmString = "Hambela Buliye", 
                Process = "Dry Process (Natural)", 
                Varietal = "Heirloom", 
                ElevationRangeMASL = "2170", 
                DateAdded = new DateTime(2023, 7, 1), 
                TastingNotes = "Strawberry, blueberry, nectarine, cranberry, tart golden plum", 
                DescriptionString = "Fruit-forward and aromatic, this Ethiopian arrival expresses fruit flavors like strawberry hard candy, blueberry, nectarine, cranberry, and tart golden plum that are very clean for a dry process coffee.", 
                ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853881/Coffee%20Labels/Label_Web_Ethiopia-Hambela-Buliye_1000_x_1000_px_iacfun.png", 
                IsFeatured = false, 
                IsLive = true
            },
            new Product 
            {
                Id = 2, 
                DisplayName = "Colombia Inza Las Estrellas", 
                Price = 18.00M, 
                Country = "Colombia", 
                LocationString = "San Antonio and San Rafael, Inza, Cauca", 
                FarmString = "Las Estrellas", 
                Process = "Wet Process (Washed)", 
                Varietal = "Caturra, Typica, Hybrid", 
                ElevationRangeMASL = "1500-2000", 
                DateAdded = new DateTime(2023, 5, 1), 
                TastingNotes = "Red apple, tangy golden plum, dried apricot, stone fruit, wine", 
                DescriptionString = "A regional blend of high scoring coffees from Inza, Cuaca. The cup sweetness is honeyed, with substantial fruit flavors that are slightly winey as you move through the cup. Red apple, tangy golden plum, dried apricots, and juicy acidic impression like stone fruits.", 
                ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853882/Coffee%20Labels/Label_Web_Colombia_Inza_Las_Estrellas_1000_x_1000_px_gmdoqp.png", 
                IsFeatured = false, 
                IsLive = true
            },
            new Product 
            {
                Id = 3, 
                DisplayName = "Kenya Kirinyaga Kamwangi Peaberry", 
                Price = 21.00M, 
                Country = "Kenya", 
                LocationString = "Kirinyaga", 
                FarmString = "Kamwangi Factory", 
                Process = "Wet Process (Washed)", 
                Varietal = "Bourbon (SL-28, SL-34, Ruiru-11) peaberry", 
                ElevationRangeMASL = "1800-2000", 
                DateAdded = new DateTime(2023, 6, 1), 
                TastingNotes = "Naval orange, lemon custard, orange marmalade, tart fresh squeezed lemon, all-spice, cardamom", 
                DescriptionString = "Deliciously fruited. Has a spiced-fruit scent, the dry fragrance perfumed with spiced tropical bunch and a cherry accent. Accents of naval orange, lemon custard, orange marmalade, tart fresh squeezed lemon, and a dusting of all-spice and cardamom. Light and bright.", 
                ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853882/Coffee%20Labels/Label_Web_Kenya_Kirinyaga_Kamwangi_Peaberry_1000_x_1000_px_plnf5e.png", 
                IsFeatured = false, 
                IsLive = true
            },
            new Product 
            {
                Id = 4, 
                DisplayName = "Nicaragua La Bastilla Centroamericano", 
                Price = 20.00M, 
                Country = "Nicaragua", 
                LocationString = "Jinotega", 
                FarmString = "La Bastilla Coffee Estates", 
                Process = "Wet Process (Washed)", 
                Varietal = "Centroamericano", 
                ElevationRangeMASL = "1300-1500", 
                DateAdded = new DateTime(2023, 10, 1), 
                TastingNotes = "Chocolate, peach, vanilla, almond, golden raisin", 
                DescriptionString = "Finca La Bastilla is a tropical paradise founded on deep, favorable volcanic soils, creating the perfect environment for world-renowned coffees. This wonderful, bright, medium-bodied coffee has intense notes of chocolate, peach, vanilla, almond, and golden raisin.", 
                ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853882/Coffee%20Labels/Label_Web_Nicaragua_La_Bastilla_Centroamericano_1000_x_1000_px_ffjizg.png", 
                IsFeatured = true, 
                IsLive = true
            }
        });
        modelBuilder.Entity<Order>().HasData(new Order[]
        {
            new Order // sample: placed and shipped
            {
                Id = 1, 
                UserProfileId = 1, 
                ShippingAddressId = 1, 
                DatePlaced = new DateTime(2023, 10, 10), 
                DateShipped = new DateTime(2023, 10, 12),
                IsCurrent = false,
                IsCancelled = false
            },
            new Order // sample: placed, not shipped 
            {
                Id = 2, 
                UserProfileId = 1, 
                ShippingAddressId = 2, 
                DatePlaced = new DateTime(2023, 10, 11),
                IsCurrent = false,
                IsCancelled = false
            },
            new Order // sample: placed, cancelled
            {
                Id = 3, 
                UserProfileId = 1, 
                ShippingAddressId = 1, 
                DatePlaced = new DateTime(2023, 10, 12), 
                IsCurrent = false, 
                IsCancelled = true
            },
        });
        modelBuilder.Entity<OrderProduct>().HasData(new OrderProduct[]
        {
            // order 1
            new OrderProduct
            {
                Id = 1,
                OrderId = 1,
                ProductId = 1,
                WeightId = 2,
                GrindId = 1,
                ProductQuantity = 1
            },
            new OrderProduct
            {
                Id = 2,
                OrderId = 1,
                ProductId = 2,
                WeightId = 1,
                GrindId = 1,
                ProductQuantity = 1
            },
            // order 2
            new OrderProduct
            {
                Id = 3,
                OrderId = 2,
                ProductId = 3,
                WeightId = 2,
                GrindId = 6,
                ProductQuantity = 1
            },
            // order 3
            new OrderProduct
            {
                Id = 4,
                OrderId = 3,
                ProductId = 4,
                WeightId = 1,
                GrindId = 3,
                ProductQuantity = 2
            }
        });
    }
}
