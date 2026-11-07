/* ==========================================================================
   TechVault AI — script.js
   Stage 3: Complete application logic
   ========================================================================== */
'use strict';

/* --------------------------------------------------------------------------
   1. Constants
   -------------------------------------------------------------------------- */
const STORAGE_KEYS = {
  wishlist: 'techvault.wishlist.v1',
  compare: 'techvault.compare.v1',
  currency: 'techvault.currency.v1'
};

const CURRENCY_RATES = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  PKR: 278,
  CAD: 1.36,
  AUD: 1.52
};

const CURRENCY_SYMBOLS = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  PKR: '₨',
  CAD: 'CA$',
  AUD: 'A$'
};

const BUDGET_BANDS = {
  'under-500': 500,
  '500-1000': 1000,
  '1000-2000': 2000,
  '2000-3500': 3500,
  '3500-plus': Infinity
};

const MAX_COMPARE = 4;

/* --------------------------------------------------------------------------
   2. Product catalogue
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 'macbook-air-m3',
    name: 'Apple MacBook Air M3',
    brand: 'Apple',
    model: 'MRXV3LL/A',
    category: 'Laptops',
    type: 'Laptop',
    description:
      'A thin and light ultrabook with Apple silicon, all-day battery life, and a fanless design suited to everyday productivity, coding, and creative work.',
    priceUSD: 1099,
    addedOrder: 1,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&auto=format&fit=crop',
    imageNote: 'Representative image — not the official product photo.',
    specs: {
      Display: '13.6-inch Liquid Retina, 2560 × 1664',
      Chip: 'Apple M3 (8-core CPU, 10-core GPU)',
      Memory: '16 GB unified',
      Storage: '512 GB SSD',
      Battery: 'Up to 18 hours',
      Weight: '1.24 kg (2.7 lb)',
      Ports: '2× Thunderbolt / USB 4, MagSafe 3, 3.5 mm jack',
      Wireless: 'Wi-Fi 6E, Bluetooth 5.3'
    },
    highlights: [
      'Fanless Apple M3 chip',
      'Silent operation under everyday loads',
      'Long rated battery life',
      'Compact and lightweight chassis'
    ],
    pros: [
      'Excellent portability and build quality',
      'Strong single-core performance for developer tools',
      'Quiet fanless design',
      'High-resolution display'
    ],
    cons: [
      'Limited to two external displays (with lid closed)',
      'No dedicated GPU for heavy creative workloads',
      'Memory and storage not user-upgradable'
    ],
    bestFor:
      'Students, developers, and professionals who need a light, quiet, reliable laptop for everyday work and moderate multitasking.',
    notFor:
      'Buyers who need a dedicated GPU, high-refresh gaming panels, extensive port selection, or heavy 3D rendering in a single portable machine.',
    keywords: [
      'laptop', 'ultrabook', 'apple', 'm3', 'macos', 'student',
      'developer', 'portable', 'thin', 'light'
    ],
    offers: [
      { retailer: 'Amazon', priceUSD: 1099, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Best Buy', priceUSD: 1099, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Walmart', priceUSD: 1199, availability: 'limited', region: 'US', lastChecked: null, dataStatus: 'sample' }
    ]
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    model: 'WH1000XM5/B',
    category: 'Headphones & Audio',
    type: 'Headphones',
    description:
      'Over-ear wireless headphones with strong active noise cancellation, a comfortable fit, and long battery life for commuting, study, and focused work.',
    priceUSD: 349,
    addedOrder: 2,
    image:
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80&auto=format&fit=crop',
    imageNote: 'Representative image — not the official product photo.',
    specs: {
      Type: 'Over-ear, closed-back',
      Drivers: '30 mm dynamic',
      'Noise cancellation': 'Active (ANC)',
      Battery: 'Up to 30 hours (ANC on)',
      Charging: 'USB-C, 3 min = 3 hr',
      Weight: '250 g',
      Connectivity: 'Bluetooth 5.2, multipoint',
      Microphones: '8 mics, beamforming'
    },
    highlights: [
      'Strong active noise cancellation',
      'Comfortable lightweight design',
      'Multipoint Bluetooth connection',
      'Fast USB-C charging'
    ],
    pros: [
      'Effective noise cancellation for commuting and open offices',
      'Comfortable for long sessions',
      'Good call quality with beamforming mics',
      'Long battery life'
    ],
    cons: [
      'No longer folds flat like the XM4',
      'Premium price point',
      'Touch controls can misfire in cold weather'
    ],
    bestFor:
      'Commuters, students, and remote workers who want effective noise cancellation and long battery life from a single pair of headphones.',
    notFor:
      'Buyers looking for audiophile-grade wired monitoring, foldable portability, or a budget option under $200.',
    keywords: [
      'headphones', 'wireless', 'anc', 'noise cancelling', 'sony',
      'over-ear', 'commute', 'travel'
    ],
    offers: [
      { retailer: 'Amazon', priceUSD: 349, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Best Buy', priceUSD: 349, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' }
    ]
  },
  {
    id: 'keychron-k8-pro',
    name: 'Keychron K8 Pro',
    brand: 'Keychron',
    model: 'K8P-J3',
    category: 'Keyboards & Mice',
    type: 'Keyboard',
    description:
      'A wireless tenkeyless mechanical keyboard with QMK/VIA support, hot-swappable switches, and a sturdy aluminium frame for developers and typists.',
    priceUSD: 109,
    addedOrder: 3,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80&auto=format&fit=crop',
    imageNote: 'Representative image — not the official product photo.',
    specs: {
      Layout: 'Tenkeyless (87 keys)',
      Switches: 'Hot-swappable, Gateron Brown (sample)',
      Connectivity: 'Bluetooth 5.1, USB-C, 2.4 GHz (with dongle)',
      Frame: 'Aluminium',
      Keycaps: 'PBT, double-shot',
      Firmware: 'QMK/VIA compatible',
      Battery: '4000 mAh',
      Weight: 'Approx. 1.1 kg'
    },
    highlights: [
      'Hot-swappable switches',
      'QMK/VIA firmware support',
      'Triple-mode wireless',
      'Sturdy aluminium frame'
    ],
    pros: [
      'Customisable without soldering',
      'Mac and Windows keycaps included',
      'Solid build quality for the price',
      'Wide switch compatibility'
    ],
    cons: [
      'Heavier than typical wireless keyboards',
      'No per-key RGB on all variants',
      'Software setup for VIA can be intimidating for beginners'
    ],
    bestFor:
      'Developers, writers, and keyboard enthusiasts who want a hot-swappable mechanical keyboard with programmable firmware.',
    notFor:
      'Buyers who prefer slim low-profile keyboards, need a numpad, or want an ultra-portable travel keyboard.',
    keywords: [
      'keyboard', 'mechanical', 'tenkeyless', 'tkl', 'qmk', 'via',
      'hot-swap', 'wireless', 'keychron'
    ],
    offers: [
      { retailer: 'Amazon', priceUSD: 109, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Keychron Store', priceUSD: 109, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' }
    ]
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    model: '910-006556',
    category: 'Keyboards & Mice',
    type: 'Mouse',
    description:
      'A productivity-focused wireless mouse with an ergonomic shape, quiet clicks, high-precision sensor, and support for multi-device flow between computers.',
    priceUSD: 99,
    addedOrder: 4,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80&auto=format&fit=crop',
    imageNote: 'Representative image — not the official product photo.',
    specs: {
      Sensor: 'Darkfield, 200–8000 DPI',
      Buttons: '7 programmable',
      Connectivity: 'Bluetooth LE, Logi Bolt USB receiver',
      Battery: 'Up to 70 days',
      Charging: 'USB-C',
      Weight: '141 g',
      Compatibility: 'Windows, macOS, Linux, iPadOS',
      Extras: 'MagSpeed scroll wheel, thumbwheel'
    },
    highlights: [
      'MagSpeed electromagnetic scroll wheel',
      'Quiet click buttons',
      'Multi-device Logi Flow support',
      'Ergonomic right-hand shape'
    ],
    pros: [
      'Excellent ergonomics for long sessions',
      'Highly customisable with Logi Options+',
      'Reliable multi-device switching',
      'Long battery life'
    ],
    cons: [
      'Right-handed shape only',
      'Premium price for a mouse',
      'No Bluetooth if the dongle is lost (until re-paired)'
    ],
    bestFor:
      'Developers, designers, and office workers who want a comfortable, feature-rich productivity mouse for long sessions.',
    notFor:
      'Left-handed users, competitive gamers who need a lightweight wired mouse, or buyers on a tight budget.',
    keywords: [
      'mouse', 'wireless', 'ergonomic', 'logitech', 'mx', 'productivity',
      'bluetooth', 'multi-device'
    ],
    offers: [
      { retailer: 'Amazon', priceUSD: 99, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Best Buy', priceUSD: 99, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' }
    ]
  },
  {
    id: 'dell-ultrasharp-u2723qe',
    name: 'Dell UltraSharp U2723QE',
    brand: 'Dell',
    model: 'U2723QE',
    category: 'Monitors',
    type: 'Monitor',
    description:
      'A 27-inch 4K IPS Black USB-C hub monitor with wide colour coverage and an integrated hub, aimed at professionals and remote workers.',
    priceUSD: 619,
    addedOrder: 5,
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80&auto=format&fit=crop',
    imageNote: 'Representative image — not the official product photo.',
    specs: {
      'Panel size': '27 inches',
      Resolution: '3840 × 2160 (4K UHD)',
      Panel: 'IPS Black',
      'Refresh rate': '60 Hz',
      'Colour coverage': '98% DCI-P3',
      'Brightness': '400 nits (typical)',
      Connectivity: 'USB-C (90W PD), HDMI, DisplayPort, RJ45, USB hub',
      Ergonomics: 'Height, tilt, swivel, pivot'
    },
    highlights: [
      '4K IPS Black panel',
      'Integrated USB-C hub with 90W power delivery',
      'Wide DCI-P3 colour coverage',
      'Fully adjustable stand'
    ],
    pros: [
      'Excellent text clarity at 4K',
      'Strong colour accuracy for creative work',
      'Single-cable connection for laptops',
      'Built-in Ethernet and USB hub'
    ],
    cons: [
      '60 Hz only',
      'Premium price compared to 4K 27-inch monitors',
      'Built-in speakers are minimal'
    ],
    bestFor:
      'Designers, developers, and office workers who want a sharp, colour-accurate 4K display with a built-in USB-C hub.',
    notFor:
      'Competitive gamers needing high refresh rates, buyers who want built-in high-quality speakers, or budget shoppers.',
    keywords: [
      'monitor', '4k', '27-inch', 'dell', 'usb-c', 'productivity',
      'ips black', 'design', 'developer'
    ],
    offers: [
      { retailer: 'Amazon', priceUSD: 619, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Dell', priceUSD: 649, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Best Buy', priceUSD: 629, availability: 'limited', region: 'US', lastChecked: null, dataStatus: 'sample' }
    ]
  },
  {
    id: 'asus-rog-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14',
    brand: 'ASUS',
    model: 'GA403UI',
    category: 'Laptops',
    type: 'Laptop',
    description:
      'A compact 14-inch gaming laptop with a dedicated GPU, high-refresh OLED display, and strong performance for gaming, AI development, and creative workloads.',
    priceUSD: 1599,
    addedOrder: 6,
    image:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80&auto=format&fit=crop',
    imageNote: 'Representative image — not the official product photo.',
    specs: {
      Display: '14-inch OLED, 2880 × 1800, 120 Hz',
      CPU: 'AMD Ryzen 9 8945HS',
      GPU: 'NVIDIA GeForce RTX 4070 Laptop',
      Memory: '16 GB LPDDR5X',
      Storage: '1 TB PCIe 4.0 SSD',
      Battery: '73 Wh',
      Weight: '1.5 kg (3.3 lb)',
      Ports: 'USB-C, USB-A, HDMI 2.1, microSD, 3.5 mm jack'
    },
    highlights: [
      'High-refresh OLED display',
      'Dedicated RTX 4070 GPU',
      'Compact 14-inch chassis',
      'Strong CPU for developer and AI workloads'
    ],
    pros: [
      'High performance for its size',
      'Excellent OLED display',
      'Good port selection for a 14-inch laptop',
      'Suitable for gaming, AI, and creative work'
    ],
    cons: [
      'Fan noise under sustained load',
      'Battery life shorter than ultrabooks',
      'Memory is soldered'
    ],
    bestFor:
      'Gamers, AI enthusiasts, and creators who want strong performance in a 14-inch chassis and can accept higher fan noise under load.',
    notFor:
      'Buyers who need all-day battery life and silent operation, or who prioritise the lightest possible ultrabook.',
    keywords: [
      'laptop', 'gaming', 'rog', 'asus', 'rtx', 'oled', 'ai',
      'machine learning', 'creative', 'high performance'
    ],
    offers: [
      { retailer: 'Amazon', priceUSD: 1599, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' },
      { retailer: 'Best Buy', priceUSD: 1599, availability: 'in-stock', region: 'US', lastChecked: null, dataStatus: 'sample' }
    ]
  }
];

/* --------------------------------------------------------------------------
   3. AI tools directory
   -------------------------------------------------------------------------- */
const AI_TOOLS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Chatbots',
    description:
      'Conversational AI assistant for writing, brainstorming, coding help, and general Q&A.',
    website: 'https://chat.openai.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Chat interface', 'File uploads', 'Custom GPTs'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'message-circle'
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'AI Chatbots',
    description:
      'Conversational AI assistant focused on long-context reasoning, writing, and document analysis.',
    website: 'https://claude.ai',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Long context', 'Document analysis', 'Projects'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'message-circle'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'AI Chatbots',
    description:
      'Google\u2019s multimodal AI assistant integrated across Google services and available standalone.',
    website: 'https://gemini.google.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Multimodal input', 'Google integration', 'Long context'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'message-circle'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'AI Coding',
    description:
      'AI pair programmer that suggests code completions and chat-based answers inside your IDE.',
    website: 'https://github.com/features/copilot',
    pricing: 'Paid',
    freePlan: true,
    features: ['IDE completions', 'Copilot Chat', 'Multi-language support'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'code-2'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI Coding',
    description:
      'AI-first code editor with codebase awareness, inline edits, and chat built into the editor.',
    website: 'https://cursor.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Codebase chat', 'Inline edits', 'Agent mode'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'code-2'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'AI Image Generation',
    description:
      'AI image generation service known for its distinctive visual style and Discord-based workflow.',
    website: 'https://www.midjourney.com',
    pricing: 'Paid',
    freePlan: false,
    features: ['Image generation', 'Style references', 'Upscaling'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'image'
  },
  {
    id: 'dalle',
    name: 'DALL·E 3',
    category: 'AI Image Generation',
    description:
      'Image generation model available through ChatGPT and the OpenAI API.',
    website: 'https://openai.com/dall-e-3',
    pricing: 'Paid',
    freePlan: false,
    features: ['Text-to-image', 'Prompt refinement', 'API access'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'image'
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'AI Video Generation',
    description:
      'AI video generation and editing platform for short clips, motion, and visual effects.',
    website: 'https://runwayml.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Text-to-video', 'Image-to-video', 'Inpainting'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'video'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'AI Productivity',
    description:
      'AI writing and summarisation features integrated into Notion workspaces.',
    website: 'https://www.notion.so/product/ai',
    pricing: 'Paid',
    freePlan: false,
    features: ['AI writing', 'Summaries', 'Q&A over docs'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'zap'
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'AI Writing',
    description:
      'AI writing assistant for grammar, clarity, tone, and style across documents and apps.',
    website: 'https://www.grammarly.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Grammar checking', 'Tone suggestions', 'Browser extension'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'pen-tool'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'AI Research',
    description:
      'AI research assistant that answers questions with citations and live web sources.',
    website: 'https://www.perplexity.ai',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Cited answers', 'Web search', 'Follow-up questions'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'search'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'AI Automation',
    description:
      'No-code automation platform that connects thousands of apps with AI-assisted workflow steps.',
    website: 'https://zapier.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Workflow automation', 'AI steps', 'App integrations'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'workflow'
  },
  {
    id: 'figma-ai',
    name: 'Figma AI',
    category: 'AI Design',
    description:
      'AI-assisted design features inside Figma, including text-to-design, renaming, and search.',
    website: 'https://www.figma.com',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Text-to-design', 'Smart rename', 'AI search'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'palette'
  },
  {
    id: 'canva-ai',
    name: 'Canva Magic Studio',
    category: 'AI Design',
    description:
      'AI design assistant inside Canva for generating images, layouts, and copy.',
    website: 'https://www.canva.com/magic-studio',
    pricing: 'Freemium',
    freePlan: true,
    features: ['Magic Write', 'Magic Media', 'Brand Kit'],
    affiliateStatus: 'none',
    affiliateUrl: null,
    icon: 'palette'
  }
];

/* --------------------------------------------------------------------------
   4. Guides
   -------------------------------------------------------------------------- */
const GUIDES = {
  'cs-laptop-specs': {
    title: 'Best Laptop Specifications for Computer Science Students',
    tag: 'Laptops',
    readTime: '7 min read',
    body: `
      <p>Computer science coursework mixes writing, IDEs, compilation, virtual machines, and increasingly AI tooling. The right laptop is not the one with the highest benchmark score — it is the one that fits the way you actually work.</p>

      <h3>CPU</h3>
      <p>A modern mid-to-high range CPU is enough for most coursework. Apple M-series, AMD Ryzen 5/7, and Intel Core i5/i7 chips from the last two generations handle compilers, containers, and IDEs comfortably. Choose more cores only if you know you will run heavy builds, local AI models, or long simulations.</p>

      <h3>RAM</h3>
      <p>16 GB is the practical minimum for CS work in 2024+. It comfortably covers browsers, IDEs, local containers, and small virtual machines. Choose 32 GB if you plan to run large local models, multiple VMs, or heavy data processing.</p>

      <h3>Storage</h3>
      <p>512 GB NVMe SSD is a reasonable floor. 1 TB is more comfortable if you will install multiple IDEs, datasets, and game engines. Avoid HDD-only configurations for the primary drive.</p>

      <h3>Display</h3>
      <p>A 14-inch to 16-inch display with at least 1920×1200 resolution works well for coding. Higher resolution helps with text clarity; higher refresh rate is a bonus but not essential for coursework.</p>

      <h3>Battery and portability</h3>
      <p>If you carry the laptop to lectures and labs, weight matters. Aim for under 1.6 kg and at least 8–10 hours of mixed-use battery life.</p>

      <h3>What you can save on</h3>
      <ul>
        <li>Dedicated GPU — not needed for most coursework.</li>
        <li>High refresh rate — nice to have, not essential.</li>
        <li>Premium build materials — prioritise reliability over materials.</li>
      </ul>

      <p>Products to explore: any laptop in the TechVault catalogue is filtered by the laptop specifications above in the setup finder.</p>
    `
  },
  'how-much-ram': {
    title: 'How Much RAM Do You Actually Need?',
    tag: 'Components',
    readTime: '6 min read',
    body: `
      <p>RAM is one of the most commonly over-specified parts of a computer. Most users overestimate what they need, while a smaller group under-specifies and pays for it in swap or forced upgrades.</p>

      <h3>8 GB</h3>
      <p>Enough for basic browsing, email, video calls, and light document work. Not recommended for programming, gaming, or creative work in 2024+.</p>

      <h3>16 GB</h3>
      <p>The practical sweet spot for most users. Comfortably covers browsers with many tabs, IDEs, small virtual machines, and casual gaming. Choose this if you are unsure.</p>

      <h3>32 GB</h3>
      <p>Useful for programming with containers, running virtual machines, editing video, using AI tools locally, or heavy multitasking.</p>

      <h3>64 GB and above</h3>
      <p>For large datasets, local LLMs, heavy video/3D work, or server-style workloads. Rarely needed for general use.</p>

      <h3>Practical advice</h3>
      <ul>
        <li>If you are buying a laptop, choose 16 GB unless you know you need more.</li>
        <li>If RAM is soldered, buy one tier above what you think you need.</li>
        <li>If RAM is upgradeable, buy less now and upgrade later.</li>
      </ul>
    `
  },
  'ssd-vs-hdd': {
    title: 'SSD vs HDD: What Should You Choose?',
    tag: 'Storage',
    readTime: '5 min read',
    body: `
      <p>SSDs and HDDs both store data, but they serve different roles. For most users, an SSD is the only sensible choice for the system drive.</p>

      <h3>Speed</h3>
      <p>NVMe SSDs deliver several gigabytes per second. SATA SSDs deliver around 500 MB/s. HDDs peak around 150–200 MB/s sequential and are much slower for random access.</p>

      <h3>Durability and noise</h3>
      <p>SSDs have no moving parts, making them quieter and more resistant to physical shock. HDDs have spinning platters and moving heads, which produce noise and are more sensitive to drops.</p>

      <h3>Cost per gigabyte</h3>
      <p>HDDs remain cheaper per terabyte, making them useful for large backups, media archives, or NAS storage. For active work, SSDs are almost always worth the premium.</p>

      <h3>Practical recommendation</h3>
      <ul>
        <li>Use an NVMe SSD for the operating system and applications.</li>
        <li>Use a second SSD for active projects.</li>
        <li>Use an HDD (internal or external) only for archival or large media files.</li>
      </ul>
    `
  },
  'laptop-for-programming': {
    title: 'How to Choose a Laptop for Programming',
    tag: 'Laptops',
    readTime: '8 min read',
    body: `
      <p>Programming laptops are not defined by benchmarks alone. Keyboard feel, screen clarity, thermals, ports, and battery life often matter more day-to-day than a small CPU lead.</p>

      <h3>Keyboard</h3>
      <p>You will type on this laptop more than anything else. Look for decent key travel, stable keycaps, and a layout that matches your workflow. A backlit keyboard helps in low light.</p>

      <h3>Display</h3>
      <p>A 14-inch to 16-inch display with at least 1920×1200 resolution is the practical floor. Higher resolution improves text clarity. Matte displays reduce reflections in shared spaces.</p>

      <h3>Thermals and fan noise</h3>
      <p>Thin laptops with high-power CPUs can throttle under sustained compile loads. Look at reviews that measure sustained performance, not just peak benchmarks.</p>

      <h3>Ports</h3>
      <p>At least one USB-C, one USB-A, and a headphone jack covers most workflows. Display output via USB-C or HDMI is useful for connecting monitors.</p>

      <h3>Battery life</h3>
      <p>Aim for at least 8 hours of mixed-use battery life. If you often work away from outlets, prefer laptops with efficient CPUs and OLED/LCD panels with good power behaviour.</p>

      <h3>Memory and storage</h3>
      <p>16 GB RAM and a 512 GB NVMe SSD are a reasonable baseline. Prefer upgradeable memory where possible.</p>
    `
  },
  'budget-desk-setup': {
    title: 'Best Budget Desk Setup for Students',
    tag: 'Desk Setup',
    readTime: '6 min read',
    body: `
      <p>A comfortable study desk does not require premium gear. Prioritise the parts of the setup that affect your body and attention span first.</p>

      <h3>Priority order</h3>
      <ol>
        <li>An adjustable chair with decent lumbar support.</li>
        <li>A monitor at a comfortable height and distance.</li>
        <li>A reliable keyboard and mouse.</li>
        <li>Task lighting.</li>
        <li>Desk organisation and cable management.</li>
      </ol>

      <h3>Budget tips</h3>
      <ul>
        <li>Buy a used or refurbished monitor with a height-adjustable stand.</li>
        <li>Prefer a wired mechanical keyboard if you do not need wireless.</li>
        <li>A desk lamp with warm and cool modes reduces eye strain at night.</li>
      </ul>
    `
  },
  'monitor-for-productivity': {
    title: 'How to Choose a Monitor for Productivity',
    tag: 'Monitors',
    readTime: '7 min read',
    body: `
      <p>For productivity, monitor choice comes down to resolution, panel quality, ergonomics, and connectivity. Refresh rate and HDR are secondary unless you also game or edit video.</p>

      <h3>Resolution and size</h3>
      <p>27-inch 1440p is the practical minimum for comfortable text. 27-inch 4K is sharper and better for coding and detailed work. 34-inch ultrawide 1440p is a good option for multitasking, if your desk supports it.</p>

      <h3>Panel type</h3>
      <p>IPS panels offer the best balance of colour accuracy and viewing angles for productivity. VA panels have better contrast but slower response times. OLED panels offer excellent contrast but have burn-in considerations.</p>

      <h3>Ergonomics</h3>
      <p>A height-adjustable stand is worth paying for. VESA mounting is useful if you plan a monitor arm. Tilt and swivel help fine-tune the viewing angle.</p>

      <h3>Connectivity</h3>
      <p>USB-C with power delivery can replace your laptop charger and connect a USB hub over a single cable. HDMI and DisplayPort inputs are useful for desktops and games consoles.</p>
    `
  },
  'pc-components-beginner': {
    title: 'Beginner\u2019s Guide to PC Components',
    tag: 'PC Building',
    readTime: '9 min read',
    body: `
      <p>A desktop PC is built from a small number of core components. Understanding what each one does makes upgrade decisions much easier.</p>

      <h3>CPU</h3>
      <p>The processor handles general computation. Match it to your workload: productivity and gaming favour high single-core performance; content creation and some AI work benefit from more cores.</p>

      <h3>GPU</h3>
      <p>The graphics card handles rendering and increasingly AI workloads. Choose based on the software you run, not just gaming benchmarks.</p>

      <h3>Motherboard</h3>
      <p>Determine the CPU socket, memory type, and expansion slots. Do not overspend here unless you need specific I/O features.</p>

      <h3>RAM</h3>
      <p>16 GB is enough for most workloads; 32 GB for programming and creative work; more for heavy AI and video workloads.</p>

      <h3>Storage</h3>
      <p>NVMe SSD for the operating system and applications. Add a second SSD or HDD for large files if needed.</p>

      <h3>Power supply</h3>
      <p>Choose a reliable 80+ Bronze or Gold unit from a reputable brand. Do not skimp on the PSU — it protects every other component.</p>

      <h3>Cooling</h3>
      <p>Air cooling is enough for most CPUs. Choose an AIO liquid cooler for high-end CPUs or specific noise/space requirements.</p>

      <h3>Case</h3>
      <p>Choose based on airflow, noise, and space, not just appearance. Check GPU length clearance before buying.</p>
    `
  },
  'choosing-ai-tools': {
    title: 'Choosing the Right AI Tools for Your Workflow',
    tag: 'AI Tools',
    readTime: '6 min read',
    body: `
      <p>AI tools vary widely in capability, pricing, and data handling. Choosing well comes down to fit with your actual tasks, not to the loudest marketing claim.</p>

      <h3>Task fit</h3>
      <p>Start with a specific task — writing, coding, image generation, summarisation — and evaluate tools on that task in isolation. Broad claims of "AI-powered" say very little.</p>

      <h3>Data handling</h3>
      <p>Check the terms for training on your data, retention, and enterprise options. For sensitive workflows, prefer tools that offer data controls or self-hosted options.</p>

      <h3>Pricing model</h3>
      <p>Free tiers are useful for evaluation but often limit context, speed, or features. Freemium tools usually reveal their real value only at the paid tier.</p>

      <h3>Lock-in</h3>
      <p>Favour tools that let you export your data and use standard formats. Avoid building workflows that cannot be moved elsewhere.</p>

      <h3>Practical evaluation checklist</h3>
      <ul>
        <li>Does the tool clearly help with a specific task you perform weekly?</li>
        <li>Can you leave the tool without losing critical data?</li>
        <li>Is the pricing model predictable at your usage level?</li>
        <li>Does the vendor publish clear data handling policies?</li>
      </ul>
    `
  }
};

/* --------------------------------------------------------------------------
   5. Bundles
   -------------------------------------------------------------------------- */
const BUNDLES = [
  {
    id: 'student-essentials',
    title: 'Student Essentials Setup',
    tag: 'Student',
    description:
      'A practical starting point for coursework and note-taking, built around a portable laptop and reliable input devices.',
    targetUser: 'University and college students',
    productIds: ['macbook-air-m3', 'keychron-k8-pro', 'logitech-mx-master-3s']
  },
  {
    id: 'beginner-programmer',
    title: 'Beginner Programmer Setup',
    tag: 'Programming',
    description:
      'Comfortable gear for learning to code, with a quiet laptop, responsive keyboard, and a mouse that supports long sessions.',
    targetUser: 'Beginner developers and CS students',
    productIds: ['macbook-air-m3', 'keychron-k8-pro', 'logitech-mx-master-3s']
  },
  {
    id: 'ai-developer',
    title: 'AI Developer Setup',
    tag: 'AI',
    description:
      'A performance-focused setup for local AI experiments, model training, and demanding developer workflows.',
    targetUser: 'AI engineers and ML practitioners',
    productIds: ['asus-rog-zephyrus-g14', 'dell-ultrasharp-u2723qe', 'keychron-k8-pro']
  },
  {
    id: 'professional-workstation',
    title: 'Professional Workstation',
    tag: 'Professional',
    description:
      'A sharp, colour-accurate display, a quiet laptop, and input gear suitable for professional work sessions.',
    targetUser: 'Professionals and office workers',
    productIds: ['dell-ultrasharp-u2723qe', 'macbook-air-m3', 'logitech-mx-master-3s']
  },
  {
    id: 'gaming-setup',
    title: 'Gaming Setup',
    tag: 'Gaming',
    description:
      'A gaming laptop with a dedicated GPU and high-refresh OLED display, paired with a noise-cancelling headset for focused play.',
    targetUser: 'Gamers and creative gamers',
    productIds: ['asus-rog-zephyrus-g14', 'sony-wh1000xm5']
  },
  {
    id: 'content-creator',
    title: 'Content Creator Setup',
    tag: 'Creator',
    description:
      'A high-performance laptop, a colour-accurate 4K display, and comfortable audio gear for editing and streaming.',
    targetUser: 'Video editors, streamers, and creators',
    productIds: ['asus-rog-zephyrus-g14', 'dell-ultrasharp-u2723qe', 'sony-wh1000xm5']
  },
  {
    id: 'minimal-desk',
    title: 'Minimal Desk Setup',
    tag: 'Minimal',
    description:
      'A focused desk: one laptop, one quality display, one comfortable mouse, one pair of headphones. Fewer distractions, better work.',
    targetUser: 'Remote workers and students',
    productIds: ['macbook-air-m3', 'dell-ultrasharp-u2723qe', 'logitech-mx-master-3s', 'sony-wh1000xm5']
  },
  {
    id: 'budget-home-office',
    title: 'Budget Home Office Setup',
    tag: 'Budget',
    description:
      'A small-footprint, lower-cost setup that still prioritises ergonomics and reliable performance.',
    targetUser: 'Remote workers on a budget',
    productIds: ['keychron-k8-pro', 'logitech-mx-master-3s', 'sony-wh1000xm5']
  }
];

/* --------------------------------------------------------------------------
   6. Application state
   -------------------------------------------------------------------------- */
const state = {
  currency: 'USD',
  wishlist: [],
  compare: [],
  filters: {
    category: 'all',
    brand: 'all',
    priceMin: '',
    priceMax: '',
    retailer: 'all',
    availability: 'all',
    type: 'all',
    search: '',
    sort: 'name'
  },
  aiFilters: {
    category: 'all',
    pricing: 'all'
  }
};

/* --------------------------------------------------------------------------
   7. Utilities
   -------------------------------------------------------------------------- */
function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPrice(usdAmount, currency = state.currency) {
  if (usdAmount === null || usdAmount === undefined || isNaN(usdAmount)) {
    return '—';
  }
  const rate = CURRENCY_RATES[currency] || 1;
  const converted = usdAmount * rate;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  if (currency === 'PKR') {
    return symbol + Math.round(converted).toLocaleString('en-US');
  }
  return (
    symbol +
    converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

function priceBadge(product) {
  if (state.currency !== 'USD') {
    return { label: 'Indicative', cls: 'data-badge--sample' };
  }
  return { label: 'Sample data', cls: 'data-badge--sample' };
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function getBestOffer(product) {
  if (!product.offers || product.offers.length === 0) return null;
  return product.offers.reduce((best, offer) =>
    offer.priceUSD < best.priceUSD ? offer : best
  );
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

let toastTimer = null;
function showToast(message, variant = 'default') {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'toast';
  if (variant === 'success') toast.classList.add('toast--success');
  else if (variant === 'error') toast.classList.add('toast--error');
  else if (variant === 'warning') toast.classList.add('toast--warning');
  // Force reflow so the transition applies
  void toast.offsetWidth;
  toast.classList.add('is-visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2600);
}

/* --------------------------------------------------------------------------
   8. localStorage helpers
   -------------------------------------------------------------------------- */
function loadState() {
  try {
    const wl = localStorage.getItem(STORAGE_KEYS.wishlist);
    if (wl) {
      const parsed = JSON.parse(wl);
      if (Array.isArray(parsed)) {
        state.wishlist = parsed.filter((id) => getProductById(id));
      }
    }
  } catch (err) {
    state.wishlist = [];
  }

  try {
    const cmp = localStorage.getItem(STORAGE_KEYS.compare);
    if (cmp) {
      const parsed = JSON.parse(cmp);
      if (Array.isArray(parsed)) {
        state.compare = parsed
          .filter((id) => getProductById(id))
          .slice(0, MAX_COMPARE);
      }
    }
  } catch (err) {
    state.compare = [];
  }

  try {
    const cur = localStorage.getItem(STORAGE_KEYS.currency);
    if (cur && CURRENCY_RATES[cur]) {
      state.currency = cur;
    }
  } catch (err) {
    state.currency = 'USD';
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(state.wishlist));
  } catch (err) {
    /* storage unavailable */
  }
}

function saveCompare() {
  try {
    localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(state.compare));
  } catch (err) {
    /* storage unavailable */
  }
}

function saveCurrency() {
  try {
    localStorage.setItem(STORAGE_KEYS.currency, state.currency);
  } catch (err) {
    /* storage unavailable */
  }
}

/* --------------------------------------------------------------------------
   9. Filtering and sorting
   -------------------------------------------------------------------------- */
function getFilteredProducts() {
  const f = state.filters;
  const search = f.search.trim().toLowerCase();

  const minUSD = f.priceMin !== '' ? Number(f.priceMin) / CURRENCY_RATES[state.currency] : 0;
  const maxUSD =
    f.priceMax !== '' ? Number(f.priceMax) / CURRENCY_RATES[state.currency] : Infinity;

  return PRODUCTS.filter((product) => {
    if (f.category !== 'all' && product.category !== f.category) return false;
    if (f.brand !== 'all' && product.brand !== f.brand) return false;
    if (f.type !== 'all' && product.type !== f.type) return false;

    if (minUSD > 0 && product.priceUSD < minUSD) return false;
    if (maxUSD !== Infinity && !isNaN(maxUSD) && product.priceUSD > maxUSD) return false;

    if (f.retailer !== 'all') {
      const hasRetailer = product.offers.some((o) => o.retailer === f.retailer);
      if (!hasRetailer) return false;
    }

    if (f.availability !== 'all') {
      const hasAvailability = product.offers.some(
        (o) => o.availability === f.availability
      );
      if (!hasAvailability) return false;
    }

    if (search) {
      const haystack = [
        product.name,
        product.brand,
        product.category,
        product.type,
        ...(product.keywords || [])
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    return true;
  });
}

function sortProducts(list) {
  const sort = state.filters.sort;
  const copy = list.slice();
  if (sort === 'price-asc') {
    copy.sort((a, b) => a.priceUSD - b.priceUSD);
  } else if (sort === 'price-desc') {
    copy.sort((a, b) => b.priceUSD - a.priceUSD);
  } else if (sort === 'newest') {
    copy.sort((a, b) => b.addedOrder - a.addedOrder);
  } else {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  return copy;
}

/* --------------------------------------------------------------------------
   10. Product card rendering
   -------------------------------------------------------------------------- */
function productCardHTML(product) {
  const best = getBestOffer(product);
  const inWishlist = state.wishlist.includes(product.id);
  const inCompare = state.compare.includes(product.id);
  const badge = priceBadge(product);

  const specsChips = Object.entries(product.specs)
    .slice(0, 3)
    .map(
      ([key, value]) =>
        `<span class="spec-chip">${escapeHtml(String(value).split(',')[0])}</span>`
    )
    .join('');

  const priceHtml = best
    ? `
      <div class="product-offer">
        <div class="product-price">
          <span class="price-main">${escapeHtml(formatPrice(best.priceUSD))}</span>
          <span class="price-retailer">Best offer · ${escapeHtml(best.retailer)}</span>
        </div>
        <span class="data-badge ${badge.cls}">${escapeHtml(badge.label)}</span>
      </div>
    `
    : `
      <div class="product-offer">
        <div class="product-price">
          <span class="price-main">—</span>
          <span class="price-retailer">No offers available</span>
        </div>
        <span class="data-badge data-badge--unavailable">Unavailable</span>
      </div>
    `;

  const imageHtml = product.image
    ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} — representative image" loading="lazy" onerror="this.parentElement.classList.add('product-media--placeholder');this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Image unavailable'}))" />`
    : '<span>Image unavailable</span>';

  return `
    <article class="product-card" data-product-id="${escapeHtml(product.id)}">
      <div class="product-media">
        ${imageHtml}
        <span class="product-cat-badge">${escapeHtml(product.category)}</span>
        <div class="product-actions-corner">
          <button type="button" class="corner-btn ${inWishlist ? 'is-active' : ''}" data-action="wishlist" data-product-id="${escapeHtml(product.id)}" aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}" title="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i data-lucide="heart" aria-hidden="true"></i>
          </button>
          <button type="button" class="corner-btn ${inCompare ? 'is-active' : ''}" data-action="compare" data-product-id="${escapeHtml(product.id)}" aria-label="${inCompare ? 'Remove from compare' : 'Add to compare'}" title="${inCompare ? 'Remove from compare' : 'Add to compare'}">
            <i data-lucide="git-compare" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="product-body">
        <p class="product-brand">${escapeHtml(product.brand)}</p>
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <p class="product-desc">${escapeHtml(product.description)}</p>
        <div class="product-specs-mini">${specsChips}</div>
        ${priceHtml}
        <div class="product-footer">
          <button type="button" class="btn btn-primary" data-action="view" data-product-id="${escapeHtml(product.id)}">View Details</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid = $('#productGrid');
  const resultsCount = $('#resultsCount');
  const emptyState = $('#productEmptyState');
  if (!grid) return;

  const filtered = sortProducts(getFilteredProducts());

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
  } else {
    grid.innerHTML = filtered.map(productCardHTML).join('');
    if (emptyState) emptyState.hidden = true;
  }

  if (resultsCount) {
    resultsCount.textContent =
      filtered.length === 1
        ? '1 product found'
        : `${filtered.length} products found`;
  }

  refreshIcons();
  updateCategoryCounts();
}

/* --------------------------------------------------------------------------
   11. Category counts
   -------------------------------------------------------------------------- */
function updateCategoryCounts() {
  $$('[data-category-count]').forEach((el) => {
    const cat = el.getAttribute('data-category-count');
    if (!cat) return;
    const count = PRODUCTS.filter((p) => p.category === cat).length;
    el.textContent = count === 1 ? '1 product' : `${count} products`;
  });
}

/* --------------------------------------------------------------------------
   12. Filter dropdown population
   -------------------------------------------------------------------------- */
function populateFilterDropdowns() {
  // Brands
  const brandSelect = $('#filterBrand');
  if (brandSelect) {
    const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
    const current = brandSelect.value || 'all';
    brandSelect.innerHTML =
      '<option value="all">All brands</option>' +
      brands
        .map((b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`)
        .join('');
    brandSelect.value = brands.includes(current) ? current : 'all';
  }

  // Retailers
  const retailerSelect = $('#filterRetailer');
  if (retailerSelect) {
    const retailers = [
      ...new Set(PRODUCTS.flatMap((p) => p.offers.map((o) => o.retailer)))
    ].sort();
    const current = retailerSelect.value || 'all';
    retailerSelect.innerHTML =
      '<option value="all">All retailers</option>' +
      retailers
        .map((r) => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`)
        .join('');
    retailerSelect.value = retailers.includes(current) ? current : 'all';
  }

  // Compare dropdown
  const compareSelect = $('#compareProductSelect');
  if (compareSelect) {
    const available = PRODUCTS.filter((p) => !state.compare.includes(p.id));
    compareSelect.innerHTML =
      '<option value="">Select a product…</option>' +
      available
        .map(
          (p) =>
            `<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)} — ${escapeHtml(p.brand)}</option>`
        )
        .join('');
  }
}

/* --------------------------------------------------------------------------
   13. Filter controls
   -------------------------------------------------------------------------- */
function bindFilterControls() {
  const filterSearch = $('#filterSearchInput');
  if (filterSearch) {
    filterSearch.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = $('#sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      renderProducts();
    });
  }

  const categorySelect = $('#filterCategory');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderProducts();
    });
  }

  const brandSelect = $('#filterBrand');
  if (brandSelect) {
    brandSelect.addEventListener('change', (e) => {
      state.filters.brand = e.target.value;
      renderProducts();
    });
  }

  const priceMin = $('#filterPriceMin');
  if (priceMin) {
    priceMin.addEventListener('input', (e) => {
      state.filters.priceMin = e.target.value;
      renderProducts();
    });
  }

  const priceMax = $('#filterPriceMax');
  if (priceMax) {
    priceMax.addEventListener('input', (e) => {
      state.filters.priceMax = e.target.value;
      renderProducts();
    });
  }

  const retailerSelect = $('#filterRetailer');
  if (retailerSelect) {
    retailerSelect.addEventListener('change', (e) => {
      state.filters.retailer = e.target.value;
      renderProducts();
    });
  }

  const availabilitySelect = $('#filterAvailability');
  if (availabilitySelect) {
    availabilitySelect.addEventListener('change', (e) => {
      state.filters.availability = e.target.value;
      renderProducts();
    });
  }

  const typeSelect = $('#filterType');
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      state.filters.type = e.target.value;
      renderProducts();
    });
  }

  const resetBtn = $('#resetFiltersBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  const emptyResetBtn = $('#emptyResetBtn');
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', resetFilters);
  }

  const filtersToggle = $('#filtersToggle');
  const filtersPanel = $('#filtersPanel');
  if (filtersToggle && filtersPanel) {
    filtersToggle.addEventListener('click', () => {
      const isHidden = filtersPanel.hidden;
      filtersPanel.hidden = !isHidden;
      filtersToggle.setAttribute('aria-expanded', String(isHidden));
    });
  }
}

function resetFilters() {
  state.filters = {
    category: 'all',
    brand: 'all',
    priceMin: '',
    priceMax: '',
    retailer: 'all',
    availability: 'all',
    type: 'all',
    search: '',
    sort: 'name'
  };

  const mapping = {
    '#filterCategory': 'all',
    '#filterBrand': 'all',
    '#filterPriceMin': '',
    '#filterPriceMax': '',
    '#filterRetailer': 'all',
    '#filterAvailability': 'all',
    '#filterType': 'all',
    '#filterSearchInput': '',
    '#sortSelect': 'name'
  };

  Object.entries(mapping).forEach(([sel, val]) => {
    const el = $(sel);
    if (el) el.value = val;
  });

  renderProducts();
  showToast('Filters reset', 'success');
}

/* --------------------------------------------------------------------------
   14. Hero search
   -------------------------------------------------------------------------- */
function bindHeroSearch() {
  const form = $('#heroSearchForm');
  const input = $('#heroSearchInput');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    state.filters.search = query;
    const filterSearch = $('#filterSearchInput');
    if (filterSearch) filterSearch.value = query;
    renderProducts();
    const productsSection = $('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showToast(
      query ? `Searching for "${query}"` : 'Showing all products',
      'success'
    );
  });
}

/* --------------------------------------------------------------------------
   15. Product card event delegation
   -------------------------------------------------------------------------- */
function bindProductGridEvents() {
  const grid = $('#productGrid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const productId = btn.getAttribute('data-product-id');
    if (!productId) return;

    if (action === 'wishlist') toggleWishlist(productId);
    else if (action === 'compare') toggleCompare(productId);
    else if (action === 'view') openProductModal(productId);
  });
}

/* --------------------------------------------------------------------------
   16. Wishlist
   -------------------------------------------------------------------------- */
function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const idx = state.wishlist.indexOf(productId);
  if (idx >= 0) {
    state.wishlist.splice(idx, 1);
    showToast(`Removed ${product.name} from wishlist`, 'warning');
  } else {
    state.wishlist.push(productId);
    showToast(`Added ${product.name} to wishlist`, 'success');
  }
  saveWishlist();
  updateWishlistCount();
  renderProducts();
  renderWishlist();
  refreshIcons();
}

function updateWishlistCount() {
  const countEl = $('#wishlistCount');
  if (!countEl) return;
  const count = state.wishlist.length;
  countEl.textContent = String(count);
  countEl.hidden = count === 0;
}

function renderWishlist() {
  const grid = $('#wishlistGrid');
  const emptyState = $('#wishlistEmptyState');
  if (!grid) return;

  if (state.wishlist.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
    return;
  }

  grid.innerHTML = state.wishlist
    .map((id) => {
      const product = getProductById(id);
      return product ? productCardHTML(product) : '';
    })
    .join('');

  if (emptyState) emptyState.hidden = true;
  refreshIcons();
}

function bindWishlistControls() {
  const clearBtn = $('#clearWishlistBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (state.wishlist.length === 0) {
        showToast('Wishlist is already empty');
        return;
      }
      state.wishlist = [];
      saveWishlist();
      updateWishlistCount();
      renderWishlist();
      renderProducts();
      showToast('Wishlist cleared', 'success');
    });
  }

  const navWishlistBtn = $('#navWishlistBtn');
  if (navWishlistBtn) {
    navWishlistBtn.addEventListener('click', () => {
      const wishlistSection = $('#wishlist');
      if (wishlistSection) {
        wishlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  const grid = $('#wishlistGrid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const productId = btn.getAttribute('data-product-id');
      if (!productId) return;

      if (action === 'wishlist') toggleWishlist(productId);
      else if (action === 'compare') toggleCompare(productId);
      else if (action === 'view') openProductModal(productId);
    });
  }
}

/* --------------------------------------------------------------------------
   17. Comparison
   -------------------------------------------------------------------------- */
function toggleCompare(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const idx = state.compare.indexOf(productId);
  if (idx >= 0) {
    state.compare.splice(idx, 1);
    showToast(`Removed ${product.name} from comparison`, 'warning');
  } else {
    if (state.compare.length >= MAX_COMPARE) {
      showToast(
        `You can compare up to ${MAX_COMPARE} products. Remove one first.`,
        'error'
      );
      return;
    }
    state.compare.push(productId);
    showToast(`Added ${product.name} to comparison`, 'success');
  }
  saveCompare();
  renderCompare();
  renderProducts();
  populateFilterDropdowns();
  refreshIcons();
}

function addToCompareFromSelect() {
  const select = $('#compareProductSelect');
  if (!select) return;
  const productId = select.value;
  if (!productId) {
    showToast('Select a product to add', 'error');
    return;
  }
  toggleCompare(productId);
}

function removeFromCompare(productId) {
  const idx = state.compare.indexOf(productId);
  if (idx >= 0) {
    state.compare.splice(idx, 1);
    saveCompare();
    renderCompare();
    renderProducts();
    populateFilterDropdowns();
    showToast('Removed from comparison', 'warning');
  }
}

function renderCompare() {
  const wrap = $('#compareTableWrap');
  const emptyState = $('#compareEmptyState');
  if (!wrap || !emptyState) return;

  if (state.compare.length < 2) {
    wrap.hidden = true;
    wrap.innerHTML = '';
    emptyState.hidden = false;
    emptyState.querySelector('.empty-title').textContent =
      state.compare.length === 1
        ? 'Add at least one more product'
        : 'Nothing to compare yet';
    emptyState.querySelector('.empty-text').textContent =
      state.compare.length === 1
        ? 'Add one more product to see a side-by-side comparison.'
        : 'Add two to four products using the selector above, or use the “Compare” button on any product card.';
    return;
  }

  const products = state.compare.map((id) => getProductById(id)).filter(Boolean);
  if (products.length < 2) {
    wrap.hidden = true;
    emptyState.hidden = false;
    return;
  }

  // Union of spec keys
  const specKeys = new Set();
  products.forEach((p) => Object.keys(p.specs).forEach((k) => specKeys.add(k)));

  const headerCells = products
    .map(
      (p) => `
        <th scope="col">
          <div class="compare-col-head">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none'" />
            <span class="compare-col-brand">${escapeHtml(p.brand)}</span>
            <span class="compare-col-name">${escapeHtml(p.name)}</span>
            <button type="button" class="compare-remove" data-remove-compare="${escapeHtml(p.id)}" aria-label="Remove ${escapeHtml(p.name)} from comparison">
              <i data-lucide="x" aria-hidden="true"></i>
              Remove
            </button>
          </div>
        </th>
      `
    )
    .join('');

  const priceRow = `
    <tr>
      <th scope="row">Reference price</th>
      ${products
        .map((p) => {
          const best = getBestOffer(p);
          return `<td>${best ? escapeHtml(formatPrice(best.priceUSD)) : '—'}</td>`;
        })
        .join('')}
    </tr>
  `;

  const specRows = Array.from(specKeys)
    .map((key) => {
      const cells = products
        .map((p) => {
          const val = p.specs[key];
          return `<td>${escapeHtml(val !== undefined ? val : '—')}</td>`;
        })
        .join('');
      return `
        <tr>
          <th scope="row">${escapeHtml(key)}</th>
          ${cells}
        </tr>
      `;
    })
    .join('');

  const actionsRow = `
    <tr>
      <th scope="row">Actions</th>
      ${products
        .map(
          (p) => `
            <td>
              <div class="compare-actions">
                <button type="button" class="btn btn-primary btn-sm" data-view-product="${escapeHtml(p.id)}">View Details</button>
              </div>
            </td>
          `
        )
        .join('')}
    </tr>
  `;

  wrap.innerHTML = `
    <table class="compare-table">
      <caption class="sr-only">Product comparison</caption>
      <thead>
        <tr>
          <th scope="col" aria-label="Specification"></th>
          ${headerCells}
        </tr>
      </thead>
      <tbody>
        ${priceRow}
        ${specRows}
        ${actionsRow}
      </tbody>
    </table>
  `;
  wrap.hidden = false;
  emptyState.hidden = true;

  // Attach remove and view handlers inside the table
  wrap.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-remove-compare]');
    if (removeBtn) {
      removeFromCompare(removeBtn.getAttribute('data-remove-compare'));
      return;
    }
    const viewBtn = e.target.closest('[data-view-product]');
    if (viewBtn) {
      openProductModal(viewBtn.getAttribute('data-view-product'));
    }
  });

  refreshIcons();
}

function bindCompareControls() {
  const addBtn = $('#compareAddBtn');
  if (addBtn) addBtn.addEventListener('click', addToCompareFromSelect);

  const clearBtn = $('#compareClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (state.compare.length === 0) {
        showToast('Nothing to clear');
        return;
      }
      state.compare = [];
      saveCompare();
      renderCompare();
      renderProducts();
      populateFilterDropdowns();
      showToast('Comparison cleared', 'success');
    });
  }

  const select = $('#compareProductSelect');
  if (select) {
    select.addEventListener('change', () => {
      // no-op; user clicks Add explicitly
    });
  }
}

/* --------------------------------------------------------------------------
   18. Product details modal
   -------------------------------------------------------------------------- */
let lastFocusedEl = null;

function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = $('#productModal');
  if (!modal) return;

  lastFocusedEl = document.activeElement;

  // Main info
  $('#modalTitle').textContent = product.name;
  $('#modalBrand').textContent = product.brand;
  $('#modalCategory').textContent = product.category;
  $('#modalModel').textContent = product.model;
  $('#modalDescription').textContent = product.description;

  const best = getBestOffer(product);
  $('#modalPrice').textContent = best
    ? formatPrice(best.priceUSD)
    : 'No offers available';

  const flag = $('#modalPriceFlag');
  const badge = priceBadge(product);
  flag.textContent = badge.label;
  flag.className = 'data-flag';

  const img = $('#modalImage');
  if (img) {
    img.src = product.image;
    img.alt = `${product.name} — representative image`;
    img.onerror = function () {
      this.style.display = 'none';
    };
  }
  const imgNote = $('#modalImageNote');
  if (imgNote) imgNote.textContent = product.imageNote || '';

  // Wishlist button state
  const inWishlist = state.wishlist.includes(product.id);
  const wishlistLabel = $('#modalWishlistLabel');
  if (wishlistLabel) {
    wishlistLabel.textContent = inWishlist
      ? 'Remove from wishlist'
      : 'Add to wishlist';
  }

  // Compare button state
  const inCompare = state.compare.includes(product.id);
  const compareLabel = $('#modalCompareLabel');
  if (compareLabel) {
    compareLabel.textContent = inCompare
      ? 'Remove from compare'
      : 'Add to compare';
  }

  // Specs
  const specsBody = $('#modalSpecs');
  if (specsBody) {
    specsBody.innerHTML = Object.entries(product.specs)
      .map(
        ([key, value]) =>
          `<tr><th scope="row">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`
      )
      .join('');
  }

  // Highlights
  const highlights = $('#modalHighlights');
  if (highlights) {
    highlights.innerHTML = (product.highlights || [])
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join('');
  }

  // Pros
  const pros = $('#modalPros');
  if (pros) {
    pros.innerHTML = (product.pros || [])
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join('');
  }

  // Cons
  const cons = $('#modalCons');
  if (cons) {
    cons.innerHTML = (product.cons || [])
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join('');
  }

  // Best for / not for
  $('#modalBestFor').textContent = product.bestFor || '—';
  $('#modalNotFor').textContent = product.notFor || '—';

  // Offers table
  const offersBody = $('#modalOffers');
  if (offersBody) {
    offersBody.innerHTML = product.offers
      .map((offer) => {
        const statusClass =
          offer.dataStatus === 'verified'
            ? 'data-badge--verified'
            : offer.dataStatus === 'sample'
            ? 'data-badge--sample'
            : 'data-badge--unavailable';
        const statusLabel =
          offer.dataStatus === 'verified'
            ? 'Verified'
            : offer.dataStatus === 'sample'
            ? 'Sample data'
            : 'Unavailable';
        const lastChecked =
          offer.dataStatus === 'verified' && offer.lastChecked
            ? escapeHtml(offer.lastChecked)
            : 'Not available';
        return `
          <tr>
            <td>${escapeHtml(offer.retailer)}</td>
            <td class="offer-price">${escapeHtml(formatPrice(offer.priceUSD))}</td>
            <td>${escapeHtml(offer.availability)}</td>
            <td>${escapeHtml(offer.region)}</td>
            <td>${lastChecked}</td>
            <td><span class="data-badge ${statusClass}">${statusLabel}</span></td>
          </tr>
        `;
      })
      .join('');
  }

  // Related products
  const relatedGrid = $('#modalRelated');
  if (relatedGrid) {
    const related = PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category
    )
      .concat(
        PRODUCTS.filter(
          (p) => p.id !== product.id && p.category !== product.category
        )
      )
      .slice(0, 4);

    relatedGrid.innerHTML = related
      .map((r) => {
        const rBest = getBestOffer(r);
        return `
          <button type="button" class="related-card" data-view-product="${escapeHtml(r.id)}">
            <img src="${escapeHtml(r.image)}" alt="${escapeHtml(r.name)}" loading="lazy" onerror="this.style.display='none'" />
            <span class="related-name">${escapeHtml(r.name)}</span>
            <span class="related-price">${rBest ? escapeHtml(formatPrice(rBest.priceUSD)) : '—'}</span>
          </button>
        `;
      })
      .join('');

    relatedGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-view-product]');
      if (btn) {
        openProductModal(btn.getAttribute('data-view-product'));
      }
    });
  }

  // Wire action buttons (re-bind each time to reflect current state)
  const wishlistBtn = $('#modalWishlistBtn');
  if (wishlistBtn) {
    wishlistBtn.onclick = () => {
      toggleWishlist(product.id);
      const isIn = state.wishlist.includes(product.id);
      if (wishlistLabel) {
        wishlistLabel.textContent = isIn
          ? 'Remove from wishlist'
          : 'Add to wishlist';
      }
    };
  }

  const compareBtn = $('#modalCompareBtn');
  if (compareBtn) {
    compareBtn.onclick = () => {
      toggleCompare(product.id);
      const isIn = state.compare.includes(product.id);
      if (compareLabel) {
        compareLabel.textContent = isIn
          ? 'Remove from compare'
          : 'Add to compare';
      }
    };
  }

  // Show modal
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const closeBtn = $('#productModalClose');
  if (closeBtn) closeBtn.focus();

  refreshIcons();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.hidden = true;
  if (
    !$('#productModal')?.hidden ||
    !$('#guideModal')?.hidden ||
    !$('#infoModal')?.hidden
  ) {
    // another modal still open
  } else {
    document.body.style.overflow = '';
  }
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
  }
}

function bindModalCloseHandlers() {
  ['productModal', 'guideModal', 'infoModal'].forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => closeModal(id));
    });
  });

  ['productModalClose', 'guideModalClose', 'infoModalClose'].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['productModal', 'guideModal', 'infoModal'].forEach((id) => {
      const modal = document.getElementById(id);
      if (modal && !modal.hidden) closeModal(id);
    });
  });
}

/* --------------------------------------------------------------------------
   19. Setup finder
   -------------------------------------------------------------------------- */
const PURPOSE_CATEGORIES = {
  study: ['Laptops', 'Keyboards & Mice'],
  programming: ['Laptops', 'Monitors', 'Keyboards & Mice'],
  ai: ['Laptops'],
  gaming: ['Laptops', 'Gaming Accessories'],
  video: ['Laptops', 'Monitors'],
  content: ['Laptops', 'Headphones & Audio', 'Monitors'],
  office: ['Laptops', 'Monitors', 'Keyboards & Mice', 'Headphones & Audio'],
  general: ['Laptops', 'Keyboards & Mice', 'Headphones & Audio', 'Monitors']
};

const TYPE_CATEGORIES = {
  laptop: ['Laptops'],
  desktop: ['PC Components', 'Monitors'],
  desk: ['Monitors', 'Keyboards & Mice', 'Headphones & Audio', 'Desk Setup'],
  accessories: ['Keyboards & Mice', 'Headphones & Audio', 'Monitors', 'Gaming Accessories'],
  software: []
};

const TYPE_REASONS = {
  Laptops: 'Portable performance that matches your workflow.',
  'Keyboards & Mice': 'Comfortable input gear for long sessions.',
  'Headphones & Audio': 'Audio gear for focus, calls, and entertainment.',
  Monitors: 'More screen space for productivity and focus.',
  'Gaming Accessories': 'Gear tuned for interactive play.',
  'PC Components': 'Desktop-class components for heavier workloads.',
  'Desk Setup': 'Desk essentials that improve comfort.'
};

function runFinder(values) {
  const { purpose, budget, type, level } = values;

  if (type === 'software') {
    return {
      message:
        'Software and AI tool recommendations are available in the AI Tools Directory. Filter by category and pricing to find tools that match your workflow.',
      products: [],
      total: null,
      budgetMax: BUDGET_BANDS[budget]
    };
  }

  const budgetMax = BUDGET_BANDS[budget] ?? Infinity;
  const typeCats = TYPE_CATEGORIES[type] || [];
  const purposeCats = PURPOSE_CATEGORIES[purpose] || [];
  const allowedCats = new Set([...typeCats, ...purposeCats]);

  let candidates = PRODUCTS.filter(
    (p) => allowedCats.has(p.category) && p.priceUSD <= budgetMax
  );

  // Fallback: if no candidates under budget, relax the budget slightly
  if (candidates.length === 0) {
    candidates = PRODUCTS.filter((p) => allowedCats.has(p.category));
  }

  const scored = candidates.map((p) => {
    let score = 0;
    if (typeCats.includes(p.category)) score += 3;
    if (purposeCats.includes(p.category)) score += 2;
    if (level === 'beginner' && p.priceUSD <= 600) score += 2;
    if (level === 'intermediate' && p.priceUSD > 400) score += 1;
    if (level === 'advanced' && p.priceUSD >= 900) score += 1;
    if (level === 'professional' && p.priceUSD >= 1200) score += 2;
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const picked = [];
  let total = 0;
  for (const { product } of scored) {
    if (picked.length >= 3) break;
    if (picked.length === 0 || total + product.priceUSD <= budgetMax) {
      picked.push(product);
      total += product.priceUSD;
    }
  }

  return {
    products: picked.map((p) => ({
      product: p,
      reason: TYPE_REASONS[p.category] || 'Recommended for your needs.'
    })),
    total: picked.length > 0 ? total : null,
    budgetMax
  };
}

function renderFinderResults(result, values) {
  const container = $('#finderResults');
  if (!container) return;

  if (result.message) {
    container.innerHTML = `
      <div class="finder-results-head">
        <h3 class="finder-results-title">Guidance for ${escapeHtml(values.purpose)}</h3>
        <p class="finder-results-sub">${escapeHtml(result.message)}</p>
      </div>
      <a href="#ai-tools" class="btn btn-primary">Open AI Tools Directory</a>
    `;
    return;
  }

  if (result.products.length === 0) {
    container.innerHTML = `
      <div class="finder-results-head">
        <h3 class="finder-results-title">No products matched that combination</h3>
        <p class="finder-results-sub">Try widening your budget band or choosing a different setup type.</p>
      </div>
    `;
    return;
  }

  const items = result.products
    .map(
      ({ product, reason }) => `
        <div class="finder-item">
          <img class="finder-item-img" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.style.display='none'" />
          <div class="finder-item-info">
            <p class="finder-item-name">${escapeHtml(product.name)}</p>
            <p class="finder-item-reason">${escapeHtml(reason)}</p>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" data-view-product="${escapeHtml(product.id)}">View</button>
        </div>
      `
    )
    .join('');

  const totalHtml =
    result.total !== null
      ? `
        <div class="finder-total">
          <span>Estimated total</span>
          <strong>${escapeHtml(formatPrice(result.total))}</strong>
        </div>
        <p class="finder-total-note">
          Prices shown are sample development data and are not live retailer prices.
          Totals follow the currency selector in the header.
        </p>
      `
      : '';

  container.innerHTML = `
    <div class="finder-results-head">
      <h3 class="finder-results-title">Your recommended setup</h3>
      <p class="finder-results-sub">
        Based on your answers: ${escapeHtml(values.purpose)} · ${escapeHtml(values.type)} · ${escapeHtml(values.budget)} · ${escapeHtml(values.level)}
      </p>
    </div>
    <div class="finder-product-list">${items}</div>
    ${totalHtml}
  `;

  container.querySelectorAll('[data-view-product]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openProductModal(btn.getAttribute('data-view-product'));
    });
  });

  refreshIcons();
}

function bindFinder() {
  const form = $('#finderForm');
  const submitBtn = $('#finderSubmitBtn');
  const restartBtn = $('#finderRestartBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const values = {
      purpose: String(data.get('finderPurpose') || 'general'),
      budget: String(data.get('finderBudget') || '500-1000'),
      type: String(data.get('finderType') || 'laptop'),
      level: String(data.get('finderLevel') || 'beginner')
    };

    const result = runFinder(values);
    renderFinderResults(result, values);

    if (restartBtn) restartBtn.hidden = false;
    if (submitBtn) submitBtn.textContent = 'Update my setup';

    // Refresh icons after button text change
    refreshIcons();
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      const container = $('#finderResults');
      if (container) container.innerHTML = '';
      if (restartBtn) restartBtn.hidden = true;
      if (submitBtn) {
        submitBtn.innerHTML =
          '<i data-lucide="sparkles" aria-hidden="true"></i> Show my setup';
        refreshIcons();
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/* --------------------------------------------------------------------------
   20. AI tools directory
   -------------------------------------------------------------------------- */
function renderAITools() {
  const grid = $('#aiToolsGrid');
  const emptyState = $('#aiToolsEmptyState');
  if (!grid) return;

  const filtered = AI_TOOLS.filter((tool) => {
    if (state.aiFilters.category !== 'all' && tool.category !== state.aiFilters.category) {
      return false;
    }
    if (state.aiFilters.pricing !== 'all') {
      const matchesPricing =
        tool.pricing === state.aiFilters.pricing ||
        (state.aiFilters.pricing === 'Free trial' &&
          tool.pricing === 'Freemium');
      if (!matchesPricing) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (tool) => `
        <article class="ai-tool-card">
          <div class="ai-tool-head">
            <div class="ai-tool-logo" aria-hidden="true">
              <i data-lucide="${escapeHtml(tool.icon || 'sparkles')}"></i>
            </div>
            <div>
              <p class="ai-tool-name">${escapeHtml(tool.name)}</p>
              <p class="ai-tool-cat">${escapeHtml(tool.category)}</p>
            </div>
          </div>
          <p class="ai-tool-desc">${escapeHtml(tool.description)}</p>
          <div class="ai-tool-meta">
            <span class="ai-tool-tag">${escapeHtml(tool.pricing)}</span>
            ${tool.freePlan ? '<span class="ai-tool-tag ai-tool-tag--free">Free plan</span>' : ''}
            ${tool.affiliateStatus === 'verified' ? '<span class="ai-tool-tag ai-tool-tag--affiliate">Affiliate</span>' : ''}
          </div>
          <div class="ai-tool-footer">
            <a href="${escapeHtml(tool.website)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
              Visit website
              <i data-lucide="external-link" aria-hidden="true"></i>
            </a>
          </div>
        </article>
      `
    )
    .join('');

  if (emptyState) emptyState.hidden = true;
  refreshIcons();
}

function bindAITools() {
  const categoryFilter = $('#aiCategoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      state.aiFilters.category = e.target.value;
      renderAITools();
    });
  }

  const pricingFilter = $('#aiPricingFilter');
  if (pricingFilter) {
    pricingFilter.addEventListener('change', (e) => {
      state.aiFilters.pricing = e.target.value;
      renderAITools();
    });
  }

  const resetBtn = $('#aiToolsResetBtn');
  const emptyResetBtn = $('#aiToolsEmptyResetBtn');

  const reset = () => {
    state.aiFilters = { category: 'all', pricing: 'all' };
    if (categoryFilter) categoryFilter.value = 'all';
    if (pricingFilter) pricingFilter.value = 'all';
    renderAITools();
  };

  if (resetBtn) resetBtn.addEventListener('click', reset);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', reset);
}

/* --------------------------------------------------------------------------
   21. Bundles
   -------------------------------------------------------------------------- */
function renderBundles() {
  const grid = $('#bundlesGrid');
  const emptyState = $('#bundlesEmptyState');
  if (!grid) return;

  try {
    const html = BUNDLES.map((bundle) => {
      const products = bundle.productIds
        .map((id) => getProductById(id))
        .filter(Boolean);

      if (products.length === 0) return '';

      const productRows = products
        .map((p) => {
          const best = getBestOffer(p);
          return `
            <div class="bundle-product">
              <span class="bundle-product-name">${escapeHtml(p.name)}</span>
              <span class="bundle-product-price">${best ? escapeHtml(formatPrice(best.priceUSD)) : '—'}</span>
            </div>
          `;
        })
        .join('');

      // Total only when all products have a reliable offer price
      const allHavePrices = products.every((p) => getBestOffer(p));
      const totalUSD = allHavePrices
        ? products.reduce((sum, p) => sum + getBestOffer(p).priceUSD, 0)
        : null;

      const totalHtml =
        totalUSD !== null
          ? `
            <div class="bundle-total">
              <span>Estimated total</span>
              <strong>${escapeHtml(formatPrice(totalUSD))}</strong>
            </div>
            <p class="bundle-note">Prices are sample development data.</p>
          `
          : `
            <div class="bundle-total">
              <span>Total unavailable</span>
              <strong>—</strong>
            </div>
            <p class="bundle-note">A reliable price for every product is required.</p>
          `;

      return `
        <article class="bundle-card">
          <span class="bundle-tag">${escapeHtml(bundle.tag)}</span>
          <h3 class="bundle-title">${escapeHtml(bundle.title)}</h3>
          <p class="bundle-desc">${escapeHtml(bundle.description)}</p>
          <div class="bundle-products">${productRows}</div>
          ${totalHtml}
        </article>
      `;
    })
      .filter(Boolean)
      .join('');

    grid.innerHTML = html;
    if (emptyState) emptyState.hidden = true;
  } catch (err) {
    grid.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
  }
}

/* --------------------------------------------------------------------------
   22. Guides
   -------------------------------------------------------------------------- */
function openGuideModal(guideId) {
  const guide = GUIDES[guideId];
  if (!guide) return;

  const modal = $('#guideModal');
  if (!modal) return;

  lastFocusedEl = document.activeElement;

  $('#guideModalTitle').textContent = guide.title;
  $('#guideModalMeta').textContent = `${guide.tag} · ${guide.readTime}`;
  $('#guideModalBody').innerHTML = guide.body;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const closeBtn = $('#guideModalClose');
  if (closeBtn) closeBtn.focus();
}

function bindGuides() {
  $$('[data-guide-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openGuideModal(btn.getAttribute('data-guide-id'));
    });
  });
}

/* --------------------------------------------------------------------------
   23. Info modal (policy content)
   -------------------------------------------------------------------------- */
const INFO_CONTENT = {
  selection: {
    title: 'How We Select Products',
    body: `
      <p>Product selection at TechVault AI considers technical specifications, practical requirements, and the needs of our target audiences: students, developers, AI enthusiasts, gamers, creators, and everyday technology buyers.</p>
      <p>We do not accept payment to influence product rankings. Where affiliate relationships exist, they are disclosed clearly and do not affect product selection or ranking.</p>
      <p>We do not claim independent lab testing unless it has genuinely been performed. Information about specifications and offers is drawn from public sources and clearly labelled.</p>
    `
  },
  affiliate: {
    title: 'Affiliate Disclosure',
    body: `
      <p>TechVault AI may earn a commission when you purchase through certain affiliate links. This does not increase the price you pay.</p>
      <p>Affiliate relationships do not determine our product rankings. No affiliate links are active in the current version of this website.</p>
      <p>When affiliate relationships are added, they will be disclosed on this page and alongside the relevant links.</p>
    `
  },
  editorial: {
    title: 'Editorial Policy',
    body: `
      <p>Our editorial content focuses on practical buying guidance and technical explanation. We avoid unsupported performance claims and clearly label sample or estimated data.</p>
      <p>We do not fabricate authors, testing credentials, or research claims. Where information is uncertain, we say so explicitly.</p>
      <p>Corrections and reader feedback are welcomed through the contact page.</p>
    `
  },
  privacy: {
    title: 'Privacy Policy',
    body: `
      <p>This prototype stores wishlist, comparison, and currency preferences in your browser's localStorage only. No personal data is transmitted to a server.</p>
      <p>When live services are integrated, this policy will be updated to describe what data is collected, why, and how it is protected.</p>
      <p>No third-party tracking scripts are loaded by this prototype.</p>
    `
  },
  terms: {
    title: 'Terms & Conditions',
    body: `
      <p>This website is provided as an informational prototype. Prices, offers, and availability shown are sample development data and may not reflect current retailer terms.</p>
      <p>Product specifications are provided for reference. Always verify details with the manufacturer or retailer before purchasing.</p>
      <p>External links, when present, are clearly labelled and open in a new tab with <code>rel="noopener noreferrer"</code>.</p>
    `
  },
  contact: {
    title: 'Contact',
    body: `
      <p>To reach the TechVault AI team, use the contact form that will be added in a future release, or the placeholder social links in the footer.</p>
      <p>No contact form is active in this prototype version.</p>
    `
  }
};

function openInfoModal(key) {
  const content = INFO_CONTENT[key];
  if (!content) return;

  const modal = $('#infoModal');
  if (!modal) return;

  lastFocusedEl = document.activeElement;

  $('#infoModalTitle').textContent = content.title;
  $('#infoModalBody').innerHTML = content.body;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const closeBtn = $('#infoModalClose');
  if (closeBtn) closeBtn.focus();
}

function bindPolicyLinks() {
  $$('[data-policy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openInfoModal(btn.getAttribute('data-policy'));
    });
  });

  $$('[data-placeholder-url]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const network = link.getAttribute('data-placeholder-url');
      showToast(
        `${network} profile is a placeholder. Replace it with the official URL before launch.`,
        'warning'
      );
    });
  });
}

/* --------------------------------------------------------------------------
   24. Currency
   -------------------------------------------------------------------------- */
function applyCurrency() {
  const select = $('#currencySelect');
  if (select) select.value = state.currency;

  const priceHint = $('#priceHint');
  if (priceHint) {
    priceHint.textContent = `Prices shown in ${state.currency}.`;
  }

  const priceMin = $('#filterPriceMin');
  const priceMax = $('#filterPriceMax');
  if (priceMin) {
    priceMin.value = '';
    priceMin.placeholder = `Min (${CURRENCY_SYMBOLS[state.currency]})`;
  }
  if (priceMax) {
    priceMax.value = '';
    priceMax.placeholder = `Max (${CURRENCY_SYMBOLS[state.currency]})`;
  }
  state.filters.priceMin = '';
  state.filters.priceMax = '';

  renderProducts();
  renderWishlist();
  renderCompare();
  renderBundles();
  renderAITools();
  refreshIcons();
}

function bindCurrency() {
  const select = $('#currencySelect');
  if (!select) return;
  select.value = state.currency;
  select.addEventListener('change', (e) => {
    state.currency = e.target.value;
    saveCurrency();
    applyCurrency();
    showToast(`Display currency set to ${state.currency}`, 'success');
  });
}

/* --------------------------------------------------------------------------
   25. Newsletter
   -------------------------------------------------------------------------- */
function bindNewsletter() {
  const form = $('#newsletterForm');
  const status = $('#newsletterStatus');
  const submitBtn = $('#newsletterSubmitBtn');
  const emailInput = $('#newsletterEmail');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (emailInput?.value || '').trim();

    status.className = 'newsletter-status';

    if (!email) {
      status.textContent = 'Please enter your email address.';
      status.classList.add('is-error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('is-error');
      return;
    }

    // No backend is connected — do not claim a successful subscription.
    status.textContent =
      'Newsletter delivery is not connected yet. Your input was validated but not submitted.';
    status.classList.add('is-success');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Validated';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
      }
    }, 2600);
  });
}

/* --------------------------------------------------------------------------
   26. Navigation
   -------------------------------------------------------------------------- */
function bindNavigation() {
  const toggle = $('#mobileMenuToggle');
  const mobileNav = $('#mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isHidden = mobileNav.hidden;
    mobileNav.hidden = !isHidden;
    toggle.setAttribute('aria-expanded', String(isHidden));
    const iconName = isHidden ? 'x' : 'menu';
    toggle.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
    refreshIcons();
  });

  $$('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
      refreshIcons();
    });
  });

  const navSearchBtn = $('#navSearchBtn');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
      const products = $('#products');
      if (products) {
        products.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => {
        const input = $('#filterSearchInput');
        if (input) input.focus();
      }, 400);
    });
  }

  // Footer category links → set filter and scroll
  $$('[data-category-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-category-link');
      const select = $('#filterCategory');
      if (select) {
        select.value = cat;
        state.filters.category = cat;
        renderProducts();
      }
      const products = $('#products');
      if (products) products.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* --------------------------------------------------------------------------
   27. Active nav highlighting on scroll
   -------------------------------------------------------------------------- */
function bindScrollSpy() {
  const sections = ['home', 'products', 'categories', 'compare', 'ai-tools', 'guides'];
  const links = $$('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === `#${id}`
          );
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   28. Footer year
   -------------------------------------------------------------------------- */
function setFooterYear() {
  const el = $('#footerYear');
  if (el) el.textContent = String(new Date().getFullYear());
}

/* --------------------------------------------------------------------------
   29. Hero preview sample data
   -------------------------------------------------------------------------- */
function refreshPreviewPrices() {
  // Preview prices in the hero are intentionally static sample data,
  // but we keep a small note that it is development data.
  // No-op — the CSS and HTML handle the "Development data" label.
}

/* --------------------------------------------------------------------------
   30. Initialization
   -------------------------------------------------------------------------- */
function init() {
  loadState();

  // Populate dynamic pieces
  populateFilterDropdowns();
  updateWishlistCount();

  // Render everything
  renderProducts();
  renderWishlist();
  renderCompare();
  renderBundles();
  renderAITools();
  setFooterYear();
  refreshPreviewPrices();

  // Bind events
  bindNavigation();
  bindHeroSearch();
  bindFilterControls();
  bindProductGridEvents();
  bindWishlistControls();
  bindCompareControls();
  bindFinder();
  bindAITools();
  bindGuides();
  bindPolicyLinks();
  bindCurrency();
  bindNewsletter();
  bindModalCloseHandlers();
  bindScrollSpy();

  // Ensure filter selects reflect state
  const categorySelect = $('#filterCategory');
  if (categorySelect) categorySelect.value = state.filters.category;

  refreshIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}