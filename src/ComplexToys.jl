module ComplexToys

using Reexport, Observables, LaTeXStrings, GLMakie
@reexport using DomainColoringToy
import DomainColoring as DC

export modularsurface

"""
    modularsurface(
        f :: "Complex -> Complex",
        limits = (-1,1,-1,1);
        log = false,
        mmax = 10,
        mmin = log ? -mmax : 0,
        cut = false,
        nodes = (720, 720),
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

Takes a complex function and produces its modular surface plot.

Red corresponds to phase ``0``, yellow to ``\\frac{\\pi}{3}``, green
to ``\\frac{2\\pi}{3}``, cyan to ``\\pi``, blue to
``\\frac{4\\pi}{3}``, and magenta to ``\\frac{5\\pi}{3}``.

# Arguments

- **`f`** is the complex function to plot.

- **`limits`** are the limits of the rectangle to plot, in the format
  `(minRe, maxRe, minIm, maxIm)`, if one or two numbers are provided
  instead they are take symmetric along the real and imaginary axis.

# Keyword Arguments

- **`log`** plot the magnitude using a logarithmic scale.

- **`mmax`** sets an upper cut off point for the magnitude.

- **`mmin`** sets a lower cut off point for the magnitude.

- **`cut`** toggles the behaviour when the maximum is reached. If true
  the surface is cut, leaving a flat spot which can be shaded. Else the
  surface is allowed to render outside of the axis limits.

- **`nodes`** is the number of grid points to compute in, respectively,
  the real and imaginary axis, taking the same for both if only one
  number is provided.

- **`abs`** toggles the plotting of the natural logarithm of the
  magnitude as lightness ramps between level curves. If set to a number,
  this will be used as base of the logarithm instead, if set to `Inf`,
  zero magnitude will be colored black and poles white. Further granular
  control can be achieved by passing a named tuple with any of the
  parameters `base`, `transform`, or `alpha`. `base` changes the base of
  the logarithm, as before. `transform` is the function applied to the
  magnitude (`m -> log(base, m)` by default), and `alpha` changes the
  rate at which zeros and poles are colored and implies `base = Inf`.

- **`grid`** plots points with integer real or imaginary part as black
  dots. More complicated arguments can be passed as a named tuple in a
  similar fashion to [`checkerplot`](@ref).

- **`color`** toggles coloring of the phase angle. Can also be set to
  either the name of, or a `ColorScheme`, or a function `θ -> Color`.
  If set to `:print` a desaturated version of the default is used.

- **`all`** is a shortcut for `abs = true`, `grid = true`, and
  `color = true`.

- **`box`** if set to `(a, b, s)` shades the area where the output is
  within the box `a` and `b` in the color `s` when set to `(f, s)` the
  colored domain is defined by `f(w) == true`. Can also be a list of
  multiple boxes.

Remaining keyword arguments are passed to the plotting backend.
"""
function modularsurface(
        f,
        limits = (-1,1,-1,1);
        log = false,
        mmax = 10,
        mmin = log ? -mmax : 0,
        cut = false,
        nodes = (720, 720),
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

    length(nodes) == 1 && (nodes = (nodes, nodes))
    limits = Observable(DC._expandlimits(limits))

    r = Observables.@map range((&limits)[1], (&limits)[2], length=nodes[1])
    i = Observables.@map range((&limits)[3], (&limits)[4], length=nodes[2])

    Z = Observables.@map @. f(&r + im*(&i)')
    lmt(Z) = clamp.(log ? Base.log.(Base.abs.(Z)) : Base.abs.(Z),
                    cut ? mmin : -Inf, cut ? mmax : Inf)
    R = Observables.@map lmt(&Z)
    mn, mx = extrema(R[])

    shader(w) = DC.domaincolorshader(w; abs, grid, color, all, box)
    C = Observables.@map shader.(&Z)

    aspectratio = (limits[][2] - limits[][1]) / (limits[][4] - limits[][3])
    fg = surface(r, i, R; color=C,
                 axis=(type=Axis3,
                       aspect=(aspectratio, 1, 2/3),
                       xlabel=L"\mathrm{Re}(z)",
                       ylabel=L"\mathrm{Im}(z)",
                       zlabel=log ? L"\log |f(z)|" : L"|f(z)|"),
                 clip_planes=[],
                 kwargs...)

    xlims!(fg.axis, limits[][1], limits[][2])
    ylims!(fg.axis, limits[][3], limits[][4])
    zlims!(fg.axis, max(mn-1, mmin), min(mx+1, mmax))

    on(fg.axis.finallimits) do lims
        limits[] = (lims.origin[1], lims.origin[1] + lims.widths[1],
                    lims.origin[2], lims.origin[2] + lims.widths[2])
    end

    return fg
end

export riemannpow

"""
    riemannpow(
        k = 1//2;
        nodes = (120, 120),
        maxrotations = 10,
        kwargs...
    )

Plots the Riemann surface of ``z^k``, where **`k`** is the exponent,
with the bottom plane mapped to the input, the height being equal to
the real part of the output and the color corresponding to the imaginary
part of the output. The routine attempts to plot all branches.

The keyword argument **`nodes`** is the number of grid points to use in
respectively the radius and a single rotation of the input. If only one
number is provided it is used for both.

The automatically selected number of rotations is limited by the keyword
**`maxrotations`**.

Remaining keyword arguments are passed to the plotting backend.
"""
function riemannpow(
        k = 1//2;
        nodes = (120, 120),
        maxrotations = 10,
        kwargs...
    )

    length(nodes) == 1 && (nodes = (nodes, nodes))

    if k isa Integer
        d = 1
    elseif k isa Rational
        d = k.den
    else
        r = rationalize(float(k))
        if r != k
            @warn "k is not exactly rational, making best guess for the number of branches."
            d = min(r.den, maxrotations)
        else
            k = r
            d = r.den
        end
    end

    if d > maxrotations
        @warn "maxrotations exceeded."
        d = maxrotations
    end

    r = range(0, 1, length=nodes[1])
    θ = range(-d*π, d*π, length=d*nodes[2])
    Z = @. r*exp(im*θ')
    W = @. r^k * exp(im*k*θ')

    (k isa Rational) && (k = "\\frac{$(k.num)}{$(k.den)}")

    surface(real.(Z), imag.(Z), real.(W); color=imag.(W),
            axis=(type=Axis3,
                  xlabel=L"\mathrm{Re}(z)",
                  ylabel=L"\mathrm{Im}(z)",
                  zlabel=latexstring("\\mathrm{Re}\\left(z^{$(k)}\\right)")),
            kwargs...)
end

export riemannlog

"""
    riemannlog(;
        nodes = (120, 120),
        kwargs...
    )

Plots the Riemann surface of ``log(z)``, with the bottom plane mapped to
the input, the height being equal to the imaginary part of the output
and the color corresponding to the real part of the output.

The keyword argument **`nodes`** is the number of grid points to use in
respectively the radius and a single rotation of the input. If only one
number is provided it is used for both.

Remaining keyword arguments are passed to the plotting backend.
"""
function riemannlog(;
        nodes = (120, 120),
        kwargs...
    )

    length(nodes) == 1 && (nodes = (nodes, nodes))

    r = range(0, 1, length=nodes[1])
    θ = range(-6π, 6π, length=6nodes[2])
    Z = @. r*exp(im*θ')
    W = @. log(r) + im*θ'

    fg = surface(real.(Z), imag.(Z), imag.(W); color=real.(W),
            colorrange=(-4, 0),
            axis=(type=Axis3,
                  xlabel=L"\mathrm{Re}(z)",
                  ylabel=L"\mathrm{Im}(z)",
                  zlabel=L"\mathrm{Im}(\log(z))"),
            clip_planes=[],
            kwargs...)
    zlims!(fg.axis, -2π, 2π)

    return fg
end

export riemannsphere

"""
    riemannsphere(
        f :: "Complex -> Complex";
        nodes = (720, 720),
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

Takes a complex function and produces its Riemann sphere surface plot.

Red corresponds to phase ``0``, yellow to ``\\frac{\\pi}{3}``, green
to ``\\frac{2\\pi}{3}``, cyan to ``\\pi``, blue to
``\\frac{4\\pi}{3}``, and magenta to ``\\frac{5\\pi}{3}``.

# Arguments

- **`f`** is the complex function to plot.

# Keyword Arguments

- **`nodes`** is the number of grid points to compute in, respectively,
  the azimuth and polar angles, per quarter section of the sphere.
  Taking the same for both if only one number is provided.

- **`abs`** toggles the plotting of the natural logarithm of the
  magnitude as lightness ramps between level curves. If set to a number,
  this will be used as base of the logarithm instead, if set to `Inf`,
  zero magnitude will be colored black and poles white. Further granular
  control can be achieved by passing a named tuple with any of the
  parameters `base`, `transform`, or `alpha`. `base` changes the base of
  the logarithm, as before. `transform` is the function applied to the
  magnitude (`m -> log(base, m)` by default), and `alpha` changes the
  rate at which zeros and poles are colored and implies `base = Inf`.

- **`grid`** plots points with integer real or imaginary part as black
  dots. More complicated arguments can be passed as a named tuple in a
  similar fashion to [`checkerplot`](@ref).

- **`color`** toggles coloring of the phase angle. Can also be set to
  either the name of, or a `ColorScheme`, or a function `θ -> Color`.
  If set to `:print` a desaturated version of the default is used.

- **`all`** is a shortcut for `abs = true`, `grid = true`, and
  `color = true`.

- **`box`** if set to `(a, b, s)` shades the area where the output is
  within the box `a` and `b` in the color `s` when set to `(f, s)` the
  colored domain is defined by `f(w) == true`. Can also be a list of
  multiple boxes.

Remaining keyword arguments are passed to the plotting backend.
"""
function riemannsphere(
        f;
        nodes = (720, 720),
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

    ϕ = range(1/2, -1/2, length=2nodes[1])
    θ = range(-1, 1, length=4nodes[2])
    x = @. cospi(ϕ)*cospi(θ')
    y = @. cospi(ϕ)*sinpi(θ')
    z = @. sinpi(ϕ) + 0θ'
    ξ = @. (x - im*y) / (1 - z)

    shader(w) = DC.domaincolorshader(w; abs, grid, color, all, box)

    fig = Figure()
    scn = LScene(fig[1,1]; show_axis=false)
    surface!(scn, x, y, z; color=shader.(f.(ξ)), kwargs...)
    return fig
end

end # module ComplexToys
