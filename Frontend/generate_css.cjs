const fs = require('fs');
const html = fs.readFileSync('stitch_trang_ch_homeappliancestore/code.html', 'utf8');
const match = html.match(/tailwind\.config = (\{[\s\S]*?\});/);
if (match) {
  const config = eval('(' + match[1] + ')');
  let css = '@import "tailwindcss";\n\n@theme {\n';
  const extend = config.theme.extend;

  if (extend.colors) {
    for (const [k, v] of Object.entries(extend.colors)) {
      css += `  --color-${k}: ${v};\n`;
    }
  }
  if (extend.spacing) {
    for (const [k, v] of Object.entries(extend.spacing)) {
      css += `  --spacing-${k}: ${v};\n`;
    }
  }
  if (extend.fontFamily) {
    for (const [k, v] of Object.entries(extend.fontFamily)) {
      css += `  --font-${k}: ${v.join(', ')};\n`;
    }
  }
  css += '}\n';

  // Add custom CSS
  css += `
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.material-symbols-outlined.fill {
    font-variation-settings: 'FILL' 1;
}

/* Subtle Shadows */
.shadow-level-1 {
    box-shadow: 0px 4px 20px rgba(31, 41, 55, 0.04);
}
.shadow-level-2 {
    box-shadow: 0px 12px 30px rgba(31, 41, 55, 0.08);
}
.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 30px rgba(31, 41, 55, 0.08);
}
`;

  fs.writeFileSync('src/index.css', css);
  console.log('CSS generated successfully.');
}
