# OpenSCAD SVG QR Code Issue Demo

## What's going on?

Well, I was trying to render an SVG of a QR Code on a 3D model in OpenSCAD but, even though the preview works, the model won't render.  I was trying to get to the bottom of what's going on, and this was that attempt.

## How do I see the results?

1. Open `qr_demo.scad` in OpenSCAD.
2. You should see a QR code.
3. Hit render, and the cube renders but the QR code disappears.
4. Have sad face :(

There are several sample SVGs.  `minimal_failing_example.svg` will disappear when you render.  If you adjust the size of those rectangles by `-0.0000000000000001` it'll work.  My hypothesis is that when the coners of the objects in the svg are exactly adjacent, it's creating a shape that's not understood by OpenSCAD.  When the edges are exactly adjacent, it just becomes a single object.  Or something like that . . . I dunno.

## I wanna test stuff too!

Clone the repo, modify `make_test_files.js`, and run `node make_test_files.js`.  I threw this together super fast . . . don't judge me. ;)

## Solution?

Well, I'm not really sure.  Seems like something in OpenSCAD should change to be honest.  But, in the meantime, I'm just gonna export my QR codes as arrays of booleans and draw my shapes wtih a module.  It's less awesome . . . but it'll work.

