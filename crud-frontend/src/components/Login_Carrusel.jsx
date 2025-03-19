export default function Login_Carrusel() {
  return(
      <>
      <div className="carousel w-full">
<div id="slide1" className="carousel-item relative w-full">
  <img
    src="/src/assets/1.jpg"
    className="w-full" />
  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    <a href="#slide4" className="btn btn-circle">❮</a>
    <a href="#slide2" className="btn btn-circle">❯</a>
  </div>
</div>
<div id="slide2" className="carousel-item relative w-full">
  <img
    src="/src/assets/2.jpg"
    className="w-full" />
  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    <a href="#slide1" className="btn btn-circle">❮</a>
    <a href="#slide3" className="btn btn-circle">❯</a>
  </div>
</div>
<div id="slide3" className="carousel-item relative w-full">
  <img
    src="/src/assets/3.jpg"
    className="w-full" />
  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    <a href="#slide2" className="btn btn-circle">❮</a>
    <a href="#slide4" className="btn btn-circle">❯</a>
  </div>
</div>
<div id="slide4" className="carousel-item relative w-full">
  <img
    src="/src/assets/4.jpg"
    className="w-full" />
  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    <a href="#slide3" className="btn btn-circle">❮</a>
    <a href="#slide1" className="btn btn-circle">❯</a>
  </div>
</div>
</div>
      </>
  )
}