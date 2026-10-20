/**
 * RCC Workshops: the site's words and pictures as editable fields, with what was on the Bubble site as the defaults.
 * Minnie's edits are stored per key and override these (see get.ts).
 */

export type RccTestimonial = { quote: string; role: string; place: string; image: string };
export type Activity = { title: string; how: string; why: string };

const whyItMatters = {
  "why.title": "Why It Matters",
  "why.link": "Read more about our approach →",
  "why.text":
    "Childhood isn’t always carefree. From school pressures to social challenges, kids today face real stress. Our workshops provide tools to:\n\n- Cope with anxiety and uncertainty\n- Learn from setbacks and “fail well”\n- Shift from “I can’t” to “How can I?”\n- Understand the energy they project into the world\n\nResilience, confidence, and critical thinking are life skills — and they can be taught.",
};

/** A school's story: what they asked for, what we did and what changed. Edited as a list in edit mode. */
export type CaseStudy = { school: string; title: string; summary: string; outcome: string; quote: string; image: string };

export const rccDefaults = {
  "seo.title": "School Resilience Workshops for KS2 & KS3 | RCC Workshops",
  "seo.description":
    "Drama-based workshops for KS2 and KS3 pupils building resilience, confidence and critical thinking. Delivered on-site at schools across the UK and Northern Ireland.",

  "contact.email": "rccworkshopsuk@gmail.com",
  "footer.copyright": "© RCC Workshops",
  "footer.legal": "Privacy & terms",
  "footer.book": "Book a workshop",

  "home.title": "Welcome to RCC Workshops",
  "home.text": "Empowering KS2 & KS3 pupils to thrive in today’s world through resilience, confidence, and critical thinking.",
  "home.button1": "Book a workshop",
  "home.button2": "Learn more",
  "home.image": "/img/rcc/unnamed_4.png",
  "home.trusted": "As trusted by",
  "home.trustedLogo": "/img/rcc/gca_logo.jpg",

  "pillars.eyebrow": "About the workshop",
  "pillars.title": "The Power of a Positive Mindset",
  "pillars.text": "Our workshops help students:",
  "pillars.resilience.title": "Resilience",
  "pillars.confidence.title": "Confidence",
  "pillars.critical.title": "Critical Thinking",
  "pillars.more": "Learn more →",
  "pillars.resilience.text": "Develop resilience through real-life strategies",
  "pillars.resilience.image": "/img/rcc/unnamed_1.png",
  "pillars.confidence.text": "Build confidence in social and academic settings",
  "pillars.confidence.image": "/img/rcc/unnamed_2.png",
  "pillars.critical.text": "Strengthen critical thinking and self-awareness",
  "pillars.critical.image": "/img/rcc/unnamed_3.png",

  "included.eyebrow": "How it works",
  "included.title": "What's included",
  "included.text":
    "Delivered in a safe, fun, and nurturing environment, sessions are tailored to each school’s needs and designed to be impactful, purposeful and age-appropriate.",
  "included.1.title": "Long sessions",
  "included.1.text": "Up to 4 hours of guided activities, trust exercises, and discussion",
  "included.2.title": "Certificates",
  "included.2.text": "Personalised certificates for every participant",
  "included.3.title": "Interactive",
  "included.3.text": "Interactive games, real talk, and moments of reflection",
  "included.4.title": "Bespoke",
  "included.4.text": "Custom content for each class or year group",
  "included.image": "/img/rcc/unnamed_7.png",
  "home.skillsImage": "/img/rcc/unnamed_8.png",

  ...whyItMatters,

  "booking.title": "Booking & Locations",
  "booking.text":
    "We deliver workshops on-site at your school. Available across the UK and Northern Ireland (travel fees may apply).\n\nHow to book:\n\n- Fill out our quick enquiry form\n- We’ll customise a session to your school's needs\n- Confirm your date and we’ll take care of the rest",
  "booking.image": "/img/rcc/unnamed_5.png",
  "booking.button": "Book a workshop",

  "testimonials.eyebrow": "Testimonials",
  "testimonials.title": "What people are saying",
  testimonials: [
    {
      quote:
        "Minnie’s energy is incredible. Our students responded so well to her warmth and humour. This workshop didn’t just build confidence; it inspired growth.",
      role: "Pastoral Lead",
      place: "Manchester",
      image: "/img/rcc/user7.jpeg",
    },
    {
      quote: "The kids really enjoyed the day and they came away more aware of themselves. Several said it helped them feel ready for secondary school.",
      role: "Year 6 Teacher",
      place: "London",
      image: "/img/rcc/user4.png",
    },
    {
      quote:
        "The workshop was a game-changer for our students. We saw noticeable improvements in how they carried themselves, spoke in class, and interacted with peers. Minnie created a safe, encouraging environment where every student felt heard and empowered.",
      role: "Year 7 Coordinator",
      place: "Derby",
      image: "/img/rcc/user1.png",
    },
  ] as RccTestimonial[],

  "cta.title": "Enquire about a workshop today",
  "cta.button": "Book now",
  "cta.button2": "About the workshop",

  // Workshops page
  "workshops.seoTitle": "The Workshop: Resilience, Confidence & Critical Thinking | RCC Workshops",
  "workshops.title": "RCC workshops: Resilience, Confidence & Critical thinking",
  "workshops.lead": "We often idealise childhood as a carefree time, but youth alone offers no protection from emotional challenges, stress, or even trauma.",
  "workshops.image": "/img/rcc/workshops.png",
  "workshops.included":
    "The workshop package includes:\n\n- Up to 4 hours of interactive activities, including discussions, trust-building exercises, and games delivered during the school day.\n- A personalised certificate for each student who completes the workshop, celebrating their engagement and achievement.\n\n## When & Where\n\nDelivered on-site at school, anywhere in the UK and Ireland. Please note: additional travel costs may apply. Complete a booking form to check availability.",
  "workshops.overview":
    "## Workshop Overview: The Power of a Positive Attitude\n\nDesigned for KS2 and KS3 pupils, this dynamic workshop explores how a positive mindset can help young people overcome challenges and thrive. With a strong focus on developing confidence in social situations, building resilience through adversity, and cultivating critical thinking skills, the session is delivered in a relaxed, supportive, and fun environment.\n\nThrough a range of engaging exercises and games, pupils are encouraged not just to understand, but to truly value these essential personal skills:\n\n- **Resilience:** Learning to embrace failure as a stepping stone to success. Pupils discover that resilience means to \"fail well\"—to recover, reflect, and grow.\n- **Confidence:** Exploring how confidence can be projected, even if it doesn’t feel fully formed. We teach that confidence isn’t about being perfect—but showing up.\n- **Critical Thinking:** Unlocking a “secret weapon”, helping children to think deeply, ask better questions, and engage with themselves on a more thoughtful level.\n\nEach workshop is bespoke, tailored to the specific needs of the school, class, or year group, with the flexibility to focus on particular areas of development as required. We create a safe and playful space—full of laughter, energy, and openness—where important conversations can happen in a low-pressure way. Activities include reflections on how the energy we send out into the world shapes the experiences we receive, alongside explorations of kindness, inclusivity, and emotional intelligence in preparation for life beyond the classroom.\n\nThis immersive experience supports children’s social and emotional development by:\n\n- Strengthening confidence through positive socialisation\n- Providing practical tools to manage challenges\n- Offering real-life applications for abstract skills\n\nWe go beyond surface-level positivity—showing that positive thinking isn’t about pretending everything is okay, but about rewiring the way we think so we can better handle life’s ups and downs. Critical thinking is introduced at a metacognitive level, preparing pupils not just for academic assessments like the 11+, but for the wider demands of KS3 and beyond.",
  "workshops.drama":
    "## Drama activities support children in many ways\n\n- **Emotional Expression & Regulation:** Allows kids to safely explore and express emotions. They learn to manage anxiety, disappointment, or frustration in character.\n- **Problem-Solving & Adaptability:** Improv and storytelling help kids think on their feet and adapt when things don’t go as planned. This builds mental flexibility.\n- **Confidence & Self-Efficacy:** Performing in front of others fosters self-confidence. Success teaches that effort leads to improvement.\n- **Empathy & Perspective-Taking:** Playing different characters helps kids understand diverse perspectives, making them emotionally intelligent and socially resilient.\n- **Community & Support:** Working in a group builds social connections and a sense of belonging, which is key to emotional resilience.",
  "workshops.activitiesTitle": "Sample activities",
  "workshops.includedTitle": "What’s included",
  "workshops.why": "Why?",
  "workshops.moreTitle": "More activities",
  activities: [
    { title: "🎭 Mirror Game", how: "In pairs, one child is the \"leader\" and the other mirrors them.", why: "Encourages focus, creativity, and trust. Taking turns as the leader fosters a sense of agency." },
    { title: "🗣️ 1 Minute Speeches", how: "Draw a random topic (e.g. “my dream pet,” “if I ruled the world”) and speak about it for 1 minute.", why: "Develops public speaking skills and quick thinking in a low-stakes, playful way." },
    { title: "🧠 Yes, And... (Improv)", how: "One child starts a story with a sentence. Each child adds to it starting with “Yes, and…”", why: "Removes fear of mistakes, encourages creativity, builds on ideas without judgment." },
    { title: "🎲 Character Hat", how: "Pick a slip of paper with a character or emotion, then act it out for the group to guess.", why: "Taking the stage in a fun, supportive environment - great for introverts." },
    { title: "🌟 Compliments", how: "In a circle. One child in the “hotseat” while others say positive things about them.", why: "Helps kids internalise their strengths and feel valued by peers." },
    { title: "🪞 Superhero Pose", how: "Kids strike a bold superhero pose for 10–30 seconds.", why: "Based on research (Cuddy's), power poses can improve feelings of self-assurance." },
  ] as Activity[],
  "workshops.more":
    "- **Emotion Walks:** walk around the room acting out emotions (e.g. joy, anger, fear) using only movement. Helps them recognise and name emotions without judgment.\n- **\"What Happens Next?\" Improv:** create short scenes that are interrupted by a “twist.” Adapting the story in real time teaches flexibility and creative thinking.\n- **Role Reversal:** act out a conflict from both sides. Builds empathy and problem-solving skills.\n- **Story Circle:** contribute one sentence at a time to a story about a character overcoming a setback. Encourages a growth mindset.\n- **\"Freeze Frame\":** a problem (lost pet, bullying). Others guess what's happening and offer solutions. Promotes discussion and brainstorming around real challenges.\n- **Confidence Charades:** act out confident behaviours (e.g. giving a speech, winning a race). Reinforces what confidence looks like, and helps normalise bold actions.\n- **Pitch It!:** create and \"pitch\" a silly invention (e.g. a self-writing pen) to a panel. Encourages public speaking and creative risk-taking in a fun, pressure-free way.\n- **Team Talent Show:** students create a short skit, dance, or creative act to perform. Strengthens teamwork while giving each student a moment to shine.\n- **2 Truths & a Dream:** share 2 real facts about themselves, 1 dream or goal. Builds self-awareness and makes sharing personal aspirations feel safe and supported.\n- **Mistake Celebrations:** students share a mistake & what they learned. The group cheers and claps. Normalises failure as a learning process and reduces the fear of it.",

  // Topic pages
  "resilience.seoTitle": "Understanding Resilience in Childhood | RCC Workshops",
  "resilience.title": "Understanding Resilience in Childhood",
  "resilience.image": "/img/rcc/unnamed_9.png",
  "resilience.text":
    "We often idealise childhood as a carefree time, but youth alone offers no protection from emotional challenges, stress, or even trauma. From adapting to a new classroom or navigating online learning, to coping with bullying or difficulties at home, children today face a range of pressures. Growing up in an increasingly complex world can be anything but simple—and certainly not carefree.\n\nThe ability to thrive in spite of these challenges stems from resilience: the capacity to adapt well in the face of adversity, trauma, significant stress, or change. Building resilience helps children manage anxiety, regulate emotions, and respond to uncertainty with strength and flexibility.\n\nHowever, resilience does not mean avoiding discomfort or distress. Feelings of sadness, fear, or emotional pain are natural—especially in response to personal or observed trauma. The key is not to eliminate these feelings, but to equip children with the tools to navigate them.\n\n## The good news? Resilience can be learned.\n\nIt is a set of skills and attitudes that can be nurtured over time.\n\nIn fact, some of life’s most difficult moments are also the most formative. When children face and overcome challenges—or even fail well—they gain deep insights into their own strength and character. Encouraging them to reflect on what tough experiences reveal about “what I’m made of” is a powerful tool for growth.\n\nChange, while often unsettling, is also an essential part of development. Helping children accept that change is inevitable—and that new goals can replace those that have become unreachable—builds flexibility and emotional maturity.\n\nAt school, these lessons can be woven into everyday life. For example, acknowledging how students have grown as they progress through year groups can open conversations about how change has shaped who they are. It’s equally important to help children recognise what’s going right, and to develop thoughtful, realistic plans for what’s not going well.",
  "resilience.image2": "/img/rcc/resilience.png",
  "resilience.image3": "/img/rcc/resilience1.png",

  "confidence.seoTitle": "Growing Confidence in Children | RCC Workshops",
  "confidence.title": "Growing Confidence: More Than Just Success",
  "confidence.image": "/img/rcc/confidence1.png",
  "confidence.text":
    "From the moment they’re born, children learn at an incredible pace—mastering new skills almost daily. Alongside these abilities, they begin to build something just as essential: confidence. As children grow, that confidence becomes as crucial as the skills themselves. To truly thrive, kids need to believe in their own capabilities—while also learning that it’s okay to stumble along the way.\n\nHealthy self-confidence comes not from constant success, but from a combination of achievement and resilience. Children build confidence when they experience mastery and when they learn to bounce back after a setback. They might grumble, but they feel a deeper sense of connection and worth when they’re trusted with age-appropriate responsibilities and counted on to contribute.\n\nIt’s important for kids not to limit themselves to the things they already do well. Trying new activities—and sometimes failing at them—is how children grow. Each new skill they acquire reinforces the belief that they can handle new challenges, no matter what life throws their way.\n\nAs adults, it’s natural to want to protect children from failure. But trial and error is how learning happens. Falling short of a goal doesn’t damage children—it teaches them that failure isn’t final. In fact, it can motivate greater effort and build perseverance—qualities that will benefit them far beyond childhood. Confidence and self-esteem aren’t about always getting things right. They’re about continuing to try, even when things don’t go to plan. They’re about not giving up after a setback, and not being discouraged if someone else is “better.” These are the foundations of emotional resilience.\n\nWe know as adults that perfection is a myth. It’s vital that children learn that too—and the sooner, the better. Help them understand that the polished images they see on TV, in magazines, or on social media are often unrealistic. The idea that others are always happy, successful, or perfectly put together is not only false—it’s harmful. Instead, show them that being imperfect is perfectly human. That struggling, making mistakes, and learning from them is not only okay—it’s the path to real confidence.",
  "confidence.image2": "/img/rcc/confidence2.png",

  "critical.seoTitle": "Teaching Critical Thinking: From “I Can’t” to “How Can I?” | RCC Workshops",
  "critical.title": "From “I Can’t” to “How Can I?” — Teaching Critical Thinking",
  "critical.image": "/img/rcc/critical1.png",
  "critical.text":
    "When children face difficult challenges—like a daunting English essay, a high-stakes maths test, or social struggles that leave them feeling frustrated—it’s easy for them to hit a wall and fall back on four dreaded words: “I can’t do it.” But to truly thrive, children need support in shifting from that stuck mindset to a more proactive one: “How can I do this?”\n\nMaking that shift doesn’t happen automatically. It requires children to pause and reflect: Why am I stuck? What’s frustrating me? What would help me move forward? This process of stepping back and thinking about their own thinking is known as metacognition—also referred to as critical thinking.\n\nCritical thinking is something we all engage in, often without realising it. It’s the internal dialogue we have throughout the day—assessing, reflecting, planning, and problem-solving. It’s how we gain insight into our feelings, regulate our reactions, and navigate both academic and emotional challenges.\n\nTeaching children to harness this kind of thinking deliberately can be a powerful tool for their development. Research shows that children who are introduced to metacognitive strategies early on tend to be more resilient, confident, and successful—not just in school, but in life.\n\nTamara Rosier, a learning coach who specialises in these techniques, puts it clearly:\n\n> “Thinking about our thinking creates perspective—perspective that leaves room for change.”\n\nShe offers a practical example. Instead of saying, “Maths tests make me anxious,” we can guide children to ask, “What is it about maths tests that makes me feel anxious, and what can I do to manage that?”\n\nThis shift in language opens up new possibilities. It moves them away from a mindset of helplessness and toward one of self-awareness, agency, and growth.\n\nBy teaching children to reflect on their thoughts and feelings—and to ask better questions of themselves—we’re not just helping them solve today’s problems. We’re helping them build a lifelong toolkit for overcoming challenges with confidence and resilience.",
  "critical.image2": "/img/rcc/critical3.png",

  "about.seoTitle": "About Minnie Lupton, Workshop Facilitator | RCC Workshops",
  "about.title": "About the Facilitator – Minnie Lupton",
  "about.image": "/img/rcc/about.png",
  "about.text":
    "With a unique blend of experience in education, drama, and wellness, I bring a passionate, holistic approach to personal development for young people.\n\n- 10 years as an educator and drama practitioner, working across KS1–KS4\n- 20 years studying and practising wellness and mental health\n- 30 years immersed in drama and live theatre\n- 40 years of navigating life, relationships, and self-growth\n\nMy journey through education and theatre, paired with a deep understanding of energy, mindfulness, and emotional wellbeing, has led me to this work.\n\nThe world is evolving, and the importance of teaching mental wellness is finally being recognised within schools. Practices like meditation, breathwork, and yoga are becoming common in KS2/KS3 environments—with powerful results. But there’s more to teach: It’s time children learn about energy—the positive and the negative—and the powerful role their own mindset and presence play in shaping their world.",

  "resource.eyebrow": "Free for teachers",
  "resource.title": "5 resilience activities for your classroom",
  "resource.text": "Quick, ready-to-run activities from our workshops that help KS2 and KS3 pupils bounce back from setbacks, try new things and think for themselves. Leave your details and we'll send the PDF straight away.",
  "resource.button": "Send me the activities",
  "resource.fileLabel": "5 resilience activities (PDF)",
  "resource.file": "",
  "resource.thanks": "Thank you! Your download is ready, and we've emailed you a copy of the link.",

  "caseStudies.seoTitle": "School Case Studies | RCC Workshops",
  "caseStudies.title": "Case studies",
  "caseStudies.intro": "How schools have used RCC workshops, and what changed for their pupils.",
  "caseStudies.nav": "Case studies",
  caseStudies: [] as CaseStudy[],

  // automatic thank-you email to the school that sent a booking request (switched on/off and edited on /edit)
  "email.thanksOn": true,
  "email.thanksSubject": "Thank you for your booking request",
  "email.thanksText": "Thank you for your booking request. We’ve received your details and will be in touch shortly to confirm dates and arrangements.",

  "blog.title": "Blog",
  "blog.intro": "Ideas, activities and research on building resilience, confidence and critical thinking in KS2 & KS3.",
  "blog.cta": "Bring a workshop to your school",
  "blog.ctaButton": "Book a workshop",

  "book.seoTitle": "Book a Workshop | RCC Workshops",
  "book.title": "Make a Booking",
  "book.questions": "Questions first? Email",
  "book.text":
    "Tell us about your school and pupils, and we’ll be in touch to confirm availability and tailor the session to your needs. Workshops are delivered on-site across the UK and Northern Ireland.",
  "book.thanks": "Thank you! We’ve received your booking request and will be in touch shortly to confirm the details.",

  "legal.seoTitle": "Privacy Policy & Terms | RCC Workshops",
  "legal.title": "Privacy Policy & Terms",
  "legal.text":
    "## Privacy Policy\n\nWhen you contact us or request a booking, we collect the details you give us (such as your name, school, role, email address and phone number) so we can respond to your enquiry and arrange your workshop. We don’t sell or share your details with anyone else, and we keep them only for as long as we need them for this purpose.\n\nYou can ask to see, correct or delete the information we hold about you at any time by emailing us.\n\n## Terms of Use\n\nThe content on this website is provided for general information. All text and images are the property of RCC Workshops and may not be reproduced without permission. Workshop details, availability and travel costs are confirmed individually when you book.",
};

export type RccContent = typeof rccDefaults;
