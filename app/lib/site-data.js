import { withBasePath } from "./base-path";

export const auditLink = "https://www.veterinarybusinessinstitute.com/msm/ryan/";
export const contactPageLink = "https://www.veterinarybusinessinstitute.com/contact-us/";
export const podcastHubLink = "https://www.veterinarybusinessinstitute.com/podcast-show/";
export const webinarArchiveLink = "https://www.veterinarybusinessinstitute.com/webinar-archive/";
export const marketingPageLink = "https://www.veterinarybusinessinstitute.com/marketing/";
export const panelFolderLink = "/events";

export const topBarItems = [
  {
    label: "Latest Podcast",
    copy: "Episode 113: The Investment You Haven't Considered — How Veterinarians Are Shaping the Future of Animal Health",
    href: "https://podcasts.apple.com/us/podcast/the-investment-you-havent-considered-how/id1712053291?i=1000769967502",
  },
  {
    label: "Latest Event Panel",
    copy: "May 27, 2026: Data-Driven Growth — How AI Search and Client Education Are Changing Veterinary Visibility",
    href: "https://vimeo.com/1196507090",
  },
];

export const headerNavigation = [
  { type: "link", label: "About Us", href: "/about" },
  {
    type: "group",
    label: "Events",
    href: "/events",
    description:
      "Browse veterinary event panels, webinars, and replay-ready sessions.",
    items: [
      {
        label: "Webinars & Events",
        href: "/webinars/registration",
        description: "Register for the next live VBI masterclass or panel session.",
      },
    ],
  },
  { type: "link", label: "Podcast", href: "/podcast" },
  { type: "link", label: "Reviews", href: "/reviews" },
  {
    type: "group",
    label: "Resources",
    href: "/resources",
    description:
      "Free downloads, tools, blog content, and educational resources for veterinary teams.",
    items: [
      {
        label: "Blog & Insights",
        href: "/blog",
        description: "Articles, guides, tips",
      },
      {
        label: "Free Downloads",
        href: "/resources",
        description: "Templates & guides",
      },
      {
        label: "Tools",
        href: "/resources/tools",
        description: "Free calculators for veterinary practices",
      },
    ],
  },
  { type: "link", label: "Guest / Speaker", href: "/guest-speaker" },
  { type: "link", label: "Community", href: "/community" },
  { type: "link", label: "Marketing", href: "/marketing" },
];

export const footerExploreLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Reviews", href: "/reviews" },
  { label: "Podcast", href: "/podcast" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Guest / Speaker", href: "/guest-speaker" },
  { label: "Community", href: "/community" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Webinars", href: "/webinars" },
  { label: "Marketing", href: "/marketing" },
  { label: "Contact Us", href: "/contact" },
];

export const contactDetails = [
  { label: "(833) 523-1845", href: "tel:+18335231845" },
  { label: "(213) 325-1745", href: "tel:+12133251745" },
  {
    label: "team@veterinarybusinessinstitute.com",
    href: "mailto:team@veterinarybusinessinstitute.com",
  },
];

export const contactAddress = "303, Pinetree Way Mississauga, Ontario L5G 2R4 Canada";

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100094602681699",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/veterinary-business-podcast/?viewAsMember=true",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/veterinarybusinesspodcast/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCVesVVBLy84s5Jm6tVigGyg",
  },
];

export const footerResourceLinks = [
  { label: "Podcast Show", href: podcastHubLink },
  { label: "Event Panels Folder", href: panelFolderLink },
  { label: "Webinar Archive", href: webinarArchiveLink },
  { label: "Book a Free Consultation", href: "/consultation" },
  { label: "Ekwa Marketing", href: "https://www.ekwa.com/" },
  { label: "Knowledge Base (FAQ)", href: "/resources/faq" },
  { label: "Free Downloads Hub", href: "/resources" },
];

export const listeningPlatforms = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/5F1cmzekwcb8UbFO4OL5pu",
  },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/veterinary-business-podcast/id1712053291",
  },
  {
    label: "YouTube Music",
    href: "https://music.youtube.com/playlist?list=PLA-bPmn73IK4XAn6w-iPWWVmg_B8do7AC",
  },
];

export const homepageMetrics = [
  {
    value: "113",
    label: "Podcast episodes published through May 28, 2026",
  },
  {
    value: "19",
    label: "Veterinary event panels available on demand in the replay archive",
  },
  {
    value: "16K+",
    label: "Positive testimonials referenced across the Ekwa marketing offer",
  },
];

export const focusAreas = [
  {
    title: "Leadership and Team Culture",
    body: "Sharper communication, better retention, and stronger practice leadership for veterinary teams that need stability and momentum.",
  },
  {
    title: "Operations and Staffing Strategy",
    body: "Relief integration, onboarding, workflow design, and more flexible staffing models for practices navigating today's labor realities.",
  },
  {
    title: "Marketing and Visibility",
    body: "Local search strategy, website positioning, and client-facing messaging that help the right pet owners find and trust your practice.",
  },
  {
    title: "Technology and Client Experience",
    body: "Practical use of systems, automation, and service design to reduce friction and improve the client journey.",
  },
];

export const hosts = [
  {
    name: "Naren Arulrajah",
    role: "Founder of the Veterinary Business Podcast and CEO of Ekwa Marketing",
    image: withBasePath("/assets/host-naren.jpg"),
    body: "Naren helps veterinary practices grow through stronger digital visibility, sharper positioning, and more disciplined business systems.",
  },
  {
    name: "Dr. Joel Parker",
    role: "Co-host and veterinary industry voice",
    image: withBasePath("/assets/host-joel.jpg"),
    body: "Joel brings practical perspective from the operational side of veterinary practice leadership and growth.",
  },
  {
    name: "Dr. Amanda Landis-Hanna",
    role: "Co-host focused on leadership and veterinary performance",
    image: withBasePath("/assets/host-amanda.jpg"),
    body: "Amanda adds people-centered insight around veterinary teams, culture, and the realities of sustainable practice growth.",
  },
  {
    name: "Dr. Mark Roozen",
    role: "Co-host with a practice-value lens",
    image: withBasePath("/assets/host-mark.jpg"),
    body: "Mark contributes a strategic viewpoint on ownership, scale, decision-making, and long-term veterinary business value.",
  },
];

export const episodes = [
  {
    number: "113",
    date: "May 28, 2026",
    title: "The Investment You Haven't Considered: How Veterinarians Are Shaping the Future of Animal Health",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/the-investment-you-havent-considered-how/id1712053291?i=1000769967502&uo=4",
    appleId: "1000769967502",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp113.mp3?dest-id=4093188",
    duration: "42 min",
    summary: "In this episode of the Veterinary Business Podcast, Dr. Natalie Marks, CEO of VANE, shares how veterinarians can play a bigger role in shaping the future of animal health through angel investing, advisory work, and innovation.",
  },
  {
    number: "111",
    date: "May 21, 2026",
    title: "You Don't Have to Disappear to Be Good at This Work: Reclaiming Yourself in Veterinary Medicine",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/you-dont-have-to-disappear-to-be-good-at-this-work/id1712053291?i=1000768909674&uo=4",
    appleId: "1000768909674",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp111.mp3?dest-id=4093188",
    duration: "61 min",
    summary: "In this episode of the Veterinary Business Podcast, host Adeesha speaks with Joelle Flynn about burnout, perfectionism, people-pleasing, and nervous system regulation in veterinary medicine.",
  },
  {
    number: "110",
    date: "May 14, 2026",
    title: "Decoding Pet Health: How AI and Behavioral Science Are Transforming Early Detection and Care",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/decoding-pet-health-how-ai-and-behavioral-science-are/id1712053291?i=1000767804805&uo=4",
    appleId: "1000767804805",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp110.mp3?dest-id=4093188",
    duration: "19 min",
    summary: "In this episode of the Veterinary Business Institute Podcast, our Co-Host Angie speaks with Dr. Ragen McGowan about how AI, connected pet technology, and behavioral science are transforming the future of veterinary care.",
  },
  {
    number: "109",
    date: "May 7, 2026",
    title: "Why Burnout Keeps Returning in Veterinary Medicine, and How We Can Break the Cycle",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/why-burnout-keeps-returning-in-veterinary-medicine/id1712053291?i=1000766592708&uo=4",
    appleId: "1000766592708",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp109.mp3?dest-id=4093188",
    duration: "39 min",
    summary: "Burnout in veterinary medicine doesn't always go away with a vacation, a new job, or even a career change. In this episode, Don Adeesha speaks with Dr.",
  },
  {
    number: "108",
    date: "April 30, 2026",
    title: "Stop Surviving and Start Leading with Practical Solutions for Overwhelmed Practice Owners",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/stop-surviving-and-start-leading-with-practical/id1712053291?i=1000764633493&uo=4",
    appleId: "1000764633493",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp108.mp3?dest-id=4093188",
    duration: "53 min",
    summary: "Running a veterinary practice can feel like living in constant crisis mode. In this expert-led webinar, seasoned veterinary leaders share practical strategies to help practice owners and managers regain control, strengthen operations, and lead with greater clarity and resilience.",
  },
  {
    number: "107",
    date: "April 23, 2026",
    title: "Selling Your Veterinary Practice: A Complete Legal, Tax & Transition Playbook",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/selling-your-veterinary-practice-a-complete-legal/id1712053291?i=1000763221708&uo=4",
    appleId: "1000763221708",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp107.mp3?dest-id=4093188",
    duration: "46 min",
    summary: "What does it really take to sell a veterinary practice well? In this episode, host Don Adeesha speaks with Jordan Morelli, corporate lawyer and Toronto office lead at LINMAC LLP, about the legal, financial, and operational steps involved in selling a veterinary clinic in Canada.",
  },
  {
    number: "106",
    date: "April 16, 2026",
    title: "Reimagining Veterinary Practice Leadership: Building Transparent, Team-Driven Businesses in the 21st Century",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/reimagining-veterinary-practice-leadership-building/id1712053291?i=1000761785947&uo=4",
    appleId: "1000761785947",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp106.mp3?dest-id=4093188",
    duration: "45 min",
    summary: "Elise M. Lacher joins Don Adeesha to explain why the old doctor-centered model of running a veterinary practice no longer works. In this episode, they explore shared leadership, team transparency, smarter hiring, better performance management, and how to build a practice that grows without burning out its owner.",
  },
  {
    number: "105",
    date: "April 9, 2026",
    title: "Maximizing Team Potential: How Utilization Drives ROI and Culture in Veterinary Medicine",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/maximizing-team-potential-how-utilization-drives-roi/id1712053291?i=1000760382610&uo=4",
    appleId: "1000760382610",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp105a.mp3?dest-id=4093188",
    duration: "41 min",
    summary: "Lucy Nash, a registered veterinary technician and self-described \"burnout statistic,\" joins the show to break down why team utilization isn't just a scheduling metric — it's the hidden driver behind retention, revenue, and workplace culture.",
  },
  {
    number: "104",
    date: "April 2, 2026",
    title: "Burnout Is a Systems Failure: The HR Blueprint for Retaining Veterinary Teams",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/burnout-is-a-systems-failure-the-hr-blueprint/id1712053291?i=1000758813506&uo=4",
    appleId: "1000758813506",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp105.mp3?dest-id=4093188",
    duration: "40 min",
    summary: "In this episode, Adeesha sits down with Kara Kelley to unpack the people's side of veterinary leadership. They explore why burnout cannot be solved with surface-level perks, how better compensation and flexible time off drive retention, why personality assessments should not be misused in hiring…",
  },
  {
    number: "103",
    date: "March 26, 2026",
    title: "Strategic Relief Integration: Building Profitable, High-Performance Veterinary Staffing Models in Today's Market",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/strategic-relief-integration-building-profitable-high/id1712053291?i=1000757435945&uo=4",
    appleId: "1000757435945",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp103.mp3?dest-id=4093188",
    duration: "30 min",
    summary: "Relief vets are no longer just filling gaps—they're shaping the future of veterinary staffing. In this episode, we discuss how to build strong, relationship-based relief networks, use relief to grow your caseload before hiring, and create better onboarding, feedback, and compensation strategies.",
  },
  {
    number: "102",
    date: "March 19, 2026",
    title: "Smarter Systems, Safer Practices: Using AI and Technology to Build Efficient, Ethical, and Secure Veterinary Operations",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/smarter-systems-safer-practices-using-ai-and/id1712053291?i=1000756116801&uo=4",
    appleId: "1000756116801",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp102.mp3?dest-id=4093188",
    duration: "39 min",
    summary: "A deep dive into cybersecurity in the veterinary industry. Host Don Adeesha sits down with William Lindus to explore emerging threats, real-world risks, and why animal healthcare organizations can't afford to ignore digital security.",
  },
  {
    number: "101",
    date: "March 12, 2026",
    title: "Integrating Innovation Without Overwhelm: Practical Technology Strategies for Sustainable Veterinary Practice Growth",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/integrating-innovation-without-overwhelm-practical/id1712053291?i=1000754791303&uo=4",
    appleId: "1000754791303",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp101.mp3?dest-id=4093188",
    duration: "38 min",
    summary: "How can veterinary practices adopt new technology without creating more overwhelm? In this episode, Don Adeesha speaks with Dr. Mike Mossop of CoVet about practical technology strategies for sustainable veterinary practice growth.",
  },
  {
    number: "100",
    date: "March 5, 2026",
    title: "Raising the Standard: How Team-Based Training Elevates Veterinary Dentistry and Practice Success",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/raising-the-standard-how-team-based-training-elevates/id1712053291?i=1000753168007&uo=4",
    appleId: "1000753168007",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp100.mp3?dest-id=4093188",
    duration: "34 min",
    summary: "Veterinary dentistry can be a powerful driver of both patient health and practice growth—but only when the entire team is trained and aligned. In this episode, we explore how team-based dentistry training improves consistency, reduces errors, and boosts client satisfaction.",
  },
  {
    number: "99",
    date: "February 26, 2026",
    title: "Maximizing Your Veterinary Practice Value: Private Equity, Valuation, and Sale Optimization",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/28/06/77/28067714-70d0-2d4f-54a3-688f6c93b715/mza_5109063160220216959.jpg/600x600bb.jpg",
    href: "https://podcasts.apple.com/us/podcast/maximizing-your-veterinary-practice-value-private-equity/id1712053291?i=1000751688278&uo=4",
    appleId: "1000751688278",
    audioUrl: "https://traffic.libsyn.com/secure/2c5c507b-3fff-4ecd-b8c9-b2de20584eff/vbp99.mp3?dest-id=4093188",
    duration: "40 min",
    summary: "Private equity is transforming veterinary medicine. In this episode, we break down valuation fundamentals, strategies to increase practice value, key sale preparation steps, and the future of hybrid ownership models—giving veterinary leaders the insight needed to navigate growth, consolidation, and long-term success.",
  },
];

export const webinars = [
  {
    date: "March 26, 2026",
    title: "Elevating Veterinary Practice Performance Through Marketing, Technology, Team Productivity, and Financial Resilience",
    image: withBasePath("/assets/webinar-mar26.jpg"),
    href: "https://www.veterinarybusinessinstitute.com/webinar-archive/elevating-veterinary-practice-performance-through-marketing-technology-team-productivity-and-financial-resilience/",
    summary:
      "A replay focused on the operating system of a stronger practice: visibility, systems, people performance, and financial discipline.",
  },
  {
    date: "February 19, 2026",
    title: "Shaping Future-Ready Veterinary Practices Through Strategic Planning, Culture, Retention, Financial Resilience and Practice Continuity",
    image: withBasePath("/assets/webinar-feb19.jpg"),
    href: "https://www.veterinarybusinessinstitute.com/webinar-archive/shaping-future-ready-veterinary-practices-through-strategic-planning-culture-retention-financial-resilience-and-practice-continuity/",
    summary:
      "A broader strategy session on long-term planning, people retention, resilience, and how practices can protect continuity while growing.",
  },
  {
    date: "January 29, 2026",
    title: "Strengthening Modern Veterinary Clinics Through Culture, Communication, Technology and Client Care",
    image: withBasePath("/assets/webinar-jan29.jpg"),
    href: "https://www.veterinarybusinessinstitute.com/webinar-archive/strengthening-modern-veterinary-clinics-through-culture-communication-technology-and-client-care/",
    summary:
      "A clinic-level conversation on better communication, service quality, and the role of technology in supporting teams and clients.",
  },
  {
    date: "Late 2025",
    title: "Six Forces Shaping the Next Decade of Veterinary Business: Law, Marketing, Leadership, Culture, Finance, and AI",
    image: withBasePath("/assets/webinar-mar26.jpg"),
    href: "https://www.veterinarybusinessinstitute.com/webinar-archive/six-forces-shaping-the-next-decade-of-veterinary-business-law-marketing-leadership-culture-finance-and-ai/",
    summary:
      "A future-facing replay on the cross-functional shifts that will influence veterinary leadership and decision-making over the coming decade.",
  },
];

export const eventPanels = [
  {
    slug: "data-driven-growth-ai-search-client",
    date: "May 27, 2026",
    duration: "01:00:00",
    category: "Technology and Innovation",
    title: "Data-Driven Growth: How AI Search and Client Education Are Changing Veterinary Visibility",
    subtitle: "Veterinary Technology & Innovation Panel",
    image: withBasePath("/assets/panels/panel-01.jpg"),
    href: "https://vimeo.com/1196507090",
    summary: "Turn Dr. Google behavior into trust-building education funnels",
  },
  {
    slug: "spectrum-care-playbook-keeping-middle-class",
    date: "May 20, 2026",
    duration: "01:00:00",
    category: "Client Experience",
    title: "The Spectrum of Care Playbook: Keeping the Middle-Class Pet Owner",
    subtitle: "Veterinary Client Experience Panel",
    image: withBasePath("/assets/panels/panel-02.jpg"),
    href: "https://vimeo.com/1194276096",
    summary: "Reframing the exam room conversation: Moving from \"gold standard or nothing\" to tiered, transparent treatment options without guilt or pressure",
  },
  {
    slug: "charge-what-re-worth-stop-discounting",
    date: "May 13, 2026",
    duration: "01:00:00",
    category: "Ownership and Leadership",
    title: "Charge What You're Worth: How to Stop Discounting and Grow Your Practice Value",
    subtitle: "Veterinary Ownership & Leadership Panel",
    image: withBasePath("/assets/panels/panel-03.jpg"),
    href: "https://vimeo.com/1192171560",
    summary: "Replace discount habits with value-based messaging frameworks",
  },
  {
    slug: "profitability-playbook-2026-increase-revenue-per",
    date: "May 6, 2026",
    duration: "01:00:00",
    category: "Financial Health",
    title: "Profitability Playbook 2026: How to Increase Revenue Per Visit Without Raising Fees",
    subtitle: "Veterinary Financial Health Panel",
    image: withBasePath("/assets/panels/panel-04.jpg"),
    href: "https://vimeo.com/1189965087",
    summary: "Increase revenue per visit through value communication and service packaging",
  },
  {
    slug: "digital-workflow-audit-fix-system-friction",
    date: "April 29, 2026",
    duration: "01:00:00",
    category: "Management and Efficiency",
    title: "The Digital Workflow Audit: How to Fix System Friction That Loses Clients and Time",
    subtitle: "Veterinary Management Panel",
    image: withBasePath("/assets/panels/panel-05.jpg"),
    href: "https://vimeo.com/1188023821",
    summary: "Run a workflow-friction audit across front desk, exam, and follow-up",
  },
  {
    slug: "tech-enabled-manager-automating-coordination-tasks",
    date: "April 22, 2026",
    duration: "01:00:00",
    category: "Technology and Innovation",
    title: "The Tech-Enabled Manager: Automating Coordination Tasks to Protect Middle Leaders",
    subtitle: "Veterinary Technology & Innovation Panel",
    image: withBasePath("/assets/panels/panel-06.jpg"),
    href: "https://vimeo.com/1185762479",
    summary: "Protect middle leaders by automating repeatable coordination tasks",
  },
  {
    slug: "modern-vet-leaders-use-ai-automation",
    date: "April 8, 2026",
    duration: "01:00:00",
    category: "Ownership and Leadership",
    title: "How Modern Vet Leaders Use AI and Automation to Reduce Stress and Grow Profit",
    subtitle: "Veterinary Ownership & Leadership Panel",
    image: withBasePath("/assets/panels/panel-07.jpg"),
    href: "https://vimeo.com/1181448065",
    summary: "Identify top workflow stressors where AI automation removes admin load",
  },
  {
    slug: "conflict-or-connection",
    date: "March 23, 2026",
    duration: "01:00:23",
    category: "Culture and Leadership",
    title: "Conflict or Connection? Turning Team Tension Into Collaboration",
    subtitle: "Veterinary Culture and Leadership Panel",
    image: withBasePath("/assets/panels/panel-01.jpg"),
    href: "https://vimeo.com/1176476168",
    summary:
      "A panel on leadership friction, communication habits, and how practices can turn recurring team tension into productive collaboration.",
  },
  {
    slug: "storytelling-for-veterinary-practices",
    date: "March 16, 2026",
    duration: "01:02:20",
    category: "Management and Marketing",
    title: "Storytelling for Veterinary Practices: Turning Your Mission Into Marketing",
    subtitle: "Veterinary Management Panel",
    image: withBasePath("/assets/panels/panel-02.jpg"),
    href: "https://vimeo.com/1174277215",
    summary:
      "A discussion on brand storytelling, mission-driven positioning, and how practices can make their message more human and memorable.",
  },
  {
    slug: "cybersecurity-in-veterinary-practices",
    date: "March 9, 2026",
    duration: "01:06:32",
    category: "Risk and Compliance",
    title: "Cybersecurity in Veterinary Practices: Safeguarding Client and Patient Data",
    subtitle: "Veterinary Risk and Compliance Panel",
    image: withBasePath("/assets/panels/panel-03.jpg"),
    href: "https://vimeo.com/1172064775",
    summary:
      "A panel focused on data protection, risk exposure, and what veterinary teams should tighten as digital systems become more central.",
  },
  {
    slug: "mindset-matters",
    date: "March 2, 2026",
    duration: "01:11:00",
    category: "Client Experience",
    title: "Mindset Matters: Reframing Veterinary Challenges Into Opportunities",
    subtitle: "Veterinary Client Experience Panel",
    image: withBasePath("/assets/panels/panel-04.jpg"),
    href: "https://vimeo.com/1169812832",
    summary:
      "A conversation on mindset, service recovery, and how practices can improve the client experience by reframing difficult moments.",
  },
  {
    slug: "exit-strategy-essentials",
    date: "February 25, 2026",
    duration: "01:00:28",
    category: "Financial Health",
    title: "Exit Strategy Essentials: Preparing Your Practice for Sale or Succession",
    subtitle: "Veterinary Financial Health Panel",
    image: withBasePath("/assets/panels/panel-05.jpg"),
    href: "https://vimeo.com/1168390632",
    summary:
      "A panel on succession planning, valuation readiness, and the financial decisions that shape a cleaner future exit.",
  },
  {
    slug: "handling-difficult-conversations",
    date: "February 12, 2026",
    duration: "01:01:12",
    category: "Client Experience",
    title: "Handling Difficult Conversations: Turning Emotionally Charged Moments Into Trust",
    subtitle: "Veterinary Client Experience Panel",
    image: withBasePath("/assets/panels/panel-06.jpg"),
    href: "https://vimeo.com/1164632800",
    summary:
      "A panel about emotionally difficult conversations, trust-building, and the language teams can use when the stakes are high.",
  },
  {
    slug: "future-veterinary-workforce",
    date: "February 4, 2026",
    duration: "58:44",
    category: "Technology and Innovation",
    title: "The Future Veterinary Workforce: New Skills for the Next Generation of Practice",
    subtitle: "Veterinary Technology and Innovation Panel",
    image: withBasePath("/assets/panels/panel-07.jpg"),
    href: "https://vimeo.com/1162050155",
    summary:
      "A session on workforce evolution, skill development, and how veterinary teams should prepare for a more technology-shaped operating environment.",
  },
  {
    slug: "future-proofing-the-practice",
    date: "January 29, 2026",
    duration: "01:01:20",
    category: "Management and Efficiency",
    title: "Future-Proofing the Practice: Leveraging AI and Efficiency for Profitability",
    subtitle: "Veterinary Management Panel",
    image: withBasePath("/assets/panels/panel-08.jpg"),
    href: "https://vimeo.com/1160074368",
    summary:
      "A practical panel on AI, operating efficiency, and how practices can improve profitability without creating more internal drag.",
  },
  {
    slug: "the-growth-map",
    date: "January 23, 2026",
    duration: "01:04:29",
    category: "Financial Health",
    title: "The Growth Map: When and How to Expand Your Veterinary Practice",
    subtitle: "Veterinary Financial Health Panel",
    image: withBasePath("/assets/panels/panel-09.jpg"),
    href: "https://vimeo.com/1157454739",
    summary:
      "A panel focused on expansion timing, capital judgment, and how to think about growth without overextending the business.",
  },
  {
    slug: "leading-through-change",
    date: "January 16, 2026",
    duration: "01:11:54",
    category: "Ownership and Leadership",
    title: "Leading Through Change: Practical Leadership for a Post-Pandemic Veterinary World",
    subtitle: "Veterinary Ownership and Leadership Panel",
    image: withBasePath("/assets/panels/panel-10.jpg"),
    href: "https://vimeo.com/1154888535",
    summary:
      "A panel on decision-making under pressure, leadership posture, and guiding practices through sustained industry change.",
  },
  {
    slug: "bridging-the-knowledge-gap",
    date: "December 13, 2025",
    duration: "01:03:23",
    category: "Client Education",
    title: "Bridging the Knowledge Gap: How Better Client Communication Improves Compliance",
    subtitle: "Veterinary Client Education and Communication Panel",
    image: withBasePath("/assets/panels/panel-11.jpg"),
    href: "https://vimeo.com/1146040714",
    summary:
      "A conversation on clearer client education, stronger communication systems, and how those improvements support better compliance.",
  },
  {
    slug: "boundaries-that-stick",
    date: "November 24, 2025",
    duration: "01:04:40",
    category: "Wellbeing and Resilience",
    title: "Boundaries That Stick: Finding Balance Between Veterinary Life and Real Life",
    subtitle: "Veterinary Wellbeing and Resilience Panel",
    image: withBasePath("/assets/panels/panel-12.jpg"),
    href: "https://vimeo.com/1139837103",
    summary:
      "A panel on personal boundaries, team sustainability, and reducing the human cost of a demanding veterinary career.",
  },
];

export const panelThemes = [
  {
    title: "Leadership and culture",
    body: "Panels on conflict, leadership posture, and how teams can move through pressure with more discipline and trust.",
  },
  {
    title: "Client communication and experience",
    body: "Sessions focused on emotionally charged conversations, better education, and turning difficult moments into stronger relationships.",
  },
  {
    title: "Management, AI, and growth",
    body: "Conversations on storytelling, efficiency, profitability, and what smarter expansion or modernization should look like.",
  },
];

export const marketingPillars = [
  {
    title: "Search visibility that supports growth",
    body: "VBI's marketing offer is built around the reality that most practices need stronger local visibility before they can convert more of the right pet owners.",
  },
  {
    title: "A disciplined six-factor review",
    body: "The audit is framed around a 4 to 6 hour review across six ranking factors that influence how Google surfaces top veterinary websites.",
  },
  {
    title: "Local market and competitor analysis",
    body: "The audit is positioned around your geography, local competition, and the gaps between your current presence and the leaders in your market.",
  },
  {
    title: "A VIP team and custom plan",
    body: "The offer includes tailored support, a personalized marketing plan, and implementation guidance grounded in veterinary-specific experience.",
  },
  {
    title: "Proof borrowed from Ekwa",
    body: "The offer draws on Ekwa's broader reputation, including a claim of more than 16,000 positive testimonials and steady referral momentum.",
  },
  {
    title: "Audit-first conversion path",
    body: "Instead of pushing visitors directly into a long service page, the strongest CTA is a free strategy meeting that lowers friction for first contact.",
  },
];

export const contactReasons = [
  {
    title: "Podcast and speaking opportunities",
    body: "Connect with the team about guest appearances, speaker invitations, or collaborations that would add value to the veterinary audience.",
  },
  {
    title: "Marketing strategy conversations",
    body: "Use the contact route as a softer entry point for practices that are not ready to book a full audit yet but need direction.",
  },
  {
    title: "General questions and partnerships",
    body: "For webinar access, platform questions, sponsorships, or educational partnerships, this page should make the next step obvious.",
  },
];

export const testimonials = [
  {
    quote: "The VBI podcast changed how I think about staffing and leadership. Every episode gives me something I can apply the same week.",
    name: "Dr. Sarah Mitchell",
    role: "Practice Owner, Colorado",
    rating: 5,
  },
  {
    quote: "The event panels are like a masterclass series. I've replayed the leadership panel three times with my management team.",
    name: "Dr. James Chen",
    role: "Multi-location Owner, Texas",
    rating: 5,
  },
  {
    quote: "Naren and the team bring real business strategy to an industry that desperately needs it. The webinar replays alone are worth it.",
    name: "Karen Albrecht",
    role: "Hospital Manager, Ontario",
    rating: 5,
  },
  {
    quote: "We went from guessing at marketing to actually understanding our visibility gaps. The audit was a turning point for our practice.",
    name: "Dr. Michael Torres",
    role: "Practice Owner, Florida",
    rating: 5,
  },
  {
    quote: "The community and free resources helped us build our first real onboarding SOP. Our new hires now ramp up twice as fast.",
    name: "Lisa Nguyen",
    role: "Operations Manager, California",
    rating: 5,
  },
];

export const freeResources = [
  {
    icon: "clipboard",
    title: "Practice Growth Checklist",
    body: "A step-by-step checklist for veterinary owners to audit and improve their practice growth strategy across six key areas.",
    href: "/resources",
  },
  {
    icon: "file-text",
    title: "Onboarding SOP Template",
    body: "A ready-to-use standard operating procedure for onboarding relief vets, new hires, and support staff into your practice.",
    href: "/resources",
  },
  {
    icon: "bar-chart",
    title: "KPI Tracking Worksheet",
    body: "Track the metrics that matter — client retention, revenue per visit, new client acquisition, and team productivity benchmarks.",
    href: "/resources",
  },
  {
    icon: "shield",
    title: "Compliance Quick-Audit",
    body: "A self-assessment tool covering data security, client communication standards, and operational risk areas for veterinary clinics.",
    href: "/resources",
  },
];

export const servicePillars = [
  {
    icon: "users",
    title: "Leadership & Culture",
    body: "Build stronger teams through communication, retention strategy, and leadership habits that stick.",
    href: "/events",
  },
  {
    icon: "briefcase",
    title: "Operations & Staffing",
    body: "Streamline workflows, relief integration, and onboarding to reduce friction and improve continuity.",
    href: "/podcast",
  },
  {
    icon: "trending-up",
    title: "Marketing & Visibility",
    body: "Local SEO, website positioning, and client-facing messaging that brings the right pet owners to your door.",
    href: "/marketing",
  },
  {
    icon: "monitor",
    title: "Technology & Systems",
    body: "Practical guidance on automation, PIMS, and digital tools that reduce overhead without creating complexity.",
    href: "/podcast",
  },
  {
    icon: "dollar-sign",
    title: "Financial Health",
    body: "Pricing strategy, profitability levers, and the financial discipline that keeps practices sustainable.",
    href: "/events",
  },
  {
    icon: "heart",
    title: "Client Experience",
    body: "Improve the client journey from first call to follow-up with communication, empathy, and service design.",
    href: "/events",
  },
  {
    icon: "shield",
    title: "Risk & Compliance",
    body: "Data protection, cybersecurity basics, and operational risk management for modern veterinary clinics.",
    href: "/events",
  },
  {
    icon: "target",
    title: "Growth Strategy",
    body: "Expansion timing, succession planning, and the strategic thinking that separates growing practices from stuck ones.",
    href: "/marketing",
  },
];

/* ─── Registration landing-page data ─── */

export const registrationEvents = [
  {
    slug: "scaling-selling-independent-vet-practices-growing",
    title: "Scaling Without Selling: How Independent VET Practices Are Growing in a Post-Consolidation Market",
    subtitle: "Veterinary Ownership & Leadership Panel",
    date: "2026-06-10T20:00:00-04:00",
    durationMinutes: 60,
    platform: "Zoom",
    format: "Panel + Live Q&A",
    seatsTotal: 100,
    seatsRemaining: 44,
    confirmation: "2 Speakers Confirmed So Far",
    image: withBasePath("/assets/panels/panel-01.jpg"),
    description: "Scaling Without Selling: How Independent VET Practices Are Growing in a Post-Consolidation Market. A live veterinary panel with industry experts sharing real-world strategies you can apply in your practice right away — plus live audience Q&A.",
    bonusCallout:
      "Attendees will be eligible for a special strategy meeting from VBI after the event",
    discussionPoints: [
      { title: "Why the post-consolidation window favors independents", description: "The 2026 market reset, valuation compression, and what corporate-weary clients and associates are now looking for" },
      { title: "Growth paths that don't require selling", description: "Adding a second location, buying a competitor's practice, partnering with associates for equity, and building a small group without a corporate partner" },
      { title: "Competing with corporate groups on talent", description: "How independents win associates and techs by offering what PE-owned groups can't — autonomy, equity path, and real culture" },
      { title: "Building a practice that could sell — even if you never do", description: "EBITDA discipline, systems, and documentation that raise valuation and make the practice easier to run" },
      { title: "Red flags in the 2026 deal market", description: "Earnout traps, equity rollover pitfalls, and the warning signs owners wish they'd spotted before signing" },
    ],
    audience: [
      { icon: "🏥", title: "Practice Owners", description: "Who want sustainable growth and a clear plan for 2026 without more ad spend." },
      { icon: "📈", title: "Practice Managers", description: "Looking to strengthen operations, retention, and the client experience." },
      { icon: "🤝", title: "Associates & Team Leads", description: "Who want practical tools they can bring back to the team right away." },
    ],
    speakers: [
      { name: "Peter Noël", role: "Veterinary Radiologist, Founder · Parallax Teleradiology", bio: "" },
      { name: "Dr. Mark de Wolde DVM MRCVS", role: "Co-Founder, myVETgroup & NxVET | Operating Partner, RoyalVET | Principal, iDVM Consulting · myVETgroup, NxVET, RoyalVET, iDVM Consulting", bio: "With over 30 years of deep involvement in the veterinary, pharmaceutical, real-estate, and design build sectors, my diverse skill set encompasses areas such as veterinary clinical practice, regulations, business development, and business operations. I have been recognized for my achievements with the Business Person of the Year Award by the City of Kingston and the Award of Merit from the Ontario Veterinary Medical Association.\r\n\r\nWhile supporting veterinary colleagues in succession planning and assisting associates and platforms in developing exciting new ventures, I am contributing to the progressive transformations in Veterinary Medicine. These initiatives form part of my broader effort to ensure a sustainable and forward-thinking future for the field.\r\n\r\nAdditionally, I have played a significant role in the field of veterinary technology, collaborating with academic institutions to advance wearable and implantable medical devices. This involvement demonstrates my commitment to innovation and the future of veterinary medicine.\r\n\r\nI am also actively involved in the development and operation of hybrid veterinary hospitals. These establishments prioritize the well-being of staff to combat burnout, while focusing on exceptional patient care and client service. This approach reflects my dedication to enhancing the veterinary profession and supporting its practitioners." },
    ],
    testimonialIndices: [0, 1, 2],
    registrationNote:
      "Registration is free. All registrants receive the replay link within 24 hours.",
  },
  {
    slug: "best-people-leave-top-veterinary-practices",
    title: "Why Your Best People Leave — and How Top Veterinary Practices Make Them Stay",
    subtitle: "Veterinary Ownership & Leadership Panel",
    date: "2026-06-17T20:00:00-04:00",
    durationMinutes: 60,
    platform: "Zoom",
    format: "Panel + Live Q&A",
    seatsTotal: 100,
    seatsRemaining: 23,
    confirmation: "All 3 Speakers Confirmed",
    image: withBasePath("/assets/panels/panel-02.jpg"),
    description: "Why Your Best People Leave — and How Top Veterinary Practices Make Them Stay. A live veterinary panel with industry experts sharing real-world strategies you can apply in your practice right away — plus live audience Q&A.",
    bonusCallout:
      "Attendees will be eligible for a special strategy meeting from VBI after the event",
    discussionPoints: [
      { title: "The real reasons people leave", description: "what exit interviews miss and what top practices actually hear" },
      { title: "Beyond pay", description: "the other 30% of retention — schedule, growth path, recognition, and leadership quality" },
      { title: "Stay interviews, not exit interviews", description: "catching disengagement before the resignation letter" },
      { title: "Career ladders for techs and support staff", description: "turning scope-of-practice expansion into a retention lever" },
    ],
    audience: [
      { icon: "🏥", title: "Practice Owners", description: "Who want sustainable growth and a clear plan for 2026 without more ad spend." },
      { icon: "📈", title: "Practice Managers", description: "Looking to strengthen operations, retention, and the client experience." },
      { icon: "🤝", title: "Associates & Team Leads", description: "Who want practical tools they can bring back to the team right away." },
    ],
    speakers: [
      { name: "Desmond Xavier Coates, DVM", role: "Medical Director · Mission Pet Health", bio: "" },
      { name: "Dr. Jason Epstein", role: "Chief Veterinary Officer & Founder · CatsOnly Veterinary Services", bio: "Dr. Jason Epstein, DVM (University of Georgia, 2012), is Chief Veterinary Officer and founding leadership team member at CatsOnly Veterinary Services, where he leads clinical standards, medical strategy, and the multi-hospital care model for one of the country's growing feline-only practice networks. Prior to CatsOnly, he served as Executive Medical Director at My Pets Wellness, where he helped grow the organization from a small acquisition group into a multi-state veterinary network — building clinician mentorship pathways, operational systems, and emotionally intelligent team cultures along the way. His work centers on advancing species-specific feline medicine while creating systems that support emotional safety, strengthen trust with Caregivers, and make veterinary medicine more sustainable for clinical teams. Dr. Epstein is passionate about redefining modern veterinary leadership through empathy, communication, and intentional culture design." },
      { name: "Jen Bruce", role: "Hospital Director · Toronto Animal Health Partners Emergency and Specialty Hospital", bio: "" },
    ],
    testimonialIndices: [0, 1, 2],
    registrationNote:
      "Registration is free. All registrants receive the replay link within 24 hours.",
  },
  {
    slug: "cost-based-anger-veterinary-clients",
    title: "Cost-Based Anger in Veterinary Clients",
    subtitle: "Veterinary Client Experience Panel",
    date: "2026-06-24T20:00:00-04:00",
    durationMinutes: 60,
    platform: "Zoom",
    format: "Panel + Live Q&A",
    seatsTotal: 100,
    seatsRemaining: 31,
    confirmation: "All 3 Speakers Confirmed",
    image: withBasePath("/assets/panels/panel-03.jpg"),
    description: "Cost-Based Anger in Veterinary Clients. A live veterinary panel with industry experts sharing real-world strategies you can apply in your practice right away — plus live audience Q&A.",
    bonusCallout:
      "Attendees will be eligible for a special strategy meeting from VBI after the event",
    discussionPoints: [
      { title: "Understand the psychology behind cost-based anger and financial friction", description: "Understand the psychology behind cost-based anger and financial friction" },
      { title: "Define de-escalation language boundaries for team safety", description: "Define de-escalation language boundaries for team safety" },
      { title: "Set clear boundaries to protect team mental health without losing compassion", description: "Set clear boundaries to protect team mental health without losing compassion" },
      { title: "Develop front-desk protocols for expectation-setting and trust messaging", description: "Develop front-desk protocols for expectation-setting and trust messaging" },
    ],
    audience: [
      { icon: "🏥", title: "Practice Owners", description: "Who want sustainable growth and a clear plan for 2026 without more ad spend." },
      { icon: "📈", title: "Practice Managers", description: "Looking to strengthen operations, retention, and the client experience." },
      { icon: "🤝", title: "Associates & Team Leads", description: "Who want practical tools they can bring back to the team right away." },
    ],
    speakers: [
      { name: "Erika Lee", role: "Director of Phone Sales and Retention · Trupanion", bio: "Erica began her journey in the contact center nearly 14 years ago on the phones in Member Experience and has grown through numerous roles prior to her current role as Senior Director of Phone Sales and Retention. Along the way, she’s remained passionate about improving pets’ quality of life while creating meaningful, fulfilling experiences for our team members. As a dog (and cat) LOVER and mom of three, she brings heart and unwavering advocacy to our mission, vision, and values." },
      { name: "Amelia Knight Pinkston, VMD", role: "Founder, Integrative Health & Life Coach, Veterinarian · Life Boost with Amelia", bio: "Dr. Amelia Knight Pinkston is a veterinarian, integrative health and life coach, and speaker who helps veterinary professionals and teams shift out of survival mode for sustainable success that feels good inside and out. Her work focuses on identifying the root drivers of stress, burnout, and tension—and turning them into strategic, sustainable solutions that improve communication, trust, well-being, and profitability. As the founder of Life Boost with Amelia, she combines over a decade of clinical experience with neuroscience and a mind-body approach to support the well-being of veterinary teams, pet owners, and patients—through RACE-approved coaching programs and resources, leadership tools, and her podcas" },
      { name: "Bob Murtaugh, DVM, MS", role: "Veterinary Specialist, Educator, Consultant · Vet Vital Sign Consulting", bio: "Former Dean, Rocky Vista University College of Veterinary Medicine\n\nChair, Coalition for the Veterinary Professional Associates\n\nDiplomate, American College of Veterinary Internal Medicine (DACVIM);\nDiplomate, American College of Veterinary Emergency and Critical Care (DACVECC);\nFellow, American College of Critical Care Medicine (FCCM)" },
    ],
    testimonialIndices: [0, 1, 2],
    registrationNote:
      "Registration is free. All registrants receive the replay link within 24 hours.",
  },
  {
    slug: "veterinary-end-life-playbook-supporting-pet",
    title: "The Veterinary End-of-Life Playbook: Supporting Pet Owners Through Grief and Protecting Your Team",
    subtitle: "Veterinary Client Experience Panel",
    date: "2026-07-08T20:00:00-04:00",
    durationMinutes: 60,
    platform: "Zoom",
    format: "Panel + Live Q&A",
    seatsTotal: 100,
    seatsRemaining: 52,
    confirmation: "2 Speakers Confirmed So Far",
    image: withBasePath("/assets/panels/panel-04.jpg"),
    description: "The Veterinary End-of-Life Playbook: Supporting Pet Owners Through Grief and Protecting Your Team. A live veterinary panel with industry experts sharing real-world strategies you can apply in your practice right away — plus live audience Q&A.",
    bonusCallout:
      "Attendees will be eligible for a special strategy meeting from VBI after the event",
    discussionPoints: [
      { title: "Anticipatory grief in the exam room", description: "guiding pet owners through quality-of-life conversations and end-of-life decisions without rushing or distancing" },
      { title: "Building euthanasia protocols that respect everyone", description: "what \"good\" looks like for the pet, the family, and your clinical team" },
      { title: "The hidden cost of compassion fatigue", description: "how unprocessed grief drives turnover, burnout, and quiet quitting in veterinary teams" },
      { title: "Practice-level support systems", description: "debriefs, peer support, scheduling buffers, and culture practices that actually move the needle" },
      { title: "Beyond the goodbye", description: "client grief support — what practices can offer (or refer) to grieving families, and why it builds long-term loyalty" },
    ],
    audience: [
      { icon: "🏥", title: "Practice Owners", description: "Who want sustainable growth and a clear plan for 2026 without more ad spend." },
      { icon: "📈", title: "Practice Managers", description: "Looking to strengthen operations, retention, and the client experience." },
      { icon: "🤝", title: "Associates & Team Leads", description: "Who want practical tools they can bring back to the team right away." },
    ],
    speakers: [
      { name: "Claire Chew MA", role: "Systemic Change Agent in Veterinary Wellness and Pet Loss Education · Claire Chew Coaching and Consulting", bio: "The sudden loss of Claire's beloved soul dog inspired her to pivot her career into one serving the animal companions. For 18+ years, she's been at the intersection of grief, burnout, and emotional sustainability in animal health, helping veterinary hospitals, leaders, and the families they serve navigate the emotional toll of caregiving and loss before it becomes unmanageable. You can find her at clairechew.com" },
      { name: "Christine Naoum Long", role: "Founder · TelaVets", bio: "" },
    ],
    testimonialIndices: [0, 1, 2],
    registrationNote:
      "Registration is free. All registrants receive the replay link within 24 hours.",
  },
  {
    slug: "4-year-visit-decline-reversing-pet",
    title: "The 4-Year Visit Decline — Reversing the Pet-Owner Pullback Without a Price War",
    subtitle: "Veterinary Client Experience Panel",
    date: "2026-07-15T20:00:00-04:00",
    durationMinutes: 60,
    platform: "Zoom",
    format: "Panel + Live Q&A",
    seatsTotal: 100,
    seatsRemaining: 18,
    confirmation: "2 Speakers Confirmed So Far",
    image: withBasePath("/assets/panels/panel-05.jpg"),
    description: "The 4-Year Visit Decline — Reversing the Pet-Owner Pullback Without a Price War. A live veterinary panel with industry experts sharing real-world strategies you can apply in your practice right away — plus live audience Q&A.",
    bonusCallout:
      "Attendees will be eligible for a special strategy meeting from VBI after the event",
    discussionPoints: [
      { title: "Why visits are down ~3% for the fourth straight year while prices climbed 6.57%", description: "and what that compounding gap is signaling about client trust" },
      { title: "The 48% expansion in interval-between-visits", description: "what's actually being skipped (wellness, dental, diagnostics) and what it costs your forecast" },
      { title: "Reframing pricing conversations", description: "transparency, value framing, and care plans that pull elective spend back through the door" },
      { title: "Bounce-back protocols", description: "lapsed-client outreach scripts, payment plans, and wellness packages that re-anchor the relationship" },
      { title: "Building a recession-resilient revenue mix", description: "shifting from per-visit dependency to subscription, retention, and lifetime-value math" },
    ],
    audience: [
      { icon: "🏥", title: "Practice Owners", description: "Who want sustainable growth and a clear plan for 2026 without more ad spend." },
      { icon: "📈", title: "Practice Managers", description: "Looking to strengthen operations, retention, and the client experience." },
      { icon: "🤝", title: "Associates & Team Leads", description: "Who want practical tools they can bring back to the team right away." },
    ],
    speakers: [
      { name: "Katerina Svigos", role: "Practice Owner · TrueVETS Veterinary Hospital", bio: "Katerina Svigos is the Founder and Owner of TrueVets Veterinary Hospitals in FL, where she is dedicated to delivering gold-standard veterinary care through an integrative approach that combines both Eastern and Western medicine. By leading veterinary professionals and specialists, she ensures patients receive comprehensive, holistic treatment focused on long-term wellness and compassionate care. As a Doctor of Veterinary Medicine candidate at St. Matthew’s University, Katerina is committed to expanding the TrueVets platform nationwide to provide accessible, affordable, and high-quality veterinary medicine to communities across the country." },
      { name: "Kelly Barone", role: "Hospital Manager · National Veterinary Associates", bio: "With over 17 years of diverse experience in the animal care industry, I am a seasoned veterinary hospital manager dedicated to creating compassionate environments for both pets and their families. My journey has taken me through various roles, including regional animal control, professional pet grooming, and retail. For the past 10 years, I have been dedicated to veterinary leadership. \r\n\r\nI believe that operational efficiency and heartfelt service go hand in hand. I am committed to fostering a culture of compassion and excellence within my teams, empowering them to deliver the highest standard of care while keeping them highly engaged! \r\n\r\nAs a proud Peer Development Partner, I have had the privilege of mentoring fellow hospital managers, guiding them through challenges and celebrating their successes. My role as a Change Champion has allowed me to promote positive transformations during company-wide initiatives, while my position as a Divisional Wellness Mentor has focused on enhancing wellness plan enrollment and supporting hospitals in our division.\r\n\r\nBeyond management, I am a Credentialed Usui Reiki Master and Animal Practitioner, dedicated to promoting healing and wellness. This unique skill set allows me to create a comforting atmosphere for both pets and their owners." },
    ],
    testimonialIndices: [0, 1, 2],
    registrationNote:
      "Registration is free. All registrants receive the replay link within 24 hours.",
  },
];

export const registrationStats = [
  { value: 2200, suffix: "+", label: "Practices Coached" },
  { value: 188, suffix: "", label: "Countries Reached" },
  { value: 470, suffix: "+", label: "Podcast Episodes" },
  { value: 10000, suffix: "+", label: "Vets in Community" },
];
