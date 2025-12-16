import { PlanetData } from './types';

export const SUN_RADIUS = 9;
export const SUN_COLOR = "#FDB813";

export const SUN_DATA: PlanetData = {
  name: "Sun",
  chineseName: "太阳",
  color: SUN_COLOR,
  radius: SUN_RADIUS,
  distance: 0,
  speed: 0,
  description: "The star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
  descriptionZH: "太阳系中心的恒星。它是一个几乎完美的球体，由热等离子体组成，其核心的核聚变反应产生巨大的能量使其发光发热。",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/640px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"
};

// Stylized values for better visual representation, not 1:1 scientific scale
export const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    chineseName: "水星",
    color: "#A5A5A5",
    radius: 0.8,
    distance: 14, // Slightly increased distance to account for larger sun
    speed: 1.5,
    description: "The smallest planet in our solar system and closest to the Sun.",
    descriptionZH: "太阳系中最小的行星，也是最接近太阳的行星。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/640px-Mercury_in_true_color.jpg"
  },
  {
    name: "Venus",
    chineseName: "金星",
    color: "#E3BB76",
    radius: 1.5,
    distance: 20,
    speed: 1.2,
    description: "Spinning in the opposite direction to most planets, Venus is the hottest planet.",
    descriptionZH: "金星的自转方向与大多数行星相反，是太阳系中最热的行星。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/640px-Venus-real_color.jpg"
  },
  {
    name: "Earth",
    chineseName: "地球",
    color: "#22A6B3",
    radius: 1.6,
    distance: 28,
    speed: 1.0,
    description: "Our home planet, the only place we know of so far that's inhabited by living things.",
    descriptionZH: "我们的家园，也是目前已知唯一孕育生命的星球。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/640px-The_Earth_seen_from_Apollo_17.jpg"
  },
  {
    name: "Mars",
    chineseName: "火星",
    color: "#EB4D4B",
    radius: 1.2,
    distance: 36,
    speed: 0.8,
    description: "A dusty, cold, desert world with a very thin atmosphere.",
    descriptionZH: "一个布满尘埃、寒冷的沙漠世界，拥有非常稀薄的大气层。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/640px-OSIRIS_Mars_true_color.jpg"
  },
  {
    name: "Jupiter",
    chineseName: "木星",
    color: "#F0932B",
    radius: 3.5,
    distance: 52,
    speed: 0.4,
    description: "More than twice as massive as all the other planets combined.",
    descriptionZH: "体积巨大，其质量是太阳系中其他所有行星总和的两倍以上。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/640px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg"
  },
  {
    name: "Saturn",
    chineseName: "土星",
    color: "#F6E58D",
    radius: 3.0,
    distance: 70,
    speed: 0.3,
    hasRing: true,
    description: "Adorned with a dazzling, complex system of icy rings.",
    descriptionZH: "拥有令人耀眼且复杂的冰环系统。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg"
  },
  {
    name: "Uranus",
    chineseName: "天王星",
    color: "#7ED6DF",
    radius: 2.2,
    distance: 84,
    speed: 0.2,
    description: "It rotates at a nearly 90-degree angle from the plane of its orbit.",
    descriptionZH: "它的自转轴倾角接近90度，看起来就像是在轨道上“躺着”运转。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/640px-Uranus2.jpg"
  },
  {
    name: "Neptune",
    chineseName: "海王星",
    color: "#4834D4",
    radius: 2.1,
    distance: 96,
    speed: 0.1,
    description: "The first planet located through mathematical calculations rather than by telescope.",
    descriptionZH: "第一颗通过数学计算而非望远镜观测发现的行星。",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/640px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"
  }
];