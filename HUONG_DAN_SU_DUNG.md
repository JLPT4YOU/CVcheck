# Hướng dẫn sử dụng CV Checker

## 🚀 Ứng dụng đã được nâng cấp!

Phiên bản mới với **Gemini 2.5 Flash** và **File API**

Ứng dụng đang chạy tại: **http://localhost:3000**

## 📋 Các bước sử dụng

### Bước 1: Lấy Gemini API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google
3. Click "Create API Key"
4. Copy API key vừa tạo

### Bước 2: Sử dụng ứng dụng (ĐÃ THAY ĐỔI)

1. **Nhập Gemini API Key** vào ô đầu tiên (BẮT BUỘC TRƯỚC)
2. **Điền thông tin công việc:**
   - Vị trí tuyển dụng (bắt buộc)
   - Mô tả công việc (bắt buộc)
   - Kỹ năng yêu cầu
   - Kinh nghiệm yêu cầu

3. **Upload CV của ứng viên:**
   - **LƯU Ý:** Phải nhập API Key trước khi upload
   - Click vào vùng upload
   - Chọn file PDF
   - Đợi upload hoàn tất (file được upload lên Gemini)
   - ✨ **MỚI:** Gemini đọc trực tiếp PDF, hiểu layout & formatting

4. **Click "Phân tích CV"**
   - Đợi 5-15 giây
   - Kết quả sẽ hiển thị bên phải

## 📊 Kết quả phân tích bao gồm:

- **Điểm phù hợp (0-100%)**: Đánh giá tổng thể
- **Kỹ năng**: So sánh kỹ năng có vs thiếu
- **Điểm mạnh**: Những ưu điểm của ứng viên
- **Điểm cần cải thiện**: Những hạn chế
- **Khuyến nghị**: Đề xuất cho HR
- **Phân tích chi tiết**: Đánh giá toàn diện

## ✨ Điểm mới trong phiên bản này

### **Gemini 2.5 Flash**
- Model mới nhất từ Google (2025)
- Nhanh hơn, chính xác hơn Gemini 1.5
- Best price-performance ratio

### **Native PDF Vision**
- Gemini đọc trực tiếp file PDF
- Hiểu layout, charts, tables, formatting
- Không mất thông tin khi extract text
- Phân tích chính xác hơn

### **File API**
- Upload file lên Gemini server
- Hỗ trợ file PDF lớn (không giới hạn 20MB)
- Processing nhanh hơn

## 🔒 Bảo mật

- API Key của bạn **KHÔNG** được lưu trên server
- File PDF được upload lên Gemini server (tạm thời)
- Mọi dữ liệu chỉ xử lý tạm thời
- CV không được lưu lại lâu dài

## 💡 Tips

- Mô tả công việc càng chi tiết, kết quả càng chính xác
- Đảm bảo CV có định dạng PDF chuẩn
- API Key có thể lưu trong localStorage nếu muốn

## 🛠️ Commands

```bash
# Chạy development
npm run dev

# Build production
npm run build

# Chạy production
npm start
```

## 📝 Cấu trúc dự án

```
cv-checker/
├── app/
│   ├── api/
│   │   ├── analyze-cv/      # API phân tích CV
│   │   └── extract-pdf/     # API trích xuất PDF
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Trang chính
├── components/ui/           # UI components
├── lib/
│   └── utils.ts
├── types/
│   └── cv-analysis.ts       # TypeScript types
└── package.json
```

## ❓ Troubleshooting

**Lỗi "Invalid API key":**
- Kiểm tra lại API key từ Google AI Studio
- Đảm bảo đã enable Gemini API

**Không đọc được PDF:**
- Đảm bảo file là PDF chuẩn
- Thử export lại PDF từ Word/Google Docs

**Kết quả không chính xác:**
- Cung cấp thêm chi tiết trong mô tả công việc
- Đảm bảo CV có đủ thông tin

## 🎯 Tính năng nổi bật

✅ BYOK - Bring Your Own Key (bảo mật tuyệt đối)
✅ Phân tích nhanh với Gemini 1.5 Flash
✅ UI/UX hiện đại, responsive
✅ Kết quả chi tiết, dễ hiểu
✅ Không cần database, chạy ngay

---

**Chúc bạn tuyển dụng thành công! 🎉**
