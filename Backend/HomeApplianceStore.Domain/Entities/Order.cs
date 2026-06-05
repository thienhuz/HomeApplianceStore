using System;

namespace HomeApplianceStore.Domain.Entities;

public class Order
{
    public int OrderId { get; set; }
    public int? UserId { get; set; }
    public int? VoucherId { get; set; }
    public DateTime? OrderDate { get; set; }
    public string ShippingName { get; set; } = null!;
    public string ShippingPhone { get; set; } = null!;
    public string ShippingAddress { get; set; } = null!;
    public decimal TotalAmount { get; set; }
    public decimal? DiscountAmount { get; set; }
    public decimal FinalAmount { get; set; }
    public byte PaymentMethod { get; set; }
    public byte PaymentStatus { get; set; }
    public byte OrderStatus { get; set; }
    public string? Note { get; set; }
}
