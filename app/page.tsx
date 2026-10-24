import Link from "next/link";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { AmbientVideo } from "@/components/ambient-video";
import { EditorialClock } from "@/components/editorial-clock";
import { Arrow, Asterisk, Play } from "@/components/icons";
import { Contact, Footer } from "@/components/contact";
import { capabilities } from "@/lib/portfolio";

const brand = localFont({
  src: "../public/fonts/bodoni-moda-brand.woff",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-brand",
});

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header home />
      <main id="main">
        <section className="opening-scene" aria-labelledby="opening-title">
          <div className="opening-center">
            <AmbientVideo />
            <h1
              id="opening-title"
              className={`opening-name ${brand.variable}`}
              aria-label="CHAAYRS.CREATES"
            >
              <span className="opening-word">
                CHAAYRS<span className="opening-dot">.</span>
              </span>
              <span className="opening-word">CREATES</span>
            </h1>
            <p className="opening-descriptor">
              <span>CREATIVE STRATEGY</span>
              <i>+</i>
              <span>UGC</span>
              <i>+</i>
              <span>AI STORYTELLING</span>
            </p>
          </div>
          <div className="opening-bottom">
            <EditorialClock />
            <a
              href="#about"
              className="scroll-invitation"
              aria-label="Scroll to the introduction"
            >
              SCROLL{" "}
              <span aria-hidden="true">
                <i />
              </span>
            </a>
          </div>
        </section>

        <section
          id="about"
          className="introduction"
          aria-labelledby="intro-title"
        >
          <div className="section-top eyebrow">
            <span>01 / THE INTRODUCTION</span>
            <span>IDEAS → STORIES → CONNECTION</span>
          </div>
          <span className="creative-backdrop" aria-hidden="true" data-parallax>
            CREATIVE
          </span>
          <div className="intro-layout">
            <div className="intro-copy">
              <span className="eyebrow dot-label">
                THE PERSON BEHIND THE POSSIBILITIES.
              </span>
              <h2
                id="intro-title"
                aria-label="THE MIND BEHIND THE CREATIVE."
                className="masked-heading"
                data-motion-heading
                data-motion-group
              >
                <span className="line-mask">
                  <span className="motion-line">THE MIND</span>
                </span>
                <span className="line-mask">
                  <span className="motion-line motion-step-1">BEHIND THE</span>
                </span>
                <span className="line-mask">
                  <em className="motion-line motion-step-2">CREATIVE.</em>
                </span>
              </h2>
              <p className="intro-positioning" data-reveal>
                I connect creative ideas with clear intention.
                <br />
                Content, digital storytelling, and the strategy that brings it
                all together.
              </p>
              <div className="intro-identity" data-reveal>
                <span>
                  HI, I'M <strong>CHA Y.</strong>
                </span>
                <p>
                  Creative strategist, UGC creator, and AI content creator. I
                  shape the idea, refine the details, and bring the story to
                  life.
                </p>
              </div>
              <div className="button-row" data-reveal>
                <a href="#work" className="button button-rose">
                  View work <Arrow />
                </a>
                <a href="#contact" className="button button-outline">
                  Let’s collaborate <Arrow />
                </a>
              </div>
            </div>
            <div
              className="intro-collage"
              data-reveal
              aria-label="A glimpse of my AI and UGC projects"
            >
              <Link
                href="/work/beauty-skincare"
                className="print-card print-back"
              >
                <img
                  src="/media/rejuran-ampoule.jpg"
                  alt="Rejuran ampoule product-focused UGC sample"
                  width="720"
                  height="1280"
                  loading="lazy"
                />
                <span>
                  02 / BEAUTY & SKINCARE <Arrow />
                </span>
              </Link>
              <Link
                href="/work/trish-morikawa"
                className="print-card print-front"
              >
                <img
                  src="/media/tokyo-budget.jpg"
                  alt="Trish Morikawa, my AI Japan travel persona"
                  width="720"
                  height="1280"
                  loading="lazy"
                />
                <span>
                  01 / AI TRAVEL STORYTELLING <Arrow />
                </span>
              </Link>
              <div className="intention-seal" aria-hidden="true">
                <span>MADE WITH</span>
                <em>intention.</em>
                <Asterisk />
              </div>
              <span className="collage-side eyebrow">
                VISUALS WITH A POINT OF VIEW.
              </span>
              <p className="collage-caption">
                A FEW IDEAS, BROUGHT TO LIFE.
                <br />
                <span>SELECTED AI & CREATOR WORK</span>
              </p>
            </div>
          </div>
          <div className="intro-bottom eyebrow">
            <span>
              CONTENT CREATION <i>/</i> CREATIVE STRATEGY <i>/</i> DIGITAL
              SUPPORT
            </span>
            <a
              href="/downloads/cha-yorsua-cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              VIEW MY CV <Arrow />
            </a>
          </div>
        </section>

        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="work-intro">
            <div className="section-top eyebrow">
              <span>02 / SELECTED WORK</span>
              <span>THE IDEAS. THE DETAILS. THE FEELING.</span>
            </div>
            <a
              href="#selected-work"
              className="work-title-link"
              aria-label="Explore selected projects"
            >
              <h2
                id="work-title"
                aria-label="VIEW WORK"
                data-motion-heading
                data-motion-group
              >
                <span className="word-mask">
                  <span className="motion-line">VIEW</span>
                </span>
                <em className="word-mask">
                  <span className="motion-line motion-step-1">WORK</span>
                </em>
                <Arrow
                  direction="down"
                  data-motion-item
                  className="motion-step-2"
                />
              </h2>
            </a>
            <div className="work-intro-bottom">
              <p>
                Different formats.
                <br />
                The same creative intention.
              </p>
              <span className="eyebrow">
                AI STORYTELLING / UGC / CONTENT DIRECTION
              </span>
            </div>
          </div>
          <div id="selected-work" className="selected-projects">
            <article className="featured-project travel-project">
              <div className="project-heading">
                <span className="eyebrow">
                  01 / AI PERSONA & TRAVEL STORYTELLING
                </span>
                <span className="eyebrow">03 FILMS</span>
              </div>
              <div className="project-composition">
                <div className="project-story" data-reveal>
                  <span className="project-kicker">
                    A VIRTUAL CREATOR.
                    <br />A VERY HUMAN IDEA.
                  </span>
                  <h3>
                    Trish
                    <br />
                    <em>Morikawa.</em>
                  </h3>
                  <p>
                    A Japan travel bestie, brought to life through AI. Practical
                    stories, a consistent persona, and a warm point of view.
                  </p>
                  <Link className="text-link" href="/work/trish-morikawa">
                    Explore the project <Arrow />
                  </Link>
                  <span className="project-disclosure">
                    AI-GENERATED PERSONA · SELF-INITIATED PROJECT
                  </span>
                </div>
                <Link
                  href="/work/trish-morikawa"
                  className="project-art travel-art"
                  data-motion-group
                  aria-label="View Trish Morikawa project and three films"
                >
                  <img
                    className="project-image-one"
                    data-motion-item
                    src="/media/trish-introduction.jpg"
                    alt="Trish AI persona in a city at night"
                    width="720"
                    height="1280"
                    loading="lazy"
                  />
                  <img
                    className="project-image-two motion-step-1"
                    data-motion-item
                    src="/media/trish-day-in-life.jpg"
                    alt="Trish AI persona in a daytime cafe scene"
                    width="720"
                    height="1280"
                    loading="lazy"
                  />
                  <span className="project-art-note">
                    JAPAN, THROUGH A DIFFERENT LENS.
                  </span>
                  <span className="project-play motion-step-2" data-motion-item>
                    <Play />
                    <span>MEET TRISH</span>
                  </span>
                </Link>
              </div>
            </article>
            <article className="featured-project ugc-project">
              <div className="project-heading">
                <span className="eyebrow">02 / UGC & PRODUCT STORYTELLING</span>
                <span className="eyebrow">06 FILMS</span>
              </div>
              <div className="project-composition">
                <div className="project-story" data-reveal>
                  <span className="project-kicker">
                    REAL MOMENTS.
                    <br />
                    THOUGHTFUL PRODUCT STORIES.
                  </span>
                  <h3>
                    Beauty, in
                    <br />
                    <em>the everyday.</em>
                  </h3>
                  <p>
                    On-camera storytelling and product-focused details. Skincare
                    content with a relatable, creator-led perspective.
                  </p>
                  <Link className="text-link" href="/work/beauty-skincare">
                    Explore the collection <Arrow />
                  </Link>
                  <span className="project-disclosure">
                    ON-CAMERA & PRODUCT-FOCUSED CONTENT
                  </span>
                </div>
                <Link
                  href="/work/beauty-skincare"
                  className="project-art ugc-art"
                  data-motion-group
                  aria-label="View six beauty and skincare UGC videos"
                >
                  <img
                    className="project-image-one"
                    data-motion-item
                    src="/media/collagen-cream.jpg"
                    alt="On-camera One Day’s You Collagen Cream UGC work sample"
                    width="720"
                    height="1280"
                    loading="lazy"
                  />
                  <img
                    className="project-image-two motion-step-1"
                    data-motion-item
                    src="/media/rejuran-ampoule.jpg"
                    alt="Rejuran Turnover Ampoule product detail"
                    width="720"
                    height="1280"
                    loading="lazy"
                  />
                  <span className="project-art-note">
                    A LITTLE DETAIL. A CLEARER STORY.
                  </span>
                  <span className="project-play motion-step-2" data-motion-item>
                    <Play />
                    <span>SEE THE STORIES</span>
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section id="approach" className="approach-section section-pad">
          <div className="section-top eyebrow">
            <span>03 / THE WORK BEHIND THE WORK</span>
            <span>THOUGHTFUL FROM START TO FINISH.</span>
          </div>
          <div className="approach-layout">
            <div className="approach-intro" data-reveal>
              <h2>
                More than
                <br />a look.
                <br />
                <em>
                  A reason
                  <br />
                  behind it.
                </em>
              </h2>
              <p>
                From the first idea to the final details, I create, coordinate,
                and refine with equal attention to aesthetics and value.
              </p>
              <Asterisk />
            </div>
            <div className="capabilities" data-reveal>
              {capabilities.map((item) => (
                <div className="capability" key={item.number}>
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <Arrow />
                </div>
              ))}
              <div className="experience-note">
                <span className="eyebrow">EXPERIENCE / VIRTUS</span>
                <p>
                  Social media & creative operations: page management, content
                  planning, creative briefs, visual direction, lead research,
                  and team coordination.
                </p>
              </div>
              <div className="tools-line">
                <span className="eyebrow">TOOLS IN MY WORKFLOW</span>
                <p>
                  CapCut / Canva / Magnific / Notion / Meta Suite / Higgsfield /
                  Grok
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="kind-words" className="kind-words-section section-pad">
          <div className="section-top eyebrow">
            <span>04 / KIND WORDS & CREATIVE COLLABORATIONS</span>
            <Asterisk />
          </div>
          <div className="kind-words-heading" data-reveal>
            <h2>
              A little appreciation.
              <br />
              <em>A lot of creative intention.</em>
            </h2>
          </div>
          <figure className="testimonial" data-reveal>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              I truly appreciate your promptness, cooperation, hard work and
              creativity.
            </blockquote>
            <figcaption>
              <div>
                <strong>Alex</strong>
                <span>
                  Account Manager · Digital Stark
                  <br />
                  Review Hunters Team
                </span>
              </div>
              <div className="quote-context">
                <span>d’Alba / Vita Toning Serum Toner</span>
                <span>AMBASSADORS CAMPAIGN</span>
              </div>
            </figcaption>
          </figure>
          <div className="collaborations">
            <div className="collaboration-intro">
              <span className="eyebrow">SELECTED COLLABORATIONS</span>
              <p>
                Beauty stories.
                <br />
                Creative connections.
              </p>
            </div>
            <div className="collaboration-list">
              <article>
                <span className="collaboration-index">01</span>
                <div>
                  <h3>d’Alba</h3>
                  <p>UV Essence Waterfull Sun Cream</p>
                  <span className="eyebrow">
                    DIGITAL STARK / BEAUTY & SKINCARE CAMPAIGN
                  </span>
                </div>
                <Asterisk />
              </article>
              <article>
                <span className="collaboration-index">02</span>
                <div>
                  <h3>Frankly</h3>
                  <p>PDRN Bounce Ball Serum</p>
                  <span className="eyebrow">
                    KBEAUTY CAFE / SKINCARE COLLABORATION
                  </span>
                </div>
                <Asterisk />
              </article>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
