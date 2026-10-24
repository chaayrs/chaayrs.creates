import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Contact, Footer } from "@/components/contact";
import { Arrow, Asterisk } from "@/components/icons";
import { VideoGallery } from "@/components/video-gallery";
import { projects } from "@/lib/portfolio";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — CHAAYRS.CREATES` : "Project not found",
    description: project?.description,
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects.find((p) => p.slug !== slug)!;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main" className="case-study">
        <div className="case-nav">
          <Link href="/#selected-work">
            <Arrow direction="left" />
            Back to selected work
          </Link>
          <span className="eyebrow">
            {project.number} / {project.category}
          </span>
        </div>
        <section className="case-opening">
          <div>
            <span className="eyebrow">{project.count} / SELECTED PROJECT</span>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
          </div>
          <Asterisk />
        </section>
        <section className="case-overview">
          <div>
            <span className="eyebrow">THE IDEA</span>
            <h2>{project.intro}</h2>
            <p>{project.overview}</p>
          </div>
          <dl>
            <div>
              <dt>MY CONTRIBUTION</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>THE AUDIENCE</dt>
              <dd>{project.audience}</dd>
            </div>
            <div>
              <dt>THE FORMAT</dt>
              <dd>{project.format}</dd>
            </div>
          </dl>
        </section>
        <section className="case-films" aria-labelledby="films-heading">
          <div className="films-heading">
            <div>
              <span className="eyebrow">THE FINISHED WORK</span>
              <h2 id="films-heading">
                The stories, <em>in motion.</em>
              </h2>
            </div>
            <span className="eyebrow">PRESS PLAY TO WATCH WITH SOUND</span>
          </div>
          <VideoGallery
            videos={project.videos}
            filterable={slug === "beauty-skincare"}
          />
          <p className="project-source-note">{project.note}</p>
        </section>
        <section className="case-thinking">
          <span className="eyebrow">THE CREATIVE INTENTION</span>
          <h2>{project.intention}</h2>
        </section>
        <Link href={`/work/${next.slug}`} className="next-project">
          <div>
            <span className="eyebrow">NEXT COLLECTION</span>
            <h2>{next.title}</h2>
          </div>
          <Arrow />
        </Link>
      </main>
      <Contact />
      <Footer />
    </>
  );
}
