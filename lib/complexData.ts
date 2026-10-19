export type ComplexPhoto = {
  src: string;
  alt: string;
  cap?: string;
};

export type ComplexPlaceMap = {
  c: string;
  label: string;
  pin: [number, number];
  area?: string;
  ground?: boolean;
};

export type ComplexPlace = {
  slug: string;
  title: string;
  photos: ComplexPhoto[];
  text: string[];
  more?: {
    href: string;
    label: string;
  };
  map: ComplexPlaceMap;
};

export type AlsoComplexCard = {
  image: string;
  title: string;
  text: string;
};

export const complexPlaces: ComplexPlace[] = [
  {
    slug: "tower",
    title: "Museum Tower",
    photos: [
      {
        src: "/images/tower-exterior-stairs.webp",
        alt: "The museum tower in the Tsas Soma Garden",
        cap: "The Museum Tower",
      },
      {
        src: "/images/thf/tower-windows.webp",
        alt: "The museum tower with its tall, thin windows",
        cap: "Tall, thin windows placed asymmetrically",
      },
      {
        src: "/images/thf/may-2009.webp",
        alt: "The tower under construction at the end of May 2009",
        cap: "The tower at the end of May 2009",
      },
      {
        src: "/images/complex/tower4.webp",
        alt: "The museum tower with its timber gallery and solar panels, the mountains behind",
        cap: "The tower against the mountains",
      },
    ],
    text: [
      "The museum takes the form of a Tibetan-Ladakhi fortress tower with a contemporary edge. Its square ground plan echoes ancient Buddhist, Hindu and Muslim places of worship, and each floor is encircled by a passage that leads to the stairway to the next.",
      "The concept and design are the work of André Alexander of Tibet Heritage Fund, and local master masons and carpenters shaped the building from the first sketches. The walls are solid stone masonry in mud mortar, dressed by hand on site.",
      "Visitors leave the tower over an iron bridge and step down into the garden.",
    ],
    more: {
      href: "/about/building",
      label: "The story of the building",
    },
    map: {
      c: "#7a2f3b",
      label: "Museum Tower",
      pin: [362, 812],
      area: "245,748 430,700 482,878 300,925",
    },
  },
  {
    slug: "library",
    title: "Trans-Himalayan Research Library",
    photos: [
      {
        src: "/images/complex/library1.webp",
        alt: "Wooden bookshelves and a rug in the Trans-Himalayan Research Library",
        cap: "Books on the Himalayas and Central Asia",
      },
      {
        src: "/images/complex/library2.webp",
        alt: "A carpeted reading platform beside the library's windows",
        cap: "A reading platform by the windows",
      },
      {
        src: "/images/complex/library3.webp",
        alt: "The wooden library desk, with a reading room beyond",
        cap: "The library desk",
      },
      {
        src: "/images/complex/library4.webp",
        alt: "The library's wooden door and name plate in a mud-plastered wall",
        cap: "The library entrance",
      },
    ],
    text: [
      "The Trans-Himalayan Research Library is a key component of the Central Asian Museum, Leh. It was formally inaugurated by Saleem Beg of INTACH J&K on 9 June 2011, the same day it opened to the public.",
      "Ladakhi scholar Abdul Ghani Sheikh donated his personal collection of books to form the core of the library, which currently specialises in academic literature about the Himalayas and Central Asia. The Sikkim Institute of Tibetology also donated 80 kg of books.",
      "Further book donations to the library are welcome.",
    ],
    map: {
      c: "#7b4fa3",
      label: "Library",
      pin: [668, 745],
      area: "600,655 722,592 748,700 762,790 768,880 572,905 545,860 628,800",
    },
  },
  {
    slug: "kitchen",
    title: "Ladakhi Kitchen Museum",
    photos: [
      {
        src: "/images/complex/kitchen1.webp",
        alt: "Shelves of brass and copper pots around the clay stove in the Ladakhi Kitchen Museum",
        cap: "The kitchen, arranged around its clay stove",
      },
      {
        src: "/images/complex/kitchen2.webp",
        alt: "The carved stove and the central wooden pillar of the kitchen",
        cap: "The carved stove and the central pillar",
      },
      {
        src: "/images/complex/kitchen3.webp",
        alt: "A long view of the kitchen, with low benches along the wall",
        cap: "Low benches along the walls",
      },
      {
        src: "/images/complex/kitchen4.webp",
        alt: "The single-storey kitchen museum among willow trees in the garden",
        cap: "The kitchen museum, built in 2012–13",
      },
    ],
    text: [
      "A traditional Ladakhi kitchen was built for the museum complex, where visitors can experience the most active space of a Ladakhi family house. The kitchen is arranged in the traditional way around a clay stove, and partly serves as a tea house where visitors can enjoy fresh teas and snacks. A rooftop terrace and an open wooden deck allow visitors to relax in the open air.",
      "The building is based on an idea proposed by Ladakhi scholar Abdul Ghani Sheikh, which was further designed and refined by THF's Yutaka Hirako. The design follows a traditional Ladakhi house and uses natural materials found locally in Ladakh: a single-storey building that both enhances and blends into the peaceful and genuine atmosphere of the complex.",
      "In 2012, the construction materials were prepared and the foundations built. In 2013, the main structure followed. On the foundation wall, a thick adobe wall with a wooden ring-beam was built to improve the building's earthquake resistance, and then the wooden structure was assembled. A roofed gallery, the yaps, was built on the roof, with a stone stair to reach the rooftop terrace. All windows were double-glazed to improve insulation, and a wooden deck was made in front of the kitchen as a platform for activities.",
      "The interior follows the typical Ladakhi kitchen: a kitchen shelf, a table around the pillar, a wooden partition and low-set bench, wooden flooring and, above all, a clay stove built in the centre of the room. Shelves and a wooden counter were also built. With that, the Ladakhi Kitchen Museum was complete and ready to receive visitors.",
    ],
    map: {
      c: "#6f7d2c",
      label: "Kitchen",
      pin: [125, 290],
      area: "78,212 168,212 172,362 98,366 78,330",
    },
  },
  {
    slug: "extension",
    title: "Extension Building & Conference Hall",
    photos: [
      {
        src: "/images/hall-timber-ceiling.webp",
        alt: "The multipurpose hall on the first floor of the extension building",
        cap: "The multipurpose hall, with its carved pillars and timber ceiling",
      },
      {
        src: "/images/complex/conf2.webp",
        alt: "The open hall with timber pillars on stone bases, tall windows and a skylight",
        cap: "The hall, with tall windows on two sides",
      },
      {
        src: "/images/complex/conf3.webp",
        alt: "A carved wooden lattice screen and framed drawings beneath a skylight",
        cap: "A carved lattice screen at the stair",
      },
      {
        src: "/images/complex/conf4.webp",
        alt: "Carved wooden pillars and a skylight in the extension building",
        cap: "Carved pillars beneath the skylight",
      },
    ],
    text: [
      "On the east side of the complex stands the old bakery, where Kashmiri bakers make fresh bread for the neighbourhood, popular with visitors too. THF architect Yutaka Hirako proposed renovating the building for several uses at once, following the principles of adaptive reuse.",
      "The ground floor facing the street keeps the original bakeries. At the rear is a kitchen for the Caravan Garden restaurant. Upstairs are offices, storage rooms and a multipurpose hall for the museum.",
      "The hall is designed for conferences, lectures, meetings, exhibitions and museum events. It is the most richly detailed room in the building, with carved pillars and brackets, doors and ceiling, a large window onto the bakery street and a skylight. A new glass room links it to the open terrace.",
      "The old first floor was dismantled, and its windows, doors and rafters were kept for reuse. The ceilings are built with rafters and taloo (willow twigs) covered with layers of soil. Next to the building are public toilets, including compost toilets and a system that treats liquid and solid waste separately: one of the first environmentally friendly public toilets in Ladakh.",
    ],
    map: {
      c: "#3f6b3a",
      label: "Conference Hall",
      pin: [700, 300],
      area: "598,95 640,95 640,110 798,110 800,470 798,562 655,562 652,482 598,470",
    },
  },
  {
    slug: "mosque",
    title: "Tsas Soma Mosque",
    photos: [
      {
        src: "/images/complex/mosque1.webp",
        alt: "The prayer hall of the Tsas Soma Mosque, with wooden pillars, carpets and the mihrab",
        cap: "The prayer hall, with the mihrab at the far wall",
      },
      {
        src: "/images/complex/mosque2.webp",
        alt: "The raised ceiling and skylight above the prayer hall",
        cap: "The raised ceiling and skylight",
      },
      {
        src: "/images/complex/mosque3.webp",
        alt: "The mosque from outside, behind a woven willow fence",
        cap: "The mosque from outside",
      },
      {
        src: "/images/complex/mosque4.webp",
        alt: "The mosque's old carved door, beneath a sign reading Leh's oldest mosque",
        cap: "The old door: Leh's oldest mosque",
      },
    ],
    text: [
      "The Masjid Sharif in the Tsas Soma garden is Leh's oldest mosque. The land, whose name means “new garden”, was given to Muslim traders in the early 17th century by King Senge Namgyal (by some accounts, by his father Jamyang Namgyal in the late 16th century). The traders built the town's first mosque here.",
      "After the caravan trade came to an end in the mid-20th century, the mosque was used as a place of worship by women and as a madrasa. Many older residents of Leh remember studying here as children. Water seeping from nearby irrigation channels damaged its walls and timber frame, and it was abandoned in the early 1980s.",
      "In 2007, Tibet Heritage Fund and the Leh Old Town Initiative restored the mosque together with its owner, the Anjuman Moin-ul-Islam Society, with support from INTACH J&K and the Embassy of Finland. Local artisans used traditional materials (mud, timber and stone) and kept as much of the historic building as possible, including the clay mouldings of the mihrab, the prayer niche, and a lamp stand.",
      "The ground was drained, the timber frame was set on new stone foundations, the ceiling was raised, and a new dome in the Kashmiri style was placed over a traditional skylight. The mosque was re-consecrated with first prayers on 13 November 2007. Its restoration was the first step in renewing Tsas Soma, and it led to the idea of building the museum.",
    ],
    map: {
      c: "#35638f",
      label: "Mosque",
      pin: [528, 575],
      area: "445,500 555,468 585,640 520,655 482,560 450,548",
    },
  },
  {
    slug: "garden",
    title: "Caravan Garden",
    photos: [
      {
        src: "/images/complex/garden1.webp",
        alt: "Slate paths and planted beds in the Caravan Garden, below the museum tower",
        cap: "Slate paths and planted beds below the tower",
      },
      {
        src: "/images/complex/garden2.webp",
        alt: "A view over the complex in the centre of Leh, with the mountains beyond",
        cap: "The complex in the centre of Leh",
      },
      {
        src: "/images/complex/garden3.webp",
        alt: "Flower beds and a woven willow fence in front of the museum tower",
        cap: "Flower beds in front of the tower",
      },
      {
        src: "/images/thf/caravan-garden.webp",
        alt: "Caravan Garden",
        cap: "The Caravan Garden",
      },
    ],
    text: [
      "The Caravan Garden is the centre of the complex: willow trees, a stream crossed by two wooden bridges, slate paths, and an open space for a garden restaurant.",
      "This is Tsas Soma, the garden where the trade caravans once camped. According to THF, the land was given to the local community for this purpose in the 17th century by King Jamyang Namgyal.",
      "Visitors leave the tower over the iron bridge and step down into the garden: an oasis in the centre of Leh, with ancient willow trees and a water channel.",
    ],
    map: {
      c: "#9c5c1c",
      label: "Caravan Garden",
      pin: [330, 420],
      ground: true,
    },
  },
];

export const alsoInComplexCards: AlsoComplexCard[] = [
  {
    image: "/images/thf/ladakh-gate.webp",
    title: "Ladakh Gate",
    text: "The main gate on the south side, facing the Main Bazaar. In Ladakhi-Tibetan style: a large double door between stone walls, under a black frieze that carries the museum's signboard in three languages.",
  },
  {
    image: "/images/thf/kashmir-gate.webp",
    title: "Kashmir Gate",
    text: "The north gate, opening towards the residential quarter and the Shia mosque. It is in Islamic style, with finely carved timbers on a stone platform.",
  },
  {
    image: "/images/thf/iron-bridge.webp",
    title: "Iron Bridge",
    text: "Visitors leave the tower over an exit bridge inspired by Tibetan architecture, and step down into the garden.",
  },
];

export const complexOutlinePoints: [number, number][] = [
  [98, 70], [200, 62], [300, 68], [400, 68], [480, 60], [560, 45],
  [610, 35], [680, 42], [740, 55], [780, 75], [800, 110], [808, 200],
  [812, 350], [805, 500], [795, 640], [800, 760], [815, 880], [820, 930],
  [810, 965], [790, 975], [700, 985], [620, 995], [590, 990], [580, 960],
  [560, 940], [530, 932], [480, 945], [430, 975], [390, 1000], [330, 1010],
  [270, 1005], [235, 985], [225, 940], [222, 850], [228, 770], [245, 700],
  [275, 640], [292, 600], [285, 560], [255, 510], [220, 470], [205, 440],
  [195, 412], [170, 405], [120, 410], [90, 405], [78, 385], [72, 300],
  [75, 200], [76, 85],
];

export function generateCatmullRomOutline(pts: [number, number][]): string {
  const n = pts.length;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i + n - 1) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d + "Z";
}

export const MAP_VIEW_BOX = [-40, -50, 994, 1140] as const;
