namespace HomeApplianceStore.Application.Common.Models;

public class ApiResponse<T>
{
    public bool Succeeded { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }

    public static ApiResponse<T> Success(T data, string message = "Success")
    {
        return new ApiResponse<T> { Succeeded = true, Data = data, Message = message };
    }

    public static ApiResponse<T> Failure(string message)
    {
        return new ApiResponse<T> { Succeeded = false, Data = default, Message = message };
    }
}
