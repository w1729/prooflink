import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";

// import { Event, trackEvent } from "@/lib/events";
import { cn } from '@/lib/utils'
import { Button } from "./ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


export async function copyToClipboardWithMeta(value, event) {
    navigator.clipboard.writeText(value);
}

export function CopyButton({
    value,
    className,
    src,
    variant = "ghost",
    event,
    ...props
}) {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return React.createElement(
        Button,
        {
            size: "icon",
            variant: variant,
            className: cn(
                "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
                className
            ),
            onClick: () => {
                copyToClipboardWithMeta(
                    value,
                    event
                        ? {
                                name: event,
                                properties: {
                                    code: value,
                                },
                            }
                        : undefined
                );
                setHasCopied(true);
            },
            ...props,
        },
        React.createElement("span", { className: "sr-only" }, "Copy"),
        hasCopied ? React.createElement(CheckIcon, {className: 'text-green-500'}) : React.createElement(ClipboardIcon)
    );
}
export function CopyWithClassNames({
    value,
    classNames,
    className,
    ...props
}) {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    const copyToClipboard = React.useCallback((value) => {
        copyToClipboardWithMeta(value);
        setHasCopied(true);
    }, []);

    return React.createElement(
        DropdownMenu,
        null,
        React.createElement(
            DropdownMenuTrigger,
            { asChild: true },
            React.createElement(
                Button,
                {
                    size: "icon",
                    variant: "ghost",
                    className: cn(
                        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
                        className
                    ),
                },
                hasCopied
                    ? React.createElement(CheckIcon, { className: "h-3 w-3" })
                    : React.createElement(ClipboardIcon, { className: "h-3 w-3" }),
                React.createElement("span", { className: "sr-only" }, "Copy")
            )
        ),
        React.createElement(
            DropdownMenuContent,
            { align: "end" },
            React.createElement(
                DropdownMenuItem,
                { onClick: () => copyToClipboard(value) },
                "Component"
            ),
            React.createElement(
                DropdownMenuItem,
                { onClick: () => copyToClipboard(classNames) },
                "Classname"
            )
        )
    );
}

export function CopyNpmCommandButton({
    commands,
    className,
    ...props
}) {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    const copyCommand = React.useCallback(
        (value, pm) => {
            copyToClipboardWithMeta(value, {
                name: "copy_npm_command",
                properties: {
                    command: value,
                    pm,
                },
            });
            setHasCopied(true);
        },
        []
    );

    return React.createElement(
        DropdownMenu,
        null,
        React.createElement(
            DropdownMenuTrigger,
            { asChild: true },
            React.createElement(
                Button,
                {
                    size: "icon",
                    variant: "ghost",
                    className: cn(
                        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
                        className
                    ),
                },
                hasCopied
                    ? React.createElement(CheckIcon, { className: "h-3 w-3" })
                    : React.createElement(ClipboardIcon, { className: "h-3 w-3" }),
                React.createElement("span", { className: "sr-only" }, "Copy")
            )
        ),
        React.createElement(
            DropdownMenuContent,
            { align: "end" },
            React.createElement(
                DropdownMenuItem,
                { onClick: () => copyCommand(commands.__npmCommand__, "npm") },
                "npm"
            ),
            React.createElement(
                DropdownMenuItem,
                { onClick: () => copyCommand(commands.__yarnCommand__, "yarn") },
                "yarn"
            ),
            React.createElement(
                DropdownMenuItem,
                { onClick: () => copyCommand(commands.__pnpmCommand__, "pnpm") },
                "pnpm"
            ),
            React.createElement(
                DropdownMenuItem,
                { onClick: () => copyCommand(commands.__bunCommand__, "bun") },
                "bun"
            )
        )
    );
}