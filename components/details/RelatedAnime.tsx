"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { HiAnime } from "aniwatch";
import { BsBadgeCc } from "react-icons/bs";
import { MdMicNone } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa6";

import { Header } from "@/components/common/Header";
import { LoadingSkeletons } from "@/components/home/Trending";

type RelatedAnimeType = HiAnime.ScrapedAnimeAboutInfo["relatedAnimes"][number];

export function RelatedAnimeCard({ anime }: { anime: RelatedAnimeType }) {
  return (
    <Link href={`/details?animeId=${anime.id}`}>
      <div className="w-[calc(16.66% - 1rem)] gap-2 p-2 flex flex-col flex-shrink-0 group">
        <div className="w-full aspect-[2/3] overflow-hidden relative">
          <img
            src={anime.poster || ""}
            alt={anime.name || "failed to retrive image"}
            className="rounded-md h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 group-hover:backdrop-blur-sm transition duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaPlay className="text-white text-3xl lg:text-4xl" />
          </div>

          {anime.type && (
            <div className="absolute top-2 left-2 text-white text-xs  bg-black bg-opacity-80  px-1.5 py-0.5 rounded s">
              {anime.type}
            </div>
          )}
          <div className="absolute flex gap-1 bottom-2 right-1 text-xs">
            {anime.episodes.sub && (
              <div className="flex items-center text-white text-xs bg-primary px-1.5 py-0.5 rounded gap-0.5">
                <BsBadgeCc className="w-3 h-3" />
                <span>{anime.episodes.sub}</span>
              </div>
            )}
            {anime.episodes.dub && (
              <div className="flex items-center text-white text-xs bg-secondary px-1.5 py-0.5 rounded gap-0.5">
                <MdMicNone className="w-3 h-3" />
                <span>{anime.episodes.dub}</span>
              </div>
            )}
          </div>
        </div>

        <p className="line-clamp-1 font-medium text-white text-base">
          {anime.name}
        </p>
      </div>
    </Link>
  );
}

export function RelatedAnime({
  relatedAnimes,
}: {
  relatedAnimes: HiAnime.ScrapedAnimeAboutInfo["relatedAnimes"];
}) {
  if (!relatedAnimes.length) {
    return <></>;
  }

  const sliderRef = useRef<Slider>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    swipeToSlide: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Header title="Related" />
      <div className="relative w-full p-0">
        {isMounted ? (
          <>
            <Slider ref={sliderRef} {...settings} className="!static">
              {relatedAnimes.map((anime: RelatedAnimeType) => (
                <RelatedAnimeCard anime={anime} key={anime.id} />
              ))}
            </Slider>

            <button
              onClick={previous}
              className="absolute left-4 top-[45%]  bg-black/60 transform -translate-y-1/2 rounded-full p-2 text-white hidden md:flex items-center justify-center transition-all duration-200 hover:bg-black/70"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-[45%] bg-black/60 transform -translate-y-1/2 rounded-full p-2 text-white hidden md:flex items-center justify-center transition-all duration-200 hover:bg-black/70"
            >
              <FaChevronRight size={24} />
            </button>
          </>
        ) : (
          <LoadingSkeletons />
        )}
      </div>
    </div>
  );
}
