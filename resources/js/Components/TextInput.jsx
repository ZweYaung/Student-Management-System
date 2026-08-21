import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "rounded-lg border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] text-sm " +
                "focus:border-[#3b82f6] focus:bg-white focus:ring-1 focus:ring-[#3b82f6] " +
                "placeholder:text-[#94a3b8] " +
                "px-4 py-2.5 " +
                "w-full " +
                className
            }
            ref={localRef}
        />
    );
});
