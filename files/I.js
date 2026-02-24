// ===============================
// Sticker Registry
// ===============================

const MDE_STICKERS = {
    "IranFlag":"./files/stickers/IranFlag.png"
}


// ===============================
// Elements
// ===============================

const textarea = document.getElementById("Enter");
const preview = document.getElementById("Preview");


// ===============================
// Sticker Engine
// ===============================

function replaceStickers(text) {

    // stickerID mode
    text = text.replace(
        /!mdeS\(stickerID=(.*?)\)!/g,
        (match, stickerID) => {

            const imgSrc = MDE_STICKERS[stickerID];

            if (!imgSrc) return ""; // اگر وجود نداشت حذف کن

            return `<img 
                src="${imgSrc}" 
                class="mde-sticker"
                alt="${stickerID}"
                onerror="this.remove()"
            />`;
        }
    );


    // stickerURL mode
    text = text.replace(
        /!mdeS\(stickerURL=(.*?)\)!/g,
        (match, stickerURL) => {

            if (!stickerURL.startsWith("http")) return "";

            return `<img 
                src="${stickerURL}" 
                class="mde-sticker"
                alt="sticker"
                onerror="this.remove()"
            />`;
        }
    );

    return text;
}


// ===============================
// Render Engine
// ===============================

function updatePreview() {

    if (!textarea || !preview) return;

    let markdownText = textarea.value;

    markdownText = replaceStickers(markdownText);

    const html = marked.parse(markdownText);

    preview.innerHTML = html;
}


// ===============================
// Events
// ===============================

if (textarea) {
    textarea.addEventListener("input", updatePreview);
}

// رندر اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", updatePreview);