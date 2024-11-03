#!/bin/bash

# Check if the input file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_tif>"
  exit 1
fi

INPUT_TIF=$1
BASENAME=$(basename "$INPUT_TIF" .tif)
DIRNAME=$(dirname "$INPUT_TIF")
OUTPUT_8BIT_TIF="${DIRNAME}/${BASENAME}_8bit.tif"
# TILES_DIR="${DIRNAME}/tiles/${BASENAME}_tiles"
TILES_DIR="$(dirname "${DIRNAME}")/wmts_server/tiles/${BASENAME}_tiles"

# Convert the TIF to 8-bit
echo "Converting $INPUT_TIF to 8-bit..."
gdal_translate -ot Byte -of GTiff "$INPUT_TIF" "$OUTPUT_8BIT_TIF"
if [ $? -ne 0 ]; then
  echo "Failed to convert to 8-bit."
  exit 1
fi

# Generate tiles using gdal2tiles.py
echo "Generating tiles for $OUTPUT_8BIT_TIF..."
gdal2tiles -p mercator -z 0-9 "$OUTPUT_8BIT_TIF" "$TILES_DIR"
if [ $? -ne 0 ]; then
  echo "Failed to generate tiles."
  exit 1
fi

echo "Tiles generated successfully in $TILES_DIR."

exit 0
