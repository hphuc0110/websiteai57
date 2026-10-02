import SectionTitle from './SectionTitle'
import ModuleCard from './ModuleCard'
import { roadmapLevels } from '../data/roadmap'

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative bg-gradient-to-b from-primary-light/40 via-white to-white py-12 sm:py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          title="LỘ TRÌNH ĐÀO TẠO"
          subtitle="6 Module · Mỗi module: 10 buổi nền tảng + khối Workshop thực hành"
          className="mb-10 sm:mb-14"
        />

        <div className="space-y-14 sm:space-y-16">
          {roadmapLevels.map((level) => (
            <div key={level.letter} className="space-y-6">
              <div className="flex items-center gap-4 rounded-xl bg-hero-navy px-4 py-4 text-white sm:px-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-2xl font-extrabold shadow-md">
                  {level.letter}
                </span>
                <h3 className="min-w-0 text-base font-extrabold uppercase tracking-wide sm:text-lg md:text-xl">
                  {level.title}
                </h3>
              </div>

              <div className="space-y-8">
                {level.modules.map((mod) => (
                  <ModuleCard key={mod.title} module={mod} levelLetter={level.letter} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
