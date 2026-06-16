/* =====================================================================
   THAY ĐỔI DATABASE ĐỂ HỖ TRỢ TRANG DETAILPRODUCT
   File này CHỈ chứa những thứ CẦN SỬA so với script.sql gốc.
   Chạy trên database [HomeApplianceStore] đã tồn tại.
   ===================================================================== */
USE [HomeApplianceStore];
GO

/* ---------------------------------------------------------------------
   1) Bổ sung cột cho bảng Products
      - Note          : ghi chú dưới giá ("Giá đã bao gồm VAT...")
      - FeatureTitle   : tiêu đề tab mô tả ("Đặc điểm nổi bật")
      - FeatureImageUrl: ảnh minh hoạ trong tab mô tả
   --------------------------------------------------------------------- */
IF COL_LENGTH('dbo.Products', 'Note') IS NULL
    ALTER TABLE [dbo].[Products] ADD [Note] NVARCHAR(500) NULL;
GO

IF COL_LENGTH('dbo.Products', 'FeatureTitle') IS NULL
    ALTER TABLE [dbo].[Products] ADD [FeatureTitle] NVARCHAR(200) NULL;
GO

IF COL_LENGTH('dbo.Products', 'FeatureImageUrl') IS NULL
    ALTER TABLE [dbo].[Products] ADD [FeatureImageUrl] VARCHAR(500) NULL;
GO

/* ---------------------------------------------------------------------
   2) Bảng mới ProductHighlights — các gạch đầu dòng "đặc điểm nổi bật"
      (1 sản phẩm có nhiều dòng highlight, sắp theo DisplayOrder)
   --------------------------------------------------------------------- */
IF OBJECT_ID('dbo.ProductHighlights', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[ProductHighlights] (
        [HighlightId]  INT IDENTITY(1,1) NOT NULL,
        [ProductId]    INT             NOT NULL,
        [Content]      NVARCHAR(500)   NOT NULL,
        [DisplayOrder] INT             NOT NULL CONSTRAINT [DF_ProductHighlights_DisplayOrder] DEFAULT (0),
        CONSTRAINT [PK_ProductHighlights] PRIMARY KEY CLUSTERED ([HighlightId] ASC),
        CONSTRAINT [FK_ProductHighlights_Products] FOREIGN KEY ([ProductId])
            REFERENCES [dbo].[Products] ([ProductId]) ON DELETE CASCADE
    );

    CREATE INDEX [IX_ProductHighlights_ProductId] ON [dbo].[ProductHighlights] ([ProductId]);
END
GO

/* ---------------------------------------------------------------------
   3) (TUỲ CHỌN) Dữ liệu mẫu cho sản phẩm có ProductId = 1 để test nhanh.
      Bỏ comment nếu muốn seed.
   --------------------------------------------------------------------- */
-- UPDATE [dbo].[Products]
-- SET [Note] = N'Giá đã bao gồm VAT và miễn phí lắp đặt tại nhà.',
--     [FeatureTitle] = N'Đặc điểm nổi bật',
--     [FeatureImageUrl] = N'https://example.com/feature.jpg'
-- WHERE [ProductId] = 1;
--
-- INSERT INTO [dbo].[ProductHighlights] ([ProductId], [Content], [DisplayOrder]) VALUES
-- (1, N'Công nghệ Digital Inverter tiết kiệm điện năng vận hành êm ái.', 1),
-- (1, N'Hệ thống Twin Cooling Plus giúp thực phẩm tươi lâu hơn gấp 2 lần.', 2),
-- (1, N'5 chế độ chuyển đổi linh hoạt theo nhu cầu sử dụng.', 3),
-- (1, N'Khử mùi kháng khuẩn Deodorizing Filter.', 4);
-- GO
