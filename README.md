# Зачем это нужно?

## Теоретически

Этот модуль генерирует превью для репозитория GitHub, которое можно использовать в своем проекте. Например, в [VDocs](https://lentryd.su/VDocs/).

## Практически

Я сделал этот модуль для своего проекта [VDocs](https://lentryd.su/VDocs/). А так как в этом модуле много дополнительных функций, я не хотел засовывать их в один проект.

# Как это работает

## Модуль

### Установка

```bash
npm i vdocs-preview -s
```

### Использование

```typescript
import createPreview from "vdocs-preview";

createPreview("lentryd", "VDocs");
```

## Терминал

### Установка

```bash
npm i vdocs-preview -g
```

### Проверка установки

```bash
vdocs-preview -h
```

### Использование

> Параметры `-f` и `-n` не обязательны.

```bash
vdocs-preview -u lentryd -r VDocs -f "." -n "Preview for VDocs"
```
