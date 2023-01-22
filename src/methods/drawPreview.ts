import { join } from "path";
import colors from "../assets/colors.json";
import drawText from "./drawText";
import drawImage from "./drawImage";
import drawBadge from "./drawBadge";
import { registerFont, createCanvas } from "canvas";

// Путь к шрифтам
function fontPath(fontName: string) {
  return join(__dirname, "../assets/fonts", fontName);
}

// Регистрируем шрифт
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

export type AcceptLanguage = keyof typeof colors;

export default async function drawPreview(
  avatar: string,
  username: string,
  reponame: string,
  language: AcceptLanguage,
  description: string,
  stats: {
    stars: number;
    forks: number;
    issues: number;
    contributors: number;
  }
) {
  // Создаем канвас
  const canvas = createCanvas(1200, 600);
  const ctx = canvas.getContext("2d");

  // Задний фон
  ctx.fillStyle = "#FBFBFC";
  ctx.fillRect(0, 0, 1200, 600);

  // Аватарка
  await drawImage(ctx, avatar, 80, 80, 180, 180, 20);

  // Стиль текста
  ctx.fillStyle = "#000000";
  ctx.textBaseline = "top";

  // Имя пользователя
  ctx.font = "500 60px Nunito";
  ctx.fillText(username, 300, 95);

  // Проект
  ctx.font = "800 60px Nunito";
  ctx.fillText(reponame, 300, 165);

  // Описание
  ctx.font = "300 40px Nunito";
  drawText(ctx, description, 80, 305, 1040, 119, 44);

  // Статистика
  let x = 80;
  const { stars, forks, issues, contributors } = stats;
  x = (await drawBadge(ctx, x, 479, "star.svg", stars, "stars")) + 30;
  x = (await drawBadge(ctx, x, 479, "fork.svg", forks, "forks")) + 30;
  x = (await drawBadge(ctx, x, 479, "issue.svg", issues, "issues")) + 30;
  x = await drawBadge(
    ctx,
    x,
    479,
    "contributor.svg",
    contributors,
    "contributors"
  );

  // Язык программирования
  if (language in colors) {
    ctx.fillStyle = colors[language].color || "transparent";
    ctx.fillRect(0, 576, 1200, 24);
  }

  return canvas.toBuffer("image/png");
}
