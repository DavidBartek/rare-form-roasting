Table Product {
  Id int pk
  DisplayName varchar
  Price dec
  Country varchar
  LocationString varchar
  FarmString varchar
  Process varchar
  Varietal varchar
  ElevationMASL varchar
  HarvestDate DateTime
  DateAdded DateTime
  TastingNotes varchar
  DescriptionString text
  ImageLocation varchar
  IsFeatured bool
  IsLive bool
}

Table Order {
  Id int pk
  UserProfileId int
  ShippingAddressId int
  DatePlaced DateTime
  DateShippedNULLABLE DateTime
  TotalPriceCALC dec
  SubscriptionIdNULLABLE int
  IsCancelled bool
}

Table Weight {
  Id int pk
  WeightOz int
}

Table Grind {
  Id int pk
  GrindSetting varchar
}

Table OrderProduct {
 Id int pk
 ProductId int
 OrderId int
 WeightId int
 GrindId int
 ProductQuantity int
}

Table ShippingAddress {
  Id int pk
  UserProfileId int
  Address1 varchar
  Address2NULLABLE varchar
  City varchar
  StateCode varchar
  Zip varchar
  IsActive bool
}

Table Subscription {
  Id int pk
  UserId int
  SubscriptionTypeId int
  StartDate DateTime
  EndDateNULLABLE DateTime
}

Table SubscriptionProduct {
  Id int pk
  ProductId int
  SubscriptionId int
  WeightId int
  GrindId int
  ProductQuantity int
}

Table SubscriptionType {
  Id int pk
  FrequencyWks int
}

Table UserProfile {
  Id int pk
  FirstName varchar
  LastName varchar
  FullNameCALC varchar
  Email varchar
  RolesLIST varchar
  IdentityUserId varchar
  IsActive bool
}


Ref: "Subscription"."Id" < "Order"."SubscriptionIdNULLABLE"

Ref: "Subscription"."SubscriptionTypeId" - "SubscriptionType"."Id"

Ref: "SubscriptionProduct"."SubscriptionId" < "Subscription"."Id"

Ref: "SubscriptionProduct"."ProductId" < "Product"."Id"

Ref: "OrderProduct"."ProductId" < "Product"."Id"

Ref: "OrderProduct"."OrderId" < "Order"."Id"

Ref: "Order"."ShippingAddressId" - "ShippingAddress"."Id"

Ref: "Order"."UserProfileId" - "UserProfile"."Id"

Ref: "UserProfile"."Id" < "ShippingAddress"."UserProfileId"

Ref: "Weight"."Id" - "OrderProduct"."WeightId"

Ref: "OrderProduct"."GrindId" - "Grind"."Id"