
import womensCasualTop from '../assets/images/CASUAL-TOP.avif'
import womensCasualTopBurgundy from '../assets/images/CASUAL-TOP-BURGUNDY.avif'
import womensCasualTopNavy from '../assets/images/CASUAL-TOP-NAVY.avif'

import wirelessHeadphones from '../assets/images/WIRELESS-HEADPHONES.avif'

import miniCrossbodyBag from '../assets/images/MINI-CROSSBODY.avif'
import blackCrossbodyBag from '../assets/images/MINI-CROSSBODY-BLACK.avif'
import orangeCrossbodyBag from '../assets/images/MINI-CROSSBODY-ORANGE.avif'

import ledMiniDeskLamp from '../assets/images/LED-DESK-LAMP.avif'

import everydaySneakers from '../assets/images/EVERYDAY-SNEAKERS.avif'
import blackMensSneakers from '../assets/images/MENS-SNEAKERS-BLACK.avif'

import storageOrganizer from '../assets/images/STORAGE-ORGANIZER.avif'

import phoneCase from '../assets/images/PHONE-CASE.avif'
import bluePhoneCase from '../assets/images/BLUE-PHONE-CASE.avif'
import pinkPhoneCase from '../assets/images/PINK-PHONE-CASE.avif'

import makeupBrushSet from '../assets/images/MAKEUP-BRUSH.avif'
import candySqueezeToy from '../assets/images/CANDY-SQUEEZE-TOY.avif'

import loungeSetBlack from '../assets/images/LOUNGE-SET-BLACK.avif'
import loungeSetPink from '../assets/images/LOUNGE-SET-PINK.avif'
import loungeSetGrey from '../assets/images/LOUNGE-SET-GREY.avif'

import hoodieBrown from '../assets/images/MENS-CASUAL-HOODIE-BROWN.avif'
import hoodieGreen from '../assets/images/MENS-CASUAL-HOODIE-GREEN.avif'

import shoulderBagBeige from '../assets/images/SHOULDER-BAG-BEIGE.avif'
import shoulderBagBlack from '../assets/images/SHOULDER-BAG-BLACK.avif'
import shoulderBagBrown from '../assets/images/SHOULDER-BAG-BROWN.avif'

import plushTeddyBeige from '../assets/images/PLUSH-TEDDY-BEIGE.avif'
import plushTeddyBrown from '../assets/images/PLUSH-TEDDY-BROWN.avif'

import pandaBuildBlock from '../assets/images/PANDA-BUILD-BLOCK.avif'

import lipGlossSet from '../assets/images/LIPGLOSS-SET.avif'
import makeupOrganizer from '../assets/images/MAKEUP-ORGANIZER.avif'

import faceBrushBlue from '../assets/images/FACE-BRUSH-BLUE.avif'
import faceBrushPink from '../assets/images/FACE-BRUSH-PINK.avif'

import cordlessDrill from '../assets/images/DRILL.avif'
import portableToolKit from '../assets/images/TOOL-KIT.avif'

import smartWatchBlack from '../assets/images/SMART-WATCH-BLACK.avif'
import smartWatchPink from '../assets/images/SMART-WATCH-PINK.avif'
import smartWatchSilver from '../assets/images/SMART-WATCH-SILVER.avif'

import bluetoothSpeaker from '../assets/images/BLUETOOTH-SPEAKER.avif'

import tableLamp from '../assets/images/TABLE-LAMP.avif'
import nightstand from '../assets/images/NIGHTSTAND.avif'

import pillowWhite from '../assets/images/PILLOW-WHITE.avif'
import pillowGreen from '../assets/images/PILLOW-GREEN.avif'
import pillowPink from '../assets/images/PILLOW-PINK.avif'
import pillowGrey from '../assets/images/PILLOW-GREY.avif'
import pillowBeige from '../assets/images/PILLOW-BEIGE.avif'

// Featured products displayed in Weekly Deals
export const weeklyDeals = [
  {
    id: 1,
    name: "Women's Casual Knit Top",
    price: '$14.99',
    image: womensCasualTop,
    category: 'Clothes',
    description: 'Comfortable long-sleeve knit top with denim-style accents, designed for casual everyday outfits.',
    details: ['Long sleeves', 'Denim-style collar and pocket', 'Casual relaxed fit'],
    colorImages: {
      Beige: womensCasualTop,
      Burgundy: womensCasualTopBurgundy,
      Navy: womensCasualTopNavy,
    },
  },
  {
    id: 2,
    name: 'Hybrid Wireless Headphones',
    price: '$22.99',
    image: wirelessHeadphones,
    category: 'Electronics',
    description: 'Wireless over-ear headphones designed for listening to music and everyday entertainment.',
    details: ['Wireless connectivity', 'Over-ear design', 'Adjustable headband'],
  },
  {
    id: 3,
    name: "Women's Mini Crossbody Bag",
    price: '$11.99',
    image: miniCrossbodyBag,
    category: 'Clothes',
    description: 'Compact crossbody bag for carrying everyday essentials while keeping your hands free.',
    details: ['Compact design', 'Adjustable shoulder strap', 'Multiple storage compartments'],
    colorImages: {
      Beige: miniCrossbodyBag,
      Black: blackCrossbodyBag,
      Orange: orangeCrossbodyBag,
    },
  },
  {
    id: 4,
    name: 'LED Mini Desk Lamp',
    price: '$18.99',
    image: ledMiniDeskLamp,
    category: 'Tools',
    description: 'LED desk lamp designed to provide adjustable lighting for studying, reading, and working.',
    details: ['LED lighting', 'Desktop design', 'Adjustable lighting'],
  },
]

// Additional products displayed in Popular
export const popularProducts = [
  {
    id: 5,
    name: "Men's Lightweight Athletic Sneakers",
    price: '$26.99',
    image: everydaySneakers,
    category: 'Clothes',
    description: 'Lightweight lace-up athletic sneakers designed for running, walking, and everyday wear.',
    details: ['Lace-up closure', 'Cushioned insole', 'Shock-absorbing sole'],
    colorImages: {
      Black: blackMensSneakers,
      Multicolor: everydaySneakers,
    },
  },
  {
    id: 6,
    name: 'Storage Organizer Cabinet',
    price: '$15.99',
    image: storageOrganizer,
    category: 'Furniture',
    description: 'Multi-compartment storage organizer designed to help keep household items organized.',
    details: ['Multiple storage compartments', 'Freestanding design', 'Home organization'],
  },
  {
    id: 7,
    name: 'Protective Phone Case',
    price: '$6.99',
    image: phoneCase,
    category: 'Electronics',
    description: 'Protective smartphone case with a rugged design for everyday phone protection.',
    details: ['Protective exterior', 'Phone-specific fit', 'Raised protective edges'],
    colorImages: {
      Blue: bluePhoneCase,
      Black: phoneCase,
      Pink: pinkPhoneCase,
    },
  },
  {
    id: 8,
    name: 'Professional Makeup Brush Set',
    price: '$9.99',
    image: makeupBrushSet,
    category: 'Beauty',
    description: 'Makeup brush collection designed for applying and blending different cosmetic products.',
    details: ['Multiple brush styles', 'Face and eye makeup application', 'Storage case included'],
  },
]
// Additional products available in the store
export const otherProducts = [
  {
    id: 9,
    name: 'Watermelon Candy Squeeze Toy',
    price: '$4.99',
    image: candySqueezeToy,
    category: 'Toys',
    description: 'Watermelon-themed squeeze toy designed for sensory play and stress relief.',
    details: ['Watermelon design', 'Soft squeeze texture', 'Handheld sensory toy'],
  },

  // Clothing
  {
    id: 10,
    name: "Women's Two-Piece Lounge Set",
    price: '$24.99',
    image: loungeSetBlack,
    category: 'Clothes',
    description: 'Comfortable matching two-piece lounge outfit designed for relaxing and casual wear.',
    details: ['Matching top and pants', 'Relaxed fit', 'Comfortable everyday style'],
    colorImages: {
      Black: loungeSetBlack,
      Pink: loungeSetPink,
      Grey: loungeSetGrey,
    },
  },
  {
    id: 11,
    name: "Men's Casual Pullover Hoodie",
    price: '$19.99',
    image: hoodieBrown,
    category: 'Clothes',
    description: 'Casual pullover hoodie designed for comfortable everyday wear in cooler weather.',
    details: ['Pullover design', 'Hood with drawstrings', 'Long sleeves'],
    colorImages: {
      Green: hoodieGreen,
      Brown: hoodieBrown,
    },
  },
  {
    id: 12,
    name: "Women's Everyday Shoulder Bag",
    price: '$16.99',
    image: shoulderBagBeige,
    category: 'Clothes',
    description: 'Everyday shoulder handbag designed to carry personal essentials in a stylish way.',
    details: ['Shoulder strap', 'Main storage compartment', 'Everyday handbag design'],
    colorImages: {
      Beige: shoulderBagBeige,
      Black: shoulderBagBlack,
      Brown: shoulderBagBrown,
    },
  },

  // Toys
  {
    id: 13,
    name: 'Soft Plush Teddy Bear',
    price: '$12.99',
    image: plushTeddyBrown,
    category: 'Toys',
    description: 'Soft plush teddy bear suitable for cuddling, gifting, and decorative display.',
    details: ['Soft plush exterior', 'Stuffed animal design', 'Gift-friendly'],
    colorImages: {
      Brown: plushTeddyBrown,
      Beige: plushTeddyBeige,
    },
  },
  {
    id: 14,
    name: 'Panda Building Block Set',
    price: '$10.99',
    image: pandaBuildBlock,
    category: 'Toys',
    description: 'Panda-themed building block set for creative construction and display.',
    details: ['Panda design', 'Building block pieces', 'Decorative finished model'],
  },

  // Beauty
  {
    id: 15,
    name: 'Colorful Lip Gloss Set',
    price: '$10.99',
    image: lipGlossSet,
    category: 'Beauty',
    description: 'Collection of colorful lip glosses for adding shine to everyday makeup looks.',
    details: ['Multiple lip gloss shades', 'Glossy finish', 'Set packaging'],
  },
  {
    id: 16,
    name: 'Portable Makeup Organizer Case',
    price: '$18.99',
    image: makeupOrganizer,
    category: 'Beauty',
    description: 'Portable makeup storage case designed to organize cosmetics and beauty accessories.',
    details: ['Portable design', 'Multiple storage sections', 'Makeup organization'],
  },
  {
    id: 17,
    name: 'Facial Cleansing Brush',
    price: '$8.99',
    image: faceBrushBlue,
    category: 'Beauty',
    description: 'Handheld facial cleansing brush designed for use during a skincare routine.',
    details: ['Handheld design', 'Textured cleansing surface', 'Facial care accessory'],
    colorImages: {
      Blue: faceBrushBlue,
      Pink: faceBrushPink,
    },
  },

  // Tools
  {
    id: 18,
    name: 'Cordless Electric Drill Kit',
    price: '$39.99',
    image: cordlessDrill,
    category: 'Tools',
    description: 'Cordless electric drill kit designed for common home improvement and assembly tasks.',
    details: ['Cordless drill', 'Portable design', 'Drilling and fastening applications'],
  },
  {
    id: 19,
    name: 'Portable Household Tool Kit',
    price: '$24.99',
    image: portableToolKit,
    category: 'Tools',
    description: 'Portable household tool kit containing tools for everyday repairs and small projects.',
    details: ['Multiple household tools', 'Storage carrying case', 'Home maintenance use'],
  },

  // Electronics
  {
    id: 20,
    name: 'Smart Watch with Touchscreen',
    price: '$29.99',
    image: smartWatchBlack,
    category: 'Electronics',
    description: 'Touchscreen smart watch with convenient features for daily activities.',
    details: ['Touchscreen display', 'Wrist-worn design', 'Smartwatch interface'],
    colorImages: {
      Black: smartWatchBlack,
      Pink: smartWatchPink,
      Silver: smartWatchSilver,
    },
  },
  {
    id: 21,
    name: 'Portable Bluetooth Speaker',
    price: '$17.99',
    image: bluetoothSpeaker,
    category: 'Electronics',
    description: 'Portable wireless speaker designed for listening to audio at home or on the go.',
    details: ['Bluetooth connectivity', 'Portable design', 'Wireless audio playback'],
  },

  // Furniture
  {
    id: 22,
    name: 'Modern Decorative Table Lamp',
    price: '$14.99',
    image: tableLamp,
    category: 'Furniture',
    description: 'Decorative table lamp designed to add soft lighting and modern style to a room.',
    details: ['Decorative design', 'Tabletop placement', 'Accent lighting'],
  },
  {
    id: 23,
    name: 'Modern Bedroom Nightstand',
    price: '$22.99',
    image: nightstand,
    category: 'Furniture',
    description: 'Compact bedside nightstand designed for convenient bedroom storage.',
    details: ['Bedside furniture', 'Storage space', 'Compact design'],
  },
  {
    id: 24,
    name: 'Decorative Round Throw Pillow',
    price: '$11.99',
    image: pillowBeige,
    category: 'Furniture',
    description: 'Soft decorative round pillow designed to add comfort and color to living spaces.',
    details: ['Round decorative shape', 'Soft textured design', 'Accent pillow'],
    colorImages: {
      White: pillowWhite,
      Green: pillowGreen,
      Pink: pillowPink,
      Grey: pillowGrey,
      Beige: pillowBeige,
    },
  },
]

// Combined product list used by search, categories, and product details
export const allProducts = [
  ...weeklyDeals,
  ...popularProducts,
  ...otherProducts,
]