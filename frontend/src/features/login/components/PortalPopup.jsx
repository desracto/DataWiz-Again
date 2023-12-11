import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./PortalPopup.css";

// PortalPopup component for creating a pop-up that can be rendered outside the main component tree
const PortalPopup = ({
    children,
    overlayColor,
    placement = "Centered",
    onOutsideClick,
    zIndex = 100,
    left = 0,
    right = 0,
    top = 0,
    bottom = 0,
    relativeLayerRef
}) => {
    // Ref for the container of the pop-up
    const relContainerRef = useRef(null);

    // State for managing styles related to the relative layer
    const [relativeStyle, setRelativeStyle] = useState({
        opacity: 0,
    });

    // Memoized style for the pop-up
    const popupStyle = useMemo(() => {
        const style = {};
        style.zIndex = zIndex;

        // Setting overlay color if provided
        if (overlayColor) {
            style.backgroundColor = overlayColor;
        }

        // Handling placement styles based on the specified placement
        if (!relativeLayerRef?.current) {
            switch (placement) {
                case "Centered":
                    style.alignItems = "center";
                    style.justifyContent = "center";
                    break;
                case "Top left":
                    style.alignItems = "flex-start";
                    break;
                case "Top center":
                    style.alignItems = "center";
                    break;
                case "Top right":
                    style.alignItems = "flex-end";
                    break;
                case "Bottom left":
                    style.alignItems = "flex-start";
                    style.justifyContent = "flex-end";
                    break;
                case "Bottom center":
                    style.alignItems = "center";
                    style.justifyContent = "flex-end";
                    break;
                case "Bottom right":
                    style.alignItems = "flex-end";
                    style.justifyContent = "flex-end";
                    break;
                default:
                    break;
            }
        }
        style.opacity = 1;
        return style;
    }, [placement, overlayColor, zIndex, relativeLayerRef]);

    // Function to set the position of the pop-up based on the relative layer
    const setPosition = useCallback(() => {
        const relativeItem = relativeLayerRef?.current?.getBoundingClientRect();
        const containerItem = relContainerRef?.current?.getBoundingClientRect();
        const style = { opacity: 1 };

        // Check if both relative and container items exist
        if (relativeItem && containerItem) {
            // Destructuring properties from the bounding rectangles
            const {
                x: relativeX,
                y: relativeY,
                width: relativeW,
                height: relativeH,
            } = relativeItem;
            const { width: containerW, height: containerH } = containerItem;

            // Setting position and coordinates based on the specified placement
            style.position = "absolute";
            switch (placement) {
                case "Top left":
                    style.top = relativeY - containerH - top;
                    style.left = relativeX + left;
                    break;
                case "Top right":
                    style.top = relativeY - containerH - top;
                    style.left = relativeX + relativeW - containerW - right;
                    break;
                case "Bottom left":
                    style.top = relativeY + relativeH + bottom;
                    style.left = relativeX + left;
                    break;
                case "Bottom right":
                    style.top = relativeY + relativeH + bottom;
                    style.left = relativeX + relativeW - containerW - right;
                    break;
                default:
                    break;
            }

            // Applying the calculated style
            setRelativeStyle(style);
        } else {
            // Fallback style if no relative or container item is available
            style.maxWidth = "90%";
            style.maxHeight = "90%";
            setRelativeStyle(style);
        }
    }, [
        left,
        right,
        top,
        bottom,
        placement,
        relativeLayerRef,
        relContainerRef,
    ]);

    // Effect to set the initial position and add event listeners for resizing and scrolling
    useEffect(() => {
        setPosition();

        window.addEventListener("resize", setPosition);
        window.addEventListener("scroll", setPosition, true);

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener("resize", setPosition);
            window.removeEventListener("scroll", setPosition, true);
        };
    }, [setPosition]);

    // Click handler for the overlay, invoking onOutsideClick if provided
    const onOverlayClick = useCallback(
        (e) => {
            if (
                onOutsideClick &&
                e.target.classList.contains("portalPopupOverlay")
            ) {
                onOutsideClick();
            }
            e.stopPropagation();
        },
        [onOutsideClick]
    );

    // Rendering the pop-up using createPortal
    return (
        <Portal>
            <div
                className="portalPopupOverlay"
                style={popupStyle}
                onClick={onOverlayClick}
            >
                <div ref={relContainerRef} style={relativeStyle}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

// Portal component for rendering children outside the main component tree
export const Portal = ({ children, containerId = "portals" }) => {
    // Get or create the portal container
    let portalsDiv = document.getElementById(containerId);
    if (!portalsDiv) {
        portalsDiv = document.createElement("div");
        portalsDiv.setAttribute("id", containerId);
        document.body.appendChild(portalsDiv);
    }

    // Render the children into the portal container
    return createPortal(children, portalsDiv);
};

export default PortalPopup;
