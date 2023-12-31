﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RareFormRoasting.Data;

#nullable disable

namespace rare_form_roasting.Migrations
{
    [DbContext(typeof(RareFormRoastingDbContext))]
    partial class RareFormRoastingDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                            ConcurrencyStamp = "52bf13fe-2332-421d-b749-b5b499b5397b",
                            Name = "Admin",
                            NormalizedName = "admin"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "99d60dee-da4c-4102-a01d-e0b5c2eec9c7",
                            Email = "david@rareformroasting.comx",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEMTTUYl5BxDmQpmQ25dIK3z1Pa6t7nYHiM+V3mxnuLo23Mzgfv9gbkPQlxspNQnQLQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "e980c46d-462d-4860-a5dd-74ea052beaaa",
                            TwoFactorEnabled = false
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("RareFormRoasting.Models.Grind", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("GrindSetting")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.ToTable("Grinds");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            GrindSetting = "Whole Bean"
                        },
                        new
                        {
                            Id = 2,
                            GrindSetting = "French Press (Coarse)"
                        },
                        new
                        {
                            Id = 3,
                            GrindSetting = "Drip (Medium Coarse)"
                        },
                        new
                        {
                            Id = 4,
                            GrindSetting = "Pourover (Medium)"
                        },
                        new
                        {
                            Id = 5,
                            GrindSetting = "Aeropress (Medium Fine)"
                        },
                        new
                        {
                            Id = 6,
                            GrindSetting = "Espresso (Fine)"
                        });
                });

            modelBuilder.Entity("RareFormRoasting.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DatePlaced")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("DateShipped")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsCancelled")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsCurrent")
                        .HasColumnType("boolean");

                    b.Property<int?>("ShippingAddressId")
                        .HasColumnType("integer");

                    b.Property<int?>("SubscriptionId")
                        .HasColumnType("integer");

                    b.Property<int>("UserProfileId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ShippingAddressId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DatePlaced = new DateTime(2023, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DateShipped = new DateTime(2023, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = false,
                            IsCurrent = false,
                            ShippingAddressId = 1,
                            UserProfileId = 1
                        },
                        new
                        {
                            Id = 2,
                            DatePlaced = new DateTime(2023, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = false,
                            IsCurrent = false,
                            ShippingAddressId = 2,
                            UserProfileId = 1
                        },
                        new
                        {
                            Id = 3,
                            DatePlaced = new DateTime(2023, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsCancelled = true,
                            IsCurrent = false,
                            ShippingAddressId = 1,
                            UserProfileId = 1
                        });
                });

            modelBuilder.Entity("RareFormRoasting.Models.OrderProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("GrindId")
                        .HasColumnType("integer");

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductQuantity")
                        .HasColumnType("integer");

                    b.Property<int>("WeightId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GrindId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.HasIndex("WeightId");

                    b.ToTable("OrderProducts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            GrindId = 1,
                            OrderId = 1,
                            ProductId = 1,
                            ProductQuantity = 1,
                            WeightId = 2
                        },
                        new
                        {
                            Id = 2,
                            GrindId = 1,
                            OrderId = 1,
                            ProductId = 2,
                            ProductQuantity = 1,
                            WeightId = 1
                        },
                        new
                        {
                            Id = 3,
                            GrindId = 6,
                            OrderId = 2,
                            ProductId = 3,
                            ProductQuantity = 1,
                            WeightId = 2
                        },
                        new
                        {
                            Id = 4,
                            GrindId = 3,
                            OrderId = 3,
                            ProductId = 4,
                            ProductQuantity = 2,
                            WeightId = 1
                        });
                });

            modelBuilder.Entity("RareFormRoasting.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DescriptionString")
                        .IsRequired()
                        .HasMaxLength(3500)
                        .HasColumnType("character varying(3500)");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.Property<string>("ElevationRangeMASL")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.Property<string>("FarmString")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.Property<string>("ImageLocation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsFeatured")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsLive")
                        .HasColumnType("boolean");

                    b.Property<string>("LocationString")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<string>("Process")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.Property<string>("TastingNotes")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Varietal")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Country = "Ethiopia",
                            DateAdded = new DateTime(2023, 7, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescriptionString = "Fruit-forward and aromatic, this Ethiopian arrival expresses fruit flavors like strawberry hard candy, blueberry, nectarine, cranberry, and tart golden plum that are very clean for a dry process coffee.",
                            DisplayName = "Ethiopia Hambela Buliye",
                            ElevationRangeMASL = "2170",
                            FarmString = "Hambela Buliye",
                            ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853881/Coffee%20Labels/Label_Web_Ethiopia-Hambela-Buliye_1000_x_1000_px_iacfun.png",
                            IsFeatured = false,
                            IsLive = true,
                            LocationString = "Buliye Kebele, Shakiso, Guji",
                            Price = 22.00m,
                            Process = "Dry Process (Natural)",
                            TastingNotes = "Strawberry, blueberry, nectarine, cranberry, tart golden plum",
                            Varietal = "Heirloom"
                        },
                        new
                        {
                            Id = 2,
                            Country = "Colombia",
                            DateAdded = new DateTime(2023, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescriptionString = "A regional blend of high scoring coffees from Inza, Cuaca. The cup sweetness is honeyed, with substantial fruit flavors that are slightly winey as you move through the cup. Red apple, tangy golden plum, dried apricots, and juicy acidic impression like stone fruits.",
                            DisplayName = "Colombia Inza Las Estrellas",
                            ElevationRangeMASL = "1500-2000",
                            FarmString = "Las Estrellas",
                            ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853882/Coffee%20Labels/Label_Web_Colombia_Inza_Las_Estrellas_1000_x_1000_px_gmdoqp.png",
                            IsFeatured = false,
                            IsLive = true,
                            LocationString = "San Antonio and San Rafael, Inza, Cauca",
                            Price = 18.00m,
                            Process = "Wet Process (Washed)",
                            TastingNotes = "Red apple, tangy golden plum, dried apricot, stone fruit, wine",
                            Varietal = "Caturra, Typica, Hybrid"
                        },
                        new
                        {
                            Id = 3,
                            Country = "Kenya",
                            DateAdded = new DateTime(2023, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescriptionString = "Deliciously fruited. Has a spiced-fruit scent, the dry fragrance perfumed with spiced tropical bunch and a cherry accent. Accents of naval orange, lemon custard, orange marmalade, tart fresh squeezed lemon, and a dusting of all-spice and cardamom. Light and bright.",
                            DisplayName = "Kenya Kirinyaga Kamwangi Peaberry",
                            ElevationRangeMASL = "1800-2000",
                            FarmString = "Kamwangi Factory",
                            ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853882/Coffee%20Labels/Label_Web_Kenya_Kirinyaga_Kamwangi_Peaberry_1000_x_1000_px_plnf5e.png",
                            IsFeatured = false,
                            IsLive = true,
                            LocationString = "Kirinyaga",
                            Price = 21.00m,
                            Process = "Wet Process (Washed)",
                            TastingNotes = "Naval orange, lemon custard, orange marmalade, tart fresh squeezed lemon, all-spice, cardamom",
                            Varietal = "Bourbon (SL-28, SL-34, Ruiru-11) peaberry"
                        },
                        new
                        {
                            Id = 4,
                            Country = "Nicaragua",
                            DateAdded = new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescriptionString = "Finca La Bastilla is a tropical paradise founded on deep, favorable volcanic soils, creating the perfect environment for world-renowned coffees. This wonderful, bright, medium-bodied coffee has intense notes of chocolate, peach, vanilla, almond, and golden raisin.",
                            DisplayName = "Nicaragua La Bastilla Centroamericano",
                            ElevationRangeMASL = "1300-1500",
                            FarmString = "La Bastilla Coffee Estates",
                            ImageLocation = "https://res.cloudinary.com/dqi13ltdk/image/upload/v1698853882/Coffee%20Labels/Label_Web_Nicaragua_La_Bastilla_Centroamericano_1000_x_1000_px_ffjizg.png",
                            IsFeatured = true,
                            IsLive = true,
                            LocationString = "Jinotega",
                            Price = 20.00m,
                            Process = "Wet Process (Washed)",
                            TastingNotes = "Chocolate, peach, vanilla, almond, golden raisin",
                            Varietal = "Centroamericano"
                        });
                });

            modelBuilder.Entity("RareFormRoasting.Models.ShippingAddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address1")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Address2")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("StateCode")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("character varying(2)");

                    b.Property<int>("UserProfileId")
                        .HasColumnType("integer");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserProfileId");

                    b.ToTable("ShippingAddresses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address1 = "214 37th Ave N",
                            City = "Nashville",
                            IsActive = true,
                            StateCode = "TN",
                            UserProfileId = 1,
                            Zip = "37209"
                        },
                        new
                        {
                            Id = 2,
                            Address1 = "12405 W 20th Ave",
                            City = "Lakewood",
                            IsActive = true,
                            StateCode = "CO",
                            UserProfileId = 1,
                            Zip = "80215"
                        });
                });

            modelBuilder.Entity("RareFormRoasting.Models.Subscription", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("SubscriptionTypeId")
                        .HasColumnType("integer");

                    b.Property<int>("UserProfileId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SubscriptionTypeId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("Subscriptions");
                });

            modelBuilder.Entity("RareFormRoasting.Models.SubscriptionProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("GrindId")
                        .HasColumnType("integer");

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductQuantity")
                        .HasColumnType("integer");

                    b.Property<int>("WeightId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GrindId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.HasIndex("WeightId");

                    b.ToTable("SubscriptionProducts");
                });

            modelBuilder.Entity("RareFormRoasting.Models.SubscriptionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FrequencyWeeks")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("SubscriptionTypes");
                });

            modelBuilder.Entity("RareFormRoasting.Models.UserProfile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("IdentityUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("IdentityUserId");

                    b.ToTable("UserProfiles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FirstName = "David",
                            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                            IsActive = true,
                            LastName = "Bartek"
                        });
                });

            modelBuilder.Entity("RareFormRoasting.Models.Weight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("PriceMultiplier")
                        .HasColumnType("numeric");

                    b.Property<int>("WeightOz")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Weights");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            PriceMultiplier = 1m,
                            WeightOz = 12
                        },
                        new
                        {
                            Id = 2,
                            PriceMultiplier = 1.95m,
                            WeightOz = 24
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RareFormRoasting.Models.Order", b =>
                {
                    b.HasOne("RareFormRoasting.Models.ShippingAddress", "ShippingAddress")
                        .WithMany()
                        .HasForeignKey("ShippingAddressId");

                    b.HasOne("RareFormRoasting.Models.UserProfile", "UserProfile")
                        .WithMany("Orders")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ShippingAddress");

                    b.Navigation("UserProfile");
                });

            modelBuilder.Entity("RareFormRoasting.Models.OrderProduct", b =>
                {
                    b.HasOne("RareFormRoasting.Models.Grind", "Grind")
                        .WithMany()
                        .HasForeignKey("GrindId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.Order", "Order")
                        .WithMany("OrderProducts")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.Weight", "Weight")
                        .WithMany()
                        .HasForeignKey("WeightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Grind");

                    b.Navigation("Order");

                    b.Navigation("Product");

                    b.Navigation("Weight");
                });

            modelBuilder.Entity("RareFormRoasting.Models.ShippingAddress", b =>
                {
                    b.HasOne("RareFormRoasting.Models.UserProfile", "UserProfile")
                        .WithMany("ShippingAddresses")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserProfile");
                });

            modelBuilder.Entity("RareFormRoasting.Models.Subscription", b =>
                {
                    b.HasOne("RareFormRoasting.Models.SubscriptionType", "SubscriptionType")
                        .WithMany()
                        .HasForeignKey("SubscriptionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.UserProfile", "UserProfile")
                        .WithMany()
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SubscriptionType");

                    b.Navigation("UserProfile");
                });

            modelBuilder.Entity("RareFormRoasting.Models.SubscriptionProduct", b =>
                {
                    b.HasOne("RareFormRoasting.Models.Grind", "Grind")
                        .WithMany()
                        .HasForeignKey("GrindId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RareFormRoasting.Models.Weight", "Weight")
                        .WithMany()
                        .HasForeignKey("WeightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Grind");

                    b.Navigation("Order");

                    b.Navigation("Product");

                    b.Navigation("Weight");
                });

            modelBuilder.Entity("RareFormRoasting.Models.UserProfile", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "IdentityUser")
                        .WithMany()
                        .HasForeignKey("IdentityUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IdentityUser");
                });

            modelBuilder.Entity("RareFormRoasting.Models.Order", b =>
                {
                    b.Navigation("OrderProducts");
                });

            modelBuilder.Entity("RareFormRoasting.Models.UserProfile", b =>
                {
                    b.Navigation("Orders");

                    b.Navigation("ShippingAddresses");
                });
#pragma warning restore 612, 618
        }
    }
}
