// ===============================
// MDE Sticker Engine
// ===============================

// ==== CONFIG: REGISTER YOUR STICKERS HERE ====
const MDE_STICKERS = {
    "IranFlag":"./stickers/IranFlag.png"
};

// Sticker size (emoji-like)
const STICKER_SIZE = 22;


// ===============================
// Convert Sticker Codes
// ===============================

function replaceStickers(rawText) {

    if (!rawText) return rawText;

    // stickerID
    rawText = rawText.replace(
        /!mdeS\(stickerID=([^)]+)\)!/g,
        function (match, stickerID) {

            stickerID = stickerID.trim();

            const imgSrc = MDE_STICKERS[stickerID];

            if (!imgSrc) return match; // اگر ثبت نشده همون متن بمونه

            return `<img 
                src="${imgSrc}" 
                class="mde-sticker"
                alt="${stickerID}"
                style="
                    width:${STICKER_SIZE}px;
                    height:${STICKER_SIZE}px;
                    object-fit:contain;
                    vertical-align:middle;
                    display:inline-block;
                "
            />`;
        }
    );

    // stickerURL
    rawText = rawText.replace(
        /!mdeS\(stickerURL=([^)]+)\)!/g,
        function (match, stickerURL) {

            stickerURL = stickerURL.trim();

            return `<img 
                src="${stickerURL}" 
                class="mde-sticker"
                alt="sticker"
                style="
                    width:${STICKER_SIZE}px;
                    height:${STICKER_SIZE}px;
                    object-fit:contain;
                    vertical-align:middle;
                    display:inline-block;
                "
            />`;
        }
    );

    return rawText;
}


// ===============================
// Hook Into Your Editor
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    if (typeof updatePreview === "function") {

        const originalUpdatePreview = updatePreview;

        window.updatePreview = function () {

            try {
                const markdownInput = document.getElementById('markdown-input');
                const preview = document.getElementById('preview');

                let markdownText = markdownInput.value;

                // 🔥 Replace sticker codes BEFORE marked parses it
                markdownText = replaceStickers(markdownText);

                const html = marked.parse(markdownText);
                preview.innerHTML = html;

                if (typeof updateShareUrl === "function") {
                    updateShareUrl();
                }

            } catch (error) {
                console.error("Sticker Engine Error:", error);
            }
        };
    }
});