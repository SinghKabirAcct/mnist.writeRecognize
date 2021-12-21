const drawLine = (x, y, xNew, yNew) => {
    ctx.beginPath()
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 1
    ctx.moveTo(x, y)
    ctx.lineTo(xNew, yNew)
    ctx.stroke()
    ctx.closePath()
  }
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  let drawOn = false
  let x = 0
  let y = 0
  function download(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
  }
  const capture = () => {
      const screenshotTarget = document.body
      html2canvas(screenshotTarget, {
        onrendered: (canvas) => {
          const base64image = canvas.toDataURL("image/jpeg")
          var iframe = '<iframe src="' + base64image + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
          var x = window.open();
          x.document.open();
          x.document.write(iframe);
          download(base64image, 'lmao.jpg')
          x.document.close();
        }
      })
  }
  document.addEventListener("keyup", (e) => {
    capture()
  })
  canvas.addEventListener("mousedown", (e) => {
    drawOn = true
    x = e.offsetX
    y = e.offsetY
  })
  canvas.addEventListener("touchstart", (e) => {
    if(e.target==canvas){
        e.preventDefault()
    }
    drawOn = true
    x = e.touches[0].clientX
    y = e.touches[0].clientY
  })
  canvas.addEventListener("touchmove", (e) => {
    if(e.target==canvas){
        e.preventDefault()
    }
    if (drawOn==true){
      drawLine(x, y, e.touches[0].clientX, e.touched[0].clientY)
      x = e.touches[0].clientX
      y = e.touched[0].clientY
    }
  })
  canvas.addEventListener("mousemove", (e) => {
    if (drawOn==true){
      drawLine(x, y, e.offsetX, e.offsetY)
      x = e.offsetX
      y = e.offsetY
    }
  })
  canvas.addEventListener("mouseup", (e) => {
    drawLine(x, y, e.offsetX, e.offsetY)
    x = 0
    y = 0
    drawOn = false
  })
  canvas.addEventListener("touchend", (e) => {
    if(e.target==canvas){
        e.preventDefault()
    }
    drawLine(x, y, e.touches[0].clientX, e.touches[0].clientY)
    x = 0
    y = 0
    drawOn = false
  })