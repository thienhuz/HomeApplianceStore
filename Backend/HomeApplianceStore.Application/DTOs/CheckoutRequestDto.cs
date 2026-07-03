using System.ComponentModel.DataAnnotations;

namespace HomeApplianceStore.Application.DTOs;

public class CheckoutRequestDto
{
    [Required(ErrorMessage = "Tên người nhận không được để trống")]
    public string ShippingName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Số điện thoại không được để trống")]
    public string ShippingPhone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Địa chỉ giao hàng không được để trống")]
    public string ShippingAddress { get; set; } = string.Empty;

    [Required]
    public byte PaymentMethod { get; set; } = 1; // 1: COD, 2: Bank, 3: VNPay, 4: Momo

    public string? Note { get; set; }

    /// <summary>Mã voucher người dùng chọn (tuỳ chọn).</summary>
    public string? VoucherCode { get; set; }
}
