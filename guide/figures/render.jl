using ComplexToys

save("phase-id.png", domaincolor(z->z))

save("phase-pole.png", domaincolor(z->z^-2))

f = domaincolor(z->z, 2; box=(.4,.6+.2im,:white))
save("box-1.png", f)
f = domaincolor(z->1/conj(z), 2; box=(.4,.6+.2im,:white))
save("box-2.png", f)
f = domaincolor(z->1/z, 2; box=(.4,.6+.2im,:white))
save("box-3.png", f)

save("candp.png", domaincolor(z -> (conj(z) - .5)/(z + .5), abs=true))

save("ess.png", domaincolor(z -> exp(1/z), .2, abs=Inf))

save("sin-ess.png", modularsurface(z -> sin(1/z)))

save("dc-pow2.png", domaincolor(z->z^2, abs=true))

save("bc-sqrt.png", domaincolor(z->z^(1/2), abs=true))

save("rm-sqrt.png", riemannpow(1//2))

save("rm-log.png", riemannlog())

f = riemannsphere(sin)
rotate!(f.scene, Vec3f(-1, 1, 0), 0.25)
save("rms-sin.png", f)
