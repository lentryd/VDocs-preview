import { CanvasRenderingContext2D } from "canvas";

/**
 * Рисует текст с переносом
 * @param ctx контекст канваса
 * @param text текст
 * @param x координата x
 * @param y координата y
 * @param maxWidth максимальная ширина
 * @param maxHeight максимальная высота
 * @param lineHeight высота строки
 */
export default function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxHeight: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  // Добавляем слова в строку, пока они помещаются в ширину
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Если высота текста больше максимальной, то обрезаем
  y += (maxHeight - lines.length * lineHeight) / 2;
  lines.forEach((line) => {
    ctx.fillText(line, x, y);
    y += lineHeight;
  });
}
