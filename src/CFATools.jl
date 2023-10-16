"""
  Some extensions on top of DomainColoringToy for use in
  Complex Functions and Application.
"""
module CFATools

using Reexport, LaTeXStrings
@reexport using DomainColoringToy
import DomainColoring as DC

export modularsurface

"""TODO: DOCSTRING"""
function modularsurface(
        f,
        limits = (-1,1,-1,1);
        mmax = 10,
        nodes = (720, 720),
        abs = false,
        grid = false,
        color = true,
        all = false,
        box = nothing,
        kwargs...
    )

    length(nodes) == 1 && (nodes = (nodes, nodes))
    limits = DC._expandlimits(limits)

    r = range(limits[1], limits[2], length=nodes[1])
    i = range(limits[3], limits[4], length=nodes[2])

    Z = @. f(r + im*i')
    mx = maximum(Base.abs, Z)

    shader(w) = DC.domaincolorshader(w; abs, grid, color, all, box)

    fg = surface(r, i, Base.abs.(Z); color=shader.(Z),
                 axis=(type=Axis3,
                       xlabel=L"\mathrm{Re}(z)",
                       ylabel=L"\mathrm{Im}(z)",
                       zlabel=L"|f(z)|"),
                 kwargs...)

    zlims!(fg.axis, 0, min(mx+1, mmax))
    return fg
end

export riemannroot

"""TODO: DOCSTRING"""
function riemannroot(
        n = 2;
        nodes = (120, 120),
        kwargs...
    )

    length(nodes) == 1 && (nodes = (nodes, nodes))

    if n isa Integer
        d = n
        n = n//1
    elseif n isa Rational
        d = n.num
    else
        @error "n is not rational"
        return
    end

    r = range(0, 1, length=nodes[1])
    θ = range(-d*π, d*π, length=d*nodes[2])
    Z = @. r*exp(im*θ')
    W = @. r^(1/n) * exp(im*θ'/n)

    surface(real.(Z), imag.(Z), real.(W); color=imag.(W),
            axis=(type=Axis3,
                  xlabel=L"\mathrm{Re}(z)",
                  ylabel=L"\mathrm{Im}(z)",
                  zlabel=LaTeXString("\$\\mathrm{Re}\\left(z^\\frac{$(n.den)}{$(n.num)}\\right)\$")),
            kwargs...)
end

export riemannlog

"""TODO: DOCSTRING"""
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
            axis=(type=Axis3,
                  xlabel=L"\mathrm{Re}(z)",
                  ylabel=L"\mathrm{Im}(z)",
                  zlabel=L"\mathrm{Im}(\log(z))"),
            kwargs...)
    zlims!(fg.axis, -2π, 2π)

    return fg
end

export riemannsphere

"""TODO: DOCSTRING"""
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
    surface!(scn, x, y, z; color=shader.(f.(ξ)))
    return fig
end

end # module CPTools
