#!/bin/sh
set -eu
cd "$(dirname "$0")/.."

poses=icons/guga-poses
render_pose() {
  visible_bounds=$(magick "$1" -alpha extract -threshold 10% -trim -format '%wx%h%O' info:)
  magick "$1" -alpha set -crop "$visible_bounds" +repage -resize x315 \
    -background none -gravity south -extent 400x370 "$poses/$2.png"
}

render_pose '咕嘎-黑眼圈.png' front
render_pose "$poses/wave-left-source.png" wave-left
render_pose "$poses/wave-right-source.png" wave-right
render_pose "$poses/wave-mid-left-source.png" wave-mid-left
render_pose "$poses/wave-mid-right-source.png" wave-mid-right
render_pose "$poses/turn-quarter-source.png" turn-quarter-left
render_pose "$poses/turn-sixty-source.png" turn-sixty-right
render_pose "$poses/turn-side-source.png" turn-side-right
render_pose "$poses/turn-rear-quarter-source.png" turn-rear-quarter-right
render_pose "$poses/back-source.png" back

magick "$poses/turn-quarter-left.png" -flop "$poses/turn-quarter-right.png"
magick "$poses/turn-sixty-right.png" -flop "$poses/turn-sixty-left.png"
magick "$poses/turn-side-right.png" -flop "$poses/turn-side-left.png"
magick "$poses/turn-rear-quarter-right.png" -flop "$poses/turn-rear-quarter-left.png"

temporary_frames=$(mktemp -d)
trap 'rm -rf "$temporary_frames"' EXIT
wave_frame() {
  magick "$poses/$2.png" -background none -rotate "$3" \
    -gravity center -extent 400x370 "$temporary_frames/wave-$1.png"
}

# The final pose is one small step from the first, so the loop has no reset.
wave_frame 00 front 0
wave_frame 01 wave-mid-right -2
wave_frame 02 wave-mid-right 0
wave_frame 03 wave-left -1
wave_frame 04 wave-left 1
wave_frame 05 wave-mid-right 0
wave_frame 06 wave-mid-right 2
wave_frame 07 front 0
wave_frame 08 front 1
wave_frame 09 wave-mid-left 2
wave_frame 10 wave-mid-left 0
wave_frame 11 wave-right 1
wave_frame 12 wave-right -1
wave_frame 13 wave-mid-left 0
wave_frame 14 wave-mid-left -2
wave_frame 15 front 1

# Background disposal clears every previous frame; no GIF optimization.
magick -dispose Background -delay 14 \
  "$temporary_frames/wave-00.png" "$temporary_frames/wave-01.png" \
  "$temporary_frames/wave-02.png" "$temporary_frames/wave-03.png" \
  "$temporary_frames/wave-04.png" "$temporary_frames/wave-05.png" \
  "$temporary_frames/wave-06.png" "$temporary_frames/wave-07.png" \
  "$temporary_frames/wave-08.png" "$temporary_frames/wave-09.png" \
  "$temporary_frames/wave-10.png" "$temporary_frames/wave-11.png" \
  "$temporary_frames/wave-12.png" "$temporary_frames/wave-13.png" \
  "$temporary_frames/wave-14.png" "$temporary_frames/wave-15.png" \
  -loop 0 icons/guga-wave.gif

spin_frame() {
  magick "$poses/$2.png" -resize "$3"x370\! -background none \
    -gravity center -extent 400x370 "$temporary_frames/spin-$1.png"
}

# Clockwise turn through front, side and back; mirrored poses return to front.
spin_frame 00 front 400
spin_frame 01 front 385
spin_frame 02 turn-quarter-right 400
spin_frame 03 turn-quarter-right 385
spin_frame 04 turn-sixty-right 400
spin_frame 05 turn-sixty-right 385
spin_frame 06 turn-side-right 400
spin_frame 07 turn-side-right 385
spin_frame 08 turn-rear-quarter-right 400
spin_frame 09 turn-rear-quarter-right 385
spin_frame 10 back 400
spin_frame 11 back 385
spin_frame 12 turn-rear-quarter-left 400
spin_frame 13 turn-rear-quarter-left 385
spin_frame 14 turn-side-left 400
spin_frame 15 turn-side-left 385
spin_frame 16 turn-sixty-left 400
spin_frame 17 turn-sixty-left 385
spin_frame 18 turn-quarter-left 400
spin_frame 19 turn-quarter-left 385

magick -dispose Background -delay 12 \
  "$temporary_frames/spin-00.png" "$temporary_frames/spin-01.png" \
  "$temporary_frames/spin-02.png" "$temporary_frames/spin-03.png" \
  "$temporary_frames/spin-04.png" "$temporary_frames/spin-05.png" \
  "$temporary_frames/spin-06.png" "$temporary_frames/spin-07.png" \
  "$temporary_frames/spin-08.png" "$temporary_frames/spin-09.png" \
  "$temporary_frames/spin-10.png" "$temporary_frames/spin-11.png" \
  "$temporary_frames/spin-12.png" "$temporary_frames/spin-13.png" \
  "$temporary_frames/spin-14.png" "$temporary_frames/spin-15.png" \
  "$temporary_frames/spin-16.png" "$temporary_frames/spin-17.png" \
  "$temporary_frames/spin-18.png" "$temporary_frames/spin-19.png" \
  -loop 0 icons/guga-spin.gif

magick -dispose Background -delay 14 "$temporary_frames"/wave-*.png \
  -delay 12 "$temporary_frames"/spin-*.png \
  -loop 0 icons/guga-pal.gif

cp icons/guga-pal.gif icons/guga-pal-v050.gif
cp icons/guga-pal.gif icons/guga-pal-v050-full.gif
cp icons/guga-spin.gif icons/guga-spin-v050.gif
