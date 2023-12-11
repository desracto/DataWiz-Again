import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./PortalPopup.module.css";

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
    // Create a ref for the relative container
    const relContainerRef = useRef(null);

    // State for the style of the relative container
    const [relativeStyle, setRelativeStyle] = useState({
        opacity: 0,
    });

    // Calculate the style for the popup based on the provided props
    const popupStyle = useMemo(() => {
        const style = {};
        style.zIndex = zIndex;

        // Apply overlay color if provided
        if (overlayColor) {
            style.backgroundColor = overlayColor;
        }

        // Apply positioning styles based on placement
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

    // Function to set the position of the popup relative to the reference element
    const setPosition = useCallback(() => {
        // Get bounding rectangles of the reference and container elements
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
            // Set default max width and max height if reference elements are not available
            style.maxWidth = "90%";
            style.maxHeight = "90%";
            setRelativeStyle(style);
        }
    }, [left, right, top, bottom, placement, relativeLayerRef, relContainerRef]);

    // Effect to set the initial position and attach event listeners for window resize and scroll
    useEffect(() => {
        setPosition();

        window.addEventListener("resize", setPosition);
        window.addEventListener("scroll", setPosition, true);

        return () => {
            window.removeEventListener("resize", setPosition);
            window.removeEventListener("scroll", setPosition, true);
        };
    }, [setPosition]);

    // Function to handle overlay click and trigger the outside click callback
    const onOverlayClick = useCallback(
        (e) => {
            if (onOutsideClick && e.target.classList.contains("portalPopupOverlay")) {
                onOutsideClick();
            }
            e.stopPropagation();
        },
        [onOutsideClick]
    );

    // Render the PortalPopup component
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

// Define the Portal component for creating a portal in the DOM
export const Portal = ({ children, containerId = "portals" }) => {
    // Get or create the portal container element
    let portalsDiv = document.getElementById(containerId);
    if (!portalsDiv) {
        portalsDiv = document.createElement("div");
        portalsDiv.setAttribute("id", containerId);
        document.body.appendChild(portalsDiv);
    }

    // Use React's createPortal to render children into the portal container
    return createPortal(children, portalsDiv);
};

export default PortalPopup;