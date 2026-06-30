using System;
using System.Collections.Generic;

namespace HomeApplianceStore.Application.DTOs;

public class OrderDto
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public byte OrderStatus { get; set; }
    public byte PaymentMethod { get; set; }
    public byte PaymentStatus { get; set; }
    public string ShippingName { get; set; } = string.Empty;
    public string ShippingPhone { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string? Note { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal? DiscountAmount { get; set; }
    public decimal FinalAmount { get; set; }

    public IEnumerable<OrderDetailItemDto> Items { get; set; } = new List<OrderDetailItemDto>();
}
