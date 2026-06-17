export interface CartItemData {
  id: number;
  brand: string;
  title: string;
  price: number; // đơn giá (VND)
  quantity: number;
  image: string;
}

export const formatVnd = (amount: number): string => `${amount.toLocaleString('vi-VN')}₫`;

export const initialCartItems: CartItemData[] = [
  {
    id: 1,
    brand: 'Samsung',
    title: 'Tủ lạnh Bespoke Multidoor',
    price: 45990000,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWTsoU4Q9NyIlwoYTy9XWiuLHxfnGBPqnoHlQBh4S10wT8uC_bmK-IFxIQaCUfiOn25xqgjO6XxRVzPFnGMWwUPF6nbdnsLefdZgiF1q5JpPR5U78dfClXCzzwibJwTp8tMQ4MZLSkeBTHd0mYZWuM_K2DfbAnqsKCpXq8kNku-xL9Mw6jY3QuwEA-hWq3O-0EsnFBWKoztmLIdkn8kUFUBZyuD1fgZApGGkPWyFSELsCwI2kdIG7hIuLHWkHUcSJmuNyLcHbMhQ',
  },
  {
    id: 2,
    brand: 'Bosch',
    title: 'Bếp từ Series 8',
    price: 22500000,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiQ-8pEkRhoSikz_vW-uHFJ0efQO1zcEgs-1f3VbxtyiPGvCoU029iaqp4PqqAxa9CLu5S0PehL7WNpc16yMfw3HV2ax5rxPSZoszWPQAvj__YjcdHZJ5kUfGFbXeMnCbVd9_ZsTH_k3rw-hx1LG2uDvBydFetQhE2NEP1lmvfN_wushHZAmwQ9KlSLGYGpFpRbNO2kR4oKOEfT7RBdvohPPbb1sEI2-yoELiBFkhJaycSvz-fISIeajxfPjwAik1VScD61RU2yA',
  },
  {
    id: 3,
    brand: 'LG',
    title: 'Máy giặt sấy AI DD™',
    price: 18290000,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNnXfseMfvNTZ3u2mXm2U-rEIQ8QxrpbLLYIrt9I5Ul1Dn35F13XXIKsvOdTZBzTgR6pWAwAbyQzlLRMD93oQ8onwbmk7hYSYRCxMS-OqBRhNs_1dmTDWgNvinRBj2d4EuYwoceMZcLRkqsQ8tOwFk-MQhmsADbVylEO3Caf6_qVNWEg1IOD5seZx0d6pgZumPk_YG0nxP2ME4fWSX2bFYRSEKyMTeNK7UnQ73cMC6gKAIgqMAOJErPbjCqYcrzX-SQN3ZVFkAsw',
  },
];
