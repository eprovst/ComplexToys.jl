var documenterSearchIndex = {"docs":
[{"location":"guide/","page":"Guide","title":"Guide","text":"using ComplexToys, GLMakie\nGLMakie.activate!()","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using ComplexToys, CairoMakie","category":"page"},{"location":"guide/#Guide","page":"Guide","title":"Guide","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"(This document is also available in PDF format.)","category":"page"},{"location":"guide/#Installation","page":"Guide","title":"Installation","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"ComplexToys.jl is a collection of plotting tools to aid the study of complex analysis. It is implemented in Julia, a modern and—at least in the author's opinion—a rather pleasant language to use.  No prior knowledge of Julia is needed to go through this document as concepts will be introduced where needed. If Julia is not yet installed on your system, you can use the usual method of your operating system or download it from https://julialang.org.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"To install the plotting routines, you enter the following commands in the Julia REPL (read eval print loop).","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"note: Note\nDepending on the speed of your machine, this might take a while. Grab a cup of tea or coffee and take a minute to enjoy the outdoors. :-)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using Pkg\npkg\"add ComplexToys\"","category":"page"},{"location":"guide/#A-first-phase-plot","page":"Guide","title":"A first phase plot","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"To start producing plots, you first have to load the package you just installed with the using keyword.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using ComplexToys","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"In the remainder of this tutorial we will discuss several plots, starting with the phase plot (we will explain the name domaincolor in the next section). On such a plot, we display the phase, or argument, by painting arg z = 0 red, arg z = fracpi2 lime green, arg z = pi cyan, arg z = frac3pi2 purple, etc.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> z)\nresize!(current_figure(), 620, 400) # hide\nsave(\"phase-id.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"We note that a zero, going anticlockwise, gives red, green and finally blue. A pole on the other hand (below one of second order) is surrounded by red, blue and then green.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> 1/z^2)\nresize!(current_figure(), 620, 400) # hide\nsave(\"phase-pole.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Note the first bit of Julia syntax you will need: an anonymous function (a function you can easily pass as an argument) is written as z -> f(z), analogous to z mapsto f(z) in mathematics.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"It is perhaps interesting to know that this reversal of the phase relates to the complex conjugate. The function z mapsto frac1z is namely the composition of z mapsto frac1barz = frac1z e^iarg z and z mapsto barz = z e^-iarg z. In the first step, the unit circle is turned inside out; the second step mirrors the image along the real axis.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"This is easily seen by looking at the effect these steps have on a square, or algebraically by noting that only the final step modifies the phase.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> z, 2, box=(.4,.6+.2im,:white))\nresize!(current_figure(), 620, 400) # hide\nsave(\"box-1.png\", current_figure()) # hide\ndomaincolor(z -> 1/conj(z), 2, box=(.4,.6+.2im,:white))\nresize!(current_figure(), 620, 400) # hide\nsave(\"box-2.png\", current_figure()) # hide\ndomaincolor(z -> 1/z, 2, box=(.4,.6+.2im,:white))\nresize!(current_figure(), 620, 400) # hide\nsave(\"box-3.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<div style=\"display: grid; grid-column-gap: 1.5em; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin: 1.5em;\">\n<figure style=\"margin: 0;\">","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figcaption>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"z mapsto z","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figcaption>\n</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure style=\"margin: 0;\">","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figcaption>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"z mapsto frac1barz","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figcaption>\n</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure style=\"margin: 0;\">","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figcaption>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"z mapsto frac1z","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figcaption>\n</figure>\n</div>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"In the above code, the second argument fixes the range of the axes. For the specific details about the box keyword argument we refer to the documentation (try: ? domaincolor, more on this later). Also note the use of im as imaginary unit in Julia.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"We conclude by mentioning that these plots are interactive. Try, for instance, to explore the phase of the sine function with domaincolor(z -> sin(z)). Initially it looks very similar to the identity function of before, not unexpected when you remember its Taylor series.  To get a better picture you can zoom in and out using the scroll wheel, or zoom to a region using left click and drag.  The centre of the plot can be dragged around using the right mouse button.  Finally, if you get lost, you can always reset the view using ctrl + left click.","category":"page"},{"location":"guide/#Domain-colouring-and-modular-surfaces","page":"Guide","title":"Domain colouring and modular surfaces","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Given that z mapsto frac1z and z mapsto barz have identical phase, a phase plot alone is not always sufficient to study a function's behaviour. For this reason it is common to add contour lines of the magnitude (usually more specifically of its logarithm). The resulting figure is called a domain colouring (hence domaincolor). We can add the contours using the option abs=true. This way we can distinguish the pole (left, with increasing lightness between contours) and zero (right, with decreasing lightness between contours) in the below example.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> (conj(z) - .5)/(z + .5), abs=true)\nresize!(current_figure(), 620, 400) # hide\nsave(\"candp.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Of course there are many variations on this idea. One could, for example, paint zero black and infinity white. This is for instance useful to illustrate the Casorati–Weierstrass theorem.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> exp(1/z), .2, abs=Inf)\nresize!(current_figure(), 620, 400) #hide\nsave(\"ess.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Aside from what is illustrate here, many other options are available, for instance grid lines and colour vision deficiency friendly phase plots. For a list of all the available options you can consult a function's documentation using ?, for example:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"? domaincolor","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"The 2D plots included in ComplexToys.jl come from a different Julia package called DomainColoring.jl; visit https://eprovst.github.io/DomainColoring.jl for more information and examples.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Yet another way to represent magnitude and phase at the same time, is by moving the former to the third dimension, which results in a (painted) modular surface. Another essential singularity we can visualize is z mapsto sinleft(frac1zright) near 0.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"modularsurface(z -> sin(1/z))","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"TODO: Currently this fails within Documenter.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"For this example—as with all other 3D plots—it is worthwhile to plot the figure yourself. This additionally allows you to rotate the plot.","category":"page"},{"location":"guide/#Branch-points-and-Riemann-surfaces","page":"Guide","title":"Branch points and Riemann surfaces","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"When looking at the domain colouring of z mapsto z^2 we see the same values appear twice in the complex plane.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> z^2, abs=true)\nresize!(current_figure(), 620, 400) # hide\nsave(\"dc-pow2.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"The inverse map z mapsto z^frac12 will hence take two values in any given point. An exception is 0, where the inverse map is unique. Such a point z_0 where a map has n values (here n=1), but every neighbour has strictly more than n values, is called a branch point (more precisely: every neighbourhood of z_0 has at least one point where the map takes at least n+1 values).","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"If we want to arrive at a single valued function, we will have to choose between one of the two values. The usual approach for a continuous function is to pick an arbitrary curve (the branch cut) connecting two branch points, and to require continuity everywhere except when crossing this curve. This results in a set of single valued functions (so called branches) which can be attached along this curve in a continuous fashion.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"For z mapsto z^frac12, the usual choice of branch cut is the negative real axis (connecting the branch points 0 and infty), as is also done in Julia. This is a result of the convention to use z^frac1n e^i fracmathrmArgzn as the so-called \\emph{principal value} of the nth root, with mathrmArgz in (-pi pi the principal value of the argument. Analogously, the principal value of the logarithm is given by mathrmLogz = log z + imathrmArg z, which is of course compatible with the preceding.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"domaincolor(z -> z^(1/2), abs=true)\nresize!(current_figure(), 620, 400) # hide\nsave(\"dc-sqrt.png\", current_figure()) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Additionally, we could also try to make a plot of all the values at the same time. Note that this is a four dimensional object. For w = f(z) we namely have (mathrmRez mathrmImz mathrmRew mathrmImw) as graph. (One can, of course, also use the phases and magnitudes.)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"When we project this orthogonally on the first three components and colour the resulting surface according to the removed component, we get the following for z mapsto z^frac12.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"riemannpow(1//2)\nresize!(current_figure(), 620, 400) # hide\nsave(\"rm-sqrt.png\", current_figure(), px_per_unit=1) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Here 1//2 is Julia notation for the exact rational number frac12. On the negative real axis the graph seems to intersect itself, but this is merely an artefact of the chosen projection. The colour is in fact distinct. Note that indeed each point, except for the branch point 0, has two distinct values.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"We encourage you to play around with different rational numbers and to look what does (and what does not) change the number of values. Also try an irrational power; note that it never reattaches to itself, it takes an infinite number of values!","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"A 'simpler' example of a function that takes infinitely many values is log z = log z + iarg z.  Using a slightly different projection, we get a rather nice looking staircase.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"riemannlog()\nresize!(current_figure(), 620, 400) # hide\nsave(\"rm-log.png\", current_figure(), px_per_unit=1) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"guide/#On-the-Riemann-sphere","page":"Guide","title":"On the Riemann sphere","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Finally, ComplexToys.jl is also able to plot a function on the Riemann sphere. Let us, to conclude, again look at the sine, with a zero at the origin (south pole) and an essential singularity at infinity (north pole).","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"riemannsphere(sin)\nrotate!(current_figure().scene, Vec3f(-1, 1, 0), 0.25) # hide\nresize!(current_figure(), 400, 400) # hide\nsave(\"rms-sin.png\", current_figure(), px_per_unit=1) # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"<figure>","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"</figure>","category":"page"},{"location":"lib/#Library","page":"Library","title":"Library","text":"","category":"section"},{"location":"lib/#ComplexToys","page":"Library","title":"ComplexToys","text":"","category":"section"},{"location":"lib/","page":"Library","title":"Library","text":"Modules = [ComplexToys]\nPrivate = false","category":"page"},{"location":"lib/#ComplexToys.modularsurface","page":"Library","title":"ComplexToys.modularsurface","text":"modularsurface(\n    f :: \"Complex -> Complex\",\n    limits = (-1,1,-1,1);\n    mmax = 10,\n    nodes = (720, 720),\n    abs = false,\n    grid = false,\n    color = true,\n    all = false,\n    box = nothing,\n    kwargs...\n)\n\nTakes a complex function and produces its modular surface plot.\n\nRed corresponds to phase 0, yellow to fracpi3, green to frac2pi3, cyan to pi, blue to frac4pi3, and magenta to frac5pi3.\n\nArguments\n\nf is the complex function to plot.\nlimits are the limits of the rectangle to plot, in the format (minRe, maxRe, minIm, maxIm), if one or two numbers are provided instead they are take symmetric along the real and imaginary axis.\n\nKeyword Arguments\n\nlog plot the magnitude using a logarithmic scale.\nmmax sets an upper cut off point for the magnitude.\nmmin sets a lower cut off point for the magnitude.\ncut toggles the behaviour when the maximum is reached. If true the surface is cut, leaving a flat spot which can be shaded. Else the surface is allowed to render outside of the axis limits.\nnodes is the number of grid points to compute in, respectively, the real and imaginary axis, taking the same for both if only one number is provided.\nabs toggles the plotting of the natural logarithm of the magnitude as lightness ramps between level curves. If set to a number, this will be used as base of the logarithm instead, if set to Inf, zero magnitude will be colored black and poles white. Further granular control can be achieved by passing a named tuple with any of the parameters base, transform, or sigma. base changes the base of the logarithm, as before. transform is the function applied to the magnitude (m -> log(base, m) by default), and sigma changes the rate at which zeros and poles are colored and implies base = Inf.\ngrid plots points with integer real or imaginary part as black dots. More complicated arguments can be passed as a named tuple in a similar fashion to checkerplot.\ncolor toggles coloring of the phase angle. Can also be set to either the name of, or a ColorScheme, or a function θ -> Color. If set to :print a desaturated version of the default is used.\nall is a shortcut for abs = true, grid = true, and color = true.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"lib/#ComplexToys.riemannlog-Tuple{}","page":"Library","title":"ComplexToys.riemannlog","text":"riemannlog(;\n    nodes = (120, 120),\n    kwargs...\n)\n\nPlots the Riemann surface of log(z), with the bottom plane mapped to the input, the height being equal to the imaginary part of the output and the color corresponding to the real part of the output.\n\nThe keyword argument nodes is the number of grid points to use in respectively the radius and a single rotation of the input. If only one number is provided it is used for both.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"method"},{"location":"lib/#ComplexToys.riemannpow","page":"Library","title":"ComplexToys.riemannpow","text":"riemannpow(\n    k = 1//2;\n    nodes = (120, 120),\n    maxrotations = 10,\n    kwargs...\n)\n\nPlots the Riemann surface of z^k, where k is the exponent, with the bottom plane mapped to the input, the height being equal to the real part of the output and the color corresponding to the imaginary part of the output. The routine attempts to plot all branches.\n\nThe keyword argument nodes is the number of grid points to use in respectively the radius and a single rotation of the input. If only one number is provided it is used for both.\n\nThe automatically selected number of rotations is limited by the keyword maxrotations.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"lib/#ComplexToys.riemannsphere-Tuple{Any}","page":"Library","title":"ComplexToys.riemannsphere","text":"riemannsphere(\n    f :: \"Complex -> Complex\";\n    nodes = (720, 720),\n    abs = false,\n    grid = false,\n    color = true,\n    all = false,\n    box = nothing,\n    kwargs...\n)\n\nTakes a complex function and produces its Riemann sphere surface plot.\n\nRed corresponds to phase 0, yellow to fracpi3, green to frac2pi3, cyan to pi, blue to frac4pi3, and magenta to frac5pi3.\n\nArguments\n\nf is the complex function to plot.\n\nKeyword Arguments\n\nnodes is the number of grid points to compute in, respectively, the azimuth and polar angles, per quarter section of the sphere. Taking the same for both if only one number is provided.\nabs toggles the plotting of the natural logarithm of the magnitude as lightness ramps between level curves. If set to a number, this will be used as base of the logarithm instead, if set to Inf, zero magnitude will be colored black and poles white. Further granular control can be achieved by passing a named tuple with any of the parameters base, transform, or sigma. base changes the base of the logarithm, as before. transform is the function applied to the magnitude (m -> log(base, m) by default), and sigma changes the rate at which zeros and poles are colored and implies base = Inf.\ngrid plots points with integer real or imaginary part as black dots. More complicated arguments can be passed as a named tuple in a similar fashion to checkerplot.\ncolor toggles coloring of the phase angle. Can also be set to either the name of, or a ColorScheme, or a function θ -> Color. If set to :print a desaturated version of the default is used.\nall is a shortcut for abs = true, grid = true, and color = true.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"method"},{"location":"lib/#Reexported-from-DomainColoringToy","page":"Library","title":"Reexported from DomainColoringToy","text":"","category":"section"},{"location":"lib/","page":"Library","title":"Library","text":"Modules = [DomainColoringToy]\nPrivate = false","category":"page"},{"location":"lib/#DomainColoringToy.checkerplot","page":"Library","title":"DomainColoringToy.checkerplot","text":"checkerplot(\n    f :: \"Complex -> Complex\",\n    limits = (-1, 1, -1, 1);\n    pixels = (480, 480),\n    real = false,\n    imag = false,\n    rect = false,\n    angle = false,\n    abs = false,\n    polar = false,\n    box = nothing,\n    hicontrast = false,\n    kwargs...\n)\n\nTakes a complex function and produces a checker plot as an interactive GLMakie plot.\n\nArguments\n\nf is the complex function to plot.\nlimits are the limits of the rectangle to plot, in the format (minRe, maxRe, minIm, maxIm), if one or two numbers are provided instead they are take symmetric along the real and imaginary axis.\n\nKeyword Arguments\n\npixels is the size of the output in pixels, respectively, the number of pixels along the real and imaginary axis, taking the same for both if only one number is provided. If either is :auto, the viewport resolution is used.\n\nIf none of the below options are set, the plot defaults to rect = true.\n\nreal plots black and white stripes orthogonal to the real axis at a rate of one stripe per unit increase. If set to a number this will be used as width instead.\nimag plots black and white stripes orthogonal to the imaginary axis at a rate of one stripe per unit increase. If set to a number this will be used as width instead.\nrect is a shortcut for real = true and imag = true.\nangle plots black and white stripes orthogonal to the phase angle at a rate of eight stripes per full rotation. Can be set to an integer to specify a different rate.\nabs plots black and white stripes at a rate of one stripe per unit increase of the natural logarithm of the magnitude. If set to a number this is used as the base of the logarithm. When set to a function, unit increases of its output are used instead.\npolar is a shortcut for angle = true and abs = true. Can also be set to the basis to use for abs, then a suitable rate for angle will be selected.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\nhicontrast uses black and white instead of the softer defaults.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"lib/#DomainColoringToy.domaincolor","page":"Library","title":"DomainColoringToy.domaincolor","text":"domaincolor(\n    f :: \"Complex -> Complex\",\n    limits = (-1, 1, -1, 1);\n    pixels = (480, 480),\n    abs = false,\n    grid = false,\n    color = true,\n    all = false,\n    box = nothing,\n    kwargs...\n)\n\nTakes a complex function and produces its domain coloring plot as an interactive GLMakie plot.\n\nRed corresponds to phase 0, yellow to fracpi3, green to frac2pi3, cyan to pi, blue to frac4pi3, and magenta to frac5pi3.\n\nArguments\n\nf is the complex function to plot.\nlimits are the limits of the rectangle to plot, in the format (minRe, maxRe, minIm, maxIm), if one or two numbers are provided instead they are take symmetric along the real and imaginary axis.\n\nKeyword Arguments\n\npixels is the size of the output in pixels, respectively, the number of pixels along the real and imaginary axis, taking the same for both if only one number is provided. If either is :auto, the viewport resolution is used.\nabs toggles the plotting of the natural logarithm of the magnitude as lightness ramps between level curves. If set to a number, this will be used as base of the logarithm instead, if set to Inf, zero magnitude will be colored black and poles white. Further granular control can be achieved by passing a named tuple with any of the parameters base, transform, or sigma. base changes the base of the logarithm, as before. transform is the function applied to the magnitude (m -> log(base, m) by default), and sigma changes the rate at which zeros and poles are colored and implies base = Inf.\ngrid plots points with integer real or imaginary part as black dots. More complicated arguments can be passed as a named tuple in a similar fashion to checkerplot.\ncolor toggles coloring of the phase angle. Can also be set to either the name of, or a ColorScheme, or a function θ -> Color. If set to :print a desaturated version of the default is used.\nall is a shortcut for abs = true, grid = true, and color = true.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"lib/#DomainColoringToy.pdphaseplot","page":"Library","title":"DomainColoringToy.pdphaseplot","text":"pdphaseplot(\n    f :: \"Complex -> Complex\",\n    limits = (-1, 1, -1, 1);\n    pixels = (480, 480),\n    real = false,\n    imag = false,\n    rect = false,\n    angle = false,\n    abs = false,\n    polar = false,\n    box = nothing,\n    kwargs...\n)\n\nTakes a complex valued function and produces a phase plot using ColorCET's CBC1 cyclic color map for protanopic and deuteranopic viewers as an interactive GLMakie plot.\n\nYellow corresponds to phase 0, white to fracpi2, blue to pi, and black to frac3pi2.\n\nArguments\n\nf is the complex function to plot.\nlimits are the limits of the rectangle to plot, in the format (minRe, maxRe, minIm, maxIm), if one or two numbers are provided instead they are take symmetric along the real and imaginary axis.\n\nKeyword Arguments\n\npixels is the size of the output in pixels, respectively, the number of pixels along the real and imaginary axis, taking the same for both if only one number is provided. If either is :auto, the viewport resolution is used.\nreal plots black to white ramps orthogonal to the real axis at a rate of one ramp per unit increase. If set to a number this will be used as width instead.\nimag plots black to white ramps orthogonal to the imaginary axis at a rate of one ramp per unit increase. If set to a number this will be used as width instead.\nrect is a shortcut for real = true and imag = true.\nangle plots black to white ramps orthogonal to the phase angle at a rate of eight ramps per full rotation. Can be set to an integer to specify a different rate.\nabs plots black to white ramps at a rate of one ramp per unit increase of the natural logarithm of the magnitude. If set to a number this is used as the base of the logarithm. When set to a function, unit increases of its output are used instead.\npolar is a shortcut for angle = true and abs = true. Can also be set to the basis to use for abs, then a suitable rate for angle will be selected.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"lib/#DomainColoringToy.sawplot","page":"Library","title":"DomainColoringToy.sawplot","text":"sawplot(\n    f :: \"Complex -> Complex\",\n    limits = (-1, 1, -1, 1);\n    pixels = (480, 480),\n    real = false,\n    imag = false,\n    rect = false,\n    angle = false,\n    abs = false,\n    polar = false,\n    color = false,\n    box = nothing,\n    kwargs...\n)\n\nTakes a complex function and produces a saw plot as an interactive GLMakie plot.\n\nArguments\n\nf is the complex function to plot.\nlimits are the limits of the rectangle to plot, in the format (minRe, maxRe, minIm, maxIm), if one or two numbers are provided instead they are take symmetric along the real and imaginary axis.\n\nKeyword Arguments\n\npixels is the size of the output in pixels, respectively, the number of pixels along the real and imaginary axis, taking the same for both if only one number is provided. If either is :auto, the viewport resolution is used.\n\nIf none of the below options are set, the plot defaults to rect = true.\n\nreal plots black to white ramps orthogonal to the real axis at a rate of one ramp per unit increase. If set to a number this will be used as width instead.\nimag plots black to white ramps orthogonal to the imaginary axis at a rate of one ramp per unit increase. If set to a number this will be used as width instead.\nrect is a shortcut for real = true and imag = true.\nangle plots black to white ramps orthogonal to the phase angle at a rate of eight ramps per full rotation. Can be set to an integer to specify a different rate.\nabs plots black to white ramps at a rate of one ramp per unit increase of the natural logarithm of the magnitude. If set to a number this is used as the base of the logarithm. When set to a function, unit increases of its output are used instead.\npolar is a shortcut for angle = true and abs = true. Can also be set to the basis to use for abs, then a suitable rate for angle will be selected.\ncolor toggles coloring of the phase angle. Can also be set to either the name of, or a ColorScheme, or a function θ -> Color. If set to :print a desaturated version of the default is used.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"lib/#DomainColoringToy.tphaseplot","page":"Library","title":"DomainColoringToy.tphaseplot","text":"tphaseplot(\n    f :: \"Complex -> Complex\",\n    limits = (-1, 1, -1, 1);\n    pixels = (480, 480),\n    real = false,\n    imag = false,\n    rect = false,\n    angle = false,\n    abs = false,\n    polar = false,\n    box = nothing,\n    kwargs...\n)\n\nTakes a complex valued function and produces a phase plot using ColorCET's CBTC1 cyclic color map for titranopic viewers as an interactive GLMakie plot.\n\nRed corresponds to phase 0, white to fracpi2, cyan to pi, and black to frac3pi2.\n\nArguments\n\nf is the complex function to plot.\nlimits are the limits of the rectangle to plot, in the format (minRe, maxRe, minIm, maxIm), if one or two numbers are provided instead they are take symmetric along the real and imaginary axis.\n\nKeyword Arguments\n\npixels is the size of the output in pixels, respectively, the number of pixels along the real and imaginary axis, taking the same for both if only one number is provided. If either is :auto, the viewport resolution is used.\nreal plots black to white ramps orthogonal to the real axis at a rate of one ramp per unit increase. If set to a number this will be used as width instead.\nimag plots black to white ramps orthogonal to the imaginary axis at a rate of one ramp per unit increase. If set to a number this will be used as width instead.\nrect is a shortcut for real = true and imag = true.\nangle plots black to white ramps orthogonal to the phase angle at a rate of eight ramps per full rotation. Can be set to an integer to specify a different rate.\nabs plots black to white ramps at a rate of one ramp per unit increase of the natural logarithm of the magnitude. If set to a number this is used as the base of the logarithm. When set to a function, unit increases of its output are used instead.\npolar is a shortcut for angle = true and abs = true. Can also be set to the basis to use for abs, then a suitable rate for angle will be selected.\nbox if set to (a, b, s) shades the area where the output is within the box a and b in the color s when set to (f, s) the colored domain is defined by f(w) == true. Can also be a list of multiple boxes.\n\nRemaining keyword arguments are passed to the plotting backend.\n\n\n\n\n\n","category":"function"},{"location":"#ComplexToys.jl:-Didactical-Tools-for-Complex-Analysis","page":"Home","title":"ComplexToys.jl: Didactical Tools for Complex Analysis","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Welcome to the documentation of the ComplexToys.jl package, a collection of useful plotting routines for teaching and learning complex analysis, based on Makie, often taking inspiration in the work of Wegert.[1]","category":"page"},{"location":"","page":"Home","title":"Home","text":"<div align=\"center\">\n  <img src=\"assets/logo.png\" width=300 />\n</div>","category":"page"},{"location":"","page":"Home","title":"Home","text":"This online documentation is under construction. Take a look at the Guide to get started, or use the built-in help functionality of the Julia REPL.","category":"page"},{"location":"","page":"Home","title":"Home","text":"To install run:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\npkg\"add ComplexToys\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Included plotting routines:","category":"page"},{"location":"","page":"Home","title":"Home","text":"modularsurface(z->f(z)) plots a modular surface of f, i.e. a surface plot of the magnitude;\nriemannsphere(z->f(z)) plots a domain coloring of f on the Riemann sphere;\nriemannpow(k) plots a projection of the Riemann surface of z^k; and\nriemannlog() plots a projection of the Riemann surface of log(z).","category":"page"},{"location":"","page":"Home","title":"Home","text":"Next to the routines in this package, DomainColoringToy is reexported. See their documentation for domain colourings, checker plots, etc.","category":"page"},{"location":"","page":"Home","title":"Home","text":"[1]: Wegert, Elias. Visual Complex Functions: An Introduction with Phase Portraits. Birkhäuser Basel, 2012.","category":"page"}]
}
