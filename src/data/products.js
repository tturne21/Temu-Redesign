import womensCasualTop from '../assets/images/CASUAL-TOP.avif'
import wirelessHeadphones from '../assets/images/WIRELESS-HEADPHONES.avif'
import miniCrossbodyBag from '../assets/images/MINI-CROSSBODY.avif'
import ledMiniDeskLamp from '../assets/images/LED-DESK-LAMP.avif'

import everydaySneakers from '../assets/images/EVERYDAY-SNEAKERS.avif'
import storageOrganizer from '../assets/images/STORAGE-ORGANIZER.avif'
import phoneCase from '../assets/images/PHONE-CASE.avif'
import makeupBrushSet from '../assets/images/MAKEUP-BRUSH.avif'
import taffyCandy from '../assets/images/taffy-candy.jpg'

export const weeklyDeals = [
  {
    id: 1,
    name: "Women's Casual Top",
    price: '$14.99',
    image: womensCasualTop,
    category: 'Clothes',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: '$22.99',
    image: wirelessHeadphones,
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Mini Crossbody Bag',
    price: '$11.99',
    image: miniCrossbodyBag,
    category: 'Clothes',
  },
  {
    id: 4,
    name: 'LED Mini Desk Lamp',
    price: '$18.99',
    image: ledMiniDeskLamp,
    category: 'Tools',
  },
]

export const popularProducts = [
  {
    id: 5,
    name: 'Everyday Sneakers',
    price: '$39.99',
    image: everydaySneakers,
    category: 'Clothes',
  },
  {
    id: 6,
    name: 'Storage Organizer',
    price: '$39.99',
    image: storageOrganizer,
    category: 'Furniture',
  },
  {
    id: 7,
    name: 'Phone Case',
    price: '$39.99',
    image: phoneCase,
    category: 'Electronics',
  },
  {
    id: 8,
    name: 'Makeup Brush Set',
    price: '$39.99',
    image: makeupBrushSet,
    category: 'Beauty',
  },
  {
  id: 9,
  name: 'Taffy Candy',
  price: '$4.99',
  image: taffyCandy,
  category: 'Toys',
},
]

export const allProducts = [...weeklyDeals, ...popularProducts]