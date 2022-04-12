var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // xu ly du lieu hoac la truy van vao database
  var array = [
    {id: 0, name: 'Huy Nguyen 0'},
    {id: 1, name: 'Huy Nguyen 1'},
    {id: 2, name: 'Huy Nguyen 2'},
    {id: 3, name: 'Huy Nguyen 3'},
    {id: 4, name: 'Huy Nguyen 4'},
    {id: 5, name: 'Huy Nguyen 5'},
  ]
  res.render('index', {data : array,title: 'Express', name: 'Huy Nguyen'});
});



router.get('/asia',function (req,res) {
  console.log('asia')
  res.render('asia',{title : 'Asia'});
})
router.get('/euro',function (req,res) {
  console.log('euro')
  res.render('euro',{title : 'Euro'});
})
router.get('/america',function (req,res) {

  var name="Hoàng Phong"
  var tuoi = 2020
  var array =[29,6,20,2,14,27,10]
  var sinhVien = {name: "Hoàng Phong" , sdt : '0966483949'}
  var danhSach = [
    {id: 0, name: 'Hoàng Phong 0'},
    {id: 1, name: 'Hoàng Phong 1'},
    {id: 2, name: 'Hoàng Phong 2'},
    {id: 3, name: 'Hoàng Phong 3'},
    {id: 4, name: 'Hoàng Phong 4'},
    {id: 5, name: 'Hoàng Phong 5'},
  ]

  var thongTin = {
    name: "Hoàng Phong" , sdt : '0966483949',
    danhSach : [
      {id: 0, name: 'Hoàng Phong 0'},
      {id: 1, name: 'Hoàng Phong 1'},
      {id: 2, name: 'Hoàng Phong 2'},
      {id: 3, name: 'Hoàng Phong 3'},
      {id: 4, name: 'Hoàng Phong 4'},
      {id: 5, name: 'Hoàng Phong 5'},
    ]
  }

  console.log('America')
  res.render('america',{title : 'America',name : name , tuoi : tuoi, array : array,
    sinhVien : sinhVien, danhSach : danhSach, thongTin : thongTin
  });
})


const multer = require('multer')
var storage = multer.diskStorage({
  destination : function (req,file,cb){
    cb(null,'uploads/');
  },
  filename: function (req, file, cb) {
    var random = Math.random();
    cb(null, random + Date.now() + '-' + file.originalname);
  }
});
var upload = multer({
  storage: storage, limits: {
    fileSize: 2 * 1024
  }
}).array('avatar',5);
router.get('/myalbum',function (req,res) {
  res.render('myalbum',{title: 'My album', message :''})
})
router.post('/upload',function (req,res) {
    upload(req,res,function (err){
        if(err){
          res.render('myalbum',{title: 'My album', message :err.message})
        }else{
          res.render('myalbum',{title: 'My album', message :'Tải Thành công'})
        }
  })
})

router.get('/about',function (req,res) {
  console.log('About')
  res.render('about',{title : 'About' , message :''});
})

router.get('/listcar',function (req,res) {
  console.log('List Car')

})

router.get('/sua',function (req,res) {
  console.log('Sửa')
  Image.find({},function (err,data){
    res.render('sua',{title : 'Sửa',message :'',data : data})
  })
})
router.post('/updateCar', function (req, res) {
  var tenAnhMoi = req.body.tenAnhMoi
  var noiDungMoi = req.body.noiDungMoi
  var linkAnhMoi = req.body.linkAnhMoi
  Image.updateOne({tenAnh: tenAnhMoi}, {noiDung: noiDungMoi, linkAnh: linkAnhMoi}, function (error,data) {
    var mess;
    if (error == null) {
      mess = 'Sửa thành công'
    } else {
      mess = error
    }
    res.render('sua',{title : 'Sửa',message :mess,data : data})
})
})
router.get('/danhsach',function (req,res) {
  console.log('Danh sách')
  Image.find({},function (err,data){
    res.render('danhsach',{data : data})
  })
})
// bước 1 : khởi tạo khung - Schema
var dbb = 'mongodb+srv://admin:phong29062002@cluster0.z3u96.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require("mongoose");
mongoose.connect(dbb);
// buoc 1 : khoi tao khung - Schema
var imageSchema = new mongoose.Schema({
  tenAnh: 'string',
  noiDung: 'string',
  linkAnh: 'string'
})
// buoc 2 : lien ket Schema vs mongoDB qua mongoose
var Image = mongoose.model('image', imageSchema);

router.get('/them',function (req,res) {
  console.log('Thêm')
  res.render('them',{title : 'Thêm',message:''});
})
router.post('/addCar', function (req, res) {
  var tenAnh = req.body.tenAnh
  var noiDung = req.body.noiDung
  var linkAnh = req.body.linkAnh
  // b3 : khởi tạo Car vs giá trị lấy được
  const image = new Image({
    tenAnh: tenAnh,
    noiDung: noiDung,
    linkAnh: linkAnh
  })
  image.save(function (error) {
    var mess;
    if (error == null) {
      mess = 'Thêm thành công'
    } else {
      mess = error
    }
    res.render('them',{title : 'Thêm',message :mess})
  })

  // Image.updateOne({_id: '623ed30e9241476c955a209c'}, {maXe: '11111', giaXe: 'bnmbnmbnmbn'}, function (error) {
  //
  // })

})
var fs = require('fs')

router.post('/hotro', function (req,res){
  var email = req.body.email;
  var phone = req.body.phone;
  var noidung = req.body.noidung;

  fs.appendFile( 'uploads/' +email + '.txt',noidung+phone,function (error){

    if(error){
      res.render('about',{title: 'Hỗ trợ', message : error})
    }else{
      res.render('about',{title: 'Hỗ trợ', message: 'Chúng tôi đã nhận phản hồi.Cảm ơn đóng góp của bạn!'})
    }
  });

});

module.exports = router;
