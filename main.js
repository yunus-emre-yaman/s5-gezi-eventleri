/*
CHALLENGE 1:
Tüm <img> etiketlerine mouseenter ve mouseleave eventleri ekleyin.
- Mouse üzerine geldiğinde (mouseenter): ilgili resme "grayscale" class'ı ekleyin.
- Mouse çıktığında (mouseleave): "grayscale" class'ını kaldırın.
*/

document.querySelectorAll("img").forEach(img => {
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

const themes = ["theme1", "theme2", "theme3"];
window.addEventListener("keydown", (event) => {
  const body = document.body;
  if (["1", "2", "3"].includes(event.key)) {
    body.classList.remove(...themes);
    body.classList.add(`theme${event.key}`);
  } else if (event.key === "Escape") {
    body.classList.remove(...themes);
  }
});

/*
CHALLENGE 3:
<input id="full_name"> alanına yazı yazıldıkça:
- Girilen metni otomatik olarak BÜYÜK HARFE çevirin
- Metin 5 karakterden UZUNSA <button> elementini "enabled" yapın
- Aksi halde (5 veya daha az karakter) buton "disabled" olmalı
*/

const nameInput = document.getElementById("full_name");
const saveBtn = document.querySelector("button");

nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.toUpperCase();
  saveBtn.disabled = nameInput.value.length <= 5;
});



/*
CHALLENGE 4:
Form submit edildiğinde (Kaydet butonuna basıldığında):
- Input alanındaki metni alıp, <p id="submitResult"> içerisine şu metni yazın:
  "{inputa_yazılan_metin} başarı ile kaydedildi."
- Input alanını temizleyin
- <button> tekrar disabled hale gelsin
*/

const form = document.querySelector("form");
const submitResult = document.getElementById("submitResult");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = nameInput.value.trim();

  if (value.length > 0) {
    submitResult.textContent = `${value} başarı ile kaydedildi.`;
    nameInput.value = "";
    saveBtn.disabled = true;
  }
});
