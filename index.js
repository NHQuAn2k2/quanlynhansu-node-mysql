const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const port = 3001;
const whitelist = [
  "http://localhost:3000",
  "https://quanlynhansu-reactjs.onrender.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
// mysql------------------------------
const con = mysql.createConnection({
  host: "bi9vhv5gpr53ceiwuu48-mysql.services.clever-cloud.com",
  user: "uutl2kjelgf4xtrg",
  password: "vxJVtLyeSGj818bupHME",
  database: "bi9vhv5gpr53ceiwuu48",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
//-------------------------------------
// dang nhap
app.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  con.query(
    "select * from nguoidung where username = ? and email = ?",
    [username, email],
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        return res.status(400).json({ message: "thong tin sai!" });
      } else {
        const compare = password === result[0].matkhau;
        if (!compare)
          return res.status(400).json({ message: "mat khau khong dung!" });
        const token = jwt.sign(
          { manguoidung: result[0].manguoidung, username: result[0].username },
          "jwtjsonwebtoken",
          { expiresIn: "1h" }
        );
        return res
          .status(200)
          .json({ message: "dang nhap thanh cong!", token });
      }
    }
  );
});
//--------------------------------------------
// nhan su
app.get("/danh-sach-nhan-vien", (req, res) => {
  con.query("select * from nhanvien", (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(200).json({ data: [] });
    } else {
      return res.status(200).json({ data: result });
    }
  });
});
app.get("/chi-tiet-nhan-vien/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "select * from nhanvien join phongban on nhanvien.maphongban = phongban.maphongban join khoa on nhanvien.makhoa = khoa.makhoa where manhanvien = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        return res.status(400).json({ message: "nhan vien khong ton tai!" });
      } else {
        let newResult = {};
        if (result[0].tenkhoa !== "khong co") {
          newResult = { ...result[0], donvi: result[0].tenkhoa };
        }
        if (result[0].tenphongban !== "khong co") {
          newResult = { ...result[0], donvi: result[0].tenphongban };
        }
        return res.status(200).json({ data: newResult });
      }
    }
  );
});
app.post("/them-nhan-vien", (req, res) => {
  const {
    hoten,
    namsinh,
    gioitinh,
    cccd,
    diachi,
    dienthoai,
    email,
    vitri,
    bangcap,
    trinhdohocvan,
    kinhnghiem,
    trinhdochuyenmon,
    makhoa,
    maphongban,
    linhvuc,
  } = req.body;
  con.query(
    "insert into nhanvien (hoten, namsinh, gioitinh, cccd, diachi, dienthoai, email, vitri, bangcap, trinhdohocvan, kinhnghiem, trinhdochuyenmon, makhoa, maphongban, linhvuc) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      hoten,
      namsinh,
      gioitinh,
      cccd,
      diachi,
      dienthoai,
      email,
      vitri,
      bangcap,
      trinhdohocvan,
      kinhnghiem,
      trinhdochuyenmon,
      makhoa,
      maphongban,
      linhvuc,
    ],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "them thanh cong" });
    }
  );
});
app.post("/xoa-nhan-vien/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "delete from nhanvien where manhanvien = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "xoa thanh cong!" });
    }
  );
});
app.post("/sua-nhan-vien/:id", (req, res) => {
  const {
    hoten,
    namsinh,
    gioitinh,
    cccd,
    diachi,
    dienthoai,
    email,
    vitri,
    bangcap,
    trinhdohocvan,
    kinhnghiem,
    trinhdochuyenmon,
    makhoa,
    maphongban,
    linhvuc,
  } = req.body;
  const { id } = req.params;
  con.query(
    "update nhanvien set hoten = ?, namsinh = ?, gioitinh = ?, cccd = ?, diachi = ?, dienthoai = ?, email = ?, vitri = ?, bangcap = ?, trinhdohocvan = ?, kinhnghiem = ?, trinhdochuyenmon = ?, makhoa = ?, maphongban = ?, linhvuc = ? where manhanvien = ?",
    [
      hoten,
      namsinh,
      gioitinh,
      cccd,
      diachi,
      dienthoai,
      email,
      vitri,
      bangcap,
      trinhdohocvan,
      kinhnghiem,
      trinhdochuyenmon,
      makhoa,
      maphongban,
      linhvuc,
      id,
    ],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "sua thanh cong!" });
    }
  );
});
//--------------------------------------------
// phong ban
app.get("/danh-sach-phong-ban", (req, res) => {
  con.query("select * from phongban", (err, result) => {
    if (err) throw err;
    return res.status(200).json({ data: result });
  });
});
app.get("/chi-tiet-phong-ban/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "select * from phongban where maphongban = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      con.query(
        "select * from nhanvien join phongban on nhanvien.maphongban = phongban.maphongban where nhanvien.maphongban = ?",
        [result[0].maphongban],
        (err, result2) => {
          if (err) throw err;
          return res
            .status(200)
            .json({ data: { ...result[0], nhanvien: result2 } });
        }
      );
    }
  );
});
app.post("/them-phong-ban", (req, res) => {
  const { tenphongban } = req.body;
  con.query(
    "insert into phongban (tenphongban) values (?)",
    [tenphongban],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "them thanh cong!" });
    }
  );
});
//--------------------------------------------
// khoa
app.get("/danh-sach-khoa", (req, res) => {
  con.query("select * from khoa", (err, result) => {
    if (err) throw err;
    return res.status(200).json({ data: result });
  });
});
app.get("/chi-tiet-khoa/:id", (req, res) => {
  const { id } = req.params;
  con.query("select * from khoa where makhoa = ?", [id], (err, result) => {
    if (err) throw err;
    con.query(
      "select * from nhanvien join khoa on nhanvien.makhoa = khoa.makhoa where nhanvien.makhoa = ?",
      [result[0].makhoa],
      (err, result2) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ data: { ...result[0], nhanvien: result2 } });
      }
    );
  });
});
app.post("/them-khoa", (req, res) => {
  const { tenkhoa } = req.body;
  con.query(
    "insert into khoa (tenkhoa) values (?)",
    [tenkhoa],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "them thanh cong!" });
    }
  );
});
// cong tac
app.post("/them-cong-tac", (req, res) => {
  const {
    manhanvien,
    ngaybatdau,
    ngayketthuc,
    namhoc,
    hocky,
    noidung,
    trangthai,
  } = req.body;
  con.query(
    "insert into congtac (manhanvien, ngaybatdau, ngayketthuc, namhoc, hocky, noidung, trangthai) values (?, ?, ?, ?, ?, ?, ?)",
    [manhanvien, ngaybatdau, ngayketthuc, namhoc, hocky, noidung, trangthai],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "thanh cong!" });
    }
  );
});
app.get("/danh-sach-cong-tac", (req, res) => {
  con.query(
    "select * from congtac join nhanvien on congtac.manhanvien = nhanvien.manhanvien",
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ data: result });
    }
  );
});
app.post("/xoa-cong-tac/:id", (req, res) => {
  const { id } = req.params;
  con.query("delete from congtac where macongtac = ?", [id], (err, result) => {
    if (err) throw err;
    return res.status(200).json({ message: "xoa thanh cong!" });
  });
});
app.post("/sua-cong-tac/:id", (req, res) => {
  const { id } = req.params;
  const { ngaybatdau, ngayketthuc, namhoc, hocky, noidung, trangthai } =
    req.body;
  con.query(
    "update congtac set ngaybatdau = ?, ngayketthuc = ?, namhoc = ?, hocky = ?, noidung = ?, trangthai = ? where macongtac = ?",
    [ngaybatdau, ngayketthuc, namhoc, hocky, noidung, trangthai, id],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "sua thanh cong!" });
    }
  );
});
app.get("/chi-tiet-cong-tac/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "select * from congtac join nhanvien on congtac.manhanvien = nhanvien.manhanvien where macongtac = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ data: result[0] });
    }
  );
});
//---------------------------------------------
// nghi phep
app.post("/them-nghi-phep", (req, res) => {
  const { manhanvien, ngaybatdau, ngayketthuc, lydo, trangthai } = req.body;
  con.query(
    "insert into nghiphep (manhanvien, ngaybatdau, ngayketthuc, lydo, trangthai) values (?, ?, ?, ?, ?)",
    [manhanvien, ngaybatdau, ngayketthuc, lydo, trangthai],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "them thanh cong!" });
    }
  );
});
app.get("/danh-sach-nghi-phep", (req, res) => {
  con.query(
    "select * from nghiphep join nhanvien on nghiphep.manhanvien = nhanvien.manhanvien",
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ data: result });
    }
  );
});
app.post("/xoa-nghi-phep/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "delete from nghiphep where manghiphep = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "xoa thanh cong!" });
    }
  );
});
app.post("/sua-nghi-phep/:id", (req, res) => {
  const { id } = req.params;
  const { ngaybatdau, ngayketthuc, lydo, trangthai } = req.body;
  con.query(
    "update nghiphep set ngaybatdau = ?, ngayketthuc = ?, lydo = ?, trangthai = ? where manghiphep = ?",
    [ngaybatdau, ngayketthuc, lydo, trangthai, id],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ message: "sua thanh cong!" });
    }
  );
});
app.get("/chi-tiet-nghi-phep/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "select * from nghiphep join nhanvien on nghiphep.manhanvien = nhanvien.manhanvien where manghiphep = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      return res.status(200).json({ data: result[0] });
    }
  );
});
//---------------------------------------------
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
