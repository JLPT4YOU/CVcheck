export type Language = 'vi' | 'ja'

export const translations = {
  vi: {
    // Header
    title: 'CV Checker AI',
    subtitle: 'Phân tích CV ứng viên bằng Gemini AI - Hỗ trợ HR đưa ra quyết định tuyển dụng chính xác',
    
    // API Key Section
    apiKeyTitle: 'Gemini API Key',
    apiKeyDesc: 'Nhập API key của bạn từ Google AI Studio',
    apiKeyPlaceholder: 'AIza...',
    checkKeyBtn: 'Check Key',
    saveBtn: 'Lưu',
    deleteBtn: 'Delete',
    validKey: 'API Key hợp lệ ✓',
    invalidKey: 'API Key không hợp lệ',
    checking: 'Kiểm tra...',
    enterKeyFirst: 'Nhập API Key trước',
    keyRequired: 'Vui lòng nhập API Key',
    invalidKeyError: 'API Key không hợp lệ hoặc đã hết hạn',
    checkKeyError: 'Không thể kiểm tra API Key. Vui lòng thử lại.',

    // Job Information
    jobInfoTitle: 'Thông tin công việc',
    jobInfoDesc: 'Mô tả vị trí tuyển dụng và yêu cầu',
    jobTitle: 'Vị trí tuyển dụng *',
    jobTitlePlaceholder: 'VD: Frontend Developer',
    jobDesc: 'Mô tả công việc *',
    jobDescPlaceholder: 'Mô tả chi tiết về công việc, trách nhiệm...',
    skills: 'Kỹ năng yêu cầu',
    skillsPlaceholder: 'VD: React, TypeScript, Node.js, Git...',
    experience: 'Kinh nghiệm yêu cầu',
    experiencePlaceholder: 'VD: 2-3 năm kinh nghiệm',

    // CV Upload
    cvUploadTitle: 'Upload CV',
    cvUploadDesc: 'Tải lên CV của ứng viên (định dạng PDF)',
    selectPDF: 'Click để chọn file PDF',
    uploading: 'Đang upload...',
    uploadingPDF: 'Đang upload...',
    pdfOnly: 'Chỉ hỗ trợ file PDF',
    uploadError: 'Không thể upload file PDF. Vui lòng thử lại.',
    uploadRequired: 'Vui lòng upload CV',

    // Analyze Button
    analyzeBtn: 'Phân tích CV',
    analyzing: 'Đang phân tích...',
    fillJobInfo: 'Vui lòng nhập đầy đủ thông tin công việc',

    // Results
    matchScore: 'Độ phù hợp',
    recommendation: 'Khuyến nghị',
    matchedSkills: '✓ Kỹ năng phù hợp',
    missingSkills: '⚠ Kỹ năng còn thiếu',
    strengths: 'Điểm mạnh',
    weaknesses: 'Điểm cần cải thiện',
    detailedAnalysis: 'Phân tích chi tiết',
    resultPlaceholder: 'Kết quả phân tích sẽ hiển thị ở đây',

    // Language
    language: 'Ngôn ngữ',
    vietnamese: 'Tiếng Việt',
    japanese: '日本語',
  },
  ja: {
    // Header
    title: 'CV Checker AI',
    subtitle: 'Gemini AIを使用して候補者のCVを分析し、採用担当者が正確な採用決定を下すのをサポートします',
    
    // API Key Section
    apiKeyTitle: 'Gemini API キー',
    apiKeyDesc: 'Google AI StudioからあなたのAPIキーを入力してください',
    apiKeyPlaceholder: 'AIza...',
    checkKeyBtn: 'キーをチェック',
    saveBtn: '保存',
    deleteBtn: '削除',
    validKey: 'APIキーは有効です ✓',
    invalidKey: 'APIキーは無効です',
    checking: 'チェック中...',
    enterKeyFirst: 'まずAPIキーを入力してください',
    keyRequired: 'APIキーを入力してください',
    invalidKeyError: 'APIキーが無効であるか、期限切れです',
    checkKeyError: 'APIキーをチェックできません。もう一度お試しください。',

    // Job Information
    jobInfoTitle: '職務情報',
    jobInfoDesc: '職務内容と要件を説明してください',
    jobTitle: '職務名 *',
    jobTitlePlaceholder: '例：フロントエンド開発者',
    jobDesc: '職務説明 *',
    jobDescPlaceholder: '職務の詳細説明、責任...',
    skills: '必要なスキル',
    skillsPlaceholder: '例：React、TypeScript、Node.js、Git...',
    experience: '必要な経験',
    experiencePlaceholder: '例：2～3年の経験',

    // CV Upload
    cvUploadTitle: 'CVをアップロード',
    cvUploadDesc: '候補者のCV（PDF形式）をアップロードしてください',
    selectPDF: 'クリックしてPDFファイルを選択',
    uploading: 'アップロード中...',
    uploadingPDF: 'アップロード中...',
    pdfOnly: 'PDFファイルのみサポートされています',
    uploadError: 'PDFファイルをアップロードできません。もう一度お試しください。',
    uploadRequired: 'CVをアップロードしてください',

    // Analyze Button
    analyzeBtn: 'CVを分析',
    analyzing: '分析中...',
    fillJobInfo: '職務情報を完全に入力してください',

    // Results
    matchScore: 'マッチスコア',
    recommendation: '推奨事項',
    matchedSkills: '✓ マッチしたスキル',
    missingSkills: '⚠ 不足しているスキル',
    strengths: '強み',
    weaknesses: '改善が必要な点',
    detailedAnalysis: '詳細分析',
    resultPlaceholder: '分析結果がここに表示されます',

    // Language
    language: '言語',
    vietnamese: 'Tiếng Việt',
    japanese: '日本語',
  }
}

export function getTranslation(lang: Language, key: keyof typeof translations.vi): string {
  const langTranslations = translations[lang]
  return (langTranslations[key as keyof typeof langTranslations] as string) || translations.vi[key]
}
