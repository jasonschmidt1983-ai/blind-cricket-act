export type PageData = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  sections: { title: string; body: string; items?: string[] }[];
};

export const facebookUrl = "https://www.facebook.com/blindcricketactofficial/";

export const navItems: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Play Cricket", href: "/play-cricket" },
  { label: "Programs & Pathways", href: "/programs" },
  { label: "Fixtures & Results", href: "/fixtures" },
  { label: "News & Stories", href: "/news" },
  { label: "Support Us", href: "/support" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const images = {
  batting: {
    image: "/images/act-community-session.webp",
    alt: "Blind Cricket ACT players and community participants gathered outdoors in blue-and-yellow and green shirts.",
  },
  action: {
    image: "/images/act-action.webp",
    alt: "Two ACT players in blue and yellow running on a cricket field at the 2026 inclusion championships.",
  },
  team: {
    image: "/images/act-team.webp",
    alt: "ACT blind cricket team standing together.",
  },
  women: {
    image: "/images/act-members.webp",
    alt: "Three Blind Cricket ACT members together wearing blue-and-yellow club polo shirts.",
  },
  community: {
    image: "/images/act-current-team.webp",
    alt: "Blind Cricket ACT team gathered on the grass in blue-and-yellow cricket uniforms.",
  },
};

type ImageKey = keyof typeof images;
function page(
  title: string,
  eyebrow: string,
  description: string,
  image: ImageKey,
  sections: PageData["sections"]
): PageData {
  return { title, eyebrow, description, ...images[image], sections };
}

export const pages: Record<string, PageData> = {
  "/play-cricket": page(
    "Cricket starts with a conversation.",
    "Play cricket",
    "No experience needed. Discover a game shaped by sound, teamwork and trust, with a community for people who are blind or have low vision.",
    "batting",
    [
      {
        title: "A different way to play. The same love of cricket.",
        body: "Blind cricket uses an audible ball and adapted play to make batting, bowling and fielding accessible to people with different levels of vision. Communication is part of the game: listening, calling and working together all matter.",
      },
      {
        title: "Find your starting point",
        body: "Whether you are returning to sport or holding a bat for the first time, you can ask about a come-and-try opportunity in Canberra and the surrounding region.",
        items: [
          "Explore what to expect at your first session.",
          "Ask about current training opportunities and locations.",
          "Discuss access arrangements before attending.",
          "Learn about membership and the next steps to play.",
        ],
      },
    ]
  ),
  "/play-cricket/get-started": page(
    "Your first step onto the field.",
    "Get started",
    "You do not need to know the rules or have played cricket before. Start by asking about the next opportunity to give it a go.",
    "batting",
    [
      {
        title: "Before you come",
        body: "Contact Blind Cricket ACT through its official Facebook page to confirm the next session, venue and who to meet. Dates and locations are not yet published here, so please check before travelling.",
        items: [
          "Ask whether the session is suitable for a first-time player.",
          "Confirm what clothing, footwear and equipment to bring.",
          "Ask about getting to the ground and meeting someone on arrival.",
          "Check arrangements if a parent, carer or support person will attend.",
        ],
      },
      {
        title: "Start at your own pace",
        body: "A first session is a chance to learn how the audible ball works, explore the basics and meet the cricket community. Ask for explanations or time to get familiar with the space. You do not have to arrive match-ready.",
      },
      {
        title: "Keep the first message simple",
        body: "A message such as ‘I’m interested in trying blind cricket. What is the next step?’ is enough to begin. Do not send medical records, classification documents or other sensitive information through Facebook.",
      },
    ]
  ),
  "/play-cricket/register-interest": page(
    "Interested? Let’s talk cricket.",
    "Register your interest",
    "Ask about playing, a come-and-try session or getting involved. Your first step is an enquiry, not an online registration.",
    "team",
    [
      {
        title: "Make an enquiry",
        body: "Use the official Blind Cricket ACT Facebook page to ask about the opportunity that interests you. You can begin with a general question about playing, volunteering or a community session.",
      },
      {
        title: "What happens next",
        body: "Ask the club to confirm current opportunities, the relevant contact and how to proceed. Sending a Facebook message does not register you as a player or reserve a place at a session.",
      },
      {
        title: "Protect your personal information",
        body: "This website has no registration form. Please do not send medical information, identity documents, a child’s personal details or payment information through a social-media message. If formal registration is needed, ask how the club handles it securely.",
      },
    ]
  ),
  "/play-cricket/training": page(
    "Find your next session.",
    "Training & locations",
    "Explore training in Canberra and the surrounding region, and ask about the Albury program. Confirm the details before you travel.",
    "action",
    [
      {
        title: "Training details are being confirmed",
        body: "Current session dates, times and venues are not yet published on this website. Contact the club for the latest arrangements, including whether a come-and-try session is available.",
      },
      {
        title: "Plan a comfortable arrival",
        body: "A little preparation can make the first visit easier. Ask about the ground entrance, transport options, accessible facilities and where to meet the group.",
        items: [
          "Confirm the address and a meeting point.",
          "Check what to bring and whether equipment is available.",
          "Ask about access support and companion arrangements.",
          "Check how weather-related changes will be communicated.",
        ],
      },
      {
        title: "Regional cricket",
        body: "The Albury program focuses on local players, coaches and regional development, with consistent summer training as a program aim. Contact the club to confirm the current Albury schedule.",
      },
    ]
  ),
  "/play-cricket/membership": page(
    "Know the next steps to join.",
    "Membership & fees",
    "Find out about membership directly with Blind Cricket ACT. Current fees and registration arrangements need to be confirmed with the club.",
    "team",
    [
      {
        title: "Membership information",
        body: "This website does not accept membership applications or payments. Ask the club about the current membership process, what is included and any requirements that apply to your participation.",
      },
      {
        title: "Ask before committing",
        body: "There is no published fee schedule here. The club can confirm the relevant costs and whether any support options are available.",
        items: [
          "What are the current membership and playing fees?",
          "Are there separate equipment, uniform or competition costs?",
          "What payment arrangements, if any, are available?",
          "How is formal registration completed securely?",
        ],
      },
      {
        title: "Registration and privacy",
        body: "Do not send classification documents, medical details, identity records or bank-card information through Facebook. Use the official page only to ask for the appropriate next step and a secure registration channel.",
      },
    ]
  ),
  "/play-cricket/accessibility": page(
    "Make the game work for you.",
    "Accessibility & support",
    "Every player brings different experience and access needs. Ask about practical arrangements so you can feel more prepared to take part.",
    "community",
    [
      {
        title: "Talk about what helps",
        body: "You can ask general questions about the session environment and available support without sharing a diagnosis or medical history. If a more private conversation is needed, ask the club for an appropriate contact.",
      },
      {
        title: "Useful questions for your first visit",
        body: "The club has not yet published a venue access guide or a list of available adjustments. Confirm the arrangements you need before attending.",
        items: [
          "Can someone meet me at an agreed point?",
          "How will the ground and activities be explained?",
          "What are the arrangements for a support person?",
          "What accessible facilities are available at the venue?",
          "How can I receive session information in a format that works for me?",
        ],
      },
      {
        title: "Learning through sound and communication",
        body: "The audible ball and clear calls are central to blind cricket. Ask for demonstrations, verbal explanations and time to become familiar with the game. Support arrangements should be discussed, not assumed.",
      },
    ]
  ),
  "/play-cricket/faq": page(
    "A few things you might be wondering.",
    "Frequently asked questions",
    "Straightforward answers to help you explore blind cricket and prepare for a first conversation with the club.",
    "batting",
    [
      {
        title: "Do I need cricket experience?",
        body: "No experience is needed to enquire about getting started. Ask about a suitable introductory opportunity and learn the game at your own pace.",
      },
      {
        title: "Who is blind cricket for?",
        body: "Blind cricket is for people who are blind or have low vision. Ask the club about participation options and any eligibility or classification requirements for particular competitions.",
      },
      {
        title: "How is the game adapted?",
        body: "Blind cricket uses an audible ball and adapted rules. Listening and clear communication help players locate the ball and work together. Your session leader can explain the format you will be playing.",
      },
      {
        title: "Where and when is training?",
        body: "Current dates, times and venues are being confirmed. Contact the official Blind Cricket ACT Facebook page before travelling. You can also ask about the Albury program.",
      },
      {
        title: "What should I bring?",
        body: "Confirm clothing, footwear and equipment with the club before your first session. Do not assume that a particular item of equipment will be provided.",
      },
      {
        title: "Can a parent, carer or support person come?",
        body: "Ask about companion and supervision arrangements when confirming the session. Parents and carers can enquire about suitable opportunities for a young player without sharing the child’s private details online.",
      },
      {
        title: "How much does it cost?",
        body: "Fees are not yet published here. Ask about membership, any session or competition costs and whether support options are available.",
      },
      {
        title: "Can I register or pay on this website?",
        body: "No. This is a public information website, with no registration or payment facilities. Use the official Facebook page for a general enquiry and ask for the appropriate secure next step.",
      },
      {
        title: "How do I raise a safety concern?",
        body: "If someone is in immediate danger in Australia, call 000. The Report a Safety Issue page explains how to find national integrity reporting information. Do not post private allegations or sensitive details on social media.",
      },
    ]
  ),
  "/programs": page(
    "More ways into the game.",
    "Programs & pathways",
    "From a first experience to representative ambitions, explore opportunities built around participation, connection and learning.",
    "community",
    [
      {
        title: "Find an opportunity that fits",
        body: "Blind Cricket ACT’s program focus includes regional development, young players, women, multicultural communities and community organisations. Explore the pages below, then ask which opportunities are currently available.",
      },
      {
        title: "Community first",
        body: "Playing is one way to belong. Schools, community groups and organisations can also ask about blind cricket experiences, accessibility and inclusion workshops, and team-building activities.",
      },
      {
        title: "A pathway, not a promise",
        body: "Players can progress from trying the game to learning, training and competing. Representative opportunities depend on eligibility, available competitions and selection; participation does not guarantee a place in a team.",
      },
    ]
  ),
  "/programs/albury": page(
    "Regional cricket. Local connection.",
    "Albury program",
    "A regional development focus that brings local players and coaches into the blind cricket community.",
    "action",
    [
      {
        title: "Building consistency in the region",
        body: "The Albury program focuses on local players and coaches, with consistent summer training as a program aim. It provides a regional starting point for people interested in blind cricket.",
      },
      {
        title: "Check the current arrangements",
        body: "Session dates, venues, coaching contacts and availability have not yet been published here. Ask Blind Cricket ACT for the current Albury program details before making travel plans.",
      },
      {
        title: "New to the game?",
        body: "Ask whether an upcoming session is suitable for a beginner, what to bring and what access arrangements are available. No previous cricket experience is needed to start a conversation.",
      },
    ]
  ),
  "/programs/juniors": page(
    "A first love of the game.",
    "Junior program",
    "A starting point for families exploring blind cricket for young people who are blind or have low vision.",
    "batting",
    [
      {
        title: "Explore suitable opportunities",
        body: "Parents and carers can ask about beginner-friendly activities, learning the basics and meeting other players. Current age groups, session availability and supervision arrangements need to be confirmed with the club.",
      },
      {
        title: "Questions for families",
        body: "Before attending, find out how the session is organised and what the young player can expect.",
        items: [
          "Which ages and experience levels is the session intended for?",
          "What are the parent or carer attendance requirements?",
          "Who will lead the session and where should we meet?",
          "What equipment and access arrangements are available?",
        ],
      },
      {
        title: "Keep children’s information private",
        body: "A general enquiry is enough to begin. Do not send a child’s date of birth, medical records, home address or other private information through Facebook. Ask for an appropriate secure channel if formal registration is required.",
      },
    ]
  ),
  "/programs/women-inclusion": page(
    "Belonging belongs to everyone.",
    "Women & inclusion",
    "Explore participation and development opportunities for women who are blind or have low vision, whether you are new to cricket or ready for a new challenge.",
    "women",
    [
      {
        title: "Find your way to play",
        body: "Women are part of the wider blind cricket community, from introductory participation to representative cricket. Ask Blind Cricket ACT about current local opportunities and the support available to get started.",
      },
      {
        title: "A welcoming starting point",
        body: "Confidence grows through clear communication, time to learn and a sense of belonging. You can ask about the session format, the group and any practical access arrangements before attending.",
      },
      {
        title: "Explore the next step",
        body: "Program dates and team selection information are not published here. Ask about current participation options and how development or representative opportunities work. Selection is not guaranteed.",
      },
    ]
  ),
  "/programs/multicultural": page(
    "Different backgrounds. A shared game.",
    "Multicultural program",
    "Building opportunities for multicultural communities through inclusive cricket, communication and connection.",
    "community",
    [
      {
        title: "Cricket as a meeting place",
        body: "The multicultural program aims to open opportunities for people from different cultural backgrounds to experience inclusive cricket. You do not need previous cricket knowledge to enquire about participating.",
      },
      {
        title: "Program support",
        body: "The multicultural program is supported through grants from PACE Farms. This support is part of the program’s focus on building opportunities through inclusive cricket.",
      },
      {
        title: "Bring your community into the conversation",
        body: "Community organisations can ask about current activities, group participation and communication needs. Session dates, venues and language support arrangements need to be confirmed directly with Blind Cricket ACT.",
      },
    ]
  ),
  "/programs/community": page(
    "Inclusion beyond the boundary.",
    "Community programs",
    "Learn about accessibility through blind cricket: an outdoor team experience built around listening, communication and working together.",
    "community",
    [
      {
        title: "For groups that want to connect",
        body: "Schools, community groups, organisations and corporate teams can enquire about an experience that combines cricket with a conversation about inclusion.",
      },
      {
        title: "Explore the possibilities",
        body: "Ask the club which activities are currently available and how they could suit your group.",
        items: [
          "Blind cricket experiences.",
          "Accessibility and inclusion workshops.",
          "Outdoor team-building sessions.",
          "Community engagement activities.",
        ],
      },
      {
        title: "Plan an experience with purpose",
        body: "Start with your group’s interests and the kind of learning you hope to encourage. Availability, venue, group size, facilitation, access arrangements and costs all need to be confirmed. No bookings are taken through this website.",
      },
      {
        title: "Experience is a starting point",
        body: "Playing with an audible ball can help a group practise communication and teamwork. It does not reproduce someone else’s lived experience. Meaningful inclusion also means listening to people who are blind or have low vision and removing barriers to participation.",
      },
    ]
  ),
  "/programs/pathways": page(
    "Your game can keep growing.",
    "Player pathways",
    "Try. Learn. Train. Compete. Represent. Explore a pathway that values development and what you contribute to a team.",
    "action",
    [
      {
        title: "Progress at your own pace",
        body: "Some players want a social connection and a regular activity. Others want to test their skills in competition. Both are valuable reasons to play; you do not have to pursue representative cricket to belong.",
      },
      {
        title: "Representative opportunities",
        body: "Ask the club about the current route into competitive and representative cricket. Eligibility, classification requirements, selection processes and available competitions should be confirmed before making plans.",
      },
    ]
  ),
  "/fixtures": page(
    "Follow the cricket.",
    "Fixtures & results",
    "Training, matches and results will be listed here as details are confirmed. For now, check with the club before planning a visit.",
    "action",
    [
      {
        title: "Before you head to the ground",
        body: "Confirm the date, start time, venue and any changes through the official Blind Cricket ACT Facebook page. Current fixtures and match results are not yet published here.",
      },
    ]
  ),
  "/news": page(
    "Get to know the game.",
    "News & stories",
    "Practical guides to blind cricket, taking your first step and building a more inclusive community. A useful place to begin, on and off the field.",
    "batting",
    [
      {
        title: "Stories to help you take part",
        body: "These undated guides introduce the game and the community around it. Club announcements and match reports will be added when confirmed information is available.",
      },
    ]
  ),
  "/support": page(
    "Help more people find their game.",
    "Support us",
    "Give your time, explore program support or start a sponsorship conversation. There is more than one way to contribute to inclusive cricket.",
    "team",
    [
      {
        title: "Make a practical contribution",
        body: "A strong cricket community depends on people who care about participation. Ask about volunteer needs, program support and ways your organisation could get involved.",
      },
      {
        title: "Start with a conversation",
        body: "Current volunteer roles, donation arrangements and sponsorship opportunities need to be confirmed with the club. This website does not accept applications, donations or payments.",
      },
    ]
  ),
  "/support/volunteer": page(
    "Bring your time. Be part of the team.",
    "Volunteer",
    "Help people connect through cricket. Ask where your time and skills could make a useful contribution.",
    "community",
    [
      {
        title: "Find the right role",
        body: "Contact Blind Cricket ACT to ask about current volunteer needs. You can begin with a general question about helping at cricket activities, community programs or club events; no role availability is promised here.",
      },
      {
        title: "Know what is involved",
        body: "Before committing, ask about responsibilities and how volunteers are supported.",
        items: [
          "What tasks are needed and what is the time commitment?",
          "What experience, training or supervision is required?",
          "Are any screening or working-with-children requirements applicable?",
          "Who is the contact for the role?",
        ],
      },
      {
        title: "A general enquiry is enough",
        body: "There is no volunteer application form on this website. Do not send identity documents or screening records through Facebook. Ask the club for a secure process if these are needed.",
      },
    ]
  ),
  "/support/donate": page(
    "Support participation, thoughtfully.",
    "Donation enquiries",
    "Interested in helping inclusive cricket? Ask the club about its current priorities and whether an authorised donation option is available.",
    "team",
    [
      {
        title: "Check the official arrangements",
        body: "No verified donation link, bank details or fundraising campaign has been published here. Use the official Facebook page to ask whether donations are currently accepted and how to confirm an authorised payment channel.",
      },
      {
        title: "Understand your contribution",
        body: "Ask how support would be used and what acknowledgement or receipt is available. Tax deductibility has not been established on this website, so do not assume a contribution is tax-deductible.",
      },
      {
        title: "Other ways to help",
        body: "If giving money is not the right option for you, explore volunteering or a sponsorship enquiry. Never send payment-card or banking information in a social-media message.",
      },
    ]
  ),
  "/support/sponsor": page(
    "Back a more inclusive game.",
    "Sponsorship enquiries",
    "Start a conversation about helping Blind Cricket ACT build opportunities to play, learn and connect.",
    "action",
    [
      {
        title: "Explore a shared purpose",
        body: "Organisations can ask about supporting participation, community activities or program development. Begin with what interests your organisation and ask what the club currently needs.",
      },
      {
        title: "Agree the details together",
        body: "Sponsorship packages, pricing, recognition and benefits have not yet been published. Any arrangement should be confirmed directly with the club; this website does not promise endorsement or a commercial partnership.",
      },
      {
        title: "A clear starting point",
        body: "Use the official Facebook page for an initial enquiry and ask for the appropriate sponsorship contact. No sponsor application or payment is collected here.",
      },
    ]
  ),
  "/about": page(
    "More than a game. A community.",
    "About Blind Cricket ACT",
    "Blind cricket is more than meets the eye. It is sound, teamwork and trust—and a way to connect in Canberra and the surrounding region.",
    "team",
    [
      {
        title: "Our purpose",
        body: "Blind Cricket ACT is about creating opportunities for people who are blind or have low vision to participate in cricket and belong to a sporting community. The game brings together learning, activity and the shared experience of being part of a team.",
      },
      {
        title: "People make the game",
        body: "Players, families, carers, volunteers, schools and community organisations all have a place in the conversation. You can start as a beginner, enquire on behalf of a group or explore a way to support participation.",
      },
      {
        title: "Connection across the region",
        body: "The website brings together information about playing, regional development in Albury, junior and women’s participation, multicultural inclusion and community programs. Current opportunities and operational details should be confirmed with the club.",
      },
      {
        title: "A game worth discovering",
        body: "An audible ball changes how cricket is played, not the joy of a well-timed shot or a team effort. Clear communication and trust are at the heart of the experience.",
      },
    ]
  ),
  "/contact": page(
    "Let’s talk cricket.",
    "Contact",
    "For general enquiries, use the official Blind Cricket ACT Facebook page. Ask about playing, volunteering, programs or supporting the club.",
    "community",
    [
      {
        title: "One official starting point",
        body: "The Blind Cricket ACT official Facebook page is the published contact channel for general enquiries. Ask for the current session details or the relevant person to speak with. No response time is promised.",
      },
      {
        title: "Keep your message general",
        body: "A short question about what you are interested in is enough. Do not include medical records, identity documents, payment details or private information about a child. If a private conversation is needed, ask for an appropriate secure channel.",
      },
      {
        title: "If Facebook is not accessible to you",
        body: "An alternative email address or telephone number has not yet been published here. A trusted person may be able to help make a general enquiry on your behalf without sharing sensitive information.",
      },
    ]
  ),
  "/governance": page(
    "Trust starts with clear information.",
    "Governance & policies",
    "Find public national integrity information and understand which club documents are still awaiting publication.",
    "team",
    [
      {
        title: "Club documents",
        body: "Approved club governance documents, a constitution, a code of conduct and privacy or safeguarding policies have not been supplied for publication. They will be linked here when approved versions are available. This page is not a substitute for those documents.",
      },
      {
        title: "Respect on and off the field",
        body: "Respectful communication, listening to access needs and taking concerns seriously help make sport welcoming. These are participation principles, not a published club code, a legal waiver or a statement of disciplinary procedures.",
      },
      {
        title: "National integrity information",
        body: "Blind Sports Australia publishes information about the National Integrity Framework. Use the public source below to understand the framework and find current reporting guidance. The source explains the matters and processes it covers.",
      },
    ]
  ),
  "/safety": page(
    "Find the right help for a safety concern.",
    "Report a safety issue",
    "If someone is in immediate danger in Australia, call 000. For other concerns, use the appropriate reporting channel—not a public social-media post.",
    "community",
    [
      {
        title: "Immediate danger",
        body: "Call 000 for police, fire or ambulance in an emergency in Australia. If you can do so safely, move away from immediate danger. This website is not monitored as an emergency service.",
      },
      {
        title: "Integrity and safeguarding concerns",
        body: "Blind Sports Australia’s National Integrity Framework page provides public information and access to reporting guidance. Check that source for the appropriate channel and the types of concerns it handles. Do not submit a report through this website.",
      },
      {
        title: "Club safety contact",
        body: "A dedicated club safety contact has not yet been published here. For a general question about who the appropriate contact is, you may ask the club without describing the incident or identifying the people involved. Do not share allegations, medical information or details about children on Facebook.",
      },
      {
        title: "Keep sensitive details in the right channel",
        body: "Use an appropriate official reporting channel for the details of a concern. This website has no safety-reporting form and does not collect, store or investigate reports.",
      },
    ]
  ),
  "/accessibility": page(
    "Information that is easier to use.",
    "Website accessibility",
    "This website aims to make public cricket information clear and usable with a keyboard, screen reader, larger text or a smaller screen.",
    "batting",
    [
      {
        title: "Practical features",
        body: "The site includes a skip-to-content link, structured headings, descriptive image text and visible keyboard focus. You can use keyboard controls for navigation, expand the FAQ answers and change the news and fixture views. There is no autoplay audio or video.",
      },
      {
        title: "Use the view that works for you",
        body: "Use your browser’s zoom and text controls to enlarge the page. The layout is designed to reflow on smaller screens. The website’s text-size and high-contrast preferences are optional display settings, not a request for personal information.",
      },
      {
        title: "Our accessibility target",
        body: "The accessibility target is WCAG 2.2 AA. Full conformance has not been independently certified. Manual review with NVDA, JAWS, VoiceOver and TalkBack is still needed; automated checks alone cannot establish accessibility for everyone.",
      },
      {
        title: "External pages and feedback",
        body: "Facebook and other linked websites have their own accessibility features and may require an account. If a page is difficult to use, a general enquiry can identify the page and the barrier without including medical or other sensitive details.",
      },
    ]
  ),
  "/photo-credits": page(
    "The people and pictures behind the game.",
    "Photo credits",
    "Real blind cricket photographs help show participation, teamwork and community. Credit does not replace permission to use an image.",
    "team",
    [
      {
        title: "Photo sources",
        body: "Three ACT photographs were supplied directly by Blind Cricket ACT for this website: a community gathering, the current team in blue-and-yellow uniforms, and three club members. The action photograph and additional ACT team photograph were sourced from Cricket ACT’s Blind Cricket page. Individual photographer credits require confirmation.",
      },
      {
        title: "Permission before publication",
        body: "Photo ownership, reuse permission and any required participant consent must be confirmed before final public launch. These photographs are credited as preview sources; their inclusion is not a claim that the publishers or pictured players endorse this website.",
      },
      {
        title: "Images in context",
        body: "The photographs show ACT cricket participation, team connection and club members. The community gathering, current team and club-member photographs were supplied directly by Blind Cricket ACT. A pictured person is not identified as leading a particular program unless the club confirms that role.",
      },
    ]
  ),
  "/news/game-shaped-by-sound": page(
    "A game shaped by sound",
    "Playing · Cricket guide",
    "An audible ball, clear calls and a shared sense of the field. Discover the essentials that make blind cricket a team game.",
    "batting",
    [
      {
        title: "Listen for the ball",
        body: "Blind cricket uses a ball that makes sound. That sound gives players information as they bat, bowl and field. Learning to listen for it is part of discovering the game, alongside the familiar skills of cricket.",
      },
      {
        title: "Communication is a cricket skill",
        body: "Clear calls help people understand what is happening around them. Players work together to share information, respond to the ball and make decisions. Teamwork is something you practise, not something you need to master before you arrive.",
      },
      {
        title: "Adapted play, familiar excitement",
        body: "Rules are adapted for players with different levels of vision. Formats and competition requirements can vary, so ask your session leader to explain the version you are playing. You can still enjoy the challenge of a good delivery, a well-timed shot and contributing to a team.",
      },
      {
        title: "Try it for yourself",
        body: "You do not need previous cricket experience to ask about getting started. Confirm an introductory session, what to bring and any access arrangements through Blind Cricket ACT’s official contact channel.",
      },
    ]
  ),
  "/news/first-session": page(
    "Your first session, explained",
    "Playing · First-session guide",
    "A little preparation helps you focus on the game. Here are the questions worth asking before your first visit.",
    "action",
    [
      {
        title: "Confirm the essentials",
        body: "Before leaving home, check the session date, start time, venue and meeting point with the club. Current session details are not published here, and arrangements can change. Ask how updates will be shared.",
      },
      {
        title: "Ask what you need",
        body: "Check what clothing and footwear are suitable, what equipment to bring and what is available at the session. If you are attending with a parent, carer or support person, confirm those arrangements too.",
      },
      {
        title: "Get familiar with the space",
        body: "Ask how the ground and the activity will be introduced. An agreed meeting point, verbal explanation or time to explore the layout may help. Confirm the support you need rather than assuming it will be available.",
      },
      {
        title: "Give yourself room to learn",
        body: "Your first visit is a starting point, not a test. Ask how the audible ball works, request an explanation when you need one and take time to become familiar with the basics. Being new is a good reason to ask questions.",
      },
      {
        title: "Keep the first enquiry simple",
        body: "You can ask ‘What is the next opportunity to try blind cricket?’ without sending medical or classification documents. If formal registration is needed later, ask for the appropriate secure process.",
      },
    ]
  ),
  "/news/inclusion-beyond-boundary": page(
    "Inclusion beyond the boundary",
    "Inclusion · Community guide",
    "Cricket can start a conversation about accessibility. Lasting inclusion comes from listening, practical changes and shared participation.",
    "community",
    [
      {
        title: "A shared activity opens a conversation",
        body: "Blind cricket gives a group a reason to practise listening, explaining and working together. Schools, community organisations and workplace teams can explore the game as part of a broader conversation about participation.",
      },
      {
        title: "An experience is not someone else’s life",
        body: "Trying an adapted game does not tell you everything about being blind or having low vision. Avoid treating an activity as a simulation of disability. The most useful learning includes listening to people’s own perspectives and respecting individual preferences.",
      },
      {
        title: "Notice the practical barriers",
        body: "Inclusion often begins with straightforward questions: Is the meeting point clear? Can information be read or heard in a useful format? Are instructions understandable? Can someone ask for support without being singled out?",
      },
      {
        title: "Take the learning with you",
        body: "Better communication and accessible planning matter beyond sport. Use what your group learns to review everyday meetings, activities and spaces. Small practical changes can help more people take part.",
      },
      {
        title: "Explore a community experience",
        body: "Ask Blind Cricket ACT about current blind cricket experiences, accessibility or inclusion workshops and team-building opportunities. Availability, format, venue and costs need to be confirmed with the club.",
      },
    ]
  ),
};

export const stories: {
  title: string;
  category: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  readTime: string;
}[] = [
  {
    title: "A game shaped by sound",
    category: "Playing",
    description:
      "How an audible ball, clear calls and teamwork open up the game.",
    href: "/news/game-shaped-by-sound",
    ...images.batting,
    readTime: "2 min read",
  },
  {
    title: "Your first session, explained",
    category: "Playing",
    description:
      "What to ask, what to confirm and how to feel more prepared for your first visit.",
    href: "/news/first-session",
    ...images.action,
    readTime: "2 min read",
  },
  {
    title: "Inclusion beyond the boundary",
    category: "Inclusion",
    description:
      "How shared cricket experiences can start a practical conversation about accessibility.",
    href: "/news/inclusion-beyond-boundary",
    ...images.community,
    readTime: "2 min read",
  },
];
