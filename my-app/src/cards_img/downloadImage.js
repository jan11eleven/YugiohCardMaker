export default function downloadImage(imgUrl, cardName) {
  fetch(imgUrl)
    .then((img) => img.blob())
    .then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = url;
      link.download = cardName + ".png";
      link.click();
    });
}
