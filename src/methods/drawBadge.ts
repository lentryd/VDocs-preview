import drawImage from "./drawImage";
import { CanvasRenderingContext2D } from "canvas";

/**
 * Рисует значок
 * @param ctx контекст канваса
 * @param x координата x
 * @param y координата y
 * @param path путь к картинке
 * @param stat статистика
 * @param statName название статистики
 * @returns координата x после рисования
 */
export default async function drawBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  path: string,
  stat: number,
  statName: string
) {
  // Значок
  await drawImage(ctx, path, x, y + 5, 30, 30, 0);
  x += 40;

  // Стиль текста
  ctx.font = "400 30px Nunito";
  ctx.textBaseline = "top";

  // Статистика
  ctx.fillStyle = "#000000";
  ctx.fillText(stat.toString(), x, y);
  x += ctx.measureText(stat.toString()).width + 10;

  // Название статистики
  ctx.fillStyle = "#64676A";
  ctx.fillText(statName, x, y);
  x += ctx.measureText(statName).width;

  return x;
}
