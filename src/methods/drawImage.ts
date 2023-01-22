import { Image, CanvasRenderingContext2D } from "canvas";

/**
 * Нарисовать изображение с закругленными краями
 * @param ctx контекст канваса
 * @param path путь к изображению (относительно корня проекта)
 * @param x координата x
 * @param y координата y
 * @param width ширина
 * @param height высота
 * @param radius радиус закругления
 */
export default function drawImage(
  ctx: CanvasRenderingContext2D,
  path: string,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 0
) {
  const image = new Image();

  image.onload = () => {
    // Сохраняем контекст
    ctx.save();

    // Рисуем закругленные края
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    // Обрезаем изображение по закругленным краям
    ctx.clip();

    // Рисуем изображение
    ctx.drawImage(image, x, y, width, height);

    // Восстанавливаем контекст
    ctx.restore();
  };

  image.onerror = (err) => {
    throw err;
  };
  
  image.src = path;
}
