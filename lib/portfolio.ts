export const profile = {
  name: "Cha Yorsua",
  identity: "CHAAYRS.CREATES",
  email: "collabwithchaayrs@gmail.com",
  location: "Manila, Philippines",
  role: "Creative strategist · UGC creator · AI content",
  contactHref:
    "mailto:collabwithchaayrs@gmail.com?subject=Let%E2%80%99s%20create%20together",
};

export type PortfolioVideo = {
  slug: string;
  title: string;
  label: string;
  description: string;
  type: "AI storytelling" | "On-camera" | "Product-focused";
};

export const travelVideos: PortfolioVideo[] = [
  {
    slug: "trish-introduction",
    title: "Your Tokyo bestie",
    label: "01 / MEET TRISH",
    description:
      "An introduction to Trish Morikawa: a friendly AI travel persona built around practical Japan travel storytelling.",
    type: "AI storytelling",
  },
  {
    slug: "tokyo-budget",
    title: "A day in Tokyo",
    label: "02 / TRAVEL SMARTER",
    description:
      "Budget-focused Japan travel content, created to make planning a day in Tokyo feel more approachable.",
    type: "AI storytelling",
  },
  {
    slug: "trish-day-in-life",
    title: "A little everyday Japan",
    label: "03 / DAY-IN-THE-LIFE",
    description:
      "A lifestyle-led vignette that gives Trish’s virtual world a warm, everyday perspective.",
    type: "AI storytelling",
  },
];
export const ugcVideos: PortfolioVideo[] = [
  {
    slug: "collagen-cream",
    title: "One Day’s You / Collagen Cream",
    label: "01 / CREATOR-LED STORY",
    description:
      "An on-camera skincare feature with a direct opening hook and a personal product presentation.",
    type: "On-camera",
  },
  {
    slug: "rejuran-ampoule",
    title: "Rejuran / Turnover Ampoule",
    label: "02 / PRODUCT IN FOCUS",
    description:
      "A product-focused skincare promotion with close-up packaging and product presentation.",
    type: "Product-focused",
  },
  {
    slug: "ponds-cleansers",
    title: "Pond’s / K-Beauty Cleansers",
    label: "03 / SKINCARE STORY",
    description:
      "An on-camera product story introducing a selection of K-beauty cleansers.",
    type: "On-camera",
  },
  {
    slug: "roundlab-sun-cushion",
    title: "Round Lab / Birch Juice Sun Cushion",
    label: "04 / PRODUCT DISCOVERY",
    description:
      "A skincare product feature centered on the Birch Juice Sun Cushion.",
    type: "Product-focused",
  },
  {
    slug: "pdrn-serum",
    title: "One Day’s You / PDRN",
    label: "05 / RELATABLE HOOK",
    description:
      "A creator-led skincare story that opens with a relatable skin concern.",
    type: "On-camera",
  },
  {
    slug: "rivecowe-ampoule",
    title: "Rivecowe / Ampoule",
    label: "06 / THE PRODUCT DETAILS",
    description:
      "A product-focused ampoule feature with an ingredient-led opening hook.",
    type: "Product-focused",
  },
];

export const projects = [
  {
    slug: "trish-morikawa",
    number: "01",
    title: "Trish Morikawa",
    subtitle: "A virtual creator. A very human idea.",
    category: "AI PERSONA / TRAVEL STORYTELLING",
    poster: "tokyo-budget",
    count: "03 FILMS",
    description:
      "Making Japan feel more accessible through a friendly AI travel persona, practical stories, and a consistent visual world.",
    intro: "Your Japan travel bestie.",
    overview:
      "Trish Morikawa is an AI travel persona I created to make exploring Japan feel more accessible, affordable, and less intimidating. Drawing on my own experience visiting Japan, I developed a friendly, curious, and budget-savvy guide for first-time and independent travelers around the world.",
    role: "End-to-end creation: persona development, content planning, scripting, AI visual production, voice-over, subtitles, and editing.",
    intention:
      "Useful information comes first. The visuals support approachable stories about Japan, with a warm personality and practical, experience-focused direction.",
    audience:
      "First-time Japan visitors and budget-conscious travelers worldwide.",
    format: "Vertical short-form video for Reels, TikTok, and YouTube Shorts.",
    note: "Trish is an AI-generated persona. This self-initiated project explores AI storytelling informed by my own Japan travel experience.",
    videos: travelVideos,
  },
  {
    slug: "beauty-skincare",
    number: "02",
    title: "Beauty, in the everyday.",
    subtitle: "Product stories with a personal point of view.",
    category: "UGC / BEAUTY & SKINCARE",
    poster: "collagen-cream",
    count: "06 FILMS",
    description:
      "On-camera stories and product-focused content that bring skincare into real, relatable moments.",
    intro: "A little detail. A clearer story.",
    overview:
      "A selection of my beauty and skincare content, bringing together on-camera product stories, relatable opening hooks, and focused product details. Each piece offers a different way to introduce a product through creator-led storytelling.",
    role: "UGC content creation and product storytelling across on-camera and product-focused formats.",
    intention:
      "Start with a recognizable moment or a clear product detail, then give the viewer a reason to keep watching.",
    audience: "Beauty and skincare audiences on short-form social platforms.",
    format: "Vertical creator content and product-focused video.",
    note: "A selection of creator work featuring these products. Brand appearances do not by themselves indicate a direct paid partnership.",
    videos: ugcVideos,
  },
] as const;

export const capabilities = [
  {
    title: "Creator-led content",
    detail:
      "On-camera & faceless UGC, product stories, relatable hooks, and affiliate storytelling.",
    number: "01",
  },
  {
    title: "AI visual direction",
    detail:
      "Personas, detailed generation briefs, realism checks, and a consistent visual world.",
    number: "02",
  },
  {
    title: "Content & social strategy",
    detail:
      "Content planning, creative briefs, calendars, visual direction, and page management.",
    number: "03",
  },
  {
    title: "Creative operations",
    detail:
      "Research, prospecting, coordination, and the details that keep the work moving.",
    number: "04",
  },
];
