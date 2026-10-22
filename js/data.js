/* Textile House — catalog data.
   Edit this file to change products, prices, colors and stories.
   Every text field is { hy, ru, en }. Prices are in AMD (֏). */

const L = (hy, ru, en) => ({ hy, ru, en });

const SHOP = {
  instagram: 'textile_housee',
  instagramUrl: 'https://www.instagram.com/textile_housee/',
  directUrl: 'https://ig.me/m/textile_housee',
  threadsUrl: 'https://www.threads.net/@textile_housee',
  followers: '13.8K',
  posts: 264,
  freeDeliveryFrom: 30000,
  delivery: { yerevan: 1000, region: 2000 }
};

const COLORS = {
  white:      { hex: '#f8f6f2', name: L('Սպիտակ', 'Белый', 'White') },
  milk:       { hex: '#efe5d6', name: L('Կաթնագույն', 'Молочный', 'Milk') },
  powder:     { hex: '#efcdc6', name: L('Փոշեվարդագույն', 'Пудровый', 'Powder pink') },
  rose:       { hex: '#d9a3a0', name: L('Վարդագույն', 'Розовый', 'Dusty rose') },
  sage:       { hex: '#aab79c', name: L('Մոխրականաչ', 'Шалфей', 'Sage') },
  beige:      { hex: '#dcc7ac', name: L('Բեժ', 'Бежевый', 'Beige') },
  mocha:      { hex: '#a98b74', name: L('Մոկկա', 'Мокко', 'Mocha') },
  grey:       { hex: '#c9c6c2', name: L('Մոխրագույն', 'Серый', 'Grey') },
  graphite:   { hex: '#6e6a69', name: L('Գրաֆիտ', 'Графит', 'Graphite') },
  blue:       { hex: '#aec0ce', name: L('Երկնագույն', 'Голубой', 'Sky blue') },
  mustard:    { hex: '#e2b65c', name: L('Մանանեխագույն', 'Горчичный', 'Mustard') },
  terracotta: { hex: '#c98266', name: L('Աղյուսագույն', 'Терракотовый', 'Terracotta') },
  lavender:   { hex: '#c8bcd8', name: L('Լավանդա', 'Лавандовый', 'Lavender') }
};

const CATEGORIES = [
  { id: 'bedding',    photo: 'cat-bedding',    name: L('Անկողնային սպիտակեղեն', 'Постельное бельё', 'Bed linen') },
  { id: 'blankets',   photo: 'cat-blankets',   name: L('Վերմակներ', 'Одеяла', 'Blankets') },
  { id: 'covers',     photo: 'cat-covers',     name: L('Ծածկոցներ', 'Покрывала', 'Bedspreads') },
  { id: 'pillows',    photo: 'cat-pillows',    name: L('Բարձեր', 'Подушки', 'Pillows') },
  { id: 'mattresses', photo: 'cat-mattresses', name: L('Ներքնակներ', 'Матрасы', 'Mattresses') },
  { id: 'towels',     photo: 'cat-towels',     name: L('Սրբիչներ', 'Полотенца', 'Towels') }
];

/* Standard bed-linen sizes, reused by several sets */
const BED_SIZES = {
  s15:    { name: L('Մեկուկես', '1,5-спальный', 'Single 1.5'),
            dims: L('Ծրար 150×215 · սավան 160×220 · բարձի երես 50×70 ×2',
                    'Пододеяльник 150×215 · простыня 160×220 · наволочки 50×70 ×2',
                    'Duvet cover 150×215 · sheet 160×220 · pillowcases 50×70 ×2') },
  s2:     { name: L('Երկտեղանի', '2-спальный', 'Double'),
            dims: L('Ծրար 180×215 · սավան 220×240 · բարձի երես 50×70 ×2',
                    'Пододеяльник 180×215 · простыня 220×240 · наволочки 50×70 ×2',
                    'Duvet cover 180×215 · sheet 220×240 · pillowcases 50×70 ×2') },
  euro:   { name: L('Եվրո', 'Евро', 'Euro'),
            dims: L('Ծրար 200×220 · սավան 240×260 · բարձի երես 50×70 ×2, 70×70 ×2',
                    'Пододеяльник 200×220 · простыня 240×260 · наволочки 50×70 ×2, 70×70 ×2',
                    'Duvet cover 200×220 · sheet 240×260 · pillowcases 50×70 ×2, 70×70 ×2') },
  family: { name: L('Ընտանեկան', 'Семейный', 'Family'),
            dims: L('Ծրար 150×215 ×2 · սավան 240×260 · բարձի երես 50×70 ×2, 70×70 ×2',
                    'Пододеяльник 150×215 ×2 · простыня 240×260 · наволочки 50×70 ×2, 70×70 ×2',
                    'Duvet covers 150×215 ×2 · sheet 240×260 · pillowcases 50×70 ×2, 70×70 ×2') }
};

const bedSizes = (a, b, c, d) => [
  { id: 's15', price: a }, { id: 's2', price: b }, { id: 'euro', price: c }, { id: 'family', price: d }
];
const dimSize = (label, price) => ({ id: label, label, price });

/* Bed-linen photos by color (js/photos.js), shared by the sets that come in that color.
   Every product lists a photo per color; a color without one shows the first color's photo. */
const BED_PHOTOS = {
  powder: 'bed-powder', white: 'bed-white', milk: 'bed-milk', sage: 'bed-sage', graphite: 'bed-graphite',
  grey: 'bed-grey', terracotta: 'bed-terracotta', mocha: 'bed-mocha', lavender: 'bed-lavender',
  beige: 'bed-beige', blue: 'bed-blue', mustard: 'bed-mustard'
};

const PRODUCTS = [
  /* ---------- Bed linen ---------- */
  {
    id: 'satin-premium', cat: 'bedding', photos: BED_PHOTOS, detail: 'detail-satin', made: 'am', tags: ['hit'], pop: 98,
    name: L('Սատին Պրեմիում', 'Сатин Премиум', 'Satin Premium'),
    material: L('100% բամբակ, սատին', '100% хлопок, сатин', '100% cotton satin'),
    desc: L('Փափուկ, թեթև փայլով սատին՝ 100% բամբակից։ Գրեթե չի ճմռթվում և պահպանում է գույնը բազմաթիվ լվացքներից հետո։',
            'Мягкий сатин из 100% хлопка с лёгким блеском. Почти не мнётся и сохраняет цвет после множества стирок.',
            'Soft 100% cotton satin with a subtle sheen. Barely wrinkles and keeps its color wash after wash.'),
    colors: ['powder', 'white', 'milk', 'sage', 'graphite'],
    sizes: bedSizes(21900, 25900, 28900, 32900)
  },
  {
    id: 'soft-wash', cat: 'bedding', photos: BED_PHOTOS, detail: 'detail-linen', made: 'import', tags: ['new'], pop: 95,
    name: L('Soft Wash լվացված բամբակ', 'Soft Wash варёный хлопок', 'Soft Wash cotton'),
    material: L('100% լվացված բամբակ', '100% варёный хлопок', '100% stonewashed cotton'),
    desc: L('Հատուկ լվացման շնորհիվ գործվածքը դառնում է շատ փափուկ, իսկ թեթև ճմռթված տեսքը ստեղծում է հարմարավետ ու ժամանակակից ինտերիեր։',
            'Благодаря особой стирке ткань становится очень мягкой, а лёгкий эффект жатости создаёт уютный современный интерьер.',
            'A special wash makes the fabric incredibly soft, and the relaxed crinkled look creates a cozy, modern bedroom.'),
    colors: ['sage', 'terracotta', 'mocha', 'powder', 'lavender'],
    sizes: bedSizes(24900, 28900, 31900, 35900)
  },
  {
    id: 'ranfors-classic', cat: 'bedding', photos: BED_PHOTOS, detail: 'detail-cotton', made: 'am', tags: [], pop: 90,
    name: L('Ռանֆորս Կլասիկ', 'Ранфорс Классик', 'Ranfors Classic'),
    material: L('100% բամբակ, ռանֆորս', '100% хлопок, ранфорс', '100% cotton ranfors'),
    desc: L('Ամուր և շնչող ռանֆորս՝ ամենօրյա օգտագործման համար։ Իդեալական գին-որակ հարաբերակցություն։',
            'Плотный и дышащий ранфорс на каждый день. Идеальное соотношение цены и качества.',
            'Durable, breathable ranfors cotton for every day. The best value for money.'),
    colors: ['white', 'beige', 'blue', 'grey'],
    sizes: bedSizes(14900, 17900, 19900, 23900)
  },
  {
    id: 'hotel-percale', cat: 'bedding', photos: { ...BED_PHOTOS, white: 'percale-white' }, detail: 'detail-percale', made: 'am', tags: [], pop: 80,
    name: L('Պերկալ «Հյուրանոցային»', 'Перкаль «Отель»', 'Hotel Percale'),
    material: L('100% բամբակ, պերկալ', '100% хлопок, перкаль', '100% cotton percale'),
    desc: L('Հյուրանոցային որակի պերկալ՝ զով և հարթ մակերեսով։ Հարմար է նաև հյուրանոցների և հյուրատների համար։',
            'Перкаль гостиничного качества — прохладный и гладкий. Подходит также для отелей и гостевых домов.',
            'Hotel-grade percale, cool and smooth to the touch. A great fit for hotels and guesthouses too.'),
    colors: ['white', 'milk'],
    sizes: bedSizes(19900, 23900, 26900, 30900)
  },
  {
    id: 'kids-dream', cat: 'bedding', photos: { ...BED_PHOTOS, blue: 'kids-blue' }, made: 'am', tags: [], pop: 70,
    name: L('Մանկական «Քաղցր երազ»', 'Детское «Сладкий сон»', 'Kids “Sweet Dream”'),
    material: L('100% բամբակ, ռանֆորս', '100% хлопок, ранфорс', '100% cotton ranfors'),
    desc: L('Նուրբ գույներ և աստղիկներով նախշ՝ մանկական սենյակի համար։ Անվտանգ ներկեր, փափուկ գործվածք։',
            'Нежные цвета и узор со звёздочками для детской. Безопасные красители, мягкая ткань.',
            'Gentle colors and a starry print for the nursery. Safe dyes, soft fabric.'),
    colors: ['blue', 'powder', 'mustard'],
    sizes: [
      { id: 'crib', label: L('Մանկական մահճակալ', 'Для кроватки', 'Crib'), price: 11900 },
      { id: 's15', price: 15900 }
    ]
  },

  /* ---------- Blankets ---------- */
  {
    id: 'cloud-blanket', cat: 'blankets', photos: { white: 'cloud-white' }, detail: 'detail-quilted', made: 'am', tags: ['hit'], pop: 97,
    name: L('Վերմակ «Ամպ»', 'Одеяло «Облако»', '“Cloud” blanket'),
    material: L('Միկրոֆիբր, «կարապի աղվամազ» լցոնիչ', 'Микрофибра, наполнитель «лебяжий пух»', 'Microfiber, swan-down alternative fill'),
    desc: L('Թեթև և տաք վերմակ՝ կարապի աղվամազի անալոգով։ Հիպոալերգեն է և հեշտությամբ լվացվում է մեքենայում։',
            'Лёгкое и тёплое одеяло с наполнителем «лебяжий пух». Гипоаллергенное, легко стирается в машинке.',
            'Light yet warm, with a swan-down alternative filling. Hypoallergenic and machine washable.'),
    colors: ['white'],
    sizes: [dimSize('140×205', 13900), dimSize('172×205', 16900), dimSize('200×220', 19900)]
  },
  {
    id: 'wool-blanket', cat: 'blankets', photos: { milk: 'wool-milk' }, made: 'am', tags: [], pop: 85,
    name: L('Բրդյա վերմակ', 'Шерстяное одеяло', 'Wool blanket'),
    material: L('Ոչխարի բուրդ, բամբակյա պատյան', 'Овечья шерсть, хлопковый чехол', 'Sheep wool, cotton cover'),
    desc: L('Բնական ոչխարի բուրդ՝ բամբակյա պատյանով։ Պահպանում է ջերմությունը և կարգավորում խոնավությունը։',
            'Натуральная овечья шерсть в хлопковом чехле. Сохраняет тепло и регулирует влажность.',
            'Natural sheep wool in a cotton cover. Keeps you warm and regulates moisture.'),
    colors: ['milk', 'beige'],
    sizes: [dimSize('140×205', 18900), dimSize('172×205', 22900), dimSize('200×220', 26900)]
  },
  {
    id: 'summer-blanket', cat: 'blankets', photos: { ...BED_PHOTOS, powder: 'summer-powder' }, made: 'am', tags: ['new'], pop: 88,
    name: L('Ամառային վերմակ', 'Летнее одеяло', 'Summer blanket'),
    material: L('Բամբակ, բարակ լցոնիչ', 'Хлопок, тонкий наполнитель', 'Cotton, light fill'),
    desc: L('Բարակ և թեթև վերմակ տաք գիշերների համար։ Կարող է օգտագործվել նաև որպես ծածկոց։',
            'Тонкое и лёгкое одеяло для тёплых ночей. Можно использовать и как покрывало.',
            'A thin, airy blanket for warm nights. Doubles as a bedspread.'),
    colors: ['powder', 'sage', 'blue', 'white'],
    sizes: [dimSize('140×205', 9900), dimSize('172×205', 11900), dimSize('200×220', 13900)]
  },
  {
    id: 'bamboo-blanket', cat: 'blankets', photos: { white: 'bamboo-white' }, detail: 'detail-quilted', made: 'import', tags: [], pop: 75,
    name: L('Բամբուկե վերմակ', 'Бамбуковое одеяло', 'Bamboo blanket'),
    material: L('Բամբուկե մանրաթել', 'Бамбуковое волокно', 'Bamboo fiber'),
    desc: L('Բամբուկե մանրաթելը լավ է անցկացնում օդը և ունի հակաբակտերիալ հատկություն։ Հարմար է ամբողջ տարվա համար։',
            'Бамбуковое волокно хорошо пропускает воздух и обладает антибактериальными свойствами. Подходит на весь год.',
            'Bamboo fiber breathes well and is naturally antibacterial. Comfortable all year round.'),
    colors: ['white', 'grey'],
    sizes: [dimSize('140×205', 15900), dimSize('172×205', 18900), dimSize('200×220', 21900)]
  },

  /* ---------- Bedspreads ---------- */
  {
    id: 'velvet-bedspread', cat: 'covers', photos: { mocha: 'velvet-mocha', sage: 'bed-sage', powder: 'summer-powder', graphite: 'bed-graphite' }, detail: 'detail-velvet', made: 'import', tags: ['sale'], discount: 15, pop: 92,
    name: L('Ծածկոց «Թավիշ»', 'Покрывало «Бархат»', 'Velvet bedspread'),
    material: L('Վելյուր, կարված', 'Велюр, стёганое', 'Quilted velour'),
    desc: L('Կարված թավշյա ծածկոց՝ բարձի երեսներով։ Ննջասենյակին տալիս է ավարտուն և շքեղ տեսք։',
            'Стёганое велюровое покрывало с наволочками. Придаёт спальне завершённый и роскошный вид.',
            'A quilted velour bedspread with matching shams. Gives the bedroom a finished, luxurious look.'),
    colors: ['mocha', 'sage', 'powder', 'graphite'],
    sizes: [dimSize('160×220', 16900), dimSize('220×240', 21900), dimSize('240×260', 24900)]
  },
  {
    id: 'muslin-throw', cat: 'covers', photos: { milk: 'muslin-milk', terracotta: 'muslin-terracotta', sage: 'muslin-sage' }, made: 'am', tags: ['new'], pop: 84,
    name: L('Մուսլինե ծածկոց', 'Муслиновое покрывало', 'Muslin throw'),
    material: L('100% բամբակ, 4 շերտ մուսլին', '100% хлопок, муслин 4 слоя', '100% cotton, 4-layer muslin'),
    desc: L('Թեթև, շնչող և շատ փափուկ մուսլին։ Յուրաքանչյուր լվացքից հետո դառնում է ավելի նուրբ։',
            'Лёгкий, дышащий и очень мягкий муслин. С каждой стиркой становится только нежнее.',
            'Light, breathable and very soft muslin that gets gentler with every wash.'),
    colors: ['milk', 'terracotta', 'sage'],
    sizes: [dimSize('150×200', 12900), dimSize('200×220', 16900)]
  },

  /* ---------- Pillows ---------- */
  {
    id: 'classic-pillow', cat: 'pillows', photos: { white: 'pillow-white' }, detail: 'detail-pillow', made: 'am', tags: ['hit'], pop: 93,
    name: L('Բարձ «Կլասիկ»', 'Подушка «Классика»', 'Classic pillow'),
    material: L('Միկրոֆիբր, սիլիկոնացված մանրաթել', 'Микрофибра, силиконизированное волокно', 'Microfiber, siliconized fiber'),
    desc: L('Միջին կոշտության բարձ, որը արագ վերականգնում է ձևը։ Չի առաջացնում ալերգիա։',
            'Подушка средней жёсткости, быстро восстанавливает форму. Не вызывает аллергии.',
            'Medium-firm pillow that quickly regains its shape. Allergy-friendly.'),
    colors: ['white'],
    sizes: [dimSize('50×70', 5900), dimSize('70×70', 6900)]
  },
  {
    id: 'memory-pillow', cat: 'pillows', photos: { white: 'memory-pillow' }, detail: 'detail-foam', made: 'import', tags: [], pop: 78,
    name: L('Օրթոպեդիկ բարձ Memory', 'Ортопедическая подушка Memory', 'Memory foam pillow'),
    material: L('Memory փրփուր, բամբուկե պատյան', 'Пена Memory, бамбуковый чехол', 'Memory foam, bamboo cover'),
    desc: L('Անատոմիական ձև, որը աջակցում է պարանոցին և ուսերին։ Պատյանը հանվում և լվացվում է։',
            'Анатомическая форма поддерживает шею и плечи. Чехол снимается и стирается.',
            'Contoured shape supports the neck and shoulders. Removable, washable cover.'),
    colors: ['white', 'grey'],
    sizes: [dimSize('60×40×12', 11900)]
  },
  {
    id: 'bow-pillowcases', cat: 'pillows', photos: { mustard: 'pillowcase-mustard', powder: 'pillowcase-powder', sage: 'bed-sage', milk: 'bed-milk' }, made: 'am', tags: ['new'], pop: 89,
    name: L('Բարձի երեսներ կապիչներով', 'Наволочки с завязками', 'Pillowcases with ties'),
    material: L('100% լվացված բամբակ', '100% варёный хлопок', '100% washed cotton'),
    desc: L('Նուրբ կապիչներով բարձի երեսներ՝ զույգով։ Հեշտ միավորվում են մեր սպիտակեղենի հետ։',
            'Наволочки с нежными завязками, в паре. Легко сочетаются с нашим бельём.',
            'A pair of pillowcases with soft ties. Mix and match with any of our sets.'),
    colors: ['mustard', 'powder', 'sage', 'milk'],
    sizes: [dimSize('50×70 ×2', 5900), dimSize('70×70 ×2', 6900)]
  },

  /* ---------- Mattresses ---------- */
  {
    id: 'comfort-mattress', cat: 'mattresses', photos: { milk: 'mattress' }, detail: 'detail-mattress', made: 'am', tags: ['hit'], pop: 91,
    name: L('Օրթոպեդիկ ներքնակ «Կոմֆորտ»', 'Ортопедический матрас «Комфорт»', '“Comfort” orthopedic mattress'),
    material: L('Անկախ զսպանակներ, կոկոսի շերտ, ժակարդ', 'Независимые пружины, кокос, жаккард', 'Pocket springs, coconut layer, jacquard'),
    desc: L('Անկախ զսպանակային բլոկ և երկկողմանի կոշտություն՝ առողջ քնի համար։ Բարձրությունը՝ 22 սմ։',
            'Блок независимых пружин и двусторонняя жёсткость для здорового сна. Высота — 22 см.',
            'Pocket-spring core with two firmness sides for healthy sleep. 22 cm high.'),
    colors: ['milk'],
    sizes: [dimSize('90×200', 69900), dimSize('140×200', 99900), dimSize('160×200', 109900), dimSize('180×200', 119900)]
  },
  {
    id: 'topper', cat: 'mattresses', photos: { white: 'topper' }, made: 'am', tags: [], pop: 82,
    name: L('Թոփեր', 'Топпер', 'Mattress topper'),
    material: L('Պոլիուրեթանային փրփուր, միկրոֆիբր', 'Пенополиуретан, микрофибра', 'PU foam, microfiber'),
    desc: L('5 սմ բարակ ներքնակ, որը փափկություն է ավելացնում հին ներքնակին կամ բազմոցին։',
            'Тонкий матрас 5 см добавляет мягкости старому матрасу или дивану.',
            'A 5 cm topper that adds softness to an old mattress or sofa.'),
    colors: ['white'],
    sizes: [dimSize('90×200', 24900), dimSize('160×200', 34900), dimSize('180×200', 38900)]
  },
  {
    id: 'protector', cat: 'mattresses', photos: { white: 'protector' }, made: 'am', tags: [], pop: 86,
    name: L('Ջրակայուն նամատրասնիկ', 'Непромокаемый наматрасник', 'Waterproof mattress protector'),
    material: L('Թերի բամբակ, ջրակայուն թաղանթ', 'Махровый хлопок, водонепроницаемая мембрана', 'Terry cotton, waterproof membrane'),
    desc: L('Պաշտպանում է ներքնակը հեղուկներից և փոշուց։ Ռետինե եզրերով, լավ պահվում է ներքնակի վրա։',
            'Защищает матрас от жидкостей и пыли. На резинке по периметру, плотно держится.',
            'Protects the mattress from spills and dust. Elastic skirt keeps it snugly in place.'),
    colors: ['white'],
    sizes: [dimSize('90×200', 7900), dimSize('160×200', 9900), dimSize('180×200', 10900)]
  },

  /* ---------- Towels ---------- */
  {
    id: 'terry-set', cat: 'towels', photos: { white: 'towels-white', powder: 'towels-powder', sage: 'towels-sage', beige: 'towels-beige', graphite: 'towels-graphite' }, made: 'import', tags: ['new'], pop: 87,
    name: L('Սրբիչների հավաքածու', 'Набор полотенец', 'Terry towel set'),
    material: L('100% բամբակ, 500 գ/մ²', '100% хлопок, 500 г/м²', '100% cotton, 500 gsm'),
    desc: L('3 սրբիչ՝ դեմքի, ձեռքի և բաղնիքի համար։ Խիտ, փափուկ և լավ կլանող։',
            '3 полотенца — для лица, рук и ванной. Плотные, мягкие и хорошо впитывают.',
            'Three towels for face, hands and bath. Dense, soft and highly absorbent.'),
    colors: ['white', 'powder', 'sage', 'beige', 'graphite'],
    sizes: [{ id: 'set3', label: L('30×50 · 50×90 · 70×140', '30×50 · 50×90 · 70×140', '30×50 · 50×90 · 70×140'), price: 13900 }]
  }
];

/* Instagram-style highlight stories */
const STORIES = [
  {
    id: 'delivery', photo: 'story-delivery', label: L('Առաքում', 'Доставка', 'Delivery'), bg: '#f3e3dc',
    slides: [
      { photo: 'story-handover', title: L('Առաքում ամբողջ Հայաստանով', 'Доставка по всей Армении', 'Delivery across Armenia'),
        text: L('Պատվերը կհասցնենք ցանկացած քաղաք և գյուղ 📦', 'Доставим заказ в любой город и село 📦', 'We deliver to any town or village 📦') },
      { photo: 'story-yerevan', title: L('Երևան', 'Ереван', 'Yerevan'),
        text: L('Առաքում 1 օրում։ 30 000 ֏-ից ավելի պատվերները՝ անվճար։', 'Доставка за 1 день. Заказы от 30 000 ֏ — бесплатно.', 'Next-day delivery. Free on orders over 30,000 ֏.') },
      { photo: 'story-regions', title: L('Մարզեր', 'Регионы', 'Regions'),
        text: L('1–3 աշխատանքային օր։ Վճարում՝ ստանալիս կամ փոխանցումով։', '1–3 рабочих дня. Оплата при получении или переводом.', '1–3 business days. Pay on delivery or by transfer.') }
    ]
  },
  {
    id: 'production', photo: 'story-sewing', label: L('Արտադրություն', 'Производство', 'Production'), bg: '#eef0e8',
    slides: [
      { photo: 'story-workshop', title: L('Մեր արտադրությունը', 'Наше производство', 'Our production'),
        text: L('Կարում ենք Հայաստանում՝ ընտրված գործվածքներից 🇦🇲', 'Шьём в Армении из отборных тканей 🇦🇲', 'Sewn in Armenia from selected fabrics 🇦🇲') },
      { photo: 'story-cutting', title: L('Ձևում', 'Раскрой', 'Cutting'),
        text: L('Յուրաքանչյուր կտոր ձևվում է ճշգրիտ չափերով', 'Каждая деталь кроится по точным размерам', 'Every piece is cut to exact measurements') },
      { photo: 'story-sewing', title: L('Կարում', 'Пошив', 'Sewing'),
        text: L('Փորձառու վարպետների ամուր և կոկիկ կարեր', 'Прочные и аккуратные швы опытных мастеров', 'Strong, neat seams by experienced seamstresses') },
      { photo: 'story-quality', title: L('Որակի ստուգում', 'Контроль качества', 'Quality check'),
        text: L('Ամեն ապրանք ստուգվում է փաթեթավորելուց առաջ', 'Каждое изделие проверяется перед упаковкой', 'Every item is checked before packing') }
    ]
  },
  {
    id: 'attention', photo: 'story-fabric', label: L('Ուշադրություն‼️', 'Внимание‼️', 'Attention‼️'), bg: '#f7e7e3',
    slides: [
      { photo: 'story-rolls', title: L('Գներ արտադրողից', 'Цены от производителя', 'Factory prices'),
        text: L('Գնում եք անմիջապես արտադրողից և ներկրողից՝ առանց միջնորդների', 'Покупаете напрямую у производителя и импортёра — без посредников', 'Buy directly from the maker and importer — no middlemen') },
      { photo: 'story-custom', title: L('Ոչ ստանդարտ չափ', 'Нестандартный размер', 'Custom sizes'),
        text: L('Կարող ենք կարել ձեր չափերով․ գրեք մեզ Direct', 'Сошьём по вашим размерам — пишите в Direct', 'We can sew to your measurements — DM us') },
      { photo: 'story-measure', title: L('Մինչ պատվիրելը', 'Перед заказом', 'Before ordering'),
        text: L('Ստուգեք ձեր վերմակի և ներքնակի չափերը', 'Проверьте размеры вашего одеяла и матраса', 'Check your blanket and mattress sizes') }
    ]
  },
  { id: 'st-blankets', cat: 'blankets', label: L('Վերմակներ', 'Одеяла', 'Blankets'), bg: '#f1f0ee' },
  { id: 'st-mattresses', cat: 'mattresses', label: L('Ներքնակներ', 'Матрасы', 'Mattresses'), bg: '#f3ece2' },
  { id: 'st-bedding', cat: 'bedding', label: L('Սպիտակեղեն', 'Бельё', 'Bed linen'), bg: '#f6e6e2' },
  { id: 'st-pillows', cat: 'pillows', label: L('Բարձեր', 'Подушки', 'Pillows'), bg: '#f7eedc' }
];

const REGIONS = [
  L('Երևան', 'Ереван', 'Yerevan'),
  L('Արագածոտն', 'Арагацотн', 'Aragatsotn'),
  L('Արարատ', 'Арарат', 'Ararat'),
  L('Արմավիր', 'Армавир', 'Armavir'),
  L('Գեղարքունիք', 'Гегаркуник', 'Gegharkunik'),
  L('Կոտայք', 'Котайк', 'Kotayk'),
  L('Լոռի', 'Лори', 'Lori'),
  L('Շիրակ', 'Ширак', 'Shirak'),
  L('Սյունիք', 'Сюник', 'Syunik'),
  L('Տավուշ', 'Тавуш', 'Tavush'),
  L('Վայոց ձոր', 'Вайоц Дзор', 'Vayots Dzor')
];
