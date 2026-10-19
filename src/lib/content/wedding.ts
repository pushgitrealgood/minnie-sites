/**
 * Thoroughly Modern Minnie: the site's words and pictures as editable fields, with what was on the Bubble site as the
 * defaults. Minnie's edits are stored per key and override these (see get.ts).
 */

export type Testimonial = { quote: string; author: string; image: string };
export type Faq = { q: string; a: string };

export const weddingDefaults = {
  "seo.title": "Thoroughly Modern Minnie | Wedding Celebrant, London & across the UK",
  "seo.description":
    "Bespoke wedding ceremonies, vow renewals, elopements and LGBTQ+ weddings by Minnie, a certified celebrant based in London who travels across the UK.",

  "hero.title": "Welcome to Thoroughly Modern Minnie",
  "hero.text":
    "Ready to start the journey to your unique modern wedding ceremony?\n\nIf you're dreaming of a small elopement, a traditional celebration, or something beautifully offbeat - I’m here to make it unforgettable.",
  "hero.image": "/img/wedding/hero-rings.jpg",

  "intro.title": "A thoroughly modern celebrant",
  "intro.tagline": "Moments that matter, words that last.",
  "intro.heading": "Congratulations on your engagement!",
  "intro.text":
    "I’m Minnie, a certified wedding celebrant passionate about crafting heartfelt, authentic ceremonies that reflect your unique journey as a couple. Included in my service you will get:\n\n- A custom-made ceremony written just for you, incorporating your story, values, and personalities. Professionally delivered with warmth and presence. I’m happy to travel near or far and will create a ceremony that fits your chosen setting.\n- Unlimited email and phone communication with support for every aspect of your day. Some couples need just one meeting; others enjoy a few — it’s completely up to you. I offer a huge range of guidance with vows, readings, and ceremony structure. All my writing and creative preparation is included in the process with no extra fees.\n- A beautifully presented book containing your personalised ceremony and some special photos from your day.\n\nSo let’s chat. Whether you’re ready to book or just exploring options, I’d love to hear from you.",
  "intro.image": "/img/wedding/minnie.jpg",
  "intro.accreditation": "Accredited by Acorn2Oak Ceremonies Celebrant Training",
  "intro.cta": "Enquire today",
  "intro.accreditationLink": "acorn2oakceremonies.co.uk",
  "intro.accreditationUrl": "https://www.acorn2oakceremonies.co.uk/celebrant-training-school",

  "contact.phone": "07815 835558",
  "contact.email": "modernminnieweddings@gmail.com",

  "services.title": "Modern Wedding Ceremonies",
  "services.subtitle": "Let’s make it official – Your Way",
  "services.types.title": "Types of ceremony",
  "services.types.text":
    "1. Bespoke wedding ceremonies: Classic and tailor-made with meaningful, personal touches.\n\n2. Vow renewals: Celebrate your journey together and reaffirm your commitment in a way that feels right.\n\n3. Elopements / Intimate weddings: Small, heartfelt ceremonies focused on what really matters.\n\n4. LGBTQ+ ceremonies: I proudly officiate for all couples - always affirming and joyful.\n\n5. Cultural/Interfaith ceremonies: Blending traditions with respect and care to create a day that honours your faith and your future.\n\n6. Commitment ceremonies: For couples who want to celebrate their love without legal formalities.\n\n7. Legal-only ceremonies: Simple, streamlined - all the legal requirements, delivered with care.",
  "services.prices.title": "Prices",
  "services.prices.text":
    "Simple and transparent.\n\nTo keep things flexible and fair, my pricing is structured in two separate parts:\n\nEach ceremony begins with a flat booking fee to reserve your date and cover travel. From that moment on, that confirmed date is exclusively yours.\n\nAny meetings we have (in person or online) to discuss your ceremony details are charged hourly and happen as often — or as little — as you need.\n\nI do not charge any additional hourly fees for the bespoke work I do independently, including writing your personalised ceremony, crafting readings, or creating symbolic rituals.\n\nEvery couple receives a printed keepsake book containing their personalised ceremony and selected photographs from the day.",
  "services.how.title": "How it works",
  "services.how.text":
    "1. Get in Touch: Send me a message and tell me a little about your plans. We’ll arrange an initial chat to see if I’m the right fit for you and your day.\n\n2. Secure Your Date: Once you’re ready to proceed, a flat booking fee secures your wedding date in my calendar.\n\n3. Planning and Personalisation: We’ll meet (in person or online) to talk through your story and the kind of ceremony you want.\n\n4. Ceremony Creation: Using everything you’ve shared, I’ll craft a completely bespoke ceremony just for you.\n\n5. The Big Day: I’ll arrive early, liaise with your other suppliers, manage any issues and deliver your ceremony with professionalism and sincerity. I will oversee management of any specific legal requirements, where applicable.",
  "services.about.title": "About me",
  "services.about.text":
    "I'm Minnie, a northerner who’s called London home for over 20 years. With a breadth of experience as an actor and director, and a decade teaching drama, I’m completely at ease in front of a crowd, and I never forget my lines! I love weddings. I love love. I find so much joy in celebrating all the moments that make life beautiful.\n\nCreativity is at the heart of what I do. Whether you’d like a fully bespoke ceremony with original speeches, readings, or poetry - or you’ve already written every word and just want someone to bring it to life, I’m here to support your vision. I can be as hands-on/hands-off as you need.\n\nOne of the joys of a celebrant-led wedding is flexibility. Unlike ceremonies held in churches or registry offices, there are very few non-negotiables. That means we can create something that feels entirely and authentically yours, and just as unique.",

  "testimonials.title": "Testimonials",
  "testimonials.subtitle": "Here's what people are saying..!",
  testimonials: [
    {
      quote:
        "June 27th 2025 was mine and my husbands’ 10th wedding anniversary, we wanted to have a small vow renewal for just close family. Minnie had attended our actual wedding 10 years ago as a friend, and offered to perform the vow renewal ceremony as a gift because she was recently certified as a wedding celebrant. Just as we’d expected she was professional and thorough. She organised everything from the music and readings, to writing beautiful speeches that were personal to us. Minnie’s delivery was warm, welcoming and anything but boring. She managed to create an emotionally charged, magical day that we will remember forever.",
      author: "Elizabeth Dickens",
      image: "/img/wedding/testimonial-elizabeth.jpg",
    },
    {
      quote:
        "Will and I have been together for years and just never got round to a wedding. Minnie offered to plan a whole wedding ceremony for us as a project after receiving her wedding celebrant certification. We had three online meetings and shared our story with her as well as completing a questionnaire on our relationship specificities. She created something super unique. It encapsulated everything we wanted. Once the venue is booked, we will have a perfect day celebrating with friends and family.",
      author: "Amy Whittaker",
      image: "/img/wedding/testimonial-amy.jpg",
    },
    {
      quote:
        "Adam and I have been married since 2009. We had a wonderful wedding in Sligo, Ireland where my family are from. Now aged 40, we both wanted a ceremony that included our daughter and was in London where we have lived our whole lives. I worked with Minnie a few years ago and heard that she was now a celebrant. Her script writing, ceremony creation and delivery were top notch. Knows her stuff! It really was more than we could have hoped for. Can't recommend highly enough",
      author: "Clare White",
      image: "/img/wedding/testimonial-clare.jpg",
    },
  ] as Testimonial[],

  "chat.title": "So let’s chat",
  "chat.text": "Whether you’re ready to book or just exploring options, I’d love to hear from you.",
  "chat.cta": "Enquire today",

  "faq.title": "Frequently Asked Questions",
  "faq.intro": "Everything couples usually ask before booking. Can’t see your question? Just get in touch.",
  "faq.cta": "Ask me anything",
  faqs: [
    {
      q: "Are you authorised to marry us?",
      a: "Yes, I am a registered celebrant authorised to officiate marriages. Accredited by Acorn2Oak Ceremonies Celebrant Training. Celebrant-led ceremonies are not legally binding in England and Wales on their own. To be legally married you must also register with a local Register Office before or after your celebrant ceremony. Many couples choose a celebrant for the meaningful, tailored ceremony experience and handle the legal part separately.",
    },
    {
      q: "Do you travel?",
      a: "Absolutely. I travel across the UK and can go further afield for a destination wedding if that is your plan. Travel costs are built into the base rate so there won't be any unexpected surprises.",
    },
    {
      q: "Can we write our own vows?",
      a: "Of course, and I’ll help guide you if you need it! There aren't any specific rules when it comes to creating your own vows, and I have a huge catalogue of examples and templates.",
    },
    {
      q: "How far in advance should we book?",
      a: "As soon as you have your date! Popular dates can book up quickly, especially in peak wedding season. A flat booking fee secures your date in my calendar.",
    },
    {
      q: "How personal will our ceremony be?",
      a: "Completely bespoke. Your ceremony is written from scratch based on your story, values, and vision. No restrictions, no copy-and-paste.",
    },
    {
      q: "Do you charge extra for writing the ceremony?",
      a: "No. All bespoke writing and creative preparation is included in my service. I only charge an hourly rate for time we spend together in meetings; online or face to face.",
    },
    {
      q: "How many meetings will we need?",
      a: "That’s entirely up to you. Some couples are happy with one or two meetings, while others enjoy several — you decide what feels right. And rehearsals can be arranged if needed.",
    },
    {
      q: "Can you include cultural, spiritual, or family traditions?",
      a: "Of course. I’m experienced in blending traditions thoughtfully and respectfully, and I love creating ceremonies that honour what matters most to you.",
    },
    {
      q: "What if we’re not sure what we want yet?",
      a: "That’s completely normal. Part of my role is helping you discover what feels right for you — we’ll figure it out together.",
    },
  ] as Faq[],

  "enquire.title": "Let’s talk about your ceremony",
  "enquire.intro":
    "Tell me a little about your plans and I’ll be in touch to arrange an initial chat. There’s no obligation, whether you’re ready to book or just exploring options.",
  "enquire.thanks": "Thank you! Your message is on its way to me, and I’ll be in touch very soon.",

  "footer.copyright": "© 2026 Thoroughly Modern Minnie. All rights reserved.",
};

export type WeddingContent = typeof weddingDefaults;
