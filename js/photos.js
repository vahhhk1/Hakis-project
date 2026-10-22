/* Photos: every picture on the site, stored as compressed WebP in public/images.
   Each entry is the original size, the widths that were exported (name-<width>.webp),
   alt text in hy / ru / en, and an optional object-position for tight crops. */

const P = (w, h, v, alt, pos) => ({ w, h, v, alt, pos });
const STD = [480, 800, 1280];

const PHOTOS = {
  /* ---------- Hero carousel ---------- */
  'hero-satin': P(2400, 1601, [960, 1600, 2400], L(
    'Սպիտակ սատինե սպիտակեղեն և բարձեր՝ գիշերային լամպի տաք լույսի ներքո',
    'Белое сатиновое бельё и подушки в тёплом свете ночника',
    'White sateen bedding and pillows in the warm light of a bedside lamp'), '62% 50%'),
  'hero-velvet': P(2400, 1541, [960, 1600, 2400], L(
    'Մուգ փայտե գլխատախտակ, շագանակագույն թավշյա բարձեր և ծածկոց՝ երեկոյան արևի լույսի ներքո',
    'Тёмное деревянное изголовье, коричневые бархатные подушки и покрывало в вечернем солнце',
    'Dark wooden headboard, brown velvet cushions and a bedspread in evening sunlight')),
  'hero-cloud': P(2400, 1600, [960, 1600, 2400], L(
    'Փափուկ սպիտակ վերմակ և բարձեր՝ առավոտյան տաք լույսի ներքո',
    'Мягкое белое одеяло и подушки в тёплом утреннем свете',
    'Soft white duvet and pillows in warm morning light')),

  /* ---------- Categories ---------- */
  'cat-bedding': P(1600, 1270, STD, L(
    'Ննջասենյակ՝ մուգ կապտամոխրագույն պատով, կախովի լամպերով և սատինե սպիտակեղենով',
    'Спальня с тёмной серо-синей стеной, подвесными лампами и сатиновым бельём',
    'Bedroom with a dark blue-grey wall, pendant lamps and sateen bedding')),
  'cat-blankets': P(1600, 897, STD, L(
    'Փափուկ սպիտակ վերմակ մահճակալի վրա',
    'Пышное белое одеяло на кровати',
    'Fluffy white duvet on a bed')),
  'cat-covers': P(1600, 1067, STD, L(
    'Հավաքված մահճակալ՝ սպիտակ կարված ծածկոցով և կրեմագույն բարձերով',
    'Заправленная кровать с белым стёганым покрывалом и кремовыми подушками',
    'Made bed with a white quilted bedspread and cream cushions'), '50% 70%'),
  'cat-pillows': P(1600, 1067, STD, L(
    'Սպիտակ բարձեր հյուրանոցային մահճակալի վրա՝ փայտե գլխատախտակով',
    'Белые подушки на гостиничной кровати с деревянным изголовьем',
    'White pillows on a hotel bed with a wooden headboard')),
  'cat-mattresses': P(1600, 1068, STD, L(
    'Նոր սպիտակ ներքնակ մահճակալի վրա՝ լուսավոր ժամանակակից ննջասենյակում',
    'Новый белый матрас на кровати в светлой современной спальне',
    'New white mattress on a bed in a bright modern bedroom')),
  'cat-towels': P(1600, 1067, STD, L(
    'Ծալված մոխրագույն սրբիչների դարսակ լոգարանում՝ մոմի լույսի ներքո',
    'Стопка сложенных серых полотенец при свете свечи в ванной',
    'Stack of folded grey towels by candlelight in a bathroom'), '30% 50%'),

  /* ---------- Bed linen, by color ---------- */
  'bed-powder': P(1600, 2330, [480, 800, 1099], L(
    'Փոշեվարդագույն սպիտակեղեն մուգ փայտե գլխատախտակով մահճակալի վրա',
    'Пудрово-розовое постельное бельё на кровати с тёмным деревянным изголовьем',
    'Powder-pink bedding on a bed with a dark wooden headboard'), '50% 60%'),
  'bed-sage': P(1600, 1067, STD, L(
    'Մոխրականաչ ծրար և բարձի երեսներ',
    'Пододеяльник и наволочки цвета шалфея',
    'Sage-green duvet cover and pillowcases')),
  'bed-white': P(1600, 1067, STD, L(
    'Սպիտակ անկողնային սպիտակեղեն մի քանի բարձերով',
    'Белое постельное бельё с несколькими подушками',
    'White bedding with several pillows')),
  'bed-milk': P(1600, 1600, STD, L(
    'Լուսավոր ննջասենյակ՝ կաթնագույն սպիտակեղենով փայտե մահճակալի վրա',
    'Светлая спальня с молочным комплектом белья на деревянной кровати',
    'Bright bedroom with a milk-white bedding set on a wooden bed')),
  'bed-graphite': P(1600, 1067, STD, L(
    'Գրաֆիտագույն սպիտակեղեն՝ սկուտեղով, հատապտուղներով և ջրի բաժակով',
    'Бельё графитового цвета с подносом, ягодами и стаканом воды',
    'Graphite bedding with a tray of berries and a glass of water')),
  'bed-grey': P(1600, 1067, STD, L(
    'Մոխրագույն սպիտակեղեն ցածր փայտե մահճակալի վրա՝ շրջանակված նկարներով',
    'Серое бельё на низкой деревянной кровати рядом с картинами в рамах',
    'Grey bedding on a low wooden bed beside framed prints')),
  'bed-terracotta': P(1600, 2400, [480, 800, 1067], L(
    'Աղյուսագույն սպիտակեղեն՝ նախշավոր բարձերով',
    'Терракотовое постельное бельё с узорчатыми подушками',
    'Terracotta bedding with patterned cushions'), '50% 40%'),
  'bed-mocha': P(1600, 2416, [480, 800, 1060], L(
    'Մոկկա գույնի սպիտակեղեն մուգ գլխատախտակով մահճակալի վրա',
    'Постельное бельё цвета мокко на кровати с тёмным изголовьем',
    'Mocha bedding on a bed with a dark headboard')),
  'bed-lavender': P(1600, 1067, STD, L(
    'Լավանդագույն ծածկոց սպիտակ մահճակալին և թեյնիկ փայտե սկուտեղի վրա',
    'Лавандовый плед на белой кровати и чайник на деревянном подносе',
    'Lavender blanket on a white bed with a teapot on a wooden tray')),
  'bed-beige': P(1600, 2133, [480, 800, 1200], L(
    'Բեժ սպիտակեղեն և բարձեր սպիտակ պատի մոտ',
    'Бежевое постельное бельё и подушки у белой стены',
    'Beige bedding and pillows against a white wall'), '50% 65%'),
  'bed-blue': P(1600, 1067, STD, L(
    'Երկնագույն սպիտակեղեն և գիրք կարդացող մարդ',
    'Голубое постельное бельё и человек с книгой',
    'Sky-blue bedding and a person reading a book')),
  'bed-mustard': P(1600, 1067, STD, L(
    'Մանանեխագույն ծածկոց փայտե մահճակալի վրա՝ լուսավոր սենյակում',
    'Горчичное покрывало на деревянной кровати в светлой комнате',
    'Mustard bedspread on a wooden bed in a bright room')),

  /* ---------- Products ---------- */
  'percale-white': P(1600, 1067, STD, L(
    'Սպիտակ պերկալե սպիտակեղեն հյուրանոցային մահճակալի վրա՝ պատի լամպերով',
    'Белое перкалевое бельё на гостиничной кровати с настенными светильниками',
    'Crisp white percale bedding on a hotel bed with wall lamps')),
  'kids-blue': P(1600, 1067, STD, L(
    'Մանկական սենյակ՝ երկու մահճակալով և կապույտ-սպիտակ գծավոր սպիտակեղենով',
    'Детская с двумя кроватями в сине-белом полосатом белье',
    'Kids’ room with twin beds in blue and white striped bedding')),
  'cloud-white': P(1600, 1065, STD, L(
    'Փափուկ կաթնագույն վերմակ մահճակալի վրա',
    'Пышное молочное одеяло на кровати',
    'Fluffy milk-white duvet on a bed')),
  'wool-milk': P(1600, 2397, [480, 800, 1068], L(
    'Տաք վերմակների դարսակ աթոռին՝ աղյուսե բուխարու և վառելափայտի մոտ',
    'Стопка тёплых одеял на стуле у кирпичного камина с дровами',
    'Stack of warm duvets on a chair by a brick fireplace with firewood'), '50% 70%'),
  'summer-powder': P(1600, 1067, STD, L(
    'Թեթև վարդագույն կարված ծածկոց հավաքված մահճակալի վրա',
    'Лёгкое розовое стёганое покрывало на заправленной кровати',
    'Light pink quilted coverlet on a made bed')),
  'bamboo-white': P(1600, 1067, STD, L(
    'Ծալված սպիտակ վերմակներ և բարձեր մահճակալին՝ բաց դռան միջով',
    'Сложенные белые одеяла и подушки на кровати за открытой дверью',
    'Folded white duvets and pillows on a bed, seen through an open door'), '62% 50%'),
  'velvet-mocha': P(1600, 1015, STD, L(
    'Մոկկա գույնի ծածկոց և շագանակագույն բարձեր՝ մոխրականաչ պատի ֆոնին',
    'Покрывало цвета мокко и коричневые подушки у стены цвета шалфея',
    'Mocha bedspread and brown cushions against a sage-green wall')),
  'muslin-milk': P(1600, 2400, [480, 800, 1067], L(
    'Կաթնագույն ճմռթված բամբակե մուսլին բնական լույսի ներքո',
    'Молочный жатый хлопковый муслин при дневном свете',
    'Milk-white crinkled cotton muslin in daylight')),
  'muslin-terracotta': P(1600, 1600, STD, L(
    'Աղյուսագույն փափուկ մուսլին մոտիկից',
    'Мягкий терракотовый муслин крупным планом',
    'Soft terracotta muslin, close up')),
  'muslin-sage': P(1600, 1600, STD, L(
    'Կանաչ ճմռթված փափուկ մուսլին մոտիկից',
    'Мягкий зелёный жатый муслин крупным планом',
    'Soft green crinkled muslin, close up')),
  'pillow-white': P(1600, 2400, [480, 800, 1067], L(
    'Երկու սպիտակ բարձ մարմարե պատի մոտ՝ փայտե հատակին',
    'Две белые подушки у мраморной стены на деревянном полу',
    'Two white pillows against a marble wall on a wooden floor'), '50% 62%'),
  'memory-pillow': P(1600, 2400, [480, 800, 1067], L(
    'Կինը քնած է անատոմիական օրթոպեդիկ բարձի վրա',
    'Женщина спит на анатомической ортопедической подушке',
    'Woman asleep on a contoured orthopedic pillow'), '50% 30%'),
  'pillowcase-mustard': P(1600, 1067, STD, L(
    'Մանանեխագույն բարձի երեսներ սպիտակ մահճակալին՝ դեղին լամպի կողքին',
    'Горчичные наволочки на белой кровати рядом с жёлтой лампой',
    'Mustard pillowcases on a white bed beside a yellow lamp'), '35% 50%'),
  'pillowcase-powder': P(1600, 2399, [480, 800, 1067], L(
    'Վարդագույն և սպիտակ բարձի երեսներ՝ փափուկ գլխատախտակով մահճակալի վրա',
    'Розовые и белые наволочки на кровати с мягким изголовьем',
    'Pink and white pillowcases on a bed with a tufted headboard'), '50% 75%'),
  'mattress': P(1600, 2400, [480, 800, 1067], L(
    'Ներքնակի անկյունը՝ սպիտակ կարված վերնամասով և մուգ կողքերով',
    'Угол матраса со стёганым белым верхом и тёмными боками',
    'Corner of a mattress with a white quilted top and dark sides')),
  'topper': P(1600, 2347, [480, 800, 1091], L(
    'Հաստ սպիտակ կարված թոփեր պատուհանի մոտ',
    'Толстый белый стёганый топпер у окна',
    'Thick white quilted mattress topper by a window'), '50% 65%'),
  'protector': P(1600, 2400, [480, 800, 1067], L(
    'Ձեռքերը ներքնակին պատյան են հագցնում',
    'Руки натягивают чехол на матрас',
    'Hands smoothing a fitted cover over a mattress'), '50% 40%'),
  'towels-white': P(1600, 2400, [480, 800, 1067], L(
    'Փափուկ սպիտակ սրբիչների դարսակ',
    'Стопка мягких белых махровых полотенец',
    'Stack of soft white terry towels')),
  'towels-sage': P(1600, 1067, STD, L(
    'Կանաչ սրբիչների դարսակ փայտե աթոռակի վրա',
    'Стопка зелёных полотенец на деревянном табурете',
    'Stack of green towels on a wooden stool')),
  'towels-powder': P(1600, 2400, [480, 800, 1067], L(
    'Վարդագույն, դեղձագույն և բեժ պաստելային սրբիչներ',
    'Пастельные полотенца розового, персикового и бежевого цвета',
    'Pastel towels in pink, peach and beige')),
  'towels-beige': P(1600, 1067, STD, L(
    'Ոլորված բեժ բամբակե սրբիչ գծավոր գործվածքի վրա',
    'Свёрнутое бежевое хлопковое полотенце на полосатой ткани',
    'Rolled beige cotton towel on striped fabric')),
  'towels-graphite': P(1600, 1066, STD, L(
    'Ոլորված մոխրագույն և սալորագույն սրբիչներ',
    'Свёрнутые серое и сливовое полотенца',
    'Rolled grey and plum towels')),

  /* ---------- Close-ups for the product page ---------- */
  'detail-satin': P(1280, 853, STD, L(
    'Սպիտակ սատինե սավանի փայլուն ծալքերը մոտիկից',
    'Блестящие складки белого сатина крупным планом',
    'Glossy folds of white satin, close up')),
  'detail-linen': P(1600, 2400, [480, 800, 1067], L(
    'Լվացված փափուկ գործվածքի բնական ծալքերը մոտիկից',
    'Естественные складки мягкой варёной ткани крупным планом',
    'Natural creases of soft stonewashed fabric, close up')),
  'detail-cotton': P(1600, 2844, [480, 800, 900], L(
    'Ճմռթված սպիտակ բամբակե սավան մոտիկից',
    'Смятая белая хлопковая простыня крупным планом',
    'Crumpled white cotton sheet, close up')),
  'detail-percale': P(1600, 1067, STD, L(
    'Հարթ սպիտակ բարձի երեսներ և սավան մեղմ լույսի ներքո',
    'Гладкие белые наволочки и простыня в мягком свете',
    'Smooth white pillowcases and sheet in soft light')),
  'detail-quilted': P(1600, 1067, STD, L(
    'Վերմակի սպիտակ կարվածքը մոտիկից',
    'Белая стёжка одеяла крупным планом',
    'White quilted stitching of a duvet, close up')),
  'detail-velvet': P(1600, 2400, [480, 800, 1067], L(
    'Ծալված թավիշ՝ բորդո, կրեմագույն և մոխրագույն',
    'Сложенный бархат бордового, кремового и серого цвета',
    'Folded velvet in burgundy, cream and grey')),
  'detail-pillow': P(1600, 2133, [480, 800, 1200], L(
    'Ձեռքը սեղմում է փափուկ սպիտակ բարձը',
    'Рука нажимает на мягкую белую подушку',
    'Hand pressing into a soft white pillow')),
  'detail-foam': P(1600, 2400, [480, 800, 1067], L(
    'Փափուկ ռելիեֆային փրփուրը մոտիկից',
    'Мягкая рельефная пена крупным планом',
    'Soft textured foam, close up')),
  'detail-mattress': P(1600, 1067, STD, L(
    'Սպիտակ ներքնակի կարված նախշը մոտիկից',
    'Стёганый узор белого матраса крупным планом',
    'Quilted pattern of a white mattress, close up')),

  /* ---------- Stories ---------- */
  'story-delivery': P(1600, 1067, STD, L(
    'Առաքիչը տանում է ծանրոցների դարսակ',
    'Курьер несёт стопку посылок',
    'Courier carrying a stack of parcels')),
  'story-handover': P(1600, 1067, STD, L(
    'Ծանրոցի հանձնումը դռան մոտ',
    'Передача посылки у двери',
    'Parcel being handed over at the door')),
  'story-yerevan': P(1600, 1067, STD, L(
    'Երևանը արևածագին՝ Արարատ լեռան ֆոնին',
    'Ереван на рассвете на фоне горы Арарат',
    'Yerevan at sunrise with Mount Ararat behind it')),
  'story-regions': P(1600, 1067, STD, L(
    'Ոլորապտույտ ճանապարհ կանաչ լեռնային հովիտներով',
    'Извилистая дорога среди зелёных горных долин',
    'Winding road through green mountain valleys')),
  'story-workshop': P(1600, 1067, STD, L(
    'Կարուհին աշխատում է կարի մեքենայի մոտ արտադրամասում',
    'Швея за швейной машиной в мастерской',
    'Seamstress at a sewing machine in a workshop')),
  'story-cutting': P(1600, 2400, [480, 800, 1067], L(
    'Ձեռք մկրատով՝ գործվածքների դարսակի մոտ',
    'Рука с ножницами у стопки ткани',
    'Hand with scissors beside a stack of fabric')),
  'story-sewing': P(1600, 1067, STD, L(
    'Ձեռքերը սպիտակ գործվածքը տանում են կարի մեքենայի ասեղի տակով',
    'Руки ведут белую ткань под иглой швейной машины',
    'Hands guiding white fabric under a sewing machine needle')),
  'story-quality': P(1600, 2400, [480, 800, 1067], L(
    'Կոկիկ ծալված սպիտակեղեն փայտե սեղանին',
    'Аккуратно сложенное бельё на деревянном столе',
    'Neatly folded linen on a wooden table')),
  'story-fabric': P(1600, 2400, [480, 800, 1067], L(
    'Սպիտակ գործվածքի գլաններ դարակներում',
    'Рулоны белой ткани на полках',
    'Rolls of white fabric on shelves')),
  'story-rolls': P(1600, 1067, STD, L(
    'Բնական և մուգ գույների գործվածքի գլաններ արտադրամասում',
    'Рулоны ткани натуральных и глубоких оттенков в мастерской',
    'Rolls of fabric in natural and deep shades in a workshop')),
  'story-custom': P(1600, 2400, [480, 800, 1067], L(
    'Դերձակը չափում է դեղին ժապավենով՝ կարի մեքենայի մոտ',
    'Портной снимает мерку жёлтой лентой у швейной машины',
    'Tailor measuring with a yellow tape beside a sewing machine')),
  'story-measure': P(1600, 2400, [480, 800, 1067], L(
    'Չափաժապավեն բաց գույնի պատի ֆոնին',
    'Сантиметровая лента на светлой стене',
    'Measuring tape against a light wall')),

  /* ---------- How we make it ---------- */
  'process-cutting': P(1600, 1067, STD, L(
    'Դերձակուհին ձևում է մուգ գործվածքը մեծ սեղանի վրա',
    'Закройщица кроит тёмную ткань на большом столе',
    'Cutter working on dark fabric at a large table')),
  'process-sewing': P(1600, 2400, [480, 800, 1067], L(
    'Կարուհին կարում է մեքենայով՝ սեղանի լամպի լույսի ներքո',
    'Швея шьёт на машине при свете настольной лампы',
    'Seamstress sewing at a machine under a desk lamp'), '50% 40%'),
  'process-quality': P(1600, 1067, STD, L(
    'Կոկիկ ծալված կանաչ սպիտակեղենի դարսակ',
    'Стопка аккуратно сложенного зелёного белья',
    'Stack of neatly folded green linen')),
  'process-delivery': P(1600, 2397, [480, 800, 1068], L(
    'Առաքման ֆուրգոն՝ բեռնված ծանրոցներով',
    'Фургон доставки, загруженный посылками',
    'Delivery van loaded with parcels'), '50% 60%'),

  /* ---------- Instagram gallery & about ---------- */
  'ig-lavender': P(1600, 2274, [480, 800, 1126], L(
    'Լավանդայի ճյուղեր և փայլուն վարդագույն բարձեր սպիտակ մահճակալին',
    'Веточки лаванды и мерцающие розовые подушки на белой кровати',
    'Lavender sprigs and shimmering pink cushions on a white bed')),
  'ig-breakfast': P(1600, 2400, [480, 800, 1067], L(
    'Նախաճաշի սկուտեղ՝ կրուասանով և սուրճով սպիտակ սպիտակեղենի վրա',
    'Поднос с круассаном и кофе на белом постельном белье',
    'Breakfast tray with a croissant and coffee on white bedding')),
  'ig-morning': P(1600, 1998, STD, L(
    'Դեղին նարգիզներ և սուրճ սկուտեղին՝ սպիտակ սպիտակեղենի վրա',
    'Жёлтые нарциссы и кофе на подносе над белым бельём',
    'Yellow daffodils and coffee on a bed tray over white linen')),
  'about-workshop': P(1600, 1067, STD, L(
    'Լուսավոր կարի արտադրամաս՝ մեքենաների շարքերով և թելի կոճերով',
    'Светлый швейный цех с рядами машин и катушками ниток',
    'Bright sewing workshop with rows of machines and thread spools'))
};

const Photo = (() => {
  const DIR = 'public/images/';
  const file = (name, w) => `${DIR}${name}-${w}.webp`;

  /* Responsive <img>; `sizes` says how wide it is drawn so the browser picks the right file */
  function img(name, { sizes = '100vw', alt, eager = false, cls = '' } = {}) {
    const p = PHOTOS[name];
    if (!p) return '';
    const fallback = p.v[Math.min(1, p.v.length - 1)];
    return `<img class="ph${cls ? ' ' + cls : ''}" src="${file(name, fallback)}" srcset="${p.v.map(w => `${file(name, w)} ${w}w`).join(', ')}" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(alt ?? tx(p.alt))}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${p.pos ? ` style="object-position:${p.pos}"` : ''}>`;
  }

  /* Photo of a product in the chosen color (or its close-up), with the product named in the alt text */
  function product(p, color, opts = {}) {
    const key = p.colors.includes(color) ? color : p.colors[0];
    const name = opts.view === 'detail' && p.detail ? p.detail : p.photos[key] || p.photos[p.colors[0]];
    return img(name, { ...opts, alt: `${productName(p)}, ${colorName(key)}. ${tx(PHOTOS[name].alt)}` });
  }

  return { img, product };
})();
