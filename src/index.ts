import * as fs from "fs";
import * as path from "path";
import drawImage from "./methods/drawImage";
import { Image, registerFont, createCanvas } from "canvas";

// Регистрируем шрифт
function fontPath(fontName: string) {
  return path.join(__dirname, "assets/fonts", fontName);
}

registerFont(fontPath("Nunito-Light.ttf"), {
  family: "Nunito",
  weight: "300",
});
registerFont(fontPath("Nunito-Regular.ttf"), {
  family: "Nunito",
  weight: "400",
});
registerFont(fontPath("Nunito-Medium.ttf"), {
  family: "Nunito",
  weight: "500",
});
registerFont(fontPath("Nunito-ExtraBold.ttf"), {
  family: "Nunito",
  weight: "800",
});

const canvas = createCanvas(1200, 600);
const ctx = canvas.getContext("2d");

// Задний фон
ctx.fillStyle = "#FBFBFC";
ctx.fillRect(0, 0, 1200, 600);

// Аватарка
drawImage(
  ctx,
  __dirname + "/assets/images/testAvatar.jpg",
  80,
  80,
  180,
  180,
  20
);

// Имя пользователя
ctx.fillStyle = "#000000";
ctx.font = "500 60px Nunito";
ctx.fillText("lentryd", 300, 80 + 60 + 32.5);

// Проект
ctx.fillStyle = "#000000";
ctx.font = "800 60px Nunito";
ctx.fillText("NetShoolApi", 300, 80 + 60 + 10 + 60 + 10);

fs.writeFileSync("out.png", canvas.toBuffer("image/png"));
