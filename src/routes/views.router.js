import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get("/login", (req,res) => {
    res.render("login");
});

router.get("/register", (req,res) => {
    res.render("register");
});

router.get("/profile", (req,res) => {
    res.render("profile");
});

router.get('/products', (req, res) => {
  const fakeProducts = [
    {
      _id: "1",
      title: "Producto 1",
      description: "Descripción breve del producto 1.",
      price: 1200,
      thumbnail: "https://via.placeholder.com/300x200"
    },
    {
      _id: "2",
      title: "Producto 2",
      description: "Descripción breve del producto 2.",
      price: 850,
      thumbnail: "https://via.placeholder.com/300x200"
    },
    {
      _id: "3",
      title: "Producto 3",
      description: "Descripción breve del producto 3.",
      price: 2300,
      thumbnail: "https://via.placeholder.com/300x200"
    }
  ];

  res.render('products', {
    layout: 'main',
    products: fakeProducts,
    cid: "abc123" // ID de carrito simulado
  });
});


router.get("/failed", (req,res) => {
    res.render("failed");
});


export default router