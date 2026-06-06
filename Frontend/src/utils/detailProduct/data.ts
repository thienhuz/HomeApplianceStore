import type { Product, RelatedProduct } from './types';

export const productData: Record<string, Product> = {
  '1': {
    id: '1',
    brand: 'SAMSUNG',
    title: 'Tủ lạnh Samsung Inverter 382 Lít RT38K50822C/SV',
    rating: 4.5,
    reviewCount: 128,
    stock: 'Còn 24 sản phẩm',
    price: '12.490.000đ',
    oldPrice: '15.990.000đ',
    discountLabel: '-22%',
    description:
      'Tủ lạnh Samsung RT38K50822C/SV với dung tích 382 Lít, thiết kế sang trọng với mặt gương đen cao cấp, phù hợp cho gia đình từ 3-5 thành viên.',
    highlights: [
      'Công nghệ Digital Inverter tiết kiệm điện năng vận hành êm ái.',
      'Hệ thống Twin Cooling Plus giúp thực phẩm tươi lâu hơn gấp 2 lần.',
      '5 chế độ chuyển đổi linh hoạt theo nhu cầu sử dụng.',
      'Khử mùi kháng khuẩn Deodorizing Filter.',
    ],
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8bUKJxDP-uj92n2BPejFD3AdDccTvXRIxno_l_pMbZjbabCt72nSHxlirCXM1jg8yj03mA1TlpOH-kIRylqdMTalHyIuAtFiNDFGK7a3xuKL7ZKI18JkL5m--WIFaOe_Bxt_itEscAXTZbAAJfX4vJ9aUtZyNK3wWXdR4cRbIZxVreKizgjEEJmCAxkJfaduJlQ9YK5mr8ZLI8-QLwE42QKT7HL1uXI7CtyIqzxjoRmHotA0jR_VAOKm026tcXVeICRaDgiM4hg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRICtQc3TEkTZbd3wzxefz-qgotV3r6vk_NGaASTLFu_lbQOdPnl6Qll1wyu_XidHk8W61e6XQvA-91TjJFcB2ai3aP4hk7g3zHP8g8hoL5Fxfq61GQC4UfaxiQD2zL1UK75xEVDUNH4kGxPE2zMuJq99SD9aesaBnoHGJj8qeQl-Cfdd7ygIs0EvCVQoxYEOmY_Skd8TgS4bRhFkoiRe-3TQcQqduOUiRRGKru1dZm6puojY_pn7yOOmdy2yRSv9vOWpHtLpTqQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiH5-g6n2z7DdnJd4XUF61kMNUu2HdoifrMwzCfzsHsVykntCQthD-l6MCZpPIMB8x1xrUs_-HH4LMX7ZAWbmSR2MaaSEeCaieanhPoHq2DRpdwLsR-M6o40uPQE9IR2zzJvUXA3VY_VAVO_5FFhxtDFUehRls_KfhtEZ52gC2EZ3IjaOCIwgU5WGUul5bQ5GMnKDjVR11EEloDaykcOpFI62EIhwtk3OFqLZouZD1zsmUUZIB2xN7vu2Q-mTw6DQqNhGRrOA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFg3l85cotggBw0p88VYe2WBxixRkrZm-tTsxB8-BFuIJgaqEL4NQ2IdJSnAd3Tpopavpd1O3v31x5V3JoCiNroiQJKrJtkqaL2FjIcYTtlIL4XtrJnSH2K-V3Gpy0zk4xHCINxCD12ULESE3nSXFFZpGNjpIFzlHPc3a30dU3nD3J0Ih75RGb8tSmaS7lstCVRcJLfxNsJ9lvHVULJzf6YeUqW33BaYMTsm3R3Zt7_q9-egDFtfyJzllYYXhZGb_hbfxZ7UUcJg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoCxdChTZDIJnWcnGJ5N-CmaDIe2aclttn-3kYqxtbtq1RSW-7VH1obmCJNqtE7QOYT6Z71i2riE8Vf8aZhpBakitgsdberYWXr6fdq5Cpfb7kPH6Vz5OHHCkV5UtJs6G_5eFpuPb7n7RT23NeULZx0FHPvUZiho0uYJC067Ks2nnY9npVSDlcHaqga5PndBAKYFOjOZQ6Ceuatv5FkyQkiqbVw6eKsru1w4HnQyQ9w8FFyQHPCyaQ0JUInwfBeyIpcEvAO4OHQw',
    ],
    note: 'Giá đã bao gồm VAT và miễn phí lắp đặt tại nhà.',
    tabs: {
      description: {
        title: 'Đặc điểm nổi bật',
        content:
          'Tủ lạnh Samsung RT38K50822C/SV với dung tích 382 Lít, thiết kế sang trọng với mặt gương đen cao cấp, phù hợp cho gia đình từ 3-5 thành viên.',
        points: [
          'Công nghệ Digital Inverter tiết kiệm điện năng vận hành êm ái.',
          'Hệ thống Twin Cooling Plus giúp thực phẩm tươi lâu hơn gấp 2 lần.',
          '5 chế độ chuyển đổi linh hoạt theo nhu cầu sử dụng.',
          'Khử mùi kháng khuẩn Deodorizing Filter.',
        ],
        featureImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBAc_3bwBfcKyn9tYdJ-NPePUxzZiB69rm9Km5bMmS_QvQxQRva6aGVnSMuVVgh6cdEANpBLRS-n2NPUBkHH4wSbWRuhfnJXADRH9dTLv4KGKgsBzJMGZcAwzd5i96nWix3qBvrU2Y7xu-H3mFtOv3AeIWNIufh-iA-1hYD9WVvqQmmHWd7m3ghMkTLe7MmSn-6C9Ss_SBrw45Og9Fgoc9pa3Xvaje1D9DsT0dwD3RtbEQzoCT3WADLF74lhrZeGNY-ihOG-kNpXA',
      },
      reviews: {
        ratingValue: '4.5',
        summary: [
          { rating: 5, percent: '75%' },
          { rating: 4, percent: '15%' },
          { rating: 3, percent: '5%' },
        ],
        reviews: [
          {
            name: 'Nguyễn Văn An',
            badge: 'Đã mua tại HomeApplianceStore',
            ratingFill: 5,
            content:
              'Tủ lạnh chạy rất êm, thiết kế mặt gương cực kỳ sang trọng. Nhân viên lắp đặt nhiệt tình, giao hàng nhanh đúng hẹn. Rất hài lòng với sản phẩm này.',
          },
          {
            name: 'Trần Thị Hoa',
            badge: 'Đã mua tại HomeApplianceStore',
            ratingFill: 4,
            content:
              'Sản phẩm tốt trong tầm giá, ngăn đông làm lạnh nhanh. Tuy nhiên mặt gương hơi dễ bám vân tay nên cần lau chùi thường xuyên.',
          },
        ],
      },
    },
  },
};

export const relatedProducts: RelatedProduct[] = [
  {
    id: '2',
    brand: 'PANASONIC',
    title: 'Tủ lạnh Panasonic Inverter 322 Lít NR-BV360QSVN',
    price: '11.200.000đ',
    oldPrice: '13.500.000đ',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsFQ4CJC6KCyheaWthdV--2a3MxKzdI-OzEa10kViKuz86JQEk45VfoJh1c4oOVgiiKqxQxW39HD7KtaxIUb966YlmZSO1LcJRTV0qi62A8XMY78wGPPIhc_6rTlSCp7uc4WE2g_ETGXEXgCUCaqI-61xWMAMI43E3irujHM80iSLZLOS1LLgs7TxsPM8VjG-p_5No8s5HZ85n_kd9O-LC2LhEQwjcKFym61z0irGN72nPt5-c2cGxpyUdEo6amujR6ASequvUww',
  },
  {
    id: '3',
    brand: 'SAMSUNG',
    title: 'Tủ lạnh Samsung Side by Side 600L',
    price: '28.900.000đ',
    oldPrice: '32.500.000đ',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMSN_-ufHlz4_fG_OViW-0ryE51ggvsnWSm_dEZeljyz13LWyvnjm1is6ZulwwKZpSOhtSII0dhjgGZjaMo5g2JkKk2qqPXgeVGIWT81od0OfH90maz1mkkP9KP-cPJuid5fIOXHZz2q3ZAdKbM4Ka0UAKe06O_2U2NYV6zGjeI7eqXCsAyqa5X47oesXAxkAeo_IsX_26UjE1vAdweWpPlJFn_sTw_Y4fthdgZouMDiQv0SMTS8EBPdiP5R5bew_p_3Mypo7Lw',
  },
  {
    id: '4',
    brand: 'SHARP',
    title: 'Máy giặt Sharp Inverter 401 Lít SJ-FX631V-SL',
    price: '13.800.000đ',
    oldPrice: '15.500.000đ',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ7IWxhgVMbEnff-tIw1P0HygaogNyUKtAB2TIR_v0n4vmlzFgz8GYuSQowrazBHbDuEkkBky_0WnIQCyIMxF0oxgPUPf8Nui0Dxy63ZEr0SiyKwY_IhRaXDKvSw2j6uYK9_XOml1TbmQ4GYhJq4w0IyZCGgyIs8qByJGwhdM1bZfuKIwgUukfpOGrpc_XecL9VEMZRzx0RDdn4TVYbCmDliPuIM9q9vGjrRkCxoBp57F3bgn91-NS3jXbt41ukXWUB4zAXcaOtQ',
  },
  {
    id: '5',
    brand: 'LG',
    title: 'Máy giặt LG AI DD™ 11kg FV1411S4P',
    price: '15.990.000đ',
    oldPrice: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvQLkyQToZXfokx1e1j0e9xhEkbYPTt2Y7QRyOmCXY9z5XLc-TgS7FlfzC6mPevpxnRbtvMG44qsnzSkWmtC8e0nLXWGIq86foIk_qeXepJ99Cjt2H7_8asYp_1W5PomyaF0rMDiOMFGVEyPfPFHSjUAKEfaz5A30J6omRF6gY054dxYmhySjJQFiQP4UxYgLkjZMiVmVhuPCW2pnEyVSDH_IO-6w0BKiFwOTiA8rnuGuK6oTe1eI4y3R7b6iGsXd3a8jrxIDcKQ',
  },
];
