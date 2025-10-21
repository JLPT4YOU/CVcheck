# CV Checker - AI-Powered Resume Analysis

Hệ thống phân tích CV ứng viên sử dụng Gemini 2.5 Flash AI để đánh giá độ phù hợp với vị trí tuyển dụng.

## Tính năng

- ✅ Upload CV (PDF format) với File API
- ✅ Nhập thông tin Job Description
- ✅ Phân tích tự động bằng **Gemini 2.5 Flash**
- ✅ **Native PDF Vision** - Gemini đọc trực tiếp PDF, hiểu layout & formatting
- ✅ Đánh giá độ phù hợp với điểm số
- ✅ Hiển thị điểm mạnh/yếu của ứng viên
- ✅ BYOK - Bring Your Own Key (User tự cung cấp Gemini API key)
- ✅ Hỗ trợ file PDF lớn (không giới hạn 20MB)

## Cài đặt

```bash
npm install
```

## Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Lấy Gemini API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo API key mới
3. Copy và paste vào ứng dụng

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **AI:** Google Gemini 2.5 Flash API
- **PDF Processing:** File API (Native PDF Vision)
- **Icons:** Lucide React
- **SDK:** @google/genai v1.25.0

## Nâng cấp từ phiên bản cũ

Phiên bản mới này đã được nâng cấp với:
- ✨ **Gemini 2.5 Flash** - Model mới nhất, nhanh hơn và chính xác hơn
- 🔍 **Native PDF Vision** - Không cần extract text, Gemini đọc trực tiếp PDF
- 📁 **File API** - Upload file lên Gemini, hỗ trợ file lớn
- ⚡ **Hiệu suất tốt hơn** - Best price-performance ratio
