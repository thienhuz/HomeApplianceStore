using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HomeApplianceStore.Application.DTOs;
using HomeApplianceStore.Application.Interfaces;
using MediatR;

namespace HomeApplianceStore.Application.Features.Products.Queries;

/// <summary>
/// Query gợi ý tìm kiếm: trả về từ khóa gợi ý + sản phẩm khớp.
/// </summary>
public class SearchSuggestionsQuery : IRequest<SearchSuggestionDto>
{
    public string Keyword { get; set; } = string.Empty;
    public int ProductLimit { get; set; } = 5;
    public int SuggestionLimit { get; set; } = 5;
}

public class SearchSuggestionsQueryHandler : IRequestHandler<SearchSuggestionsQuery, SearchSuggestionDto>
{
    private readonly IProductReadRepository _productReadRepository;

    public SearchSuggestionsQueryHandler(IProductReadRepository productReadRepository)
    {
        _productReadRepository = productReadRepository;
    }

    public async Task<SearchSuggestionDto> Handle(SearchSuggestionsQuery request, CancellationToken cancellationToken)
    {
        var keyword = request.Keyword?.Trim() ?? string.Empty;
        if (string.IsNullOrEmpty(keyword))
        {
            return new SearchSuggestionDto();
        }

        var products = await _productReadRepository.SearchProductsAsync(keyword, request.ProductLimit);
        var brands = await _productReadRepository.GetMatchingBrandNamesAsync(keyword, request.SuggestionLimit);

        // Gợi ý từ khóa: bản thân từ khóa + ghép với từng thương hiệu khớp ("tủ lạnh Samsung", ...).
        var suggestions = new List<string> { keyword };
        suggestions.AddRange(brands.Select(brand => $"{keyword} {brand}"));

        return new SearchSuggestionDto
        {
            Suggestions = suggestions,
            Products = products
        };
    }
}
