using GLMakie
import DomainColoring as DC
import GeometryBasics as GB

export riemannsphere

"""
    riemannsphere(
        f :: "Complex -> Complex",
        center = 1.7071 - 1.7071im;
        nodes = 720,
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

Takes a complex function and produces a mesh plot of its Riemann sphere.

Red corresponds to phase ``0``, yellow to ``\\frac{\\pi}{3}``, green
to ``\\frac{2\\pi}{3}``, cyan to ``\\pi``, blue to
``\\frac{4\\pi}{3}``, and magenta to ``\\frac{5\\pi}{3}``.

# Arguments

- **`f`** is the complex function to plot.

- **`center`** is the complex number the sphere should initially
  be centered at, defaults to ``1.7071 - 1.7071i``.

# Keyword Arguments

- **`nodes`** is the tessellation level of the sphere.

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
        f,
        center = 1.7071 - 1.7071im;
        nodes = 720,
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

    sph = GB.mesh(GB.Tesselation(Sphere(Point3f(0), 1f0), nodes))
    proj(p) = (p[1] - im*p[2]) / (1 - p[3])
    shader(p) = DC.domaincolorshader(f(proj(p)); abs, grid, color, all, box)

    fig = Figure()
    ax = LScene(fig[1,1]; show_axis=false)

    θ = 2atan(Base.abs(center))
    # if θ == 0, rendering glitches, for some reason, so nudge it a bit
    θ = θ == 0 ? eps() : θ
    ϕ = -angle(center)
    eyeposition = 2Vec3d(sin(θ)*cos(ϕ), sin(θ)*sin(ϕ), -cos(θ))
    Camera3D(ax.scene; eyeposition, zoom_shift_lookat = false, cad = true)

    mesh!(ax, sph; color=shader.(GB.coordinates(sph)), kwargs...)

    return fig
end

