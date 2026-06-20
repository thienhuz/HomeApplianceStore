-- Xóa cột Address dư thừa trong bảng Users
IF EXISTS(SELECT 1 FROM sys.columns 
          WHERE Name = N'Address'
          AND Object_ID = Object_ID(N'[dbo].[Users]'))
BEGIN
    ALTER TABLE [dbo].[Users] DROP COLUMN [Address];
END
GO

-- Thêm cột Type vào bảng UserAddresses để phân loại địa chỉ Nhà riêng/Văn phòng
IF NOT EXISTS(SELECT 1 FROM sys.columns 
          WHERE Name = N'Type'
          AND Object_ID = Object_ID(N'[dbo].[UserAddresses]'))
BEGIN
    ALTER TABLE [dbo].[UserAddresses] ADD [Type] [varchar](20) NOT NULL DEFAULT 'home';
END
GO
