import { useState } from 'react'
import { getWorkshopPrice, type ModuleData, type WorkshopBlock } from '../data/roadmap'
import WorkshopDetailPanel from './WorkshopDetailPanel'

interface ModuleCardProps {
  module: ModuleData
  levelLetter: string
}

const WS_FOOTER_COLORS = [
  'bg-primary',
  'bg-primary',
  'bg-primary',
  'bg-primary',
  'bg-primary-dark',
  'bg-primary-dark',
  'bg-accent',
] as const

function shortWorkshopTitle(title: string) {
  const dash = title.indexOf('—')
  return dash > 0 ? title.slice(0, dash).trim() : title
}

function PathCard({
  title,
  subtitle,
  footer,
  footerClass,
  selected,
  onSelect,
  className = '',
  variant = 'default',
}: {
  title: string
  subtitle?: string
  footer: string
  footerClass: string
  selected?: boolean
  onSelect: () => void
  className?: string
  variant?: 'default' | 'advanced'
}) {
  const borderSelected =
    variant === 'advanced'
      ? 'border-advanced ring-2 ring-advanced/30'
      : 'border-primary ring-2 ring-primary/30'
  const borderIdle =
    variant === 'advanced'
      ? 'border-advanced/25 hover:border-advanced/50 hover:shadow-md'
      : 'border-primary/15 hover:border-primary/40 hover:shadow-md'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex shrink-0 flex-col overflow-hidden rounded-lg border text-left shadow-sm transition ${className} ${
        selected ? borderSelected : borderIdle
      }`}
    >
      <div className="flex min-h-[108px] flex-1 flex-col items-center justify-center gap-1 bg-white px-3 py-4">
        <span className="text-center text-sm font-extrabold leading-snug text-hero-navy sm:text-[15px]">
          {title}
        </span>
        {subtitle && (
          <span className="text-center text-[11px] font-medium leading-snug text-gray-500">{subtitle}</span>
        )}
      </div>
      <div
        className={`${footerClass} px-2 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs`}
      >
        {footer}
      </div>
    </button>
  )
}

export default function ModuleCard({ module, levelLetter }: ModuleCardProps) {
  const [theoryOpen, setTheoryOpen] = useState(false)
  const [expandedLt, setExpandedLt] = useState<string | null>(null)
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopBlock | null>(null)

  const advancedWorkshops = module.advancedWorkshops ?? []
  const advancedMeta = module.advancedWorkshopMeta ?? 'Đang cập nhật'

  function toggleWorkshop(ws: WorkshopBlock) {
    setSelectedWorkshop((current) => (current?.code === ws.code ? null : ws))
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm">
      <header className="border-b border-primary/10 bg-gradient-to-r from-primary-light via-white to-white px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
            Module {module.number}
          </span>
        </div>
        <h4 className="mt-3 text-xl font-extrabold leading-snug text-hero-navy sm:text-2xl">
          {module.title}
        </h4>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-700">{module.description}</p>
      </header>

      <div className="space-y-8 px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-6 lg:gap-10">
          <div>
            <h5 className="mb-1 text-base font-extrabold text-hero-navy">Khối Lý thuyết</h5>
            <p className="mb-3 text-xs text-gray-500">Nhấn card để xem chi tiết LT01–LT10</p>

            <PathCard
              title="Nền tảng"
              subtitle="LT01 – LT10"
              footer={module.theoryMeta}
              footerClass="bg-primary"
              selected={theoryOpen}
              onSelect={() => setTheoryOpen((v) => !v)}
              className="w-full"
            />

            {theoryOpen && (
              <div className="mt-4 space-y-2 rounded-xl border border-primary/15 bg-primary-light/30 p-3 sm:p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                  Chi tiết nội dung học · Sản phẩm đầu ra
                </p>
                <ul className="space-y-2">
                  {module.theorySessions.map((lt) => {
                    const isOpen = expandedLt === lt.code
                    return (
                      <li
                        key={lt.code}
                        className="overflow-hidden rounded-lg border border-primary/10 bg-white"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedLt(isOpen ? null : lt.code)}
                          className="flex w-full items-start gap-2.5 px-3 py-3 text-left transition hover:bg-primary-light/40"
                        >
                          <span className="shrink-0 rounded bg-primary px-1.5 py-0.5 font-mono text-[11px] font-extrabold text-white">
                            {lt.code}
                          </span>
                          <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-hero-navy">
                            {lt.title}
                          </span>
                          <svg
                            className={`mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="space-y-2 border-t border-primary/10 bg-primary-light/40 px-3 py-3 text-sm leading-relaxed text-gray-700">
                            <p>
                              <span className="font-bold text-primary">Trọng tâm: </span>
                              {lt.focus}
                            </p>
                            <p>
                              <span className="font-bold text-primary">Đầu ra: </span>
                              {lt.deliverable}
                            </p>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h5 className="text-base font-extrabold text-hero-navy">Khối Workshop Basic</h5>
            <p className="mt-0.5 mb-3 text-xs text-gray-500">
              {module.workshopMeta} · Nhấn workshop để xem chi tiết
            </p>

            <div className="space-y-3">
              {module.workshops.map((ws, i) => {
                const open = selectedWorkshop?.code === ws.code
                return (
                  <div key={ws.code}>
                    <PathCard
                      title={shortWorkshopTitle(ws.title)}
                      footer={getWorkshopPrice(module.number, ws.code)}
                      footerClass={
                        module.number === 6
                          ? 'bg-primary'
                          : WS_FOOTER_COLORS[i % WS_FOOTER_COLORS.length]
                      }
                      selected={open}
                      onSelect={() => toggleWorkshop(ws)}
                      className="w-full"
                    />
                    {open && (
                      <WorkshopDetailPanel
                        module={module}
                        workshop={ws}
                        levelLetter={levelLetter}
                        onClose={() => setSelectedWorkshop(null)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {advancedWorkshops.length > 0 && (
          <div>
            <h5 className="text-base font-extrabold text-hero-navy">Khối Workshop Advanced</h5>
            <p className="mt-0.5 mb-3 text-xs text-gray-500">
              {advancedMeta} · Nhấn workshop để xem chi tiết
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {advancedWorkshops.map((ws) => (
                <PathCard
                  key={ws.code}
                  title={shortWorkshopTitle(ws.title)}
                  footer={getWorkshopPrice(module.number, ws.code)}
                  footerClass="bg-advanced"
                  selected={selectedWorkshop?.code === ws.code}
                  onSelect={() => toggleWorkshop(ws)}
                  className="w-full"
                  variant="advanced"
                />
              ))}
            </div>

            {selectedWorkshop &&
              advancedWorkshops.some((w) => w.code === selectedWorkshop.code) && (
                <WorkshopDetailPanel
                  module={module}
                  workshop={selectedWorkshop}
                  levelLetter={levelLetter}
                  onClose={() => setSelectedWorkshop(null)}
                />
              )}
          </div>
        )}
      </div>
    </article>
  )
}
