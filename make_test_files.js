#! /usr/bin/env node

const fs = require('fs');

console.log("GENERATING TEST SVG FILES!!!!\n\n");

const SVG_HEADER = [
  '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
  '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
  '<svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
  '',
].join("\n");

function createSvg(name, generator) {
  console.log("Creating SVG: ", name);
  const filename = `${name}.svg`;

  const fd = fs.openSync(filename, 'w');
  const writeLine = (line = '') => fs.writeSync(fd, `  ${line}\n`);
  const rect = (x, y, width = 1, height = 1) => writeLine(`<rect x="${x}" y="${y}" width="${width}" height="${height}" />`);

  fs.writeSync(fd, SVG_HEADER);

  generator({ writeLine, rect });

  fs.writeSync(fd, '</svg>');
  fs.closeSync(fd);

  console.log(`${filename} created successfully!\n`);
}

// this one works
createSvg("one_block", ({ rect }) => {
  rect(0, 0);
});

// this one works
createSvg("full_qr_code", ({ rect, writeLine }) => {
  for (let i = 0; i < 33; ++i) {
    for (let j = 0; j < 33; ++j) {
      rect(i, j);
    }

    writeLine();
  }
});

// does not work!!
createSvg("checkerboard", ({ rect, writeLine }) => {
  for (let i = 0; i < 33; ++i) {
    for (let j = 0; j < 33; ++j) {
      if ((i + j) % 2 === 0) { continue; }
      rect(i, j);
    }

    writeLine();
  }
});

// works
createSvg("vertical_lines", ({ rect, writeLine }) => {
  for (let i = 0; i < 33; i += 2) {
    for (let j = 0; j < 33; ++j) {
      rect(i, j);
    }

    writeLine();
  }
});

// works
createSvg("horizontal_lines", ({ rect, writeLine }) => {
  for (let i = 0; i < 33; ++i) {
    for (let j = 0; j < 33; j += 2) {
      rect(i, j);
    }

    writeLine();
  }
});

// works
createSvg("closed_shape", ({ rect }) => {
  rect(0, 0);
  rect(1, 0);
  rect(2, 0);

  rect(0, 1);
  rect(2, 1);

  rect(0, 2);
  rect(1, 2);
  rect(2, 2);
});

// works
createSvg("isolated_part", ({ rect }) => {
  rect(0, 0);
  rect(1, 0);
  rect(2, 0);
  rect(3, 0);
  rect(4, 0);

  rect(0, 1);
  rect(4, 1);

  rect(0, 2);
  rect(4, 2);

  rect(0, 3);
  rect(4, 3);

  rect(0, 4);
  rect(1, 4);
  rect(2, 4);
  rect(3, 4);
  rect(4, 4);

  // testing this thing here
  rect(2, 2);
});

// renders, but object may not be a valid 2-manifold and may need repair
createSvg("minimal_checker", ({ rect, writeLine }) => {
  for (let i = 0; i < 2; ++i) {
    for (let j = 0; j < 2; ++j) {
      if ((i + j) % 2 === 0) { continue; }
      rect(i, j);
    }

    writeLine();
  }
});

// does not render!!!
createSvg("three_checks", ({ rect, writeLine }) => {
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if ((i + j) % 2 === 0) { continue; }
      rect(i, j);
    }

    writeLine();
  }
});

// woot!  Does not work
createSvg("minimal_failing_example", ({ rect }) => {
  rect(0, 0);
  rect(2, 0);

  rect(1, 1);
});

// totally works!
createSvg("attempt_to_fix", ({ rect }) => {
  const size = .999999999999999; // fails at .9999999999999999

  rect(0, 0, size, size);
  rect(2, 0, size, size);

  rect(1, 1, size, size);
});

// works, but man that takes a long time to render!
createSvg("working_checkerboard", ({ rect, writeLine }) => {
  const size = .999;            // fails at .999999999999999
                                // works at .99999999999999 but takes a long while to render (25 seconds!)
                                // same duration at .999 . . . so . . . it's just the number of shapes

  for (let i = 0; i < 33; ++i) {
    for (let j = 0; j < 33; ++j) {
      if ((i + j) % 2 === 0) { continue; }
      rect(i, j, size, size);
    }

    writeLine();
  }
});
