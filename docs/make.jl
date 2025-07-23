using Pkg
cd(@__DIR__)
Pkg.activate(".")
Pkg.instantiate()
Pkg.precompile()

using Documenter, ComplexToys

makedocs(
  sitename = "ComplexToys.jl",
  authors = "Evert Provoost",
  repo="https://github.com/eprovst/ComplexToys.jl/blob/{commit}{path}#{line}",
  format=Documenter.HTML(
    repolink="https://github.com/eprovst/ComplexToys.jl/",
    canonical="https://eprovst.github.io/ComplexToys.jl",
    assets=["assets/style.css",]
  ),
  pages = [
    hide("Home" => "index.md"),
    "Guide" => "guide.md",
    "Library" => "lib.md",
  ]
)

deploydocs(
  repo = "github.com/eprovst/ComplexToys.jl.git",
  push_preview = true,
)
