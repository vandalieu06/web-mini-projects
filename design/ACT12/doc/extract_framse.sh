#!/usr/bin/env bash

# ==============================
# Configuración
# ==============================

VIDEO_INPUT="$1"             # Ruta del vídeo
OUTPUT_DIR="frames"          # Carpeta de salida
TOTAL_FRAMES="${2:-90}"      # Número de frames (default: 90)
QUALITY=80                   # Calidad WebP (0-100)
WIDTH=1280                   # Redimensionado opcional (mantiene ratio)

# ==============================
# Validaciones
# ==============================

if [[ -z "$VIDEO_INPUT" ]]; then
  echo "Uso: $0 <video_input> [numero_frames]"
  exit 1
fi

if [[ ! -f "$VIDEO_INPUT" ]]; then
  echo "Error: El archivo de vídeo no existe."
  exit 1
fi

# ==============================
# Preparar entorno
# ==============================

mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT_DIR"/frame_*.webp

# ==============================
# Obtener duración del vídeo
# ==============================

DURATION=$(ffprobe -v error -show_entries format=duration \
  -of default=noprint_wrappers=1:nokey=1 "$VIDEO_INPUT")

# Calcular FPS necesario para obtener X frames
FPS=$(awk "BEGIN {print $TOTAL_FRAMES / $DURATION}")

echo "Duración del vídeo: $DURATION segundos"
echo "Extrayendo $TOTAL_FRAMES frames (~$FPS fps)"

# ==============================
# Extracción de frames
# ==============================

ffmpeg -i "$VIDEO_INPUT" \
  -vf "fps=$FPS,scale=$WIDTH:-1:flags=lanczos" \
  -c:v libwebp \
  -quality $QUALITY \
  -compression_level 6 \
  "$OUTPUT_DIR/frame_%03d.webp"

# ==============================
# Resultado
# ==============================

echo "Frames generados en: $OUTPUT_DIR/"
ls "$OUTPUT_DIR" | wc -l | xargs echo "Total de frames:"
