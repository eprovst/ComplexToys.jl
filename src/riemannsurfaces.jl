using GLMakie, LaTeXStrings

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
            clip_planes=[],
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

