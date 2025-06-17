# JStudy - Website Học JavaScript

## Giới thiệu
JStudy là nền tảng học lập trình trực tuyến cho phép người dùng học các lý thuyết và làm bài tập thực hành. Người dùng có thể làm bài tập trực tiếp trên trình biên dịch online của website, nhận điểm số cho mỗi bài học và theo dõi xếp hạng của mình. Người dùng có thể đăng nhập qua Google, GitHub, hoặc Facebook.

Ứng dụng frontend sử dụng **React**, **Redux** cho quản lý trạng thái, và **TailwindCSS** cho giao diện.

## 1. Cấu trúc Dự Án

Dự án frontend được xây dựng với **React** và sử dụng **Redux** để quản lý trạng thái ứng dụng. **TailwindCSS** được sử dụng để xây dựng giao diện.

### Cấu trúc Thư Mục

```plaintext
src/
├── assets/               # Tài nguyên như hình ảnh, icon, fonts
├── components/           # Các component tái sử dụng trong giao diện
│   ├── common/           # Header, Footer, Loading...
│   ├── forms/            # Các component form (đăng nhập, đăng ký)
│   ├── exercises/        # Các component liên quan đến bài học
│   ├── ui/               # Các component giao diện như Button, Input...
├── pages/                # Các trang chính của ứng dụng
│   ├── auth/             # Trang đăng nhập, đăng ký
│   ├── exercises/        # Trang danh sách bài học
│   ├── profile/          # Trang cá nhân người dùng
│   └── dashboard/        # Trang dashboard, xếp hạng, thống kê
├── redux/                # Các slice và reducer của Redux
│   ├── authSlice.ts      # Slice cho trạng thái đăng nhập
│   ├── exercisesSlice.ts # Slice cho trạng thái bài học
│   ├── rankingSlice.ts   # Slice cho trạng thái xếp hạng
│   └── store.ts          # Cấu hình Redux store
├── services/             # Các API calls
│   ├── authService.ts    # Các hàm liên quan đến đăng nhập, đăng ký
│   ├── exerciseService.ts# Các hàm lấy thông tin bài học
│   └── rankingService.ts # Các hàm lấy thông tin xếp hạng
├── styles/               # Các file CSS global và cấu hình TailwindCSS
├── utils/                # Các hàm tiện ích
└── App.tsx               # Component chính của ứng dụng
