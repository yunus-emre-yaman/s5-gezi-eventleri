/*
CHALLENGE 1:
Tüm <img> etiketlerine mouseenter ve mouseleave eventleri ekleyin.
- Mouse üzerine geldiğinde (mouseenter): ilgili resme "grayscale" class'ı ekleyin.
- Mouse çıktığında (mouseleave): "grayscale" class'ını kaldırın.
*/

const images = document.querySelectorAll("img");

images.forEach(img => {
  img.addEventListener("mouseenter", () => {
    img.classList.add("grayscale");
  });

  img.addEventListener("mouseleave", () => {
    img.classList.remove("grayscale");
  });
});

/*
CHALLENGE 2:
Sayfa aktifken (herhangi bir yere tıklandığında), klavye dinlemeye başlasın.
- Klavyeden "1" tuşuna basılırsa <body> elementine "theme1" class'ı eklensin
- "2" → "theme2", "3" → "theme3" olarak eklensin
- "Escape" (Esc) tuşuna basılırsa body'deki tüm bu class'lar kaldırılsın
NOT: Klavye eventlerini document yerine **window** nesnesine ekleyin.
*/

let isListening = false;

document.addEventListener("click", () => {
  if (!isListening) {
    window.addEventListener("keydown", handleKeyPress);
    isListening = true;
  }
});

function handleKeyPress(event) {
  const body = document.body;
  const themes = ["theme1", "theme2", "theme3"];

  body.classList.remove(...themes);

  if (event.key === "1") {
    body.classList.add("theme1");
  } else if (event.key === "2") {
    body.classList.add("theme2");
  } else if (event.key === "3") {
    body.classList.add("theme3");
  } else if (event.key === "Escape") {
  }
}

/*
CHALLENGE 3:
<input id="full_name"> alanına yazı yazıldıkça:
- Girilen metni otomatik olarak BÜYÜK HARFE çevirin
- Metin 5 karakterden UZUNSA <button> elementini "enabled" yapın
- Aksi halde (5 veya daha az karakter) buton "disabled" olmalı
*/

const input = document.getElementById("full_name");
const button = document.querySelector("button");

input.addEventListener("input", () => {

  input.value = input.value.toUpperCase();

  if (input.value.length > 5) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});


/*
CHALLENGE 4:
Form submit edildiğinde (Kaydet butonuna basıldığında):
- Input alanındaki metni alıp, <p id="submitResult"> içerisine şu metni yazın:
  "{inputa_yazılan_metin} başarı ile kaydedildi."
- Input alanını temizleyin
- <button> tekrar disabled hale gelsin
*/
