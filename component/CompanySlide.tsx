"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import adidas from "../public/comapnylogos/adidas_y-3-logo_brandlogos.net_d5my1 copy.png";
import amazon from "../public/comapnylogos/amazon_2024-logo_brandlogos.net_8mmvq.png";
import apple from "../public/comapnylogos/apple_computer_1977-1998-logo_brandlogos.net_318b1.png";
import bmw from "../public/comapnylogos/bmw_1997–2020-logo_brandlogos.net_yzd78.png";
import google from "../public/comapnylogos/google_icon_2025-logo_brandlogos.net_qm5ka.png";
import instagram from "../public/comapnylogos/instagram_glyph_gradient-logo_brandlogos.net_52bks.png";
import nikelogo from "../public/comapnylogos/nike-logo_brandlogos.net_4q4hy.png";

const logos = [adidas, amazon, apple, bmw, google, instagram, nikelogo];

export default function LogoSlider() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slider = containerRef.current?.querySelector(".slider-track");
            if (!slider) return;

            // Get the width of one set of logos
            const singleSetWidth = slider.scrollWidth / 2;

            // Create the infinite animation timeline
            const tl = gsap.timeline({ repeat: -1 });

            // Animate from 0 to -singleSetWidth (moving one full set)
            tl.to(slider, {
                x: `-${singleSetWidth}px`,
                duration: 20,
                ease: "none"
            });

            // Reset to 0 instantly (seamless because we have duplicated logos)
            tl.set(slider, { x: 0 });

        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (
        <div className="overflow-hidden bg-[#1a1a1a] py-4 px-2 rounded-2xl" ref={containerRef}>

            <div className="flex slider-track  gap-10">
                {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0 items-center justify-center flex">
                        <Image
                            src={logo}
                            alt={`Logo ${index}`}
                            width={40}
                            height={30}
                            className="brightness-75 invert-[.8] opacity-80 hidden md:block"
                        />
                        <Image
                            src={logo}
                            alt={`Logo ${index}`}
                            width={25}
                            height={15}
                            className="brightness-75 invert-[.8] opacity-80 md:hidden"
                        />
                    </div>

                ))}
            </div>
        </div>
    );
}
