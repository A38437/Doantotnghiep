import { useEffect } from "react";

const useClickOutSide = (openerRef, ref, func) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current?.contains(event.target) &&
        !openerRef.current?.contains(event.target)
      ) {
        func();
      }
    }
    // Bind the event listener
    window.addEventListener("click", handleClickOutside, true);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, func]);
};

export default useClickOutSide;
