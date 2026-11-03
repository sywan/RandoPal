#!/bin/sh
set -eu
cd "$(dirname "$0")/.."

source_dir=icons/guga-poses
working=$(mktemp -d)
trap 'rm -rf "$working"' EXIT
render_pose() {
  bounds=$(magick "$1" -alpha extract -threshold 10% -trim -format '%wx%h%O' info:)
  magick "$1" -alpha set -crop "$bounds" +repage -resize x788 \
    -background none -gravity south -extent 1000x925 "$working/$2.png"
}
render_pose '咕嘎-黑眼圈.png' front
render_pose "$source_dir/wave-left-source.png" wave-left
render_pose "$source_dir/wave-right-source.png" wave-right
render_pose "$source_dir/wave-mid-left-source.png" wave-mid-left
render_pose "$source_dir/wave-mid-right-source.png" wave-mid-right
render_pose "$source_dir/turn-quarter-source.png" turn-quarter-left
render_pose "$source_dir/turn-sixty-source.png" turn-sixty-right
render_pose "$source_dir/turn-side-source.png" turn-side-right
render_pose "$source_dir/turn-rear-quarter-source.png" turn-rear-quarter-right
render_pose "$source_dir/back-source.png" back
magick "$working/turn-quarter-left.png" -flop "$working/turn-quarter-right.png"
magick "$working/turn-sixty-right.png" -flop "$working/turn-sixty-left.png"
magick "$working/turn-side-right.png" -flop "$working/turn-side-left.png"
magick "$working/turn-rear-quarter-right.png" -flop "$working/turn-rear-quarter-left.png"
cp "$working/front.png" icons/guga-pal-hd.png

wave_frame() {
  magick "$working/$2.png" -background none -rotate "$3" \
    -gravity center -extent 1000x925 "$working/wave-$1.png"
}
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

spin_frame() {
  magick "$working/$2.png" -resize "$3"x925\! -background none \
    -gravity center -extent 1000x925 "$working/spin-$1.png"
}
spin_frame 00 front 1000
spin_frame 01 front 962
spin_frame 02 turn-quarter-right 1000
spin_frame 03 turn-quarter-right 962
spin_frame 04 turn-sixty-right 1000
spin_frame 05 turn-sixty-right 962
spin_frame 06 turn-side-right 1000
spin_frame 07 turn-side-right 962
spin_frame 08 turn-rear-quarter-right 1000
spin_frame 09 turn-rear-quarter-right 962
spin_frame 10 back 1000
spin_frame 11 back 962
spin_frame 12 turn-rear-quarter-left 1000
spin_frame 13 turn-rear-quarter-left 962
spin_frame 14 turn-side-left 1000
spin_frame 15 turn-side-left 962
spin_frame 16 turn-sixty-left 1000
spin_frame 17 turn-sixty-left 962
spin_frame 18 turn-quarter-left 1000
spin_frame 19 turn-quarter-left 962

magick -dispose Background -delay 14 "$working"/wave-[0-9][0-9].png \
  -delay 12 "$working"/spin-[0-9][0-9].png -loop 0 icons/guga-pal-hd.gif

set -- -loop 0
for frame in "$working"/wave-[0-9][0-9].png; do
  set -- "$@" -d 140 -lossy -q 92 -m 4 "$frame"
done
for frame in "$working"/spin-[0-9][0-9].png; do
  set -- "$@" -d 120 -lossy -q 92 -m 4 "$frame"
done
img2webp "$@" -o icons/guga-pal-hd.webp

set -- -loop 0
for frame in "$working"/spin-[0-9][0-9].png; do
  set -- "$@" -d 120 -lossy -q 92 -m 4 "$frame"
done
img2webp "$@" -o icons/guga-spin-hd.webp
