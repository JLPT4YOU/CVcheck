# 🚀 Nâng cấp lên Gemini 2.5 Flash + File API

## Tổng quan

Ứng dụng CV Checker đã được nâng cấp hoàn toàn để sử dụng các công nghệ mới nhất từ Google Gemini.

## Thay đổi chính

### 1. Model AI

**Trước:** Gemini 1.5 Flash  
**Sau:** **Gemini 2.5 Flash**

- Model mới nhất từ Google (2025)
- Best price-performance ratio
- Nhanh hơn và chính xác hơn

### 2. PDF Processing

**Trước:** pdf-parse (extract text)  
**Sau:** **File API (Native PDF Vision)**

- Gemini đọc trực tiếp PDF
- Hiểu layout, charts, tables, formatting
- Không mất thông tin khi extract
- Hỗ trợ file lớn (không giới hạn 20MB)

### 3. SDK

**Trước:** `@google/generative-ai` v0.21.0  
**Sau:** `@google/genai` v1.25.0

- SDK mới với File API support
- API design tốt hơn
- TypeScript types đầy đủ

## Thay đổi kỹ thuật

### Dependencies

```diff
- "@google/generative-ai": "^0.21.0"
- "pdf-parse": "^1.1.1"
- "@types/pdf-parse": "^1.1.4"
+ "@google/genai": "^1.25.0"
```

### API Routes

**`/api/extract-pdf/route.ts`**
- Upload file lên Gemini File API
- Trả về file URI thay vì text
- Đợi file processing hoàn tất

**`/api/analyze-cv/route.ts`**
- Nhận file URI thay vì text
- Sử dụng `gemini-2.5-flash` model
- Native PDF processing

### Frontend Changes

**`app/page.tsx`**
- State mới: `cvFileUri`, `cvMimeType`, `uploading`
- Upload với API key
- Hiển thị trạng thái upload
- Gửi file URI thay vì text tới API

### Types

**`types/cv-analysis.ts`**
```diff
interface AnalysisRequest {
  jobDescription: JobDescription
- cvText: string
+ cvFileUri?: string
+ cvMimeType?: string
  apiKey: string
}
```

## Luồng hoạt động mới

```
1. User nhập API Key
2. User upload PDF → File API
   - Upload file lên Gemini server
   - Nhận file URI
3. User click "Phân tích"
4. Backend gọi Gemini với file URI
5. Gemini đọc PDF và phân tích
6. Trả về kết quả
```

## Lợi ích

✅ **Chính xác hơn** - Native PDF vision  
✅ **Nhanh hơn** - Gemini 2.5 Flash  
✅ **Hỗ trợ file lớn** - Không giới hạn 20MB  
✅ **Hiểu context tốt hơn** - Layout, formatting  
✅ **Hiện đại** - SDK và model mới nhất  

## Breaking Changes

⚠️ **Quan trọng:** User phải nhập API Key TRƯỚC khi upload CV

Lý do: File cần được upload lên Gemini server ngay khi chọn file.

## Testing

Đã test:
- ✅ Upload PDF với File API
- ✅ Phân tích CV với Gemini 2.5 Flash
- ✅ UI/UX với uploading state
- ✅ Error handling

## Server Info

- Development server: http://localhost:3002
- Production ready: `npm run build && npm start`

## Ghi chú

- File PDF được upload lên Gemini server (tạm thời)
- API key không được lưu trữ
- Processing time có thể dài hơn với file lớn (do upload)

---

**Ngày nâng cấp:** 21/10/2025  
**Version:** 2.0.0  
**Model:** gemini-2.5-flash
