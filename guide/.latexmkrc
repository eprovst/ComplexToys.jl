## LaTeXMK config

$pdf_previewer = 'xdg-open %O %S';

## Use LuaLaTeX by default

$pdf_mode = 4;

# Other options are:
#   0 = no pdf
#   1 = pdflatex
#   2 = pdf from ps
#   3 = pdf from dvi
#   4 = lualatex
#   5 = xelatex

add_cus_dep('pytxcode', 'tex', 0, 'pythontex');
sub pythontex { return system("pythontex \"$_[0]\""); }
