using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace rare_form_roasting.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Grinds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GrindSetting = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grinds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DisplayName = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Country = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    LocationString = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    FarmString = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    Process = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    Varietal = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    ElevationRangeMASL = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    DateAdded = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TastingNotes = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    DescriptionString = table.Column<string>(type: "character varying(3500)", maxLength: 3500, nullable: false),
                    ImageLocation = table.Column<string>(type: "text", nullable: false),
                    IsFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    IsLive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FrequencyWeeks = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Weights",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WeightOz = table.Column<int>(type: "integer", nullable: false),
                    PriceMultiplier = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weights", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    IdentityUserId = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShippingAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    Address1 = table.Column<string>(type: "text", nullable: false),
                    Address2 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: false),
                    StateCode = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false),
                    Zip = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShippingAddresses_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    SubscriptionTypeId = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_SubscriptionTypes_SubscriptionTypeId",
                        column: x => x.SubscriptionTypeId,
                        principalTable: "SubscriptionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    ShippingAddressId = table.Column<int>(type: "integer", nullable: true),
                    DatePlaced = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    DateShipped = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    SubscriptionId = table.Column<int>(type: "integer", nullable: true),
                    IsCurrent = table.Column<bool>(type: "boolean", nullable: false),
                    IsCancelled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_ShippingAddresses_ShippingAddressId",
                        column: x => x.ShippingAddressId,
                        principalTable: "ShippingAddresses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    WeightId = table.Column<int>(type: "integer", nullable: false),
                    GrindId = table.Column<int>(type: "integer", nullable: false),
                    ProductQuantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Grinds_GrindId",
                        column: x => x.GrindId,
                        principalTable: "Grinds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Weights_WeightId",
                        column: x => x.WeightId,
                        principalTable: "Weights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    WeightId = table.Column<int>(type: "integer", nullable: false),
                    GrindId = table.Column<int>(type: "integer", nullable: false),
                    ProductQuantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionProducts_Grinds_GrindId",
                        column: x => x.GrindId,
                        principalTable: "Grinds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubscriptionProducts_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubscriptionProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubscriptionProducts_Weights_WeightId",
                        column: x => x.WeightId,
                        principalTable: "Weights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "a54e0366-280c-4123-8223-4515a56417c9", "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "bb086a49-6842-49ab-aba7-c26c22a77231", "david@rfr.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEAZc/zduTGh6C/IG22IrrnFbKCP9iRRcq1J/vJv/4ZB/74tMnYS8/jfs/VSgnhmO4g==", null, false, "d6bcca11-5ce6-443f-8e3f-931d801a674a", false, null });

            migrationBuilder.InsertData(
                table: "Grinds",
                columns: new[] { "Id", "GrindSetting" },
                values: new object[,]
                {
                    { 1, "Whole Bean" },
                    { 2, "French Press (Coarse)" },
                    { 3, "Drip (Medium Coarse)" },
                    { 4, "Pourover (Medium)" },
                    { 5, "Aeropress (Medium Fine)" },
                    { 6, "Espresso (Fine)" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Country", "DateAdded", "DescriptionString", "DisplayName", "ElevationRangeMASL", "FarmString", "ImageLocation", "IsFeatured", "IsLive", "LocationString", "Price", "Process", "TastingNotes", "Varietal" },
                values: new object[,]
                {
                    { 1, "Ethiopia", new DateTime(2023, 7, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fruit-forward and aromatic, this Ethiopian arrival expresses fruit flavors like strawberry hard candy, blueberry, nectarine, cranberry, and tart golden plum that are very clean for a dry process coffee.", "Ethiopia Hambela Buliye", "2170", "Hambela Buliye", "", false, true, "Buliye Kebele, Shakiso, Guji", 22.00m, "Dry Process (Natural)", "Strawberry, blueberry, nectarine, cranberry, tart golden plum", "Heirloom" },
                    { 2, "Colombia", new DateTime(2023, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "A regional blend of high scoring coffees from Inza, Cuaca. The cup sweetness is honeyed, with substantial fruit flavors that are slightly winey as you move through the cup. Red apple, tangy golden plum, dried apricots, and juicy acidic impression like stone fruits.", "Colombia Inza Las Estrellas", "1500-2000", "Las Estrellas", "", false, true, "San Antonio and San Rafael, Inza, Cauca", 18.00m, "Wet Process (Washed)", "Red apple, tangy golden plum, dried apricot, stone fruit, wine", "Caturra, Typica, Hybrid" },
                    { 3, "Kenya", new DateTime(2023, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Deliciously fruited. Has a spiced-fruit scent, the dry fragrance perfumed with spiced tropical bunch and a cherry accent. Accents of naval orange, lemon custard, orange marmalade, tart fresh squeezed lemon, and a dusting of all-spice and cardamom. Light and bright.", "Kenya Kirinyaga Kamwangi Peaberry", "1800-2000", "Kamwangi Factory", "", false, true, "Kirinyaga", 21.00m, "Wet Process (Washed)", "Naval orange, lemon custard, orange marmalade, tart fresh squeezed lemon, all-spice, cardamom", "Bourbon (SL-28, SL-34, Ruiru-11) peaberry" },
                    { 4, "Nicaragua", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Finca La Bastilla is a tropical paradise founded on deep, favorable volcanic soils, creating the perfect environment for world-renowned coffees. This wonderful, bright, medium-bodied coffee has intense notes of chocolate, peach, vanilla, almond, and golden raisin.", "Nicaragua La Bastilla Centroamericano", "1300-1500", "La Bastilla Coffee Estates", "", true, true, "Jinotega", 20.00m, "Wet Process (Washed)", "Chocolate, peach, vanilla, almond, golden raisin", "Centroamericano" }
                });

            migrationBuilder.InsertData(
                table: "Weights",
                columns: new[] { "Id", "PriceMultiplier", "WeightOz" },
                values: new object[,]
                {
                    { 1, 1m, 12 },
                    { 2, 1.95m, 24 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "FirstName", "IdentityUserId", "IsActive", "LastName" },
                values: new object[] { 1, "David", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", true, "Bartek" });

            migrationBuilder.InsertData(
                table: "ShippingAddresses",
                columns: new[] { "Id", "Address1", "Address2", "City", "IsActive", "StateCode", "UserProfileId", "Zip" },
                values: new object[,]
                {
                    { 1, "214 Chamberlin St", null, "Nashville", true, "TN", 1, "37209" },
                    { 2, "12405 W 19th Pl", null, "Lakewood", true, "CO", 1, "80215" }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "DatePlaced", "DateShipped", "IsCancelled", "IsCurrent", "ShippingAddressId", "SubscriptionId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, 1, null, 1 },
                    { 2, new DateTime(2023, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false, false, 2, null, 1 },
                    { 3, new DateTime(2023, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), null, true, false, 1, null, 1 }
                });

            migrationBuilder.InsertData(
                table: "OrderProducts",
                columns: new[] { "Id", "GrindId", "OrderId", "ProductId", "ProductQuantity", "WeightId" },
                values: new object[,]
                {
                    { 1, 1, 1, 1, 1, 2 },
                    { 2, 1, 1, 2, 1, 1 },
                    { 3, 6, 2, 3, 1, 2 },
                    { 4, 3, 3, 4, 2, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_GrindId",
                table: "OrderProducts",
                column: "GrindId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_OrderId",
                table: "OrderProducts",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_ProductId",
                table: "OrderProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_WeightId",
                table: "OrderProducts",
                column: "WeightId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ShippingAddressId",
                table: "Orders",
                column: "ShippingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserProfileId",
                table: "Orders",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ShippingAddresses_UserProfileId",
                table: "ShippingAddresses",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionProducts_GrindId",
                table: "SubscriptionProducts",
                column: "GrindId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionProducts_OrderId",
                table: "SubscriptionProducts",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionProducts_ProductId",
                table: "SubscriptionProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionProducts_WeightId",
                table: "SubscriptionProducts",
                column: "WeightId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_SubscriptionTypeId",
                table: "Subscriptions",
                column: "SubscriptionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserProfileId",
                table: "Subscriptions",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "OrderProducts");

            migrationBuilder.DropTable(
                name: "SubscriptionProducts");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Grinds");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Weights");

            migrationBuilder.DropTable(
                name: "SubscriptionTypes");

            migrationBuilder.DropTable(
                name: "ShippingAddresses");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
