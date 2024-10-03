using ComplexToys

fig = modularsurface(z -> 1 / (im*(z+.1im)^3-1), 2.5, mmax=2, cut=true)
fig.axis.elevation = 0.42*pi
fig.axis.azimuth = 1.45*pi
save("logo.png", fig)
