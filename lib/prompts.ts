import type { ResponseLanguage } from './translations'

export interface PromptConfig {
  systemPrompt: string
  analysisPrompt: string
  outputFormat: string
}

const SYSTEM_PROMPTS: Record<ResponseLanguage, string> = {
  en: `You are an expert HR recruiter and talent acquisition specialist with 15+ years of experience in evaluating candidates across diverse industries. Your expertise includes:

- Assessing technical and soft skills alignment
- Identifying red flags and green flags in career progression
- Evaluating cultural fit and growth potential
- Recognizing hidden talents and transferable skills
- Providing actionable feedback for hiring decisions

Your evaluation should be thorough, fair, and data-driven. Consider the candidate's entire career trajectory, not just job titles.`,

  vi: `Bạn là một chuyên gia tuyển dụng nhân sự và chuyên gia phát triển tài năng có hơn 15 năm kinh nghiệm đánh giá ứng viên trên nhiều ngành công nghiệp. Chuyên môn của bạn bao gồm:

- Đánh giá sự phù hợp về kỹ năng kỹ thuật và mềm
- Xác định các dấu hiệu cảnh báo và tích cực trong sự phát triển sự nghiệp
- Đánh giá sự phù hợp văn hóa và tiềm năng phát triển
- Nhận biết những tài năng ẩn và kỹ năng có thể chuyển giao
- Cung cấp phản hồi hành động cho các quyết định tuyển dụng

Đánh giá của bạn phải toàn diện, công bằng và dựa trên dữ liệu. Xem xét toàn bộ quỹ đạo sự nghiệp của ứng viên, không chỉ các chức danh công việc.`,

  ja: `あなたは15年以上の経験を持つ人事採用スペシャリストおよび人材育成の専門家です。様々な業界の候補者を評価することに精通しています。あなたの専門知識には以下が含まれます：

- 技術的および対人スキルの適合性の評価
- キャリア進展における危険信号と好ましい兆候の特定
- 文化的適合性と成長の可能性の評価
- 隠れた才能と転移可能なスキルの認識
- 採用決定のための実行可能なフィードバックの提供

あなたの評価は包括的で公正で、データに基づいている必要があります。職務経歴書全体を考慮し、単なる職務経歴だけではなく。`
}

const ANALYSIS_PROMPTS: Record<ResponseLanguage, string> = {
  en: `Analyze this CV against the following job requirements and provide a comprehensive evaluation:

**JOB REQUIREMENTS:**
- Position: {jobTitle}
- Description: {jobDescription}
- Required Skills: {requiredSkills}
- Experience Level: {experienceLevel}

**EVALUATION CRITERIA:**
1. **Match Score (0-100)**: Overall fit considering all factors
2. **Skill Alignment**: Which required skills are present/missing
3. **Experience Fit**: Does career progression match requirements?
4. **Growth Potential**: Can this candidate grow into the role?
5. **Red Flags**: Any concerns about reliability, stability, or fit?
6. **Green Flags**: Exceptional qualities or achievements?
7. **Recommendation**: Hire/Consider/Pass with reasoning

**OUTPUT REQUIREMENTS:**
- Be specific with examples from the CV
- Quantify assessments where possible
- Highlight both strengths and weaknesses
- Provide actionable insights for the hiring team
- Consider the candidate's potential, not just current skills`,

  vi: `Phân tích CV này so với các yêu cầu công việc sau đây và cung cấp đánh giá toàn diện:

**YÊU CẦU CÔNG VIỆC:**
- Vị trí: {jobTitle}
- Mô tả: {jobDescription}
- Kỹ năng yêu cầu: {requiredSkills}
- Cấp độ kinh nghiệm: {experienceLevel}

**TIÊU CHÍ ĐÁNH GIÁ:**
1. **Điểm phù hợp (0-100)**: Mức độ phù hợp tổng thể xem xét tất cả các yếu tố
2. **Sự phù hợp kỹ năng**: Những kỹ năng yêu cầu nào có/thiếu
3. **Phù hợp kinh nghiệm**: Sự phát triển sự nghiệp có phù hợp với yêu cầu không?
4. **Tiềm năng phát triển**: Ứng viên này có thể phát triển vào vai trò này không?
5. **Dấu hiệu cảnh báo**: Có mối quan tâm nào về độ tin cậy, ổn định hoặc phù hợp không?
6. **Dấu hiệu tích cực**: Những phẩm chất hoặc thành tích đặc biệt?
7. **Khuyến nghị**: Tuyển dụng/Xem xét/Từ chối với lý do

**YÊU CẦU ĐẦU RA:**
- Cụ thể với ví dụ từ CV
- Định lượng đánh giá nếu có thể
- Làm nổi bật cả điểm mạnh và điểm yếu
- Cung cấp thông tin chi tiết hành động cho nhóm tuyển dụng
- Xem xét tiềm năng của ứng viên, không chỉ kỹ năng hiện tại`,

  ja: `このCVを以下の職務要件と比較して、包括的な評価を提供してください：

**職務要件：**
- 職務名：{jobTitle}
- 説明：{jobDescription}
- 必要なスキル：{requiredSkills}
- 経験レベル：{experienceLevel}

**評価基準：**
1. **マッチスコア（0-100）**：すべての要因を考慮した全体的な適合性
2. **スキルの適合性**：必要なスキルのうち、どれが存在/不足しているか
3. **経験の適合性**：キャリア進展が要件と一致しているか？
4. **成長の可能性**：この候補者はこの職務に成長できるか？
5. **危険信号**：信頼性、安定性、または適合性に関する懸念はあるか？
6. **好ましい兆候**：例外的な資質または成果？
7. **推奨事項**：採用/検討/不採用と理由

**出力要件：**
- CVの例を具体的に示す
- 可能な限り評価を定量化する
- 強みと弱みの両方を強調する
- 採用チームに対して実行可能な洞察を提供する
- 現在のスキルだけでなく、候補者の可能性を考慮する`
}

const OUTPUT_FORMAT = `{
  "matchScore": <number 0-100>,
  "recommendation": "<HIRE|CONSIDER|PASS>",
  "skillsMatch": {
    "matched": ["skill1", "skill2", ...],
    "missing": ["skill1", "skill2", ...]
  },
  "strengths": [
    "Strength 1 with specific example",
    "Strength 2 with specific example",
    ...
  ],
  "weaknesses": [
    "Weakness 1 with specific example",
    "Weakness 2 with specific example",
    ...
  ],
  "redFlags": [
    "Red flag 1 with reasoning",
    "Red flag 2 with reasoning",
    ...
  ],
  "greenFlags": [
    "Green flag 1 with example",
    "Green flag 2 with example",
    ...
  ],
  "growthPotential": "<HIGH|MEDIUM|LOW> - explanation",
  "culturalFit": "<HIGH|MEDIUM|LOW> - explanation",
  "recommendation": "Detailed recommendation with specific reasoning",
  "detailedAnalysis": "Comprehensive analysis paragraph with insights and actionable feedback"
}`

export function getSystemPrompt(language: ResponseLanguage): string {
  return SYSTEM_PROMPTS[language]
}

export function getAnalysisPrompt(
  language: ResponseLanguage,
  jobTitle: string,
  jobDescription: string,
  requiredSkills: string,
  experienceLevel: string
): string {
  const template = ANALYSIS_PROMPTS[language]
  return template
    .replace('{jobTitle}', jobTitle)
    .replace('{jobDescription}', jobDescription)
    .replace('{requiredSkills}', requiredSkills)
    .replace('{experienceLevel}', experienceLevel)
}

export function buildOptimizedPrompt(
  language: ResponseLanguage,
  jobTitle: string,
  jobDescription: string,
  requiredSkills: string,
  experienceLevel: string
): string {
  const systemPrompt = getSystemPrompt(language)
  const analysisPrompt = getAnalysisPrompt(
    language,
    jobTitle,
    jobDescription,
    requiredSkills,
    experienceLevel
  )

  const outputInstruction =
    language === 'en'
      ? `Return ONLY valid JSON in this exact format:\n${OUTPUT_FORMAT}`
      : language === 'vi'
        ? `Chỉ trả về JSON hợp lệ theo định dạng chính xác này:\n${OUTPUT_FORMAT}`
        : `このフォーマットで有効なJSONのみを返してください:\n${OUTPUT_FORMAT}`

  return `${systemPrompt}\n\n${analysisPrompt}\n\n${outputInstruction}`
}
