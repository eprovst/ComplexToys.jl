# CATools.jl

A collection of useful plotting routines for teaching and learning complex
analysis.  Take a look at [the
guide](https://raw.github.com/eprovst/CATools.jl/main/guide/guide.pdf)
to get started.

To install run:
```julia
using Pkg
pkg"add https://github.com/eprovst/CATools.jl.git"
```

Included plotting routines:

- `modularsurface(z->f(z))` plots a modular surface of $f$, i.e. a surface plot of the magnitude;
- `riemannsphere(z->f(z))` plots a domain coloring of $f$ on the Riemann sphere;
- `riemannpow(k)` plots a projection of the Riemann surface of $z^k$; and
- `riemannlog()` plots a projection of the Riemann surface of $\log(z)$.

Next to the routines in this package, DomainColoringToy is reexported.
See [their documentation](https://eprovst.github.io/DomainColoring.jl)
for domain colourings, checker plots, etc.
