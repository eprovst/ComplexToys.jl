using Pkg
cd(@__DIR__)
Pkg.activate(".")
pkg"dev .."
Pkg.instantiate()
Pkg.precompile()

using Documenter, ComplexToys
import DomainColoringToy

makedocs(
  sitename = "ComplexToys.jl",
  authors = "Evert Provoost",
  pages = [
    "Home" => "index.md",
    "Guide" => "guide.md",
    "Library" => "lib.md",
  ]
)

deploydocs(
  repo = "github.com/eprovst/ComplexToys.jl.git",
  push_preview = true,
)
