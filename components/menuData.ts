export type MenuItem = {
  name: string
  description: string
  price: string | { veg?: number; chicken?: number; prawn?: number; egg?: number; fish?: number }
  isVeg?: boolean
  isNonVeg?: boolean
  isSignature?: boolean
  spice?: 1 | 2 | 3
  isMustTry?: boolean
}

export type MenuSection = {
  id: string
  title: string
  jp: string
  items: MenuItem[]
}

export const menuData: MenuSection[] = [
  {
    id: 'small-plate-veg',
    title: 'Small Plate — Veg',
    jp: '小皿料理',
    items: [
      { name: 'Golden Fried Potato Wedges in Honey Pepper Sauce', description: 'Potato wedges seasoned with a blend of paprika, garlic powder, chili, and served with honey pepper sauce.', price: '265', isVeg: true, spice: 1 },
      { name: 'Teriyaki Crispy Soya Chaap', description: "Soya chaap fried till crisp and glazed with a flavourful teriyaki-style sauce. It offers a combination of crispy texture and the signature sweet-savory taste of teriyaki.", price: '345', isVeg: true, isSignature: true },
      { name: 'Classic Indo-Chilli Cottage Cheese', description: 'Crispy fried cottage cheese tossed in a spicy, tangy and slightly sweet soya sauce, fresh chilies, ginger, garlic and seasonings.', price: '335', isVeg: true, spice: 2 },
      { name: 'Veg Balls in Choice of Sauce Manchurian/BBQ', description: 'Veg balls tossed in a powerhouse flavoured choice of sauce BBQ/manchurian sauce.', price: '320', isVeg: true },
      { name: 'Thai Spring Rolls with Chilli Plum Dip', description: 'Red pepper, shallots, chili, spring onions, and bean sprouts with soy sauce and sweet chili sauce stuffing wrapped in thin translucent roll sheets.', price: '390', isVeg: true, spice: 1 },
      { name: 'Crispy Lotus Stem in Honey Chilly Glaze', description: 'Lotus stem coated in a crispy batter, tossed in a flavourful honey chili sauce.', price: '365', isVeg: true, spice: 1 },
      { name: 'Ginger Black Bean Tofu', description: 'Tender cubes of golden-fried tofu stir-fried with aromatic ginger, garlic, and fermented black beans in a savory sauce, finished with spring onions and a hint of chili.', price: '365', isVeg: true, spice: 2 },
      { name: 'Mongolian Cottage Cheese', description: 'Deep-fried and wok-tossed cottage cheese in a rich, sweet and savory Mongolian sauce with ginger, garlic, and spring onions.', price: '350', isVeg: true, spice: 2 },
      { name: 'Kunji Crispy Mushroom', description: 'A style of crispy fried mushroom made with red chili paste, hoisin sauce and shaoxing wine, sweet and spicy.', price: '320', isVeg: true, spice: 1 },
      { name: 'Crispy Corn Salt & Pepper', description: 'American corn lightly coated with starch, seasoned with salt, black pepper, and white pepper, then stir-fried with aromatic garlic, ginger, spring onion, chili, and bell pepper.', price: '295', isVeg: true, spice: 1 },
    ]
  },
  {
    id: 'small-plate-nonveg',
    title: 'Small Plate — Non Veg',
    jp: '小皿料理',
    items: [
      { name: 'Classic Indo-Chilli Chicken', description: 'Crispy fried chicken tossed in a spicy, tangy and slightly sweet sauce made from fresh chilies, ginger, garlic, soy sauce, and seasonings.', price: '345', isNonVeg: true, spice: 2 },
      { name: 'Chicken Thai Spring Rolls with Chilli Plum Dip', description: 'Chicken with vegetables like carrot, red pepper, shallots, chili, spring onions, and bean sprouts with soy sauce and sweet chili sauce stuffing wrapped in thin translucent roll sheets.', price: '335', isNonVeg: true, spice: 1 },
      { name: 'Spicy Chicken Karaage with Yuzu Mayo', description: 'Tender chicken thighs marinated in spices, coated in a batter and twice deep-fried until golden brown, juicy, and ultra-crispy, served with yuzu mayo.', price: '350', isNonVeg: true, spice: 2 },
      { name: 'Chicken Satay with Ginger Peanut Sauce', description: 'Southeast Asian skewered and grilled chicken, marinated with red curry paste, Coconut milk, honey, soya and peanut butter.', price: '350', isNonVeg: true },
      { name: 'Korean-Spiced Chicken/Fish', description: 'Crunchy, bite-sized chicken perfect for snacking, coated in a sweet and spicy Korean sauce.', price: '345/389', isNonVeg: true, spice: 2 },
      { name: 'Crackling Prawn with Gochujang Soya Scallion', description: 'Prawn wrapped with wonton sheet, seasoned with mirin wine salt, pepper, lemon ric and dill, served with soya garlic scallion sauce.', price: '395', isNonVeg: true, spice: 2, isSignature: true },
      { name: 'Shangai Crispy Chicken', description: 'Succulent pieces of chicken coated in a light, airy batter and deep-fried to golden perfection, then tossed in a sweet, tangy, slightly spicy Shanghai sauce.', price: '365', isNonVeg: true, spice: 2 },
      { name: 'Drums of Heaven in choice of sauce- Soya Spring Onion/Hot Garlic', description: 'Chicken wings marinated in spices, coated in a batter, deep-fried until crisp, and tossed in a flavourful hot garlic sauce.', price: '385', isNonVeg: true, spice: 2 },
      { name: 'Butter Garlic Prawn', description: 'Butter, garlic, herbs, black pepper, parsley, and prawns in a rich and aromatic flavour.', price: '375', isNonVeg: true },
    ]
  },
  {
    id: 'dumpling',
    title: 'Dumpling',
    jp: '団子',
    items: [
      { name: 'Farm Vegetables Gyoza', description: 'Japanese dumplings filled with a juicy mixture of seasoned vegetables semi pan-fried for a crispy texture.', price: '265', isVeg: true, spice: 1 },
      { name: 'Wasabi Truffle Edamame Dumpling', description: 'A gourmet-style dumpling featuring a creamy, savory filling made with pureed edamame, enhanced with truffle oil.', price: '345', isVeg: true },
      { name: 'Mushroom & Bamboo Shoot Dumpling', description: 'Chinese dumplings filled with mushrooms, chopped tofu and bamboo shoot garlic, ginger, soy sauce, cracked black pepper and dill for robust flavour.', price: '270', isVeg: true, isSignature: true, spice: 1 },
      { name: 'Spicy Chicken & Asparagus Gyoza', description: 'Delicious Japanese dumplings filled with a juicy mixture of seasoned chicken and asparagus, semi pan-fried for a crispy texture.', price: '290', isNonVeg: true, spice: 2 },
      { name: 'Chicken, Chives & Cheese Dumplings', description: 'Ground chicken combined with freshly chopped chives and tangy crumbly cheese, wrapped in delicate dumpling skins.', price: '295', isNonVeg: true, spice: 1 },
    ]
  },
  {
    id: 'salad',
    title: 'Salad Bowl',
    jp: 'サラダボウル',
    items: [
      { name: 'Vegetable Somtam Salad', description: 'Thai green papaya, tomatoes, bird eyes chili, plum, sugar, soya sauce and seasonings.', price: '265', isVeg: true, spice: 2 },
      { name: 'Asian Chicken Salad', description: 'Shredded cooked chicken tossed with crisp green cabbage, carrots, bell peppers, green onions, fresh cilantro, roasted peanuts, and rice noodles, all coated in a savory-sweet Asian dressing.', price: '290', isNonVeg: true, spice: 1 },
    ]
  },
  {
    id: 'open-bao',
    title: 'Open Bao',
    jp: 'オープンバオ',
    items: [
      { name: 'Cottage Cheese Schezwan Bao', description: 'Fluffy steamed bao bun filled with pan-seared cottage cheese cubes tossed in spicy, tangy Schezwan sauce, finished with fresh cilantro and a hint of garlic.', price: '295', isVeg: true, spice: 2 },
      { name: 'Crispy Mushroom Chilly Garlic Bao', description: 'Golden crispy deep fried mushrooms tossed in spicy garlic chili sauce, tucked into soft steamed bao buns topped with fresh spring onion, coriander, and a drizzle of umami mayo.', price: '275', isVeg: true, spice: 2 },
      { name: 'Chicken Hot Basil Bao', description: 'Spicy stir fried chicken with garlic, fresh chillies and aromatic sweet basil nestled in a soft steamed bao.', price: '295', isNonVeg: true, spice: 2 },
      { name: 'Barbecue Chicken Bao', description: 'Tender barbecue chicken, glazed in a sweet and smoky sauce, tucked into soft steamed bao buns and topped with toloroso and a drizzle of siracaha mayo.', price: '295', isNonVeg: true, spice: 1 },
      { name: 'Korean Chicken Bao', description: 'Crispy Korean fried chicken tossed in sweet-spicy gochujang glaze, tucked into soft steamed bao buns with pickled cabbage, cucumber ribbons, and sesame seeds. Served with soy sauce and sriracha mayo.', price: '325', isNonVeg: true, isSignature: true, spice: 2 },
    ]
  },
  {
    id: 'sushi',
    title: 'Sushi',
    jp: '寿司',
    items: [
      { name: 'Rainbow Veggie', description: 'A vibrant, plant based sushi roll made with sushi rice, nori sheets, and a variety of colourful exotic vegetables topped with avocado.', price: '495', isVeg: true },
      { name: 'Jalapeño Togarashi', description: 'This bold roll features fresh slices of jalapeño with sriracha for a vibrant, spicy kick, combined with a dusting of togarashi (Japanese seven-spice powder) for warmth and complexity.', price: '495', isVeg: true, isSignature: true, spice: 2 },
      { name: 'Tempura Asparagus Cream Cheese', description: 'Crispy tempura asparagus and cream cheese rolled in sushi rice and nori, finished with a garnish of sesame seeds.', price: '530', isVeg: true },
      { name: 'Temporar Shrimp', description: 'Battered and fried shrimp tempura as the main filling, paired with fresh cucumber, wrapped in sushi rice and nori.', price: '595', isNonVeg: true },
      { name: 'Teriyaki Chicken', description: 'Grilled teriyaki glazed chicken rolled with sushi rice, nori, and toloroso, finished with a sweet-savory sauce and sesame seeds.', price: '535', isNonVeg: true },
      { name: 'California Roll', description: 'Sushi rice, nori, crab, ripe avocado, and crisp cucumber, finished with toasted sesame seeds.', price: '580', isNonVeg: true },
    ]
  },
  {
    id: 'soup',
    title: 'Soup',
    jp: 'スープ',
    items: [
      { name: 'Tom Kha Soup', description: "Chef's special Thai coconut soup, creamy, tangy, and aromatic flavors.", price: { veg: 230, chicken: 245, prawn: 300 }, isSignature: true, spice: 2 },
      { name: 'Ginger Lime Coriander Soup', description: 'Flavourful broth-based soup infused with aromatic celery, ginger, and garlic, combined with ingredients like fresh herbs and vegetables.', price: { veg: 195, chicken: 225, prawn: 245 }, spice: 1 },
      { name: 'Manchow', description: 'The classic Indo-Chinese soup made with cabbage, carrot, French beans, Capsicum, and fresh Cilantro.', price: { veg: 190, chicken: 220 }, spice: 1 },
      { name: 'Miso Soup with Tofu & Scallions', description: 'A classic Japanese soup made with a light broth, cubes of tofu, and fresh scallions.', price: { veg: 220, chicken: 235, prawn: 295 }, spice: 1 },
      { name: 'Tom Yum', description: 'Lemongrass, galangal, and kaffir lime leaves are foundational aromatics, infusing the broth with a citrusy and earthy aroma.', price: { veg: 205, chicken: 225, prawn: 235 }, spice: 2 },
    ]
  },
  {
    id: 'rice-noodles',
    title: 'Rice & Noodles',
    jp: 'ライス&ヌードル',
    items: [
      { name: 'Sensei Fried Rice', description: 'Rice prepared with a choice of protein, flavoured with soya and seasoning.', price: { veg: 305, egg: 325, chicken: 345, prawn: 365 }, isSignature: true, spice: 1 },
      { name: 'Pod Rice', description: 'Fried rice served with savory sauce on top.', price: { veg: 345, chicken: 375, prawn: 395 }, spice: 1 },
      { name: 'Stir Fried Burn Chilli Noodles', description: 'Stir-fried noodles tossed in a bold, smoky sauce made from caramelized garlic and chilies, with a spicy-savory depth and aromatic char.', price: { chicken: 365, prawn: 385 }, isNonVeg: true, spice: 3 },
      { name: 'Singapore Rice Noodles', description: 'Vibrant stir-fried thin rice vermicelli seasoned with curry powder and vegetables, delivering a fragrant & flavourful dish.', price: { veg: 305, chicken: 365, prawn: 385 }, isSignature: true, spice: 1 },
      { name: 'Pad-Thai Noodles', description: 'Stir-fried rice noodles with tamarind-infused sauce, peanuts, lime juice and sriracha sauce.', price: { veg: 405, chicken: 425, prawn: 455 }, spice: 2 },
      { name: 'Chilli Garlic Basil Noodles', description: 'Chilli garlic basil noodles with fresh red chili, julienned carrot, Thai basil, and spring onions, tossed in a savory soy and hoisin sauce.', price: { veg: 335, chicken: 370, prawn: 390 }, spice: 2 },
      { name: 'Yaki Udon', description: 'Thick wheat-flour udon noodles stir-fried with colorful vegetables in a savory sauce, topped with red and yellow capsicum.', price: { veg: 345, chicken: 375, prawn: 395 }, spice: 1 },
    ]
  },
  {
    id: 'ramen',
    title: 'Ramen',
    jp: 'ラーメン',
    items: [
      { name: 'Signature Ramen Bowl', description: 'Rich broth with noodles, braised pork, marinated egg, bok choy, prawns and fresh herbs. A masterclass in umami.', price: '595', isNonVeg: true, isSignature: true },
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    jp: 'デザート',
    items: [
      { name: 'Coco Crunchy Crêpe', description: 'A dessert that combines grated coconut, brown sugar, and creamy coconut milk, wrapped in wonton, with a textured crunch, served with ice cream.', price: '255', isVeg: true },
      { name: 'Honey Noodles with Ice Cream', description: 'Strips of wonton wrappers fried until crispy, cradled in warm honey-sesame sauce. Served with vanilla ice cream.', price: '275', isVeg: true, isSignature: true },
    ]
  },
  {
    id: 'beverages',
    title: 'Beverages',
    jp: '飲み物',
    items: [
      { name: 'Lemon Iced Tea', description: 'Refreshing house-made lemon iced tea.', price: '135', isVeg: true },
      { name: 'Mineral Water', description: 'Still mineral water.', price: '40', isVeg: true },
      { name: 'Ginger Ale', description: 'Premium ginger ale.', price: '110', isVeg: true },
      { name: 'Aerated Drinks', description: 'Sprite / Coke / Diet Coke', price: '80', isVeg: true },
    ]
  },
]

export const specialDishes = [
  { name: 'Signature Ramen Bowl', tag: 'Must Try', img: '/images/food1.jpeg' },
  { name: 'Honey Noodles Ice Cream', tag: 'Dessert', img: '/images/food3.jpeg' },
  { name: 'Mushroom & Bamboo Shoot Dumplings', tag: 'Delicately Bold', img: '/images/food4.jpeg' },
  { name: 'Yaki Udon', tag: 'Street Favourite', img: '/images/food2.jpeg' },
]
