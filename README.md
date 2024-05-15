# CATools.jl

A collection of useful routines for teaching Complex Functions and
Applications.

To install run:
```julia
using Pkg
pkg"add https://gitlab.kuleuven.be/u0158737/catools.git"
```

Included plotting routines:

- `modularsurface(z->f(z))` plots a modular surface of $f$, i.e. a surface plot of the magnitude;
- `riemannsphere(z->f(z))` plots a domain coloring of $f$ on the Riemann sphere;
- `riemannpow(k)` plots a projection of the Riemann surface of $z^k$; and
- `riemannlog()` plots a projection of the Riemann surface of $\log(z)$.

Next to the routines in this package, DomainColoringToy is reexported.
See [their documentation](https://eprovst.github.io/DomainColoring.jl)
for domain colourings, checker plots, etc.
