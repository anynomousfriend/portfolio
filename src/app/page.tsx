import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { PinnedBioSection } from '@/components/sections/pinned-bio-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        <HeroSection />
        <ProjectsSection />
        <PinnedBioSection />
        <SkillsSection />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  );
}
