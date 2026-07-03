namespace HomeApplianceStore.Application.DTOs;

public class OrderHistoryDto
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal FinalAmount { get; set; }
    public byte OrderStatus { get; set; }
    public byte PaymentMethod { get; set; }
    public byte PaymentStatus { get; set; }
    
    // Thêm các trường hiển thị hình ảnh và tên sản phẩm đầu tiên
    public string FirstProductTitle { get; set; } = string.Empty;
    public string FirstProductImageUrl { get; set; } = string.Empty;
    public int TotalProductCount { get; set; }
}
