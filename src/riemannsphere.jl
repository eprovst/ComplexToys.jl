using GLMakie
import DomainColoring as DC

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

