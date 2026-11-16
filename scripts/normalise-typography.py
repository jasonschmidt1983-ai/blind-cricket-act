#!/usr/bin/env python3
"""Normalise index.css font sizes without changing layout dimensions.

Pixel operands are divided by 16 to preserve the default 16px-root design.
Viewport operands in clamp() are multiplied by the saved text scale, since
viewport units do not otherwise respond to changes in the root font size.
The transformation is idempotent; run from any directory with Python 3.
"""

from pathlib import Path
import re

STYLESHEET = Path(__file__).resolve().parents[1] / "client/src/index.css"
DECLARATION = re.compile(r"(\bfont-size\s*:\s*)([^;{}]+)(;)")
PIXELS = re.compile(r"(?<![\w.-])(-?(?:\d+(?:\.\d+)?|\.\d+))px\b")
VIEWPORT = re.compile(r"(?<![\w.-])(-?(?:\d+(?:\.\d+)?|\.\d+)vw)\b")
SCALED_VIEWPORT = re.compile(
    r"calc\(\s*-?(?:\d+(?:\.\d+)?|\.\d+)vw\s*\*\s*"
    r"var\(\s*--text-scale\s*,\s*1\s*\)\s*\)"
)


def normalise(css: str) -> str:
    def replace_declaration(match: re.Match) -> str:
        value = PIXELS.sub(
            lambda operand: f"{float(operand.group(1)) / 16:g}rem",
            match.group(2),
        )
        if "clamp(" in value:
            # Protect already-scaled operands, so repeated runs are harmless.
            protected: list[str] = []

            def protect(operand: re.Match) -> str:
                protected.append(operand.group(0))
                return f"__SCALED_VIEWPORT_{len(protected) - 1}__"

            value = SCALED_VIEWPORT.sub(protect, value)
            value = VIEWPORT.sub(
                lambda operand: f"calc({operand.group(1)} * var(--text-scale, 1))",
                value,
            )
            for index, operand in enumerate(protected):
                value = value.replace(f"__SCALED_VIEWPORT_{index}__", operand)
        return f"{match.group(1)}{value}{match.group(3)}"

    return DECLARATION.sub(replace_declaration, css)


if __name__ == "__main__":
    original = STYLESHEET.read_text()
    result = normalise(original)
    if result != original:
        STYLESHEET.write_text(result)
        print("Normalised font-size operands in client/src/index.css.")
    else:
        print("Typography is already normalised; no changes made.")
