export interface TheorySession {
  code: string;
  title: string;
  focus: string;
  deliverable: string;
}

export interface WorkshopSession {
  session: string;
  title: string;
  deliverable: string;
}

export interface WorkshopBlock {
  code: string;
  title: string;
  meta: string;
  sessions: WorkshopSession[];
}

export interface ModuleData {
  icon: string;
  number: number;
  title: string;
  description: string;
  // duration: string;
  theoryMeta: string;
  theorySessions: TheorySession[];
  workshopMeta: string;
  workshops: WorkshopBlock[];
  /** Tuỳ chọn — tên/meta có thể đổi sau */
  advancedWorkshopMeta?: string;
  advancedWorkshops?: WorkshopBlock[];
  price: string;
}

export interface LevelData {
  letter: string;
  title: string;
  subtitle: string;
  modules: ModuleData[];
}

/** Giá niêm yết từng WS lẻ (Đ) — theo công bố giá bán AI57 */
const WORKSHOP_PRICES: Record<number, Record<string, string>> = {
  1: {
    WS1: "4.000.000",
    WS2: "4.000.000",
    WS3: "4.000.000",
    ADV1: "5.000.000",
    ADV2: "5.000.000",
    ADV3: "5.000.000",
    ADV4: "6.000.000",
  },
  2: {
    WS1: "4.800.000",
    WS2: "4.800.000",
    WS3: "3.200.000",
    WS4: "4.000.000",
    WS5: "5.000.000",
    WS6: "2.000.000",
    WS7: "3.000.000",
  },
  3: {
    WS1: "4.800.000",
    WS2: "4.000.000",
    WS3: "3.200.000",
    WS4: "2.000.000",
    WS5: "5.000.000",
    WS6: "5.000.000",
    WS7: "3.000.000",
  },
  4: {
    WS1: "5.000.000",
    WS2: "5.000.000",
    WS3: "5.000.000",
    WS4: "6.000.000",
    WS5: "6.000.000",
    WS6: "3.600.000",
    WS7: "2.400.000",
  },
  5: {
    WS1: "5.000.000",
    WS2: "5.000.000",
    WS3: "5.000.000",
    WS4: "6.000.000",
    WS5: "6.000.000",
    WS6: "3.600.000",
    WS7: "2.400.000",
  },
  6: {
    WS1: "5.000.000",
    WS2: "5.000.000",
    WS3: "5.000.000",
    WS4: "5.000.000",
    WS5: "5.000.000",
    WS6: "3.000.000",
    WS7: "2.000.000",
  },
};

/** Giá hiển thị trên card / chi tiết workshop */
export function getWorkshopPrice(moduleNumber: number, wsCode: string): string {
  const amount = WORKSHOP_PRICES[moduleNumber]?.[wsCode.toUpperCase()];
  return amount ? `${amount} đ` : "Liên hệ";
}

export const roadmapLevels: LevelData[] = [
  {
    letter: "A",
    title: "LEVEL A: FOUNDATION",
    subtitle: "Dành cho học sinh THCS, THPT & người mới bắt đầu",
    modules: [
      {
        icon: "🧠",
        number: 1,
        title: "AI FOUNDATIONS & GENERATIVE LITERACY",
        description:
          "Xây nền tảng hiểu AI/GenAI, prompt engineering, GenAI thị giác, RAG & Study OS, Generative UI/tác tử, đạo đức & an toàn — kết hợp 10 buổi nền tảng và 3 workshop thực hành (Prompt Lab, Creative Studio, AI Builder).",
        theoryMeta: "4.000.000 Đ",
        theorySessions: [
          {
            code: "LT01",
            title: "Bản đồ AI 2025 & Định vị người học",
            focus:
              "Phân lớp GenAI theo phương thức dữ liệu; mô hình đóng/mở trọng số; 4 bối cảnh ứng dụng.",
            deliverable: "AI Map cá nhân (sơ đồ tư duy cho lĩnh vực tự chọn).",
          },
          {
            code: "LT02",
            title: "Lịch sử & Các trường phái AI",
            focus:
              "Phép thử Turing; AI ký hiệu; 2 mùa đông AI; ImageNet, GAN, Transformer, Diffusion.",
            deliverable:
              "Poster dòng thời gian AI (tối thiểu 05 mốc kèm chú giải).",
          },
          {
            code: "LT03",
            title: "Phân tầng AI, ML, DL & Data Science",
            focus:
              "Quan hệ bao hàm AI/ML/DL; sơ đồ Venn 3 năng lực; bản đồ vai trò nghề nghiệp.",
            deliverable: "Sơ đồ Venn năng lực cá nhân & kế hoạch bù đắp.",
          },
          {
            code: "LT04",
            title: "Nguyên lý hoạt động của LLM",
            focus:
              "Token, dự đoán token kế tiếp, temperature, top-p, context window, RLHF, hallucination.",
            deliverable: "Báo cáo phân tích trường hợp LLM trả lời sai.",
          },
          {
            code: "LT05",
            title: "Prompt Engineering nền tảng",
            focus: "Cấu trúc 5 thành phần; vòng lặp tinh chỉnh prompt.",
            deliverable:
              "Bộ 03 cặp prompt phiên bản 1 & 2 kèm nhận xét tiêu chí.",
          },
          {
            code: "LT06",
            title: "Prompt nâng cao & An toàn mô hình",
            focus:
              "Few-shot, Chain-of-Thought; tiêm lệnh, jailbreak & 4 nguyên tắc phòng vệ.",
            deliverable:
              "Bảng phân tích rủi ro an toàn cho prompt có nguồn ngoài.",
          },
          {
            code: "LT07",
            title: "GenAI thị giác (Ảnh & Video)",
            focus:
              "GAN & Diffusion; text-to-image/video; storyboard 3 nhịp & chuẩn C2PA.",
            deliverable: "Storyboard 3 nhịp & 03 prompt ảnh có chú giải 5 lớp.",
          },
          {
            code: "LT08",
            title: "Truy hồi tăng cường (RAG) & Study OS",
            focus:
              "Kiến trúc RAG 5 khối; NotebookLM, Perplexity; hệ thống học tập cá nhân.",
            deliverable: "Sơ đồ kiến trúc Study OS & luồng sử dụng 1 tuần.",
          },
          {
            code: "LT09",
            title: "Generative UI, Tác tử AI & Workflow",
            focus:
              "Sinh UI từ ngôn ngữ tự nhiên (v0); Agent loop, tool calling & tự động hoá no-code.",
            deliverable: "Sơ đồ luồng tác tử & bảng đăng ký rủi ro tối thiểu.",
          },
          {
            code: "LT10",
            title: "Đạo đức, Pháp lý, An toàn & Tổng kết",
            focus: "Bias, riêng tư, deepfake, bản quyền; khung tự quản trị.",
            deliverable:
              "Bản cam kết sử dụng AI (AI Pledge) & phân loại 4 hoạt động mẫu.",
          },
        ],
        workshopMeta: "03 Workshop Basic / 15 buổi",
        workshops: [
          {
            code: "WS1",
            title: "Prompt Lab",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Prompt Foundry",
                deliverable:
                  "Thư viện 09 mục (3 tình huống × v1/v2 kèm ghi chú).",
              },
              {
                session: "Buổi 2",
                title: "Prompt Battle",
                deliverable:
                  "Bảng so sánh 4 mô hình & khuyến nghị cho 6 tác vụ.",
              },
              {
                session: "Buổi 3",
                title: "Kỹ thuật nâng cao & Tấn công prompt",
                deliverable:
                  "Báo cáo 3 biến thể prompt & bảng 3 quy tắc phòng vệ.",
              },
              {
                session: "Buổi 4",
                title: "Gia sư AI trên tài liệu riêng",
                deliverable:
                  "Notebook môn học + bộ câu hỏi ôn tập & đối chiếu truy vấn.",
              },
              {
                session: "Buổi 5",
                title: "Lắp ráp Study OS & Bàn giao",
                deliverable:
                  "Study OS vận hành được, video demo 3 phút & mô tả quy trình.",
              },
            ],
          },
          {
            code: "WS2",
            title: "AI Creative Studio",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Text-to-Image Lab",
                deliverable:
                  "So sánh 4 nền tảng, ≥12 ảnh thử nghiệm & 03 ảnh chủ đạo.",
              },
              {
                session: "Buổi 2",
                title: "Poster & Bộ nhận diện",
                deliverable:
                  "01 Poster chiến dịch (dọc/vuông) kèm bản ghi lý do thiết kế.",
              },
              {
                session: "Buổi 3",
                title: "Text-to-Video & Image-to-Video",
                deliverable:
                  "Tối thiểu 06 clip thô (5–10s) kèm bảng thông số sinh.",
              },
              {
                session: "Buổi 4",
                title: "Storyboard & Hậu kỳ",
                deliverable:
                  "01 Clip 15–30s hoàn chỉnh ở 2 tỉ lệ & 01 trang storyboard.",
              },
              {
                session: "Buổi 5",
                title: "Xuất bản & Kiểm tra bản quyền",
                deliverable:
                  "Campaign Kit hoàn chỉnh & Phiếu tự kiểm điều khoản.",
              },
            ],
          },
          {
            code: "WS3",
            title: "AI Builder",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Đặt vấn đề & Sinh UI v1",
                deliverable:
                  "Problem Brief có trích nguồn & Giao diện v1 kèm prompt gốc.",
              },
              {
                session: "Buổi 2",
                title: "Tư duy thành phần & UI v2",
                deliverable:
                  "Đặc tả giao diện (UI spec) & Giao diện v2 tương thích mobile.",
              },
              {
                session: "Buổi 3",
                title: "Thiết kế tác tử & Tự động hoá",
                deliverable:
                  "01 Quy trình tự động chạy được & Bảng đăng ký rủi ro tác tử.",
              },
              {
                session: "Buổi 4",
                title: "Sprint sản phẩm AI for Good",
                deliverable:
                  "Nguyên mẫu AI for Good tương tác được & Solution Canvas.",
              },
              {
                session: "Buổi 5",
                title: "Bảo vệ sản phẩm & Tổng kết",
                deliverable:
                  "Nguyên mẫu hoàn chỉnh, slide bảo vệ, bản ghi demo & tự đánh giá.",
              },
            ],
          },
        ],
        advancedWorkshopMeta: "04 Workshop Advanced / 20 buổi",
        advancedWorkshops: [
          {
            code: "ADV1",
            title: "Vibe Coding",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Tư duy Vibe Coding & thiết lập môi trường",
                deliverable: "Workspace sẵn sàng + brief dự án cá nhân.",
              },
              {
                session: "Buổi 2",
                title: "Prompt → Code: từ ý tưởng đến prototype",
                deliverable: "Prototype chức năng cốt lõi chạy được.",
              },
              {
                session: "Buổi 3",
                title: "Lặp nhanh, debug & refine với AI",
                deliverable:
                  "Bản ghi cải tiến v1 → v2 kèm checklist lỗi đã xử lý.",
              },
              {
                session: "Buổi 4",
                title: "Hoàn thiện & demo sản phẩm",
                deliverable: "Demo 3–5 phút + repo/link sản phẩm.",
              },
              {
                session: "Buổi 5",
                title: "Ship, tài liệu & reflection",
                deliverable:
                  "README ngắn + reflection học tập & hướng mở rộng.",
              },
            ],
          },
          {
            code: "ADV2",
            title: "AI tạo film",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Ý tưởng, kịch bản & storyboard AI",
                deliverable: "Kịch bản ngắn + storyboard 5–8 cảnh.",
              },
              {
                session: "Buổi 2",
                title: "Sinh hình ảnh & nhân vật nhất quán",
                deliverable: "Bộ asset nhân vật/bối cảnh ≥08 frame.",
              },
              {
                session: "Buổi 3",
                title: "Text-to-Video / Image-to-Video",
                deliverable: "Tối thiểu 06 clip thô có ghi chú thông số.",
              },
              {
                session: "Buổi 4",
                title: "Dựng phim, âm thanh & xuất bản",
                deliverable:
                  "Film ngắn 30–90s hoàn chỉnh + phiếu kiểm bản quyền.",
              },
              {
                session: "Buổi 5",
                title: "Xuất bản, bản quyền & portfolio",
                deliverable:
                  "Bản phát hành cuối + portfolio film & checklist C2PA/bản quyền.",
              },
            ],
          },
          {
            code: "ADV3",
            title: "Workflow Agent",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Thiết kế luồng agent & tool calling",
                deliverable: "Sơ đồ workflow agent cho 1 tác vụ thực tế.",
              },
              {
                session: "Buổi 2",
                title: "Nối công cụ & tự động hoá no-code/low-code",
                deliverable: "Workflow chạy được tối thiểu 3 bước.",
              },
              {
                session: "Buổi 3",
                title: "Xử lý lỗi, giám sát & an toàn",
                deliverable: "Bảng rủi ro + quy tắc fallback khi agent lỗi.",
              },
              {
                session: "Buổi 4",
                title: "Tối ưu & bàn giao hệ thống",
                deliverable: "Workflow ổn định + video demo vận hành.",
              },
              {
                session: "Buổi 5",
                title: "Vận hành, giám sát & mở rộng",
                deliverable: "Runbook vận hành + kế hoạch mở rộng workflow.",
              },
            ],
          },
          {
            code: "ADV4",
            title: "Claude Co-work",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Làm việc cùng Claude: vai trò & quy trình",
                deliverable: "Playbook co-work cá nhân (vai trò, checklist).",
              },
              {
                session: "Buổi 2",
                title: "Projects, artifacts & quản lý ngữ cảnh",
                deliverable: "Project Claude với tài liệu/context đã tổ chức.",
              },
              {
                session: "Buổi 3",
                title: "Phân tích, viết & lập kế hoạch đa bước",
                deliverable:
                  "Bộ deliverable mẫu (báo cáo/kế hoạch) do co-work tạo.",
              },
              {
                session: "Buổi 4",
                title: "Quy trình nhóm & chuẩn hoá đầu ra",
                deliverable: "Template co-work + demo quy trình hoàn chỉnh.",
              },
              {
                session: "Buổi 5",
                title: "Chuẩn hoá team playbook & bàn giao",
                deliverable:
                  "Team co-work playbook + checklist bàn giao dự án.",
              },
            ],
          },
        ],
        price: "33.000.000",
      },
    ],
  },
  {
    letter: "B",
    title: "LEVEL B: PROFESSIONAL",
    subtitle: "Dành cho sinh viên & người muốn xây dựng nền tảng chuyên sâu",
    modules: [
      {
        icon: "💻",
        number: 2,
        title: "PYTHON FOR DATA SCIENCE & MACHINE LEARNING FOUNDATIONS",
        description:
          "Từ Python/Colab, tư duy dữ liệu & EDA đến supervised/unsupervised ML, metric, CV và pipeline scale — 3 workshop Basic (Python & Data Science Foundations, ML Core Models, Unsupervised & Scale) và 4 workshop Advanced kết thúc bằng AI Prediction Capstone.",
        theoryMeta: "5.000.000 Đ",
        theorySessions: [
          {
            code: "LT01",
            title: "Python & Google Colab",
            focus:
              "Notebook, biến, 4 kiểu dữ liệu cơ bản, toán tử, f-string, đọc traceback.",
            deliverable: "Phân tích 03 đoạn code: dự đoán đầu ra & chỉ lỗi.",
          },
          {
            code: "LT02",
            title: "Cấu trúc dữ liệu, Điều khiển, Hàm & Module",
            focus: "List, Dict, if/elif/else, for, hàm, import, debugging.",
            deliverable:
              "Sơ đồ logic Grade Bot & cách tách bài toán thành hàm.",
          },
          {
            code: "LT03",
            title: "Tư duy dữ liệu (EDA & Feature Engineering)",
            focus:
              "Làm sạch, phân phối, outlier, rolling feature, time-series.",
            deliverable: "Sơ đồ quy trình dữ liệu & đề xuất 05 feature.",
          },
          {
            code: "LT04",
            title: "Machine Learning Foundations",
            focus:
              "Supervised, Unsupervised, RL; classification, regression, clustering; train/test.",
            deliverable: 'Poster "3 loại Machine Learning" kèm ví dụ minh hoạ.',
          },
          {
            code: "LT05",
            title: "Supervised Models I",
            focus: "kNN, Naive Bayes, Linear Regression, Logistic Regression.",
            deliverable: "Bảng so sánh 04 mô hình nền tảng.",
          },
          {
            code: "LT06",
            title: "Supervised Models II",
            focus:
              "Decision Tree, Ensemble, Random Forest, Gradient Boosting / XGBoost.",
            deliverable: "Sơ đồ so sánh Tree, Random Forest & Boosting.",
          },
          {
            code: "LT07",
            title: "ML Lifecycle & Metrics",
            focus:
              "Vòng đời 8 bước; Accuracy, Precision, Recall, F1, MSE, MAE, R².",
            deliverable:
              "ML Project Canvas & bảng lựa chọn metric có lập luận.",
          },
          {
            code: "LT08",
            title: "Cross-Validation, ROC-AUC & Model Selection",
            focus:
              "k-fold CV, ROC/AUC, Overfit/Underfit, Bias-Variance, Grid/Random Search.",
            deliverable: "Phân tích 03 bảng kết quả model & đề xuất cấu hình.",
          },
          {
            code: "LT09",
            title: "Unsupervised Learning & Anomaly Detection",
            focus: "K-Means, PCA, Customer Segmentation, Isolation Forest.",
            deliverable:
              "Sơ đồ quy trình Customer Segmentation & case anomaly.",
          },
          {
            code: "LT10",
            title: "End-to-End ML, GPU/RAPIDS & Scale",
            focus:
              "GPU vs CPU, RAPIDS (cuDF, cuML), pipeline ML scale, báo cáo dự án.",
            deliverable:
              "Sơ đồ ML Pipeline scale & Project Brief Customer Segmentation.",
          },
        ],
        workshopMeta: "03 Workshop Basic / 16 buổi",
        workshops: [
          {
            code: "WS1",
            title: "Python & Data Science Foundations",
            meta: "6 buổi / 12 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Môi trường Colab & Hello ML",
                deliverable: "Notebook khởi động & 3 lỗi đã sửa.",
              },
              {
                session: "Buổi 2",
                title: "Biến, kiểu dữ liệu & toán tử",
                deliverable: "Notebook Variables & Types với 3 bài toán.",
              },
              {
                session: "Buổi 3",
                title: "String, nhập liệu & định dạng",
                deliverable: "Mini script Profile Card & ghi chú lỗi kiểu.",
              },
              {
                session: "Buổi 4",
                title: "List, Tuple, Dict, Set",
                deliverable:
                  "Notebook quản lý danh sách học sinh (list-of-dict).",
              },
              {
                session: "Buổi 5",
                title: "Cấu trúc điều khiển & vòng lặp",
                deliverable: "Script Grade Bot đúng trên ≥5 bộ test.",
              },
              {
                session: "Buổi 6",
                title: "Hàm, module & refactoring",
                deliverable: "Python Starter Notebook hoàn chỉnh & Reflection.",
              },
            ],
          },
          {
            code: "WS2",
            title: "Machine Learning Core Models & Evaluation",
            meta: "6 buổi / 12 giờ",
            sessions: [
              {
                session: "Buổi 7",
                title: "NumPy & tính toán vector hoá",
                deliverable: "Notebook NumPy với ≥8 thao tác mảng.",
              },
              {
                session: "Buổi 8",
                title: "pandas Series/DataFrame & Audit",
                deliverable: "Data Audit 1 trang cấu trúc CSV.",
              },
              {
                session: "Buổi 9",
                title: "Chọn, lọc & truy vấn pandas",
                deliverable: "Bộ 10 truy vấn nghiệp vụ có kết quả.",
              },
              {
                session: "Buổi 10",
                title: "Data Cleaning",
                deliverable: "Clean Dataset v1 + Data Quality Note.",
              },
              {
                session: "Buổi 11",
                title: "GroupBy, Aggregation & Merge",
                deliverable: "Bảng tổng hợp KPI & Notebook merge.",
              },
              {
                session: "Buổi 12",
                title: "Feature Engineering & Time-Series",
                deliverable: "Data Analysis Notebook + Clean Dataset v2.",
              },
            ],
          },
          {
            code: "WS3",
            title: "Unsupervised, End-to-End ML & Scale",
            meta: "4 buổi / 8 giờ",
            sessions: [
              {
                session: "Buổi 13",
                title: "Thống kê mô tả & Phân phối",
                deliverable: "Bảng phân phối & chỉ số thống kê 1 trang.",
              },
              {
                session: "Buổi 14",
                title: "Trực quan hoá Matplotlib",
                deliverable: "Bộ 04 biểu đồ (line, bar, hist, scatter).",
              },
              {
                session: "Buổi 15",
                title: "Outlier & Tương quan",
                deliverable: "Outlier & Correlation Log (Box plot + Heatmap).",
              },
              {
                session: "Buổi 16",
                title: "EDA Workflow & Storytelling",
                deliverable: "EDA Report (5 biểu đồ, 5 insight, tóm tắt).",
              },
            ],
          },
        ],
        advancedWorkshopMeta: "04 Workshop Advanced / 14 buổi",
        advancedWorkshops: [
          {
            code: "WS4",
            title: "Advanced Data Pipeline & Feature Engineering",
            meta: "4 buổi",
            sessions: [
              {
                session: "Buổi 17",
                title: "Khám phá bài toán ML",
                deliverable: "Bảng phân loại 12 tình huống & sơ đồ 3 loại ML.",
              },
              {
                session: "Buổi 18",
                title: "Tách X/y & Baseline Model",
                deliverable:
                  "Baseline Notebook & checklist chống data leakage.",
              },
              {
                session: "Buổi 19",
                title: "ML Lifecycle & Pipeline",
                deliverable: "ML Project Canvas & sơ đồ lifecycle.",
              },
              {
                session: "Buổi 20",
                title: "Metric & Trade-off",
                deliverable: "Bảng chọn metric & nhận xét overfit/underfit.",
              },
            ],
          },
          {
            code: "WS5",
            title: "Advanced Supervised Learning & Model Optimization",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 21",
                title: "kNN & Naive Bayes",
                deliverable: "Bảng thí nghiệm tham số kNN/Naive Bayes.",
              },
              {
                session: "Buổi 22",
                title: "Linear Regression",
                deliverable: "Regression Notebook & bảng metric MAE/MSE/R².",
              },
              {
                session: "Buổi 23",
                title: "Logistic Regression & Xác suất",
                deliverable: "Bảng threshold trade-off & Confusion matrix.",
              },
              {
                session: "Buổi 24",
                title: "Decision Tree, Random Forest & Boosting",
                deliverable: "So sánh 3 mô hình tree-based & ghi chú overfit.",
              },
              {
                session: "Buổi 25",
                title: "Model Selection Lab",
                deliverable: "Supervised Model Benchmark + Model Card 1 trang.",
              },
            ],
          },
          {
            code: "WS6",
            title: "Advanced Unsupervised & Anomaly Analytics",
            meta: "2 buổi",
            sessions: [
              {
                session: "Buổi 26",
                title: "K-Means & PCA 2D",
                deliverable: "Cluster Profile + biểu đồ PCA 2D + lý do chọn k.",
              },
              {
                session: "Buổi 27",
                title: "Anomaly Detection",
                deliverable: "Unsupervised Case Notebook + Anomaly log.",
              },
            ],
          },
          {
            code: "WS7",
            title: "Advanced AI Prediction Capstone: From Model to Decision",
            meta: "3 buổi",
            sessions: [
              {
                session: "Buổi 28",
                title: "Problem Framing & Discovery",
                deliverable:
                  "Problem Brief + Data Audit + Clean Dataset + Feature List.",
              },
              {
                session: "Buổi 29",
                title: "Prediction Model Sprint",
                deliverable:
                  "Prediction Notebook + Model Benchmark + Selection Note.",
              },
              {
                session: "Buổi 30",
                title: "Insight to Action",
                deliverable:
                  "Predictive Analytics Project Pack (notebook, slide, pitch).",
              },
            ],
          },
        ],
        price: "26.800.000",
      },
      {
        icon: "🧮",
        number: 3,
        title: "ADVANCED MACHINE LEARNING & DEEP LEARNING",
        description:
          "Nền toán cho ML/DL (vector, PCA, gradient, tối ưu, xác suất, Bayes) — 3 workshop Basic (Data Representation & Linear Algebra, Gradient/Loss/Optimization, Probability/Bayes) và 4 workshop Advanced (Feature Engineering, Ensemble/XGBoost, PyTorch CV & Transformers, Capstone).",
        theoryMeta: "5.000.000 Đ",
        theorySessions: [
          {
            code: "LT01",
            title: "Data as Geometry",
            focus:
              "Vector, feature space, dot product, L2 norm, Euclidean, Cosine, embedding.",
            deliverable:
              "Mini-task Vector: 3 vector, tính similarity & giải thích.",
          },
          {
            code: "LT02",
            title: "Matrices, Linear Transform & Scaling",
            focus:
              "Ma trận X, biến đổi tuyến tính, Least Squares, Min-Max vs Z-score.",
            deliverable:
              "Bài nộp phép biến đổi 2D & so sánh phân phối trước/sau scale.",
          },
          {
            code: "LT03",
            title: "Covariance, Eigenvalues & PCA",
            focus:
              "Variance, Covariance, Correlation, Eigenvector/value, Scree plot.",
            deliverable: "Mini-lab PCA trên dataset nhỏ, vẽ 2D projection.",
          },
          {
            code: "LT04",
            title: "Derivatives & Gradients",
            focus:
              "Đạo hàm riêng, Gradient, contour plot, loss surface, saddle points.",
            deliverable: "Contour Plot kèm vector gradient tại ≥3 điểm.",
          },
          {
            code: "LT05",
            title: "Chain Rule, Loss & Regularization",
            focus:
              "Computational graph, Backprop; MSE, MAE, Cross-entropy; L1/L2.",
            deliverable: "03 bài tập Chain Rule & phân tích learning curve.",
          },
          {
            code: "LT06",
            title: "Optimization for Learning",
            focus:
              "GD, Learning rate; Batch/SGD/Mini-batch; Momentum, Adam; Convexity.",
            deliverable: "Mini-lab Optimizer với 3 learning rate.",
          },
          {
            code: "LT07",
            title: "Probability Foundations",
            focus:
              "Biến ngẫu nhiên, Bernoulli, Normal; Expectation, Variance, Noise modeling.",
            deliverable:
              "Mô phỏng xác suất tung đồng xu & đối chiếu nền tảng.",
          },
          {
            code: "LT08",
            title: "Sampling, CLT & Hypothesis Testing",
            focus: "Sampling, CLT, Standard error, CI, p-value, A/B test.",
            deliverable:
              "Báo cáo A/B Test giả lập: Estimate, CI, p-value & kết luận.",
          },
          {
            code: "LT09",
            title: "Bayes & Predictive Uncertainty",
            focus:
              "Bayes rule, Naive Bayes, Logit vs Probability, Calibration.",
            deliverable: "02 bài tập Bayes & bài đọc Calibration plot.",
          },
          {
            code: "LT10",
            title: "Math Toolkit for ML/DL",
            focus:
              "Kết nối Representation → Scaling → Objective → Optimizer → Validation → Uncertainty.",
            deliverable: "One-page Math Checklist áp dụng cho pipeline dự án.",
          },
        ],
        workshopMeta: "03 Workshop Basic / 15 buổi",
        workshops: [
          {
            code: "WS1",
            title: "Data Representation & Linear Algebra for Machine Learning",
            meta: "6 buổi / 12 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Problem Framing & Baseline",
                deliverable:
                  "Problem Brief + Baseline Notebook + metric ban đầu.",
              },
              {
                session: "Buổi 2",
                title: "Linear Models & Regularization",
                deliverable: "So sánh Linear Models + nhận xét L1/L2.",
              },
              {
                session: "Buổi 3",
                title: "KNN & SVM",
                deliverable: "Notebook KNN/SVM + bảng sensitivity theo scale.",
              },
              {
                session: "Buổi 4",
                title: "Decision Trees & Non-linear",
                deliverable: "Tree analysis + Learning curve + bảng so sánh.",
              },
              {
                session: "Buổi 5",
                title: "Metrics & Error Analysis",
                deliverable: "Metric Dashboard + Error Analysis Sheet.",
              },
              {
                session: "Buổi 6",
                title: "Benchmark Review",
                deliverable: "Model Benchmark Report + top-2 candidates.",
              },
            ],
          },
          {
            code: "WS2",
            title: "Gradient, Loss & Optimization for Learning",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Feature Audit & Leakage",
                deliverable: "Feature Audit + Leakage Checklist.",
              },
              {
                session: "Buổi 2",
                title: "Feature Engineering theo kiểu dữ liệu",
                deliverable: "Feature set v1/v2 + Ablation table.",
              },
              {
                session: "Buổi 3",
                title: "Pipeline & Cross-Validation",
                deliverable: "Pipeline chạy được + CV Report.",
              },
              {
                session: "Buổi 4",
                title: "Hyperparameter Search",
                deliverable: "Tuning log + Top configurations.",
              },
              {
                session: "Buổi 5",
                title: "Optimization Review",
                deliverable:
                  "Final Reliable Pipeline + Model Card + Before/After.",
              },
            ],
          },
          {
            code: "WS3",
            title:
              "Probability, Statistics, Bayes & End-to-End Model Reasoning",
            meta: "4 buổi / 8 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Bagging & Random Forest",
                deliverable: "Bagging/RF Notebook + Variance comparison.",
              },
              {
                session: "Buổi 2",
                title: "Boosting (AdaBoost, Gradient Boosting)",
                deliverable: "Boosting Report + Learning curves.",
              },
              {
                session: "Buổi 3",
                title: "XGBoost Practical",
                deliverable: "XGBoost Tuning Log + Best Model Artifact.",
              },
              {
                session: "Buổi 4",
                title: "Decision Board",
                deliverable: "Ensemble Benchmark + Decision Memo.",
              },
            ],
          },
        ],
        advancedWorkshopMeta: "04 Workshop Advanced / 15 buổi",
        advancedWorkshops: [
          {
            code: "WS4",
            title: "Advanced Machine Learning & Feature Engineering",
            meta: "2 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Advanced ML Pipeline & Baseline",
                deliverable:
                  "Advanced ML Brief + Baseline Notebook + metric ban đầu.",
              },
              {
                session: "Buổi 2",
                title: "Feature Engineering & Reliable Pipeline",
                deliverable:
                  "Feature set + Pipeline chạy được + Before/After note.",
              },
            ],
          },
          {
            code: "WS5",
            title: "Advanced Ensemble Learning & XGBoost",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Bagging & Random Forest",
                deliverable: "Bagging/RF Notebook + Variance comparison.",
              },
              {
                session: "Buổi 2",
                title: "Boosting (AdaBoost, Gradient Boosting)",
                deliverable: "Boosting Report + Learning curves.",
              },
              {
                session: "Buổi 3",
                title: "XGBoost Practical",
                deliverable: "XGBoost Tuning Log + Best Model Artifact.",
              },
              {
                session: "Buổi 4",
                title: "Ensemble Benchmark",
                deliverable: "Ensemble Benchmark + Decision Memo.",
              },
              {
                session: "Buổi 5",
                title: "Model Selection & Packaging",
                deliverable: "Final Ensemble Package + Model Card.",
              },
            ],
          },
          {
            code: "WS6",
            title: "Advanced Deep Learning with PyTorch, CV & Transformers",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Tensor, Autograd & Data Pipeline",
                deliverable: "Tensor/Autograd lab + DataLoader Notebook.",
              },
              {
                session: "Buổi 2",
                title: "nn.Module & Training Loop",
                deliverable:
                  "DNN Skeleton + Training/Validation loop + Checkpoint.",
              },
              {
                session: "Buổi 3",
                title: "Scheduler, Debug & Packaging",
                deliverable:
                  "Optimization Experiment + PyTorch DNN Project + README.",
              },
              {
                session: "Buổi 4",
                title: "Computer Vision Pipeline",
                deliverable: "CV Mini-Demo + Error Examples.",
              },
              {
                session: "Buổi 5",
                title: "NLP & Transformers",
                deliverable: "NLP/Transformer Mini-Demo + Concept Map.",
              },
            ],
          },
          {
            code: "WS7",
            title: "Capstone Project",
            meta: "3 buổi",
            sessions: [
              {
                session: "Buổi 1",
                title: "Design Review",
                deliverable: "Project Brief + Experiment Plan + Repo Skeleton.",
              },
              {
                session: "Buổi 2",
                title: "Build & Evaluate",
                deliverable:
                  "Working Project + Experiment Table + Error Analysis.",
              },
              {
                session: "Buổi 3",
                title: "Report & Defense",
                deliverable:
                  "Final Capstone Package (Report, Artifact, Slide, Demo).",
              },
            ],
          },
        ],
        price: "27.000.000",
      },
    ],
  },
  {
    letter: "C",
    title: "LEVEL C: SPECIALIST",
    subtitle: "Dành cho chuyên gia AI & người làm nghiên cứu/phát triển",
    modules: [
      {
        icon: "🌐",
        number: 4,
        title: "COMPUTER VISION, OPTIMIZATION & GPU ACCELERATION",
        description:
          "Từ ảnh số, convolution, tối ưu/backprop đến Classical CV, CNN, detection/segmentation và GPU/CUDA/RAPIDS — 7 workshop thực hành kết thúc Mini-Capstone Computer Vision.",
        theoryMeta: "6.000.000 Đ",
        theorySessions: [
          {
            code: "LT01",
            title: "Ảnh số & Biểu diễn dữ liệu thị giác",
            focus:
              "Pixel matrix, RGB/Grayscale, resolution, crop/resize/normalize, image tensor.",
            deliverable: "Sơ đồ Image Input Pipeline từ ảnh thô đến tensor.",
          },
          {
            code: "LT02",
            title: "Convolution 2D & Filter cổ điển",
            focus: "Kernel, stride, padding; Sobel, Laplacian, Blur, Sharpen.",
            deliverable:
              "Phân tích 04 Kernel mẫu: mục đích & hiệu ứng dự kiến.",
          },
          {
            code: "LT03",
            title: "Vector hoá, Lớp Dense & Gradient",
            focus:
              "Flatten ảnh, y = Wx + b, batch processing, loss surface & gradient descent.",
            deliverable: "Sơ đồ tính toán y = Wx + b & hướng cập nhật loss.",
          },
          {
            code: "LT04",
            title: "Chain Rule, Backprop & Regularization",
            focus:
              "Lan truyền ngược mạng 2–2–1, finite difference, L2 regularization.",
            deliverable:
              "Bảng Backprop mạng nhỏ & giải thích overfit/regularization.",
          },
          {
            code: "LT05",
            title: "Optimizers & Động lực học huấn luyện",
            focus:
              "SGD, Momentum, RMSprop, Adam; learning rate & loss curve hội tụ.",
            deliverable:
              "Bảng so sánh 04 Optimizers: cơ chế, ưu điểm & rủi ro.",
          },
          {
            code: "LT06",
            title: "Classical CV, Covariance & PCA",
            focus:
              "Histogram, Harris corners, SVD/Eigenfaces, nén & giảm nhiễu.",
            deliverable: "Sơ đồ Pipeline Classical CV + PCA.",
          },
          {
            code: "LT07",
            title: "Từ MLP đến CNN",
            focus:
              "Receptive field cục bộ, shared weights, pooling; khối Conv-ReLU-Pool.",
            deliverable: "Sơ đồ mạng CNN 2 blocks kèm chú giải luồng dữ liệu.",
          },
          {
            code: "LT08",
            title: "Metrics, Transfer Learning & Regularization",
            focus:
              "Confusion matrix, Precision/Recall, ROC-AUC; ResNet/VGG, freeze, Augmentation.",
            deliverable:
              "Bảng đọc Confusion Matrix & quy trình Transfer learning.",
          },
          {
            code: "LT09",
            title: "Object Detection & Segmentation",
            focus: "Bounding box, IoU, mAP, YOLO/SSD, NMS; U-Net, Mask R-CNN.",
            deliverable:
              "Sơ đồ CV System (Camera + Model) & tiêu chí end-to-end.",
          },
          {
            code: "LT10",
            title: "GPU, CUDA, RAPIDS & Capstone Blueprint",
            focus: "SIMD, CUDA kernel/thread/block, CuPy/Numba, cuDF/cuML.",
            deliverable:
              "Capstone Blueprint: bài toán, dataset, mô hình, metric & demo plan.",
          },
        ],
        workshopMeta: "03 Workshop Basic / 15 buổi",
        workshops: [
          {
            code: "WS1",
            title: "Computer Vision, Convolution & Neural Network Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Matrix Pixel & Color space",
                deliverable:
                  "Notebook đọc/hiển thị ảnh & chú giải shape/pixel.",
              },
              {
                session: "Buổi 2",
                title: "Image Preprocessing",
                deliverable: "Notebook Preprocessing kèm so sánh trước/sau.",
              },
              {
                session: "Buổi 3",
                title: "Broadcasting & Linear Filters",
                deliverable: "Bảng Brightness/Contrast & Notebook.",
              },
              {
                session: "Buổi 4",
                title: "Convolution 2D Lab",
                deliverable: "Worksheet tính tay + Notebook Convolution 2D.",
              },
              {
                session: "Buổi 5",
                title: "Edge Detection & Filters",
                deliverable: "Notebook xử lý ảnh hoàn chỉnh & bản nhận xét.",
              },
            ],
          },
          {
            code: "WS2",
            title: "Optimization, Backpropagation & Classical Computer Vision",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 6",
                title: "Dense Layer NumPy",
                deliverable: "Notebook Lớp Dense tự cài đặt bằng NumPy.",
              },
              {
                session: "Buổi 7",
                title: "Loss Surface & Gradient Check",
                deliverable: "Notebook Loss Surface 2D & Gradient Check.",
              },
              {
                session: "Buổi 8",
                title: "Backprop Mini-Network",
                deliverable: "Notebook Backprop trên mạng 2–2–1.",
              },
              {
                session: "Buổi 9",
                title: "L2 Regularization",
                deliverable: "Báo cáo thí nghiệm có/không có L2.",
              },
              {
                session: "Buổi 10",
                title: "Optimizer Benchmark",
                deliverable: "Notebook tối ưu hoá thị giác (SGD vs Adam).",
              },
            ],
          },
          {
            code: "WS3",
            title: "CNN, Detection, Segmentation & GPU System Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 11",
                title: "Histogram & Harris Corners",
                deliverable:
                  "Notebook Histogram + ảnh đánh dấu Harris corners.",
              },
              {
                session: "Buổi 12",
                title: "PCA Compression",
                deliverable:
                  "Bảng so sánh số components & chất lượng khôi phục.",
              },
              {
                session: "Buổi 13",
                title: "MyPCA from Scratch",
                deliverable: "Notebook MyPCA bằng NumPy (so sánh sklearn).",
              },
              {
                session: "Buổi 14",
                title: "Eigenfaces",
                deliverable: "Notebook Eigenfaces nhận dạng khuôn mặt.",
              },
              {
                session: "Buổi 15",
                title: "Classical CV Pipeline",
                deliverable: "Classical CV + PCA Pipeline Demo chạy được.",
              },
            ],
          },
        ],
        advancedWorkshopMeta: "04 Workshop Advanced / 15 buổi",
        advancedWorkshops: [
          {
            code: "WS4",
            title: "Advanced CNN Training & Transfer Learning",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 16",
                title: "MLP vs CNN",
                deliverable: "Bảng so sánh số tham số & lý do chọn CNN.",
              },
              {
                session: "Buổi 17",
                title: "Basic CNN Build",
                deliverable: "CNN Notebook & Loss/Accuracy curves.",
              },
              {
                session: "Buổi 18",
                title: "Classification Metrics",
                deliverable: "Confusion Matrix & phân tích lỗi theo lớp.",
              },
              {
                session: "Buổi 19",
                title: "Transfer Learning ResNet/VGG",
                deliverable: "Transfer Learning Notebook + kết quả validation.",
              },
              {
                session: "Buổi 20",
                title: "CNN Regularization",
                deliverable:
                  "Image Classifier hoàn chỉnh & báo cáo Augmentation/Dropout.",
              },
            ],
          },
          {
            code: "WS5",
            title: "Advanced Object Detection & Segmentation",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 21",
                title: "Bounding Box & IoU",
                deliverable: "Worksheet tính IoU & ảnh đánh dấu bounding box.",
              },
              {
                session: "Buổi 22",
                title: "YOLO/SSD Inference",
                deliverable: "Detection Notebook + bảng thử nghiệm confidence.",
              },
              {
                session: "Buổi 23",
                title: "Segmentation Demo",
                deliverable: "Bộ ảnh U-Net/Mask R-CNN mask overlay.",
              },
              {
                session: "Buổi 24",
                title: "Detection/Segmentation Mini-Lab",
                deliverable: "Mini-lab Notebook trên dữ liệu nhóm.",
              },
              {
                session: "Buổi 25",
                title: "CV System Design",
                deliverable: "Detection/Segmentation Demo & sơ đồ CV System.",
              },
            ],
          },
          {
            code: "WS6",
            title: "Advanced GPU Acceleration & Deployment",
            meta: "3 buổi",
            sessions: [
              {
                session: "Buổi 26",
                title: "CPU vs GPU for Vision",
                deliverable: "Sơ đồ xử lý song song CPU/GPU & giải thích.",
              },
              {
                session: "Buổi 27",
                title: "CUDA với CuPy/Numba",
                deliverable: "Benchmark Notebook (NumPy vs CuPy).",
              },
              {
                session: "Buổi 28",
                title: "RAPIDS cuDF/cuML",
                deliverable: "CPU/GPU Benchmark hoàn chỉnh (sklearn vs cuML).",
              },
            ],
          },
          {
            code: "WS7",
            title: "Advanced Computer Vision Capstone Project",
            meta: "2 buổi",
            sessions: [
              {
                session: "Buổi 29",
                title: "Capstone Sprint 1",
                deliverable: "Capstone Blueprint + Repo/Notebook V0.1.",
              },
              {
                session: "Buổi 30",
                title: "Capstone Sprint 2",
                deliverable:
                  "CV Mini-Capstone Package (Repo, Slide, Demo & Self-review).",
              },
            ],
          },
        ],
        price: "33.000.000",
      },
      {
        icon: "💾",
        number: 5,
        title: "GENERATIVE AI, LLMs & INTELLIGENT RAG SYSTEMS",
        description:
          "Từ NLP pipeline, embedding, RNN/Transformer đến LLM API, GenAI có trách nhiệm, Semantic Search/RAG và Conversational AI — kết thúc bằng Capstone Domain Expert AI / Study Bot.",
        theoryMeta: "6.000.000 Đ",
        theorySessions: [
          {
            code: "LT01",
            title: "Hệ sinh thái Text AI & NLP Pipeline",
            focus:
              "Classification, sentiment, QA, summarization; Tokenization, N-gram, Vocabulary.",
            deliverable: "Sơ đồ NLP Pipeline cho 01 use case văn bản tự chọn.",
          },
          {
            code: "LT02",
            title: "Biểu diễn văn bản (BoW, TF-IDF, Embeddings)",
            focus: "Sparse vector vs Dense embedding; Cosine similarity.",
            deliverable: "Bảng so sánh BoW vs TF-IDF vs Embedding.",
          },
          {
            code: "LT03",
            title: "Sequence Modeling (RNN, LSTM, GRU)",
            focus:
              "Dữ liệu chuỗi, hidden state, van kiểm soát, padding & truncation.",
            deliverable: "Sơ đồ Embedding → LSTM → Dense kèm chú giải padding.",
          },
          {
            code: "LT04",
            title: "Seq2Seq & Đánh giá mô hình NLP",
            focus:
              "Encoder-decoder; Accuracy, Precision, Recall, F1, Classification report.",
            deliverable: "Bảng phân tích Confusion Matrix & metric ưu tiên.",
          },
          {
            code: "LT05",
            title: "Self-Attention & Kiến trúc Transformer",
            focus:
              "Self-attention (Q/K/V), Multi-head attention, Transformer block.",
            deliverable:
              "Sơ đồ Self-Attention cho câu ngắn kèm chú giải token.",
          },
          {
            code: "LT06",
            title: "BERT, GPT, T5 & LLM API",
            focus:
              "Encoder-only / Decoder-only / Encoder-Decoder; API, temperature, top-p.",
            deliverable:
              "Bảng chọn kiến trúc cho 6 tasks & sơ đồ Request-Response.",
          },
          {
            code: "LT07",
            title: "Prompt Engineering & Structured Output",
            focus:
              "Role, instruction, context; Zero/Few-shot; Structured output (JSON schema).",
            deliverable: "Bộ 03 Prompts có bối cảnh (≥01 output chuẩn JSON).",
          },
          {
            code: "LT08",
            title: "Generative AI & Responsible AI",
            focus:
              "Discriminative vs Generative; Autoencoder, GAN, Diffusion; Hallucination.",
            deliverable: "Guideline cấu hình GenAI & Checklist Responsible AI.",
          },
          {
            code: "LT09",
            title: "Embeddings, Semantic Search & RAG",
            focus:
              "Vector store (FAISS, Chroma); RAG 5 khối Chunking → Generate.",
            deliverable: "Sơ đồ kiến trúc RAG & checklist giảm hallucination.",
          },
          {
            code: "LT10",
            title: "Conversational AI, Memory & Domain Expert",
            focus: "Turn, intent, slot; Memory; kiến trúc Domain Expert AI.",
            deliverable:
              "Blueprint Domain Expert AI: Corpus, RAG, Memory & Chat loop.",
          },
        ],
        workshopMeta: "03 Workshop Basic / 15 buổi",
        workshops: [
          {
            code: "WS1",
            title: "NLP, Text Representation & Sequence Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Use Case & Pipeline Brief",
                deliverable: "Use Case Brief + sơ đồ NLP Pipeline.",
              },
              {
                session: "Buổi 2",
                title: "Preprocessing & Bag-of-Words",
                deliverable: "Notebook Preprocessing + Feature matrix.",
              },
              {
                session: "Buổi 3",
                title: "TF-IDF & Baseline Classifier",
                deliverable: "Baseline Classifier Notebook + Metric Board.",
              },
              {
                session: "Buổi 4",
                title: "Word & Sentence Embeddings",
                deliverable: "Embedding Similarity Notebook + nhận xét.",
              },
              {
                session: "Buổi 5",
                title: "Mini Project Baseline",
                deliverable: "Text ML Baseline Portfolio hoàn chỉnh.",
              },
            ],
          },
          {
            code: "WS2",
            title: "Transformers, LLMs & Generative AI Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 6",
                title: "Sequence & Context Demo",
                deliverable: "Sequence Demo Notebook + bảng quan sát.",
              },
              {
                session: "Buổi 7",
                title: "LSTM Text Classification",
                deliverable: "LSTM Sentiment Notebook + Training curves.",
              },
              {
                session: "Buổi 8",
                title: "Seq2Seq Intro",
                deliverable: "Seq2Seq Demo Notebook (Dịch/Tóm tắt).",
              },
              {
                session: "Buổi 9",
                title: "Evaluation for NLP",
                deliverable: "Metric Analysis Sheet (Precision/Recall/F1).",
              },
              {
                session: "Buổi 10",
                title: "Benchmark Classic vs Deep Text",
                deliverable: "Sequence Text Benchmark + kết luận chọn mô hình.",
              },
            ],
          },
          {
            code: "WS3",
            title: "RAG, Conversational AI & Domain Assistant Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 11",
                title: "Self-Attention Heatmap",
                deliverable: "Attention Worksheet + Heatmap chú giải.",
              },
              {
                session: "Buổi 12",
                title: "BERT, GPT, T5 Lab",
                deliverable: "Bảng so sánh 3 dòng kiến trúc Transformer.",
              },
              {
                session: "Buổi 13",
                title: "Working with LLM APIs",
                deliverable: "LLM API Notebook + Request/Response Log.",
              },
              {
                session: "Buổi 14",
                title: "Prompt Engineering Basics",
                deliverable: "Prompt Comparison Sheet (Zero vs Few-shot).",
              },
              {
                session: "Buổi 15",
                title: "Advanced Prompt & JSON Output",
                deliverable: "Structured Output Test Pack (JSON Schema).",
              },
            ],
          },
        ],
        advancedWorkshopMeta: "04 Workshop Advanced / 15 buổi",
        advancedWorkshops: [
          {
            code: "WS4",
            title: "Advanced Generative AI & Prompt Systems",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 16",
                title: "GenAI Landscape Map",
                deliverable: "GenAI Use Case Map.",
              },
              {
                session: "Buổi 17",
                title: "Text Generation Control",
                deliverable: "Generation Parameter Matrix (Temperature/Top-p).",
              },
              {
                session: "Buổi 18",
                title: "Multi-step Prompt Workflow",
                deliverable: "Multi-step Prompt Workflow (Phác thảo → Refine).",
              },
              {
                session: "Buổi 19",
                title: "Text-to-Image & Diffusion",
                deliverable: "Bộ ảnh minh hoạ + Prompt Log & Constraints.",
              },
              {
                session: "Buổi 20",
                title: "Creative Pack Assembly",
                deliverable: "Creative GenAI Pack + Responsible AI Checklist.",
              },
            ],
          },
          {
            code: "WS5",
            title: "Advanced RAG Systems & Retrieval Optimization",
            meta: "5 buổi",
            sessions: [
              {
                session: "Buổi 21",
                title: "Embedding Similarity Recap",
                deliverable: "Similarity Notebook + nhận xét ngữ nghĩa.",
              },
              {
                session: "Buổi 22",
                title: "Semantic Search Engine",
                deliverable: "Semantic Search Notebook (FAISS/Chroma Top-k).",
              },
              {
                session: "Buổi 23",
                title: "RAG Architecture Design",
                deliverable: "RAG Architecture Diagram.",
              },
              {
                session: "Buổi 24",
                title: "RAG Mini Build",
                deliverable: "RAG Mini Notebook + test set câu hỏi & kết quả.",
              },
              {
                session: "Buổi 25",
                title: "Improve & Evaluate RAG",
                deliverable:
                  "RAG Mini Assistant hoàn chỉnh + báo cáo cải thiện.",
              },
            ],
          },
          {
            code: "WS6",
            title: "Advanced Conversational Agents & Memory",
            meta: "3 buổi",
            sessions: [
              {
                session: "Buổi 26",
                title: "Conversational Principles",
                deliverable: "Conversation Quality Checklist.",
              },
              {
                session: "Buổi 27",
                title: "FAQ Bot Baseline",
                deliverable:
                  "FAQ Bot Notebook (TF-IDF + Cosine) + Failure Cases.",
              },
              {
                session: "Buổi 28",
                title: "Chatbot với LLM Memory",
                deliverable:
                  "Conversational AI Prototype (Chat loop có Memory).",
              },
            ],
          },
          {
            code: "WS7",
            title: "Advanced Domain Expert AI Capstone Project",
            meta: "2 buổi",
            sessions: [
              {
                session: "Buổi 29",
                title: "Capstone Build",
                deliverable:
                  "Capstone Blueprint + Prototype V0 (RAG + Memory).",
              },
              {
                session: "Buổi 30",
                title: "Capstone Demo",
                deliverable:
                  "Domain Expert AI / Study Bot hoàn chỉnh, Slide & Demo.",
              },
            ],
          },
        ],
        price: "33.000.000",
      },
    ],
  },
  {
    letter: "D",
    title: "LEVEL D: EXPERT",
    subtitle: "Dành cho các lãnh đạo công nghệ & người muốn khởi nghiệp AI",
    modules: [
      {
        icon: "🧊",
        number: 6,
        title: "APPLIED AI PRODUCT STUDIO & CAPSTONE",
        description:
          "Tư duy sản phẩm AI từ ý tưởng đến Demo Day: Design Thinking, kiến trúc, AI Sandbox, MVP, logging, UX, guardrails, storytelling và đóng gói portfolio — 7 workshop thực hành theo sprint.",
        theoryMeta: "10.000.000 Đ",
        theorySessions: [
          {
            code: "LT01",
            title: "AI Product Studio & Product Mindset",
            focus:
              "Prototype vs MVP vs AI Product; Outcome-first; Happy path; AI Sandbox.",
            deliverable:
              "Product Idea Card: vấn đề, người dùng, đầu ra AI, phạm vi demo.",
          },
          {
            code: "LT02",
            title: "Design Thinking & Project Charter",
            focus:
              "Problem Statement (Who-What-Why-Pain-Goal); Scope, Success criteria.",
            deliverable:
              "Problem Statement + Project Charter (1 trang) khóa scope.",
          },
          {
            code: "LT03",
            title: "AI Solution Architecture & Tech Stack",
            focus:
              "Kiến trúc UI → AI Core → Data → Output; AI Lego Canvas; chọn tech stack.",
            deliverable:
              "Solution Architecture Diagram & Tech Stack Decision Sheet.",
          },
          {
            code: "LT04",
            title: "AI Sandbox, Vibe Coding & AI-Assisted Dev",
            focus:
              "Vibe coding có kiểm soát; Notebook-first vs VS Code + Sandbox.",
            deliverable: "Code Reading Note: phân tích 01 hàm sandbox.",
          },
          {
            code: "LT05",
            title: "MVP Prototyping & Domain Data",
            focus:
              "Happy path MVP; prompt/logic bổ trợ; nạp & chuẩn hoá dữ liệu domain.",
            deliverable:
              "MVP Plan: happy path, input, AI core, rule/prompt & tiêu chí.",
          },
          {
            code: "LT06",
            title: "Logging, Observability & Behavior Analysis",
            focus:
              "Schema log; chẩn đoán lỗi code/dữ liệu/model; phân tích hành vi từ log.",
            deliverable: "Log Schema + Error Review Template cho AI product.",
          },
          {
            code: "LT07",
            title: "AI UX, UI Integration & Multimodal",
            focus: "One-screen-one-goal; trạng thái UI; Streamlit/Gradio.",
            deliverable:
              "User Flow + Screen State Matrix cho prototype capstone.",
          },
          {
            code: "LT08",
            title: "Guardrails, Safety & User Testing",
            focus:
              "Lọc đầu vào, topic limit, fallback, disclaimer; kịch bản user testing.",
            deliverable: "Guardrail Checklist + User Testing Plan.",
          },
          {
            code: "LT09",
            title: "Product Evaluation, Optimization & Storytelling",
            focus: "Product metrics; Cache/context optimization; Pitch Deck.",
            deliverable:
              "Product Metric Sheet + Pitch Deck Outline (5–7 slide).",
          },
          {
            code: "LT10",
            title: "Launch Readiness, Portfolio & Reflection",
            focus:
              "README; AI Product One-Pager; Demo Day checklist; Future Work.",
            deliverable:
              "Portfolio Packaging Checklist: README, One-pager, Demo flow.",
          },
        ],
        workshopMeta: "07 Workshop Basic / 30 buổi",
        workshops: [
          {
            code: "WS1",
            title:
              "AI Product Discovery, Architecture & Assisted Build Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 1",
                title: "Sandbox Onboarding",
                deliverable: "Sandbox Onboarding Checklist + Function Map.",
              },
              {
                session: "Buổi 2",
                title: "Vibe Coding với VS Code/AI",
                deliverable: "Code Reading & AI-Assisted Editing Note.",
              },
              {
                session: "Buổi 3",
                title: "Problem Framing",
                deliverable: "Problem Statement phiên bản đã phản biện.",
              },
              {
                session: "Buổi 4",
                title: "AI Lego Canvas Mapping",
                deliverable: "AI Lego Canvas + Technical Direction.",
              },
              {
                session: "Buổi 5",
                title: "Team Formation & Charter",
                deliverable: "Project Charter (1 trang) đã khóa scope.",
              },
            ],
          },
          {
            code: "WS2",
            title: "MVP, Observability, UX & Safety Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 6",
                title: "LLM & RAG Starter",
                deliverable: "LLM/RAG Starter Notebook + Observation log.",
              },
              {
                session: "Buổi 7",
                title: "Vision Starter",
                deliverable:
                  "Vision Starter Test Sheet (confidence threshold).",
              },
              {
                session: "Buổi 8",
                title: "Data/ML & Anomaly Starter",
                deliverable: "Anomaly Starter Notebook + biểu đồ highlight.",
              },
              {
                session: "Buổi 9",
                title: "UI Starter (Streamlit/Gradio)",
                deliverable: "UI Starter đã chỉnh sửa & nối backend.",
              },
              {
                session: "Buổi 10",
                title: "Architecture Lock",
                deliverable:
                  "Solution Architecture Diagram + Tech Stack Decision.",
              },
            ],
          },
          {
            code: "WS3",
            title: "Evaluation, Optimization, Launch & Portfolio Foundations",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 11",
                title: "Prototype V0.1 (Happy Path)",
                deliverable: "MVP V0.1 + Limitations List.",
              },
              {
                session: "Buổi 12",
                title: "Smart Prompt & Logic",
                deliverable: "Before/After Improvement Report.",
              },
              {
                session: "Buổi 13",
                title: "Domain Data Integration",
                deliverable: "Domain Data Pack + Integrated MVP.",
              },
              {
                session: "Buổi 14",
                title: "Logging & Behavior Observation",
                deliverable: "AI Behavior Log + Error Review.",
              },
              {
                session: "Buổi 15",
                title: "Sprint Review 1",
                deliverable: "MVP V0.2 + Sprint 2 Backlog.",
              },
            ],
          },
          {
            code: "WS4",
            title: "Advanced AI Product Architecture & Orchestration",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 16",
                title: "AI Product UX Design",
                deliverable: "Wireframe + UI phiên bản đầu.",
              },
              {
                session: "Buổi 17",
                title: "Stable UI ↔ Sandbox Integration",
                deliverable: "Integrated MVP V0.3 + Integration Checklist.",
              },
              {
                session: "Buổi 18",
                title: "Multimodal Extension (Optional)",
                deliverable: "Multimodal/Visualization Enhancement.",
              },
              {
                session: "Buổi 19",
                title: "Guardrails & Safety Controls",
                deliverable: "Guardrail Checklist + MVP đã tích hợp Safety.",
              },
              {
                session: "Buổi 20",
                title: "Internal User Testing",
                deliverable: "User Testing Report + Top 3 Fixes.",
              },
            ],
          },
          {
            code: "WS5",
            title: "Advanced AI Quality, Safety & Optimization",
            meta: "5 buổi / 10 giờ",
            sessions: [
              {
                session: "Buổi 21",
                title: "Product Metrics & Evaluation",
                deliverable: "Product Metric Sheet + Baseline result.",
              },
              {
                session: "Buổi 22",
                title: "Lightweight Optimization",
                deliverable: "Optimization Benchmark (Trước vs Sau).",
              },
              {
                session: "Buổi 23",
                title: "Documentation & README",
                deliverable: "Standard README hoàn chỉnh + Media minh hoạ.",
              },
              {
                session: "Buổi 24",
                title: "Storytelling & Pitch Deck",
                deliverable: "Pitch Deck phiên bản 1 (5–7 slide).",
              },
              {
                session: "Buổi 25",
                title: "Dry-run Demo Day",
                deliverable:
                  "Product Readiness Pack (Feedback Log + Final Fix List).",
              },
            ],
          },
          {
            code: "WS6",
            title: "Advanced Launch, Product Operations & Portfolio",
            meta: "3 buổi / 6 giờ",
            sessions: [
              {
                session: "Buổi 26",
                title: "Final Polish & Bug Fix",
                deliverable: "Release Candidate V1.0 + Final QA Checklist.",
              },
              {
                session: "Buổi 27",
                title: "One-Pager & Poster",
                deliverable: "AI Product One-Pager / Poster trưng bày.",
              },
              {
                session: "Buổi 28",
                title: "Tech Review & Portfolio Packaging",
                deliverable: "Portfolio Package hoàn chỉnh + Future Work.",
              },
            ],
          },
          {
            code: "WS7",
            title: "Advanced Capstone Technical Defense & Reflection",
            meta: "2 buổi / 4 giờ",
            sessions: [
              {
                session: "Buổi 29",
                title: "Official Demo Day",
                deliverable: "Final AI Product + Rubric Score.",
              },
              {
                session: "Buổi 30",
                title: "Retrospective & Reflection",
                deliverable:
                  "Bài Reflection cá nhân (1–2 trang) & Next-Step Plan.",
              },
            ],
          },
        ],
        price: "30.000.000",
      },
    ],
  },
];
