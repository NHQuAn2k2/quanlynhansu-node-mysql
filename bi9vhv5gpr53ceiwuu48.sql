-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th3 22, 2024 lúc 09:58 AM
-- Phiên bản máy phục vụ: 8.2.0
-- Phiên bản PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bi9vhv5gpr53ceiwuu48`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `congtac`
--

DROP TABLE IF EXISTS `congtac`;
CREATE TABLE IF NOT EXISTS `congtac` (
  `macongtac` int NOT NULL AUTO_INCREMENT,
  `manhanvien` int NOT NULL,
  `ngaybatdau` date NOT NULL,
  `ngayketthuc` date NOT NULL,
  `namhoc` varchar(255) NOT NULL,
  `hocky` varchar(255) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `trangthai` varchar(255) NOT NULL,
  PRIMARY KEY (`macongtac`),
  KEY `FK_congtac_manhanvien` (`manhanvien`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `congtac`
--

INSERT INTO `congtac` (`macongtac`, `manhanvien`, `ngaybatdau`, `ngayketthuc`, `namhoc`, `hocky`, `noidung`, `trangthai`) VALUES
(2, 13, '2023-05-12', '2024-07-12', '2023 - 2024', 'hoc ky 1', 'lap trinh web', 'dang lam');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoa`
--

DROP TABLE IF EXISTS `khoa`;
CREATE TABLE IF NOT EXISTS `khoa` (
  `makhoa` int NOT NULL AUTO_INCREMENT,
  `tenkhoa` varchar(255) NOT NULL,
  PRIMARY KEY (`makhoa`),
  UNIQUE KEY `makhoa` (`makhoa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `khoa`
--

INSERT INTO `khoa` (`makhoa`, `tenkhoa`) VALUES
(-1, 'khong co'),
(1, 'Khoa Cong Nghe Thong Tin'),
(2, 'Khoa Ky Thuat Cong Trinh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nghiphep`
--

DROP TABLE IF EXISTS `nghiphep`;
CREATE TABLE IF NOT EXISTS `nghiphep` (
  `manghiphep` int NOT NULL AUTO_INCREMENT,
  `manhanvien` int NOT NULL,
  `ngaybatdau` date NOT NULL,
  `ngayketthuc` date NOT NULL,
  `lydo` varchar(255) NOT NULL,
  `trangthai` varchar(255) NOT NULL,
  PRIMARY KEY (`manghiphep`),
  KEY `FK_nghiphep_manhanvien` (`manhanvien`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
CREATE TABLE IF NOT EXISTS `nguoidung` (
  `manguoidung` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `vaitro` varchar(255) NOT NULL,
  PRIMARY KEY (`manguoidung`),
  UNIQUE KEY `username` (`username`,`email`),
  UNIQUE KEY `manguoidung` (`manguoidung`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`manguoidung`, `username`, `email`, `matkhau`, `vaitro`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin123456', 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
CREATE TABLE IF NOT EXISTS `nhanvien` (
  `manhanvien` int NOT NULL AUTO_INCREMENT,
  `hoten` varchar(255) NOT NULL,
  `namsinh` date NOT NULL,
  `gioitinh` varchar(255) NOT NULL,
  `cccd` int NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `dienthoai` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `vitri` varchar(255) NOT NULL,
  `bangcap` varchar(255) NOT NULL,
  `trinhdohocvan` varchar(255) NOT NULL,
  `kinhnghiem` varchar(255) NOT NULL,
  `trinhdochuyenmon` varchar(255) NOT NULL,
  `makhoa` int NOT NULL,
  `maphongban` int NOT NULL,
  `linhvuc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`manhanvien`),
  UNIQUE KEY `manhanvien` (`manhanvien`),
  KEY `FK_nhanvien_makhoa` (`makhoa`),
  KEY `FK_nhanvien_maphongban` (`maphongban`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`manhanvien`, `hoten`, `namsinh`, `gioitinh`, `cccd`, `diachi`, `dienthoai`, `email`, `vitri`, `bangcap`, `trinhdohocvan`, `kinhnghiem`, `trinhdochuyenmon`, `makhoa`, `maphongban`, `linhvuc`) VALUES
(12, 'Nguyen Van A', '2002-05-26', 'Nam', 123456, 'TP.HCM', 123456, 'nguyenvana@gmail.com', 'Giang Vien', 'Thac Si', '12/12', 'Lap trinh huong doi tuong', 'DH Bach Khoa TP.HCM', -1, 1, 'khoa hoc may tinh'),
(13, 'Nguyen Van A123', '1999-12-23', 'Nam', 123456, 'TP.HCM', 123456, 'nguyenvana@gmail.com', 'Giang Vien', 'Thac Si', '12/12', 'Lap trinh huong doi tuong', 'DH Bach Khoa TP.HCM', -1, 1, 'khoa hoc may tinh'),
(14, 'Nguyen Van A456', '1999-04-23', 'Nam', 123456, 'TP.HCM', 123456, 'nguyenvana@gmail.com', 'Giang Vien', 'Thac Si', '12/12', 'Lap trinh huong doi tuong', 'DH Bach Khoa TP.HCM', 1, -1, 'khoa hoc may tinh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongban`
--

DROP TABLE IF EXISTS `phongban`;
CREATE TABLE IF NOT EXISTS `phongban` (
  `maphongban` int NOT NULL AUTO_INCREMENT,
  `tenphongban` varchar(255) NOT NULL,
  PRIMARY KEY (`maphongban`),
  UNIQUE KEY `maphongban` (`maphongban`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `phongban`
--

INSERT INTO `phongban` (`maphongban`, `tenphongban`) VALUES
(-1, 'khong co'),
(1, 'Phong Dao Tao'),
(3, 'Phong Hanh Chinh Quan Tri'),
(4, 'Phong Ke Hoach Tai Chinh'),
(6, 'Phong Cong Tac Sinh Vien');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `congtac`
--
ALTER TABLE `congtac`
  ADD CONSTRAINT `FK_congtac_manhanvien` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `nghiphep`
--
ALTER TABLE `nghiphep`
  ADD CONSTRAINT `FK_nghiphep_manhanvien` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `FK_nhanvien_makhoa` FOREIGN KEY (`makhoa`) REFERENCES `khoa` (`makhoa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_nhanvien_maphongban` FOREIGN KEY (`maphongban`) REFERENCES `phongban` (`maphongban`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
