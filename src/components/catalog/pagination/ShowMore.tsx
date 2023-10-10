import {useRef, useState} from "react";
import './style.css'


interface ShowMoreProps {
    onLoadMore: () => void
}

const gap = 200
export const ShowMore = ({onLoadMore}: ShowMoreProps) => {
    const el = useRef<HTMLDivElement|null>(null)
    const scroll = () => {
        if(!el.current) return
        const breakpoint = el.current?.getBoundingClientRect().top//offsetTop
        if(window.innerHeight > breakpoint - gap){
            onLoadMore()
        }
    }
    window.addEventListener('scroll', () => scroll())

    return (
        <>
            <div className="catalog-show-more" ref={el}></div>
        </>
    );
};