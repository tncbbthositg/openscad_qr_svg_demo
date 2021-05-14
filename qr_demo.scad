/* [Box Props] */

// logo image source
qr_code = "qr_code.svg";

// size of the box
box_size = 50;

// height of the box
box_height = 20;

// height qr code extends above other qr code parts
qr_code_height = 2;

// margin around qr code
qr_code_margin = 10;

/* [Text Props] */

// size of text
text_size = 3.5;

// depth of text
text_depth = 2;

// text at bottom
center_text = " ";

/* [Render Options] */

// smoother renders slower
quality = 8; //[2:Draft, 4:Medium, 8:Fine, 16:Ultra Fine]

/* [Hidden] */

// print quality settings
$fa = 12 / quality;
$fs = 2 / quality;

translate([0, 0, box_height / 2])
  cube([box_size, box_size, box_height], center = true);

translate([0, 0, box_height])
  linear_extrude(height = qr_code_height)
    resize([box_size, box_size])
      import(qr_code, center = true);
