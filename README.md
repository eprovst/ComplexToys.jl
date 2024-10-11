<div align="center">
  <img src="docs/src/assets/logo.png" width=300 />
  <h1>ComplexToys.jl</h1>
</div>
<p>
  <a href="https://eprovst.github.io/ComplexToys.jl/dev/">
    <img src="https://img.shields.io/badge/docs-dev-blue.svg"/></a>
</p>

A collection of useful plotting routines for teaching and learning complex
analysis.  Take a look at [the
guide](https://eprovst.github.io/ComplexToys.jl/dev/guide/)
to get started.

To install run:
```julia
using Pkg
pkg"add ComplexToys"
```

Included plotting routines:

- `modularsurface(z->f(z))` plots a modular surface of $f$, i.e. a surface plot of the magnitude;
- `riemannsphere(z->f(z))` plots a domain coloring of $f$ on the Riemann sphere;
- `riemannpow(k)` plots a projection of the Riemann surface of $z^k$; and
- `riemannlog()` plots a projection of the Riemann surface of $\log(z)$.

Next to the routines in this package, DomainColoringToy is reexported.
See [their documentation](https://eprovst.github.io/DomainColoring.jl/stable/dct/)
for domain colourings, checker plots, etc.
