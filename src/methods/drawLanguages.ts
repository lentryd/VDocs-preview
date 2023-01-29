import fetch from "node-fetch";
import { CanvasRenderingContext2D } from "canvas";

const MAX_WIDTH = 1200;
const COLORS_URL =
  "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";

export type LanguagesObject = {
  [key: string]: number;
};

export default async function drawLanguages(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  languages: LanguagesObject
) {
  // Цвета
  const colors = await fetch(COLORS_URL).then((res) => res.json());

  // Находим процентное соотношение
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  Object.entries(languages).forEach(([languages, value]) => {
    const width = MAX_WIDTH * (value / total);

    // Заливаем цветом
    ctx.fillStyle = colors[languages].color || "transparent";
    ctx.fillRect(x, y, width, 24);

    // Добавляем отступ
    x += width;
  });
}
