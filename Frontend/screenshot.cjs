// screenshot.js hoặc screenshot.cjs
const { chromium } = require('playwright');

(async () => {
    // Lấy cái đuôi route gõ từ terminal, nếu không gõ gì thì mặc định là trang chủ '/'
    const route = process.argv[2] || '';

    console.log('🚀 Đang khởi động trình duyệt ngầm...');
    const browser = await chromium.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1440, height: 900 });

    const baseUrl = 'http://localhost:5173';
    const localUrl = `${baseUrl}${route.startsWith('/') ? route : '/' + route}`;

    try {
        console.log(`🌐 Đang khởi tạo domain tại ${baseUrl}...`);
        // Mở trang chủ trước để trình duyệt ngầm nhận diện domain localhost
        await page.goto(baseUrl);

        console.log('🔑 Đang nạp Token và thông tin User thật vào localStorage...');
        await page.evaluate(() => {
            // Token thật bạn vừa cung cấp
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNCIsImVtYWlsIjoiZGF0QGdtYWlsLmNvbSIsImp0aSI6IjhhYjJmMGVlLTMwMWItNGNjYy04M2M0LWQ4ZDM1ZjMyZTcwZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIyIiwiZXhwIjoxNzgyNDYxMzkwLCJpc3MiOiJIb21lQXBwbGlhbmNlU3RvcmVBUEkiLCJhdWQiOiJIb21lQXBwbGlhbmNlU3RvcmVDbGllbnRzIn0.evox0NC6rwy1L60JZApUrk4NMWVEPCt4S9GKAxafCR0');

            // Thông tin tài khoản thật bạn vừa cung cấp
            localStorage.setItem('user', JSON.stringify({
                id: 14,
                fullName: "Brennan MENEREY",
                email: "dat@gmail.com",
                phone: "1232132131",
                address: null,
                imageUrl: null,
                isActive: true,
                createdAt: "2026-06-06T03:06:40.953"
            }));
        });

        console.log(`🌐 Đang chuyển hướng và chụp trang: ${localUrl}...`);
        // Chuyển hướng thẳng sang trang profile sau khi đã fake đăng nhập thành công
        await page.goto(localUrl, { waitUntil: 'networkidle', timeout: 30000 });

        // Chờ thêm 2 giây cho các component con render xong hết dữ liệu từ API
        await page.waitForTimeout(2000);

        await page.screenshot({ path: 'ui-current.png', fullPage: true });
        console.log(`🎉 Đã chụp xong! Ảnh giao diện được lưu tại Frontend/ui-current.png`);
    } catch (error) {
        console.error('❌ Có lỗi xảy ra trong quá trình kết nối hoặc chụp ảnh:');
        console.error(error.message);
    } finally {
        await browser.close();
    }
})();