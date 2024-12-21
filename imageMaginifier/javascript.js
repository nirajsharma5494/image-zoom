function imageZoom(imgID, resultID) {
  let img, lens, result, cx, cy;

  img = document.getElementById(imgID);
  result = document.getElementById(resultID);

  lens = document.createElement("div");
  lens.setAttribute("class", "img-zoom-lens");

  img.parentElement.insertBefore(lens, img);

  lens.style.width = "100px"; // Adjust size as needed
  lens.style.height = "100px";

  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";


  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens(e) {
    let pos, x, y;
    e.preventDefault();

    pos = getCursorpos(e);

    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorpos(e) {
    let a,
      x = 0,
      y = 0;
    e = e || window.event;

    a = img.getBoundingClientRect();

    x = e.clientX - a.left;
    y = e.clientY - a.top;

    return { x: x, y: y };
  }
}
