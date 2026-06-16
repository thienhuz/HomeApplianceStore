using System.Collections.Generic;
using System.Linq;

namespace HomeApplianceStore.Application.DTOs;

/// <summary>
/// Kết quả gợi ý cho ô tìm kiếm: danh sách từ khóa gợi ý + sản phẩm khớp.
/// </summary>
public class SearchSuggestionDto
{
    public List<string> Suggestions { get; set; } = new();
    public IEnumerable<ProductDto> Products { get; set; } = Enumerable.Empty<ProductDto>();
}
