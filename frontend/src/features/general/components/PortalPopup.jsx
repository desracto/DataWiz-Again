import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./PortalPopup.css";

// Define the PortalPopup functional component
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
    // Create refs for relative container and relative layer
    const relContainerRef = useRef(null);

    // State to manage the style of the relative container
    const [relativeStyle, setRelativeStyle] = useState({
        opacity: 0,
    });

    // Calculate and memoize the style of the popup
    const popupStyle = useMemo(() => {
        const style = {};
        style.zIndex = zIndex;

        // Set overlay color if provided
        if (overlayColor) {
            style.backgroundColor = overlayColor;
        }

        // Set alignment based on placement
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

    // Callback function to set the position of the popup
    const setPosition = useCallback(() => {
        const relativeItem = relativeLayerRef?.current?.getBoundingClientRect();
        const containerItem = relContainerRef?.current?.getBoundingClientRect();
        const style = { opacity: 1 };

        if (relativeItem && containerItem) {
            const {
                x: relativeX,
                y: relativeY,
                width: relativeW,
                height: relativeH,
            } = relativeItem;
            const { width: containerW, height: containerH } = containerItem;
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

            setRelativeStyle(style);
        } else {
            // Default styles for relative container
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

    // Effect to set initial position and attach event listeners
    useEffect(() => {
        setPosition();

        window.addEventListener("resize", setPosition);
        window.addEventListener("scroll", setPosition, true);

        // Cleanup event listeners
        return () => {
            window.removeEventListener("resize", setPosition);
            window.removeEventListener("scroll", setPosition, true);
        };
    }, [setPosition]);

    // Callback function for overlay click
    const onOverlayClick = useCallback(
        (e) => {
            if (onOutsideClick && e.target.classList.contains("portalPopupOverlay")) {
                onOutsideClick();
            }
            e.stopPropagation();
        },
        [onOutsideClick]
    );

    return (
        // Use the Portal component to render the popup outside the root DOM node
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

// Helper component for rendering content outside the root DOM node
export const Portal = ({ children, containerId = "portals" }) => {
    // Find or create the container for portals
    let portalsDiv = document.getElementById(containerId);
    if (!portalsDiv) {
        portalsDiv = document.createElement("div");
        portalsDiv.setAttribute("id", containerId);
        document.body.appendChild(portalsDiv);
    }

    // Use createPortal to render children inside the portals container
    return createPortal(children, portalsDiv);
};

export default PortalPopup;
