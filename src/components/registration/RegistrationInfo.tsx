import type { ReactNode } from 'react'
import { useRegistrationModal } from '../../context/RegistrationModalContext'

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Đội ngũ chuyên môn, giàu kinh nghiệm thực tế',
    description:
      'Được học tập cùng đội ngũ giảng viên và chuyên gia có nền tảng chuyên môn vững vàng, kinh nghiệm nghiên cứu và làm việc thực tế trong lĩnh vực công nghệ, dữ liệu và AI. Nội dung giảng dạy không chỉ tập trung vào kiến thức học thuật mà còn gắn với cách AI được ứng dụng để giải quyết các bài toán thực tế, giúp học sinh hiểu bản chất, biết cách vận dụng và hình thành tư duy công nghệ ngay từ sớm.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor" strokeWidth="2">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Lộ trình bài bản, linh hoạt theo định hướng',
    description:
      'Học sinh bắt đầu với kiến thức nền tảng, sau đó chủ động lựa chọn các workshop và hướng thực hành phù hợp với sở thích, năng lực và định hướng nghề nghiệp. Từ Coding, Data, AI Agent, Web/App đến AI Video, Marketing hay các ứng dụng AI trong giáo dục, mỗi workshop là một cơ hội để học sinh khám phá một lĩnh vực mới, trực tiếp thực hành và tạo ra sản phẩm cụ thể.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Portfolio thực chiến, tích lũy qua từng dự án',
    description:
      'Thay vì chỉ hoàn thành bài học, học sinh được trực tiếp tạo ra sản phẩm trong quá trình học, có mentor đồng hành và hỗ trợ trong từng giai đoạn thực hành. Các sản phẩm được tích lũy xuyên suốt các module, từ những dự án nhỏ đến dự án Capstone cuối khóa, từng bước hình thành portfolio thể hiện rõ năng lực, tư duy giải quyết vấn đề và khả năng ứng dụng AI vào thực tế.',
  },
]

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light shadow-[0_0_12px_rgba(105,205,245,0.2)]">
        {icon}
      </span>
      <div>
        <p className="font-bold text-gray-900">{title}</p>
        <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </li>
  )
}

export default function RegistrationInfo() {
  const { openRegistration } = useRegistrationModal()

  return (
    <div>
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-primary-dark sm:text-2xl md:text-3xl">
        Đăng ký khóa học AI57
      </h2>

      <button
        type="button"
        onClick={openRegistration}
        className="mt-5 w-full rounded-2xl bg-primary px-6 py-4 text-left shadow-lg shadow-primary/30 transition hover:bg-primary-dark active:scale-[0.98] sm:w-auto sm:px-8"
      >
        <p className="text-xl font-extrabold uppercase tracking-wider text-white sm:text-2xl md:text-3xl">
          Đăng ký ngay
        </p>
        <p className="mt-1 text-sm italic text-white/90">
          Bắt đầu hành trình trở thành kỹ sư AI tương lai
        </p>
      </button>

      <p className="mt-6 max-w-md text-gray-600 leading-relaxed">
        Để lại thông tin, đội ngũ tư vấn AI57 sẽ liên hệ trong vòng 24h để tư vấn lộ trình học
        tập tối ưu nhất cho con.
      </p>

      <ul className="mt-8 space-y-6">
        {benefits.map((item) => (
          <BenefitItem key={item.title} {...item} />
        ))}
      </ul>
    </div>
  )
}
