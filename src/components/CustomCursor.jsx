"use client"

import { useEffect, useRef } from "react"
import "./CustomCursor.css"

function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorFollowerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorFollower = cursorFollowerRef.current

    if (!cursor || !cursorFollower) return

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      // Add slight delay to follower for smooth effect
      setTimeout(() => {
        if (cursorFollower) {
          cursorFollower.style.left = `${e.clientX}px`
          cursorFollower.style.top = `${e.clientY}px`
        }
      }, 100)
    }

    const onMouseEnterInteractive = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.width = "60px"
      cursorFollower.style.height = "60px"
    }

    const onMouseLeaveInteractive = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    }

    const onMouseOut = () => {
      cursor.style.opacity = "0"
      cursorFollower.style.opacity = "0"
    }

    const onMouseOver = () => {
      cursor.style.opacity = "1"
      cursorFollower.style.opacity = "1"
    }

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("mouseover", onMouseOver)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive)
      el.addEventListener("mouseleave", onMouseLeaveInteractive)
    })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("mouseover", onMouseOver)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive)
        el.removeEventListener("mouseleave", onMouseLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursorFollowerRef} className="cursor-follower"></div>
    </>
  )
}

export default CustomCursor

